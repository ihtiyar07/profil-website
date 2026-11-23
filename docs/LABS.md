# PostgreSQL ve Veritabanı Lab / Kanıt Toplama Rehberi (LABS.md)

Bu kılavuz, teknik makalelerde ve mimari rehberlerde paylaşılan metriklerin, terminal çıktılarının (`pg_lsclusters`, `initdb`, `pg_checksums`, `EXPLAIN ANALYZE`) ve yapılandırma doğrulamalarının nasıl çalıştırılacağını standartlaştırır. **Projeye yeni katılan tüm AI agent'lar ve geliştiriciler lab testlerinde bu protokolü uygulamalıdır.**

---

## 1. Temel Prensipler (Sıfır İz & İzolasyon)

1. **Tahmini Bilgi Yasağı:** Dokümanlara konulan çıktılar uydurma veya varsayımsal olamaz; izole lab ortamında gerçekten koşturularak doğrulanmalıdır.
2. **Host Makineyi Kirletmeme:** Ana işletim sistemine (Fedora/RHEL/Ubuntu) doğrudan paket (`dnf install`, `apt install`) veya derleme bağımlılığı kurulamaz.
3. **Üretim Sunucusu Güvencesi:** Canlı veya harici sunucularda (`172.16.16.2` vb.) deneysel lab/test yürütülmez.
4. **Konteyner İzolasyonu:** Tüm testler geçici (ephemeral) Docker konteynerleri içinde yapılır.
5. **Tam Temizlik (Zero-Footprint):** Test bittiğinde oluşturulan geçici konteynerler (`--rm` veya `docker rm -f -v`) ve `/tmp` altındaki test verileri eksiksiz silinir.

---

## 2. Standart İmaj Kataloğu

| Test Alanı | Kullanılacak İmaj | Amaç ve Kapsam |
| :--- | :--- | :--- |
| **PostgreSQL Çekirdek & initdb** | `postgres:18-alpine` | `initdb` bayrakları, data checksums, ICU collation, `pg_wal` symlink yapısı, `pg_ctl reload/restart/stop` davranışları. |
| **Debian / Ubuntu Ekosistemi** | `debian:bookworm-slim` | PGDG APT reposu, `postgresql-common`, `pg_wrapper`, `pg_lsclusters`, `pg_createcluster`, multi-instance yönetimi. |
| **TimescaleDB & Zaman Serisi** | `timescale/timescaledb-ha:pg16` | Hypertable, Chunk yaşam döngüsü, continuous aggregates, columnar sıkıştırma, `pgvectorscale`. |
| **Paralel Veri Yükleme** | `timescale/timescaledb-parallel-copy:latest` | Çok iş parçacıklı (multi-worker) paralel COPY benchmarkları, batch boyutu testleri. |
| **REST API & Arayüz** | `postgrest/postgrest` + `swaggerapi/swagger-ui` | Otomatik OpenAPI şeması, RLS filtreleme, REST API yanıt süreleri. |

---

## 3. Hazır Test Şablonları

### Senaryo A: PostgreSQL 18 `initdb`, ICU, Checksum ve WAL Symlink Testi
Geçici bir container üzerinde parametreleri ve çıktıları doğrulamak için:

```bash
docker run --rm -d --name pg-lab-core \
  --shm-size=256m \
  -e POSTGRES_PASSWORD=labpass \
  -e POSTGRES_INITDB_ARGS="--data-checksums --locale-provider=icu --icu-locale=tr-TR" \
  -e POSTGRES_INITDB_WALDIR=/tmp/pgwal_test \
  postgres:18-alpine

# Konteyner hazır olana kadar bekle
until docker exec pg-lab-core pg_isready -U postgres >/dev/null 2>&1; do sleep 1; done

# 1. WAL symlink kontrolü
docker exec pg-lab-core sh -c 'ls -ld "$PGDATA/pg_wal"'

# 2. ICU Collation ve Veritabanı durumu
docker exec pg-lab-core psql -U postgres -c \
  "SELECT datname, pg_encoding_to_char(encoding) AS enc, datlocprovider, datlocale, datcollversion FROM pg_database WHERE datname = 'postgres';"

# 3. Reload (SIGHUP) ve Checksum Doğrulaması
docker exec pg-lab-core sh -c '
  su postgres -c "pg_ctl -D \"$PGDATA\" reload"
  su postgres -c "pg_ctl -D \"$PGDATA\" stop -m fast"
  pg_checksums --check -D "$PGDATA"
'

# Temizlik
docker rm -f -v pg-lab-core 2>/dev/null || true
```

