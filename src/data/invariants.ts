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
    badge: "01 · Veritabanı",
    title: {
      tr: "Zero-Lock Katalog İstatistikleri",
      en: "Zero-Lock Catalog Statistics"
    },
    rule: {
      tr: "Canlı multi-terabayt üretim veritabanlarında metadata çıkarma sırasında SELECT COUNT(*) ve tam tablo taraması (Seq Scan) çalıştırılmaz.",
      en: "Full table scans (Seq Scan) and SELECT COUNT(*) are strictly prohibited when extracting metadata from multi-terabyte production databases."
    },
    failureMode: {
      tr: "Tablo boyutu yüz milyonlarca satıra ulaştığında tam tarama tüm disk bloklarını OS buffer cache'ine çeker, disk I/O kapasitesini tüketir ve canlı operasyonel işlemleri bekletir (lock starvation).",
      en: "On tables with hundreds of millions of rows, full scans thrash disk I/O, evict active buffer cache pages, and induce lock starvation on concurrent transactions."
    },
    solution: {
      tr: "Doğrudan yerel veritabanı katalog istatistikleri (PostgreSQL'de pg_class.reltuples, Oracle'da ALL_TABLES.NUM_ROWS) asenkron okunur. Yaklaşık satır sayısı sıfır kilit ve <5ms içinde elde edilir.",
      en: "Native database catalog metadata (pg_class.reltuples in PostgreSQL, ALL_TABLES.NUM_ROWS in Oracle) is read asynchronously, obtaining approximate row cardinality in <5ms without table locking."
    },
    verification: {
      tr: "MetaDB projesinde multi-terabaytlık kurumsal Oracle ve PostgreSQL üretim sistemlerinde doğrulandı.",
      en: "Verified in production on multi-terabyte enterprise Oracle and PostgreSQL instances within the MetaDB project."
    }
  },
  {
    id: "edge-ring-buffer",
    badge: "02 · Donanım & Edge",
    title: {
      tr: "Edge Flash Ring-Buffer",
      en: "Edge Flash Ring-Buffer"
    },
    rule: {
      tr: "Ağ kesintisinde telemetri verisi kısıtlı mikrodenetleyici RAM'inde tutulmaz; yerel dairesel flaş belleğe yazılır.",
      en: "Telemetry frames are never retained in volatile MCU RAM during cellular dropouts; they are written to a local circular flash buffer."
    },
    failureMode: {
      tr: "ESP32'nin serbest heap alanı (~320KB) birkaç dakikalık veri yığınında tükenir, malloc NULL döner ve cihaz panikleyip yeniden başlar (heap crash & veri kaybı).",
      en: "The ESP32 free heap (~320KB) exhausts after minutes of buffering, triggering malloc failures, watchdog resets, and unrecoverable frame loss."
    },
    solution: {
      tr: "Dahili flaşta SPIFFS/LittleFS üzerinde sabit boyutlu dairesel (circular) ring-buffer tutulur. Ağ kesintisinde ~320KB ring-buffer yaklaşık ~48 saatlik kesintisiz telemetri kaydı tutar; dolunca FIFO mantığıyla en eski kayıt üzerine yazılır. Bağlantı geldiğinde paketler sırayla boşaltılır.",
      en: "A fixed-size circular ring-buffer is maintained on SPIFFS/LittleFS flash. During outages, the ~320KB ring-buffer retains approximately ~48 hours of continuous telemetry frames; upon capacity, oldest records are overwritten (FIFO). Frames drain sequentially on reconnect."
    },
    verification: {
      tr: "Plasmon telemetri ağ geçitlerinde ve endüstriyel soğutma panolarındaki 4G/GSM hücresel failover testlerinde doğrulandı.",
      en: "Verified on Plasmon IoT gateways and industrial refrigeration controllers during 4G/GSM cellular failover simulations."
    }
  },
  {
    id: "idempotent-payments",
    badge: "03 · Dağıtık Arka Uç",
    title: {
      tr: "Idempotent İşlem ve Dağıtık Kilit",
      en: "Idempotent Execution & Distributed Lock"
    },
    rule: {
      tr: "Ağ zaman aşımlarında istemcilerin veya gateway'lerin gönderdiği tekrar istekleri (retries) mükerrer işlem veya çift tahsilat oluşturamaz.",
      en: "Network timeouts and client retry loops must never generate duplicate ledger entries or double billing."
    },
    failureMode: {
      tr: "İstemci ağ gecikmesi nedeniyle yanıtı alamaz ve aynı ödeme isteğini yineler. Eğer arka uç atomik durum kontrolü yapmıyorsa ikinci kez bakiye düşülür.",
      en: "When a client times out awaiting a response, it re-issues the transaction. Without atomic idempotency guards, downstream payment processors charge twice."
    },
    solution: {
      tr: "İstek başlığındaki benzersiz Idempotency-Key değeri Redis'te atomik kilit (SET NX EX) ile tutulur; işlem tamamlandığında sonuç anahtara bağlanır. Tekrar eden istekler doğrudan ilk işlemin sonucunu döndürür.",
      en: "A unique Idempotency-Key is locked atomically in Redis (SET NX EX). Downstream execution results are cached to the key, ensuring repeated requests receive the cached result instantly."
    },
    verification: {
      tr: "Ulusal medya kuruluşu merkezi ödeme mikroservisi ve Plasmon telemetri ingest hattında doğrulandı.",
      en: "Verified in production on the national media corporation payment microservice and Plasmon telemetry ingestion pipelines."
    }
  },
  {
    id: "zfs-scrub-pbs",
    badge: "04 · Altyapı & Depolama",
    title: {
      tr: "ZFS Scrub ve PBS Tekilleştirme",
      en: "ZFS Scrub & PBS Deduplication"
    },
    rule: {
      tr: "Fiziksel sunucularda donanımsal sessiz disk bozulmalarına (bit rot) ve yedekleme bütünlüğü riskine tolerans gösterilmez.",
      en: "Silent storage corruption (bit rot) and unverified backup snapshots on physical hosts are strictly prevented."
    },
    failureMode: {
      tr: "Standart dosya sistemleri (ext4) disk sektöründeki sessiz manyetik bozulmaları fark etmez; bozuk blok yedek arşivine de kopyalanır ve felaket anında veri kurtarılamaz.",
      en: "Standard filesystems (ext4) do not detect silent block corruption; corrupted bits propagate into backup archives, rendering disaster recovery impossible."
    },
    solution: {
      tr: "ZFS RAID-Z havuzlarında haftalık zpool scrub ile blok düzeyinde checksum doğrulanır ve bozukluk eşlik diskinden onarılır. Proxmox Backup Server (PBS) ile blok seviyesinde tekilleştirilmiş artımlı anlık görüntüler alınır.",
      en: "Automated weekly ZFS zpool scrub jobs compute block-level checksums, self-healing corrupted data from mirror/parity disks. Proxmox Backup Server (PBS) generates deduplicated, verified incremental snapshots."
    },
    verification: {
      tr: "Kendi Proxmox VE sunucularım ve homelab hipervizör kümesinde 3+ yıldır kesintisiz doğrulanmaktadır.",
      en: "Continuously verified across personal Proxmox VE bare-metal clusters and production homelab hypervisors for 3+ years."
    }
  },
  {
    id: "instant-token-revocation",
    badge: "05 · Güvenlik & Yetki",
    title: {
      tr: "Anında Oturum ve Yetki İptali",
      en: "Instant Session & Privilege Revocation"
    },
    rule: {
      tr: "Kullanıcı yetkileri durumsuz JWT payload'una gömülerek uzun süreli yetkilendirme yapılamaz.",
      en: "User permissions must never be embedded permanently into stateless JWT payloads without an instant revocation path."
    },
    failureMode: {
      tr: "Bir saha operatörünün rolü geri alındığında ya da cihazı ele geçirildiğinde, elindeki JWT süresi (örn. 60 dakika) bitene kadar yetkili API uç noktalarına erişmeye devam eder.",
      en: "When an operator is revoked, their signed JWT remains valid until expiration (e.g. 60 min), enabling unauthorized commands against critical machinery."
    },
    solution: {
      tr: "JWT yalnızca sabit kimliği ve bir sürüm damgasını taşır; operasyonel roller Redis'te tutulur. Yetki değiştiği mikrosaniyede Redis anahtarı güncellenir; sonraki <0.3ms içindeki istek 401 ile kesilir.",
      en: "The JWT contains immutable identity and a version counter; mutable permissions reside in Redis. Bumping the user version takes <0.3ms, cutting off subsequent requests immediately."
    },
    verification: {
      tr: "Plasmon, Sapmapayı ve Diventra WMS mikroservisleri için kurulan ortak Auth servisinde doğrulandı.",
      en: "Verified on the shared Auth microservice unifying Plasmon, Sapmapayı, and Diventra WMS platforms."
    }
  }
];
