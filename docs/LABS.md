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