---

### Senaryo B: Debian `pg_wrapper`, `pg_lsclusters` ve Multi-Instance
Debian/Ubuntu ortamındaki `postgresql-common` sarmalayıcısını test etmek için:

```bash
docker run --rm -it debian:bookworm-slim bash -c '
  set -e
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq && apt-get install -y -qq curl ca-certificates gnupg lsb-release locales >/dev/null
  install -d /usr/share/postgresql-common/pgdg
  curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg
  echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
  apt-get update -qq && apt-get install -y -qq postgresql-17 >/dev/null

  echo "=== 1. Varsayılan Cluster ==="
  pg_lsclusters

  echo "=== 2. İkinci İzole Cluster (5433 / ICU / Checksums) ==="
  mkdir -p /var/lib/postgresql/wal_analytics && chown postgres:postgres /var/lib/postgresql/wal_analytics
  pg_createcluster 17 analytics -p 5433 --start -- --data-checksums --locale-provider=icu --icu-locale=tr-TR --waldir=/var/lib/postgresql/wal_analytics

  echo "=== 3. Çoklu Cluster Listesi ==="
  pg_lsclusters

  echo "=== 4. Cluster Reload Testi ==="
  pg_ctlcluster 17 analytics reload
'
```

---

### Senaryo C: TimescaleDB 1M+ Satır Bulk Ingest ve Benchmark
TimescaleDB ve paralel aktarım testleri için:

```bash
# 1. TimescaleDB container'ını başlat
docker run -d --name ts-bench -p 55432:5432 -e POSTGRES_PASSWORD=benchpass timescale/timescaledb-ha:pg16

until docker exec ts-bench pg_isready -U postgres >/dev/null 2>&1; do sleep 1; done

# 2. Tabloyu ve hypertable'ı oluştur
PGPASSWORD=benchpass psql -h 127.0.0.1 -p 55432 -U postgres -c "
  CREATE TABLE sensor_ingest (
      time TIMESTAMPTZ NOT NULL,
      device_id INT NOT NULL,
      cpu_usage DOUBLE PRECISION,
      temperature DOUBLE PRECISION
  );
  SELECT create_hypertable('sensor_ingest', 'time', chunk_time_interval => INTERVAL '1 day');
  CREATE INDEX idx_ingest_dev_time ON sensor_ingest (device_id, time DESC);
"

# 3. Paralel kopya çalıştır (örnek CSV ile)
docker run --rm --network host -v /tmp/bench.csv:/data/bench.csv:ro,z timescale/timescaledb-parallel-copy \
  --connection "postgres://postgres:benchpass@127.0.0.1:55432/postgres?sslmode=disable" \
  --table sensor_ingest \
  --file /data/bench.csv \
  --skip-header \
  --workers 4 \
  --batch-size 25000 \
  --reporting-period 0s

# Temizlik
docker rm -f -v ts-bench 2>/dev/null || true
```

---

### Senaryo D: 8KB Page & HOT Update (`pageinspect`, `fillfactor = 70`)

