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
    badge: "01",
    title: "Katalog İstatistikleri ve Okuma Güvenliği",
    rule: "Canlı veritabanlarında metadata ve şema çıkarma sırasında tam tablo taraması (SELECT COUNT) çalıştırılmaz.",
    failureMode: "Yüksek hacimli tablolarda tam tarama disk I/O kapasitesini tüketir ve canlı operasyonel işlemleri bekletir.",
    solution: "Yerel veritabanı katalog istatistikleri (pg_class, ALL_TABLES) asenkron okunarak yaklaşık satır sayısı ve şema bilgisi kilitlenme olmadan elde edilir.",
    verification: "MetaDB ile Oracle, PostgreSQL ve MSSQL üretim ortamlarında doğrulandı."
  },
  {
    id: "chunk-partitioning",
    badge: "02",
    title: "Zaman Serisi Chunk Boyutlandırma",
    rule: "Zaman serisi tablolarında chunk aralıkları bellek kapasitesine göre ayarlanır; indekslerin RAM'de kalması sağlanır.",
    failureMode: "Chunk boyutu bellekten büyük olduğunda indeksler diske taşar; ekleme ve sorgu performansı ciddi şekilde düşer.",
    solution: "Chunk boyutları yazma hacmi ve shared_buffers oranına göre belirlenir. Sorgularda doğrudan ilgili bölüme gidilir (partition pruning); eski veriler dosya sistemi düzeyinde düşürülür.",
    verification: "TimescaleDB ve analitik veritabanı altyapılarında doğrulandı."
  },
  {
    id: "idempotent-execution",
    badge: "03",
    title: "Idempotent İşlemler ve Dağıtık Kilitler",
    rule: "Ağ gecikmelerinde yinelenen isteklerin veritabanında mükerrer kayıt veya tutarsız durum oluşturması engellenir.",
    failureMode: "Yanıtı alamayan istemci isteği tekrarladığında, arka uç atomik kontrol yapmıyorsa işlem iki kez işlenir.",
    solution: "Her işlem tekil bir anahtarla (Idempotency-Key) dağıtık kilit üzerinden yürütülür; tekrarlanan istekler doğrudan ilk işlemin sonucunu alır.",
    verification: "Ödeme motoru ve dağıtık veri akış hatlarında doğrulandı."
  },
  {
    id: "zfs-block-checksum",
    badge: "04",
    title: "Blok Düzeyinde Veri Bütünlüğü",
    rule: "Sessiz disk bozulmalarına (bit rot) ve doğrulanmamış yedeklere karşı önlem alınır.",
    failureMode: "Standart dosya sistemleri sektör düzeyindeki sessiz bozulmaları fark etmez; bozuk blok yedeğe de yansır.",
    solution: "ZFS depolama havuzlarında düzenli scrub ile blok düzeyinde checksum doğrulanır; anlık görüntüler blok seviyesinde yedeklenir.",
    verification: "Proxmox VE ve ZFS depolama havuzlarında kesintisiz doğrulandı."
  },
  {
    id: "instant-revocation",
    badge: "05",
    title: "Merkezi Yetki Doğrulama",
    rule: "Dinamik yetkiler statik belirteçlere (JWT) gömülmek yerine merkezi bellek katmanında doğrulanır.",
    failureMode: "Yetkisi iptal edilen bir hesap, belirteç süresi dolana kadar yetkili uç noktalara erişmeye devam eder.",
    solution: "Belirteçler yalnızca kimlik bilgisini taşır; yetki ve oturum durumları merkezi bellek katmanında doğrulanarak anında feshedilebilir.",
    verification: "Mikroservis mimarilerinde ortak kimlik doğrulama katmanında doğrulandı."
  }
];

