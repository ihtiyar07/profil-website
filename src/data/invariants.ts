export interface Invariant {
  id: string;
  badge: string;
  title: { tr: string; en: string };
  rule: { tr: string; en: string };
  failureMode: { tr: string; en: string };
  solution: { tr: string; en: string };
  verification: { tr: string; en: string };
}

export const INVARIANTS: Invariant[] = [
  {
    id: "zero-lock-stats",
    badge: "01 · Veritabanı Mimarisi",
    title: {
      tr: "Zero-Lock Katalog İstatistikleri",
      en: "Zero-Lock Catalog Statistics"
    },
    rule: {
      tr: "Canlı multi-terabayt üretim veritabanlarında metadata ve şema çıkarma sırasında SELECT COUNT(*) ve tam tablo taraması (Seq Scan) kesinlikle çalıştırılamaz.",
      en: "Full table scans (Seq Scan) and SELECT COUNT(*) are strictly prohibited when extracting schema metadata and row statistics from multi-terabyte production databases."
    },
    failureMode: {
      tr: "Tablo boyutu yüz milyonlarca satıra ulaştığında tam tarama tüm disk bloklarını OS buffer cache'ine çeker, disk I/O kapasitesini tüketir ve canlı operasyonel işlemleri bekletir (lock starvation).",
      en: "On tables with hundreds of millions of rows, full scans thrash disk I/O, evict active buffer cache pages, and induce lock starvation on concurrent operational transactions."
    },
    solution: {
      tr: "Doğrudan yerel veritabanı katalog istatistikleri (PostgreSQL'de pg_class.reltuples, Oracle'da ALL_TABLES.NUM_ROWS, MSSQL'de sys.dm_db_partition_stats) asenkron okunur. Yaklaşık satır sayısı sıfır kilit ve <5ms içinde elde edilir.",
      en: "Native database catalog metadata (pg_class.reltuples in PostgreSQL, ALL_TABLES.NUM_ROWS in Oracle, sys.dm_db_partition_stats in MSSQL) is read asynchronously, obtaining approximate row cardinality in <5ms without table locking."
    },
    verification: {
      tr: "MetaDB projesinde multi-terabaytlık kurumsal Oracle, PostgreSQL ve MSSQL üretim sistemlerinde doğrulandı.",
      en: "Verified in production on multi-terabyte enterprise Oracle, PostgreSQL, and MSSQL instances within the MetaDB project."
    }
  },
  {
    id: "chunk-partitioning",
    badge: "02 · Depolama & Zaman Serisi",
    title: {
      tr: "Chunk Boyutlandırma ve Partition Pruning",
      en: "Chunk Sizing & Partition Pruning"
    },
    rule: {
      tr: "Zaman serisi ve analitik tablolarda chunk/bölüm boyutları RAM buffer cache'in %25'ini aşamaz; sorgular disk I/O yapmadan partition pruning ile hedeflenir.",
      en: "Time-series and analytical chunk partitions must never exceed 25% of the RAM buffer cache; queries must prune partitions directly without disk I/O."
    },
    failureMode: {
      tr: "Chunk boyutu sunucu RAM'inden büyük tutulduğunda, B-Tree indeksleri shared_buffers'tan diske taşar (thrashing); her ekleme ve sorgu rastgele disk I/O'suna çarparak yazma hızını ve sorgu performansını kilitler.",
      en: "When chunk partitions exceed server RAM, b-tree indexes spill from shared_buffers to disk, inducing severe I/O thrashing and collapsing write throughput and query responsiveness."
    },
    solution: {
      tr: "Chunk aralıkları verinin yazılma hacmi ve sunucunun shared_buffers kapasitesine göre matematiksel olarak boyutlandırılır (örn. 7 günlük aralıklar). Zaman filtresi içeren sorgularda Postgres sorgu planlayıcısı doğrudan ilgili chunk'a gider (partition pruning); eski veriler ise drop_chunks() ile sıfır I/O maliyetiyle metadata düzeyinde silinir.",
      en: "Chunk intervals are mathematically calibrated to ingest volume and shared_buffers capacity (e.g., 7-day windows). Time-filtered queries leverage planner partition pruning to touch only target chunks, while historical retention unlinks chunks at the metadata level via drop_chunks()."
    },
    verification: {
      tr: "TimescaleDB ve analitik veritabanlarında milyarlarca satırlık üretim yükü altında doğrulandı.",
      en: "Verified under production workloads across billions of time-series records on TimescaleDB and analytics clusters."
    }
  },
  {
    id: "idempotent-execution",
    badge: "03 · Dağıtık İşlemler & Kilit",
    title: {
      tr: "Idempotent İşlemler & Dağıtık Kilitler",
      en: "Idempotent Execution & Distributed Locks"
    },
    rule: {
      tr: "Ağ zaman aşımlarında istemcilerin veya veri hatlarının gönderdiği tekrar istekleri (retries) mükerrer işlem, çift kayıt veya tutarsız bakiye oluşturamaz.",
      en: "Network timeouts and client retry loops must never generate duplicate records, redundant ledger mutations, or inconsistent transactional state."
    },
    failureMode: {
      tr: "İstemci ağ gecikmesi nedeniyle yanıtı alamaz ve aynı işlemi yineler. Eğer arka uç atomik durum kontrolü yapmıyorsa ikinci kez bakiye düşülür veya aynı veri parçası mükerrer yazılır.",
      en: "When a client times out awaiting a response, it re-issues the transaction. Without atomic idempotency guards, downstream processors execute duplicate mutations."
    },
    solution: {
      tr: "İstek başlığındaki benzersiz Idempotency-Key değeri Redis'te atomik kilit (SET NX EX) ile tutulur; işlem tamamlandığında sonuç anahtara bağlanır. Tekrar eden istekler doğrudan ilk işlemin sonucunu döndürür.",
      en: "A unique Idempotency-Key is locked atomically in Redis (SET NX EX). Downstream execution results are cached to the key, ensuring repeated requests receive the cached result instantly."
    },
    verification: {
      tr: "Ulusal medya kuruluşu merkezi ödeme motoru ve dağıtık veri akış hatlarında doğrulandı.",
      en: "Verified in production on national media corporation payment engines and distributed ingestion pipelines."
    }
  },
  {
    id: "zfs-block-checksum",
    badge: "04 · Depolama & Dosya Sistemi",
    title: {
      tr: "ZFS Blok Checksum & Bit Rot Savunması",
      en: "ZFS Block Checksums & Bit Rot Defense"
    },
    rule: {
      tr: "Veritabanı sunucularında donanımsal sessiz disk bozulmalarına (bit rot) ve doğrulanmamış yedekleme anlık görüntülerine tolerans gösterilmez.",
      en: "Silent storage corruption (bit rot) and unverified backup snapshots on database hosts are strictly unacceptable."
    },
    failureMode: {
      tr: "Standart dosya sistemleri (ext4) disk sektöründeki sessiz manyetik bozulmaları fark etmez; bozuk blok veritabanı yedeğine de kopyalanır ve felaket anında veri kurtarılamaz.",
      en: "Standard filesystems (ext4) do not detect silent block corruption; corrupted bits propagate into backup archives, rendering disaster recovery impossible."
    },
    solution: {
      tr: "ZFS depolama havuzlarında haftalık zpool scrub ile blok düzeyinde checksum doğrulanır ve bozukluk eşlik diskinden kendiliğinden onarılır (self-healing). Proxmox Backup Server (PBS) ile blok seviyesinde tekilleştirilmiş artımlı anlık görüntüler alınır.",
      en: "Automated weekly ZFS zpool scrub jobs compute block-level checksums, self-healing corrupted data from parity disks. Proxmox Backup Server (PBS) generates deduplicated, verified incremental snapshots."
    },
    verification: {
      tr: "Kişisel Proxmox VE sunucuları ve homelab veritabanı altyapısında 3+ yıldır kesintisiz doğrulanmaktadır.",
      en: "Continuously verified across personal Proxmox VE bare-metal clusters and production homelab database hypervisors for 3+ years."
    }
  },
  {
    id: "instant-revocation",
    badge: "05 · Güvenlik & Oturum Mimarisi",
    title: {
      tr: "Anında Yetki İptali & O(1) Oturum Feshi",
      en: "Instant Privilege Revocation & O(1) Session Termination"
    },
    rule: {
      tr: "Kullanıcı yetkileri ve veritabanı erişim rolleri durumsuz JWT payload'una statik gömülerek uzun süreli yetkilendirme yapılamaz.",
      en: "User permissions and database access roles must never be embedded permanently into stateless JWT payloads without an instant revocation path."
    },
    failureMode: {
      tr: "Bir operatörün veya servisin rolü geri alındığında ya da kimlik bilgisi ele geçirildiğinde, elindeki JWT süresi (örn. 60 dakika) bitene kadar yetkili API uç noktalarına erişmeye devam eder.",
      en: "When an operator is revoked, their signed JWT remains valid until expiration (e.g. 60 min), enabling unauthorized commands against critical database instances."
    },
    solution: {
      tr: "JWT yalnızca sabit kimliği ve bir sürüm damgasını taşır; dinamik yetkiler Redis'te tutulur. Yetki değiştiği mikrosaniyede Redis sürüm anahtarı artırılır; sonraki <0.3ms içindeki istek 401 ile anında reddedilir. Kara liste tutulmadığı için O(1) karmaşıklık korunur.",
      en: "The JWT contains immutable identity and a version counter; mutable permissions reside in Redis. Bumping the user version takes <0.3ms, cutting off subsequent requests immediately in O(1) time without unbounded token blacklists."
    },
    verification: {
      tr: "Dağıtık mikroservisler ve veritabanı yönetim katmanlarında kurulan ortak Auth altyapısında doğrulandı.",
      en: "Verified on the shared Auth architecture unifying distributed microservices and database administration layers."
    }
  }
];