```bash
docker run --rm -it postgres:18-alpine sh -c '
  su postgres -c "initdb -D /tmp/pgdata >/dev/null && pg_ctl -D /tmp/pgdata start -w"
  psql -U postgres -c "
    CREATE EXTENSION pageinspect;
    CREATE TABLE accounts (id INT PRIMARY KEY, balance INT, note TEXT) WITH (fillfactor = 70);
    INSERT INTO accounts VALUES (1, 100, '\''ilk kayit'\'');
    UPDATE accounts SET balance = 150 WHERE id = 1;
    
    -- Sayfa içi Line Pointer ve HEAP_HOT_UPDATED bayrak kontrolü:
    SELECT lp, lp_off, t_xmin, t_xmax, t_ctid,
           CASE WHEN (t_infomask2 & 16384) > 0 THEN '\''HEAP_HOT_UPDATED'\'' ELSE '\''NORMAL'\'' END AS hot_updated,
           CASE WHEN (t_infomask2 & 32768) > 0 THEN '\''HEAP_ONLY_TUPLE'\'' ELSE '\''ROOT'\'' END AS hot_tuple
    FROM heap_page_items(get_raw_page('\''accounts'\'', 0));

    -- B-Tree indeksinin sadece tek bir (0,1) işaretçisi tuttuğunun kanıtı:
    SELECT itemoffset, ctid FROM bt_page_items(get_raw_page('\''accounts_pkey'\'', 1));
  "
'
```

---

### Senaryo E: `shared_buffers` & Clock Sweep (`pg_buffercache`)

```bash
docker run --rm -it postgres:18-alpine sh -c '
  su postgres -c "initdb -D /tmp/pgdata >/dev/null && pg_ctl -D /tmp/pgdata start -w"
  psql -U postgres -c "
    CREATE EXTENSION pg_buffercache;
    CREATE TABLE cache_demo (id INT, val TEXT);
    INSERT INTO cache_demo VALUES (1, '\''test'\'');
    
    -- İlk INSERT sonrası usagecount = 1:
    SELECT b.bufferid, b.relblocknumber, b.isdirty, b.usagecount, b.pinning_backends
    FROM pg_buffercache b JOIN pg_class c ON b.relfilenode = pg_relation_filenode(c.oid)
    WHERE c.relname = '\''cache_demo'\'';

    -- 3 kez SELECT et:
    SELECT count(*) FROM cache_demo; SELECT count(*) FROM cache_demo; SELECT count(*) FROM cache_demo;

    -- usagecount sayacının 4 e yükselişi:
    SELECT b.bufferid, b.relblocknumber, b.isdirty, b.usagecount, b.pinning_backends
    FROM pg_buffercache b JOIN pg_class c ON b.relfilenode = pg_relation_filenode(c.oid)
    WHERE c.relname = '\''cache_demo'\'';
  "
'
```

---

### Senaryo F: `work_mem` Disk Spill vs In-Memory Quicksort

```bash
docker run --rm -it postgres:18-alpine sh -c '
  su postgres -c "initdb -D /tmp/pgdata >/dev/null && pg_ctl -D /tmp/pgdata start -w"
  psql -U postgres -c "
    CREATE TABLE sort_test AS SELECT g, md5(g::text) as val FROM generate_series(1, 100000) g;
    
    \echo '\''=== 1. DISK SPILL (work_mem = 1MB) ==='\''
    SET work_mem = '\''1MB'\'';
    EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM sort_test ORDER BY val;

    \echo '\''=== 2. IN-MEMORY QUICKSORT (work_mem = 32MB) ==='\''
    SET work_mem = '\''32MB'\'';
    EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM sort_test ORDER BY val;
  "
'
```

---

### Senaryo G: Lock Queue Starvation (FIFO Kilit Kuyruğu Çıkmazı)

```bash
docker run --rm -d --name pg-lab-lock -e POSTGRES_PASSWORD=labpass postgres:18-alpine
until docker exec pg-lab-lock pg_isready -U postgres >/dev/null 2>&1; do sleep 1; done
docker exec pg-lab-lock psql -U postgres -c "CREATE TABLE orders (id INT, item TEXT); INSERT INTO orders VALUES (1, 'Test');"

# 1. Oturum: Açık SELECT
docker exec -d pg-lab-lock psql -U postgres -c "BEGIN; SELECT * FROM orders; SELECT pg_sleep(15);"
sleep 1

# 2. Oturum: DDL (AccessExclusiveLock bekler)
docker exec -d pg-lab-lock psql -U postgres -c "ALTER TABLE orders ADD COLUMN price INT;"
sleep 1

# 3. Oturum: Yeni gelen masum SELECT (2 nin arkasında bloklanır!)
docker exec -d pg-lab-lock psql -U postgres -c "SELECT * FROM orders;"
sleep 1

# Kilit teşhisi:
docker exec pg-lab-lock psql -U postgres -c "
  SELECT pid, pg_blocking_pids(pid) AS blocked_by, wait_event_type, wait_event, state, left(query, 45) AS query
  FROM pg_stat_activity 
  WHERE query LIKE '%orders%' AND pid <> pg_backend_pid()
  ORDER BY pid;
"
docker rm -f -v pg-lab-lock 2>/dev/null || true
```

