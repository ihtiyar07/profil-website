export interface Invariant {
  id: string;
  badge: string;
  title: string;
  rule: string;
  failureMode: string;
  solution: string;
  verification: string;
}

export const INVARIANTS: Invariant[] = [
  {
    id: "zero-lock-stats",
    badge: "01 · Veritabanı Mimarisi",
    title: "Zero-Lock Katalog İstatistikleri",
    rule: "Canlı multi-terabayt üretim veritabanlarında metadata ve şema çıkarma sırasında SELECT COUNT(*) ve tam tablo taraması (Seq Scan) kesinlikle çalıştırılamaz.",
    failureMode: "Tablo boyutu yüz milyonlarca satıra ulaştığında tam tarama tüm disk bloklarını OS buffer cache'ine çeker, disk I/O kapasitesini tüketir ve canlı operasyonel işlemleri bekletir (lock starvation).",
    solution: "Doğrudan yerel veritabanı katalog istatistikleri (PostgreSQL'de pg_class.reltuples, Oracle'da ALL_TABLES.NUM_ROWS, MSSQL'de sys.dm_db_partition_stats) asenkron okunur. Yaklaşık satır sayısı sıfır kilit ve <5ms içinde elde edilir.",
    verification: "MetaDB projesinde multi-terabaytlık kurumsal Oracle, PostgreSQL ve MSSQL üretim sistemlerinde doğrulandı."
  },
  {
    id: "chunk-partitioning",
    badge: "02 · Depolama & Zaman Serisi",
    title: "Chunk Boyutlandırma ve Partition Pruning",
    rule: "Zaman serisi ve analitik tablolarda chunk/bölüm boyutları RAM buffer cache'in %25'ini aşamaz; sorgular disk I/O yapmadan partition pruning ile hedeflenir.",
    failureMode: "Chunk boyutu sunucu RAM'inden büyük tutulduğunda, B-Tree indeksleri shared_buffers'tan diske taşar (thrashing); her ekleme ve sorgu rastgele disk I/O'suna çarparak yazma hızını ve sorgu performansını kilitler.",
    solution: "Chunk aralıkları verinin yazılma hacmi ve sunucunun shared_buffers kapasitesine göre matematiksel olarak boyutlandırılır (örn. 7 günlük aralıklar). Zaman filtresi içeren sorgularda Postgres sorgu planlayıcısı doğrudan ilgili chunk'a gider (partition pruning); eski veriler ise drop_chunks() ile sıfır I/O maliyetiyle metadata düzeyinde silinir.",
    verification: "TimescaleDB ve analitik veritabanlarında milyarlarca satırlık üretim yükü altında doğrulandı."
  },
  {
    id: "idempotent-execution",
    badge: "03 · Dağıtık İşlemler & Kilit",
    title: "Idempotent İşlemler & Dağıtık Kilitler",
    rule: "Ağ zaman aşımlarında istemcilerin veya veri hatlarının gönderdiği tekrar istekleri (retries) mükerrer işlem, çift kayıt veya tutarsız bakiye oluşturamaz.",
    failureMode: "İstemci ağ gecikmesi nedeniyle yanıtı alamaz ve aynı işlemi yineler. Eğer arka uç atomik durum kontrolü yapmıyorsa ikinci kez bakiye düşülür veya aynı veri parçası mükerrer yazılır.",
    solution: "İstek başlığındaki benzersiz Idempotency-Key değeri Redis'te atomik kilit (SET NX EX) ile tutulur; işlem tamamlandığında sonuç anahtara bağlanır. Tekrar eden istekler doğrudan ilk işlemin sonucunu döndürür.",
    verification: "Ulusal medya kuruluşu merkezi ödeme motoru ve dağıtık veri akış hatlarında doğrulandı."
  },
  {
    id: "zfs-block-checksum",
    badge: "04 · Depolama & Dosya Sistemi",
    title: "ZFS Blok Checksum & Bit Rot Savunması",
    rule: "Veritabanı sunucularında donanımsal sessiz disk bozulmalarına (bit rot) ve doğrulanmamış yedekleme anlık görüntülerine tolerans gösterilmez.",
    failureMode: "Standart dosya sistemleri (ext4) disk sektöründeki sessiz manyetik bozulmaları fark etmez; bozuk blok veritabanı yedeğine de kopyalanır ve felaket anında veri kurtarılamaz.",
    solution: "ZFS depolama havuzlarında haftalık zpool scrub ile blok düzeyinde checksum doğrulanır ve bozukluk eşlik diskinden kendiliğinden onarılır (self-healing). Proxmox Backup Server (PBS) ile blok seviyesinde tekilleştirilmiş artımlı anlık görüntüler alınır.",
    verification: "Kişisel Proxmox VE sunucuları ve homelab veritabanı altyapısında 3+ yıldır kesintisiz doğrulanmaktadır."
  },
  {
    id: "instant-revocation",
    badge: "05 · Güvenlik & Oturum Mimarisi",
    title: "Anında Yetki İptali & O(1) Oturum Feshi",
    rule: "Kullanıcı yetkileri ve veritabanı erişim rolleri durumsuz JWT payload'una statik gömülerek uzun süreli yetkilendirme yapılamaz.",
    failureMode: "Bir operatörün veya servisin rolü geri alındığında ya da kimlik bilgisi ele geçirildiğinde, elindeki JWT süresi (örn. 60 dakika) bitene kadar yetkili API uç noktalarına erişmeye devam eder.",
    solution: "JWT yalnızca sabit kimliği ve bir sürüm damgasını taşır; dinamik yetkiler Redis'te tutulur. Yetki değiştiği mikrosaniyede Redis sürüm anahtarı artırılır; sonraki <0.3ms içindeki istek 401 ile anında reddedilir. Kara liste tutulmadığı için O(1) karmaşıklık korunur.",
    verification: "Dağıtık mikroservisler ve veritabanı yönetim katmanlarında kurulan ortak Auth altyapısında doğrulandı."
  }
];