---

### Senaryo H: Crash Recovery & `pg_waldump` / REDO Replay

```bash
docker run -d --name pg-lab-crash -e POSTGRES_PASSWORD=labpass postgres:18-alpine
until docker exec pg-lab-crash pg_isready -U postgres >/dev/null 2>&1; do sleep 1; done
docker exec -i pg-lab-crash psql -U postgres -c "CREATE TABLE crash_test (id INT, msg TEXT); INSERT INTO crash_test VALUES (1, 'survive_crash');"

# WAL dökümü
docker exec pg-lab-crash sh -c '
  WAL_DIR="$PGDATA/pg_wal"
  WAL_FILE=$(ls -t "$WAL_DIR"/0000* | head -n 1)
  pg_waldump -p "$WAL_DIR" "$WAL_FILE" | grep -A 1 "INSERT" | tail -n 5
'

# Postmaster i aniden oldur ve yeniden baslat
docker kill -s 9 pg-lab-crash
sleep 1
docker start pg-lab-crash
sleep 3

# Kurtarma loglarını ve veri tutarlılığını kontrol et:
docker logs pg-lab-crash 2>&1 | grep -A 5 "automatic recovery in progress"
docker exec pg-lab-crash psql -U postgres -c "SELECT * FROM crash_test;"
docker rm -f -v pg-lab-crash 2>/dev/null || true
```

---

### Senaryo I: Table Bloat & `VACUUM` vs `VACUUM FULL`

```bash
docker run --rm -it postgres:18-alpine sh -c '
  su postgres -c "initdb -D /tmp/pgdata >/dev/null && pg_ctl -D /tmp/pgdata start -w"
  psql -U postgres -c "
    CREATE TABLE bloat_test (id INT, val TEXT) WITH (autovacuum_enabled = false);
    INSERT INTO bloat_test SELECT g, '\''initial_data_'\'' || g FROM generate_series(1, 10000) g;
    
    \echo '\''=== 1. Baslangic Boyutu ==='\''
    SELECT pg_size_pretty(pg_total_relation_size('\''bloat_test'\''));

    -- 50.000 dead tuple biriktir:
    UPDATE bloat_test SET val = '\''update_1_'\''; UPDATE bloat_test SET val = '\''update_2_'\'';
    UPDATE bloat_test SET val = '\''update_3_'\''; UPDATE bloat_test SET val = '\''update_4_'\'';
    UPDATE bloat_test SET val = '\''update_5_'\'';

    \echo '\''=== 2. Bloat Sonrasi Boyut ==='\''
    SELECT pg_size_pretty(pg_total_relation_size('\''bloat_test'\''));

    VACUUM bloat_test;
    \echo '\''=== 3. Standart VACUUM Sonrasi (Disk kuculmez) ==='\''
    SELECT pg_size_pretty(pg_total_relation_size('\''bloat_test'\''));

    VACUUM FULL bloat_test;
    \echo '\''=== 4. VACUUM FULL Sonrasi (Disk iade edilir) ==='\''
    SELECT pg_size_pretty(pg_total_relation_size('\''bloat_test'\''));
  "
'
```

---

## 4. Test Sonu Zorunlu Temizlik Protokolü

Her test seansı bittikten sonra aşağıdaki komut çalıştırılarak sistemde artık kalmadığı teyit edilmelidir:

```bash
# Çalışan veya durmuş geçici test konteynerlerini sil
docker rm -f $(docker ps -aq --filter "name=pg-lab-*" --filter "name=ts-bench*") 2>/dev/null || true

# Anonim geçici volume'leri temizle
docker volume prune -f

# Portların serbest kaldığını doğrula
docker ps
```
