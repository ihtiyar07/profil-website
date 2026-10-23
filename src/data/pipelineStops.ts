export interface PipelineStop {
  id: string;
  order: string;
  name: { tr: string; en: string };
  badge: { tr: string; en: string };
  tech: string[];
  whatIDid: { tr: string; en: string };
  whyDecision: { tr: string; en: string };
  alternativeEliminated: { tr: string; en: string };
  challenge: { tr: string; en: string };
  caseLink: { text: { tr: string; en: string }; href: string };
}

export const PIPELINE_STOPS: PipelineStop[] = [
  {
    id: "device",
    order: "01",
    name: {
      tr: "Cihaz & Saha Sensörü",
      en: "Edge Device & Sensors"
    },
    badge: {
      tr: "Donanım Seviyesi",
      en: "Hardware Edge"
    },
    tech: ["ESP32", "Modbus RTU (RS-485)", "Modbus TCP", "FreeRTOS", "GPIO / UART"],
    whatIDid: {
      tr: "Endüstriyel soğutma santralleri, chiller panoları ve hassas sensörlerden Modbus holding register okumalarını yöneten FreeRTOS firmware geliştirdim. Ağ kesintilerinde veriyi dahili flaş ring-buffer'da saklayacak şekilde yapılandırdım.",
      en: "Developed FreeRTOS firmware polling Modbus holding registers from industrial chillers and environmental sensors, with a circular flash ring-buffer for offline durability."
    },
    whyDecision: {
      tr: "Dinamik heap tahsisini (malloc) en aza indirip statik bellek yapıları kullandım; böylece bellek fragmentasyonunu sıfırlayarak sahadaki cihazların aylarca yeniden başlamadan çalışmasını sağladım.",
      en: "Enforced static memory allocations over dynamic malloc to eliminate heap fragmentation, ensuring devices operate for months without watchdog resets."
    },
    alternativeEliminated: {
      tr: "Raspberry Pi ve gömülü Linux elendi; yüksek sıcaklıkta donma, anlık elektrik kesilmelerinde SD kart bozulması ve 3W+ enerji tüketimi sahada kabul edilemezdi.",
      en: "Eliminated Raspberry Pi and embedded Linux due to SD card corruptions during power drops, thermal throttling at 70°C, and high idle power draw."
    },
    challenge: {
      tr: "Endüstriyel kompresörlerin devreye girmesi sırasında RS-485 hattında oluşan elektriksel gürültü ve CRC bozulmaları; donanımsal optik izolasyon ve sliding-window hata düzeltme ile aşıldı.",
      en: "Electromagnetic interference (EMI) from heavy industrial compressors inducing RS-485 CRC corruptions; solved via optical isolation and sliding-window retries."
    },
    caseLink: {
      text: { tr: "Dosya 01: Plasmon Vaka Çalışması →", en: "Case 01: Plasmon Case Study →" },
      href: "#case-plasmon"
    }
  },
  {
    id: "transport",
    order: "02",
    name: {
      tr: "Aktarım & Haberleşme",
      en: "Transport & Network"
    },
    badge: {
      tr: "Ağ Katmanı",
      en: "Network Transit"
    },
    tech: ["GSM 4G LTE", "Wi-Fi", "MQTT over TLS", "OTA Firmware Update", "AT Komutları"],
    whatIDid: {
      tr: "Saha cihazları ile bulut arasında çift kanallı haberleşme hattı kurdum. Wi-Fi birincil kanal, hücresel 4G LTE hattı otomatik yedekleme (failover) olarak çalışır. Uzaktan OTA ve parametre güncellemeleri yönetilir.",
      en: "Engineered dual-channel edge-to-cloud connectivity using Wi-Fi as primary and GSM 4G LTE as automatic failover, supporting secure remote OTA and RPC parameters."
    },
    whyDecision: {
      tr: "HTTP yoklamaları yerine kalıcı TLS şifreli MQTT (QoS 1) soketi seçtim; her istekte el sıkışma maliyetini önleyerek hücresel SIM kotasını %85 korudum ve Last Will ile anlık kopmaları yakaladım.",
      en: "Chose persistent MQTT over TLS (QoS 1) over HTTP polling to eliminate per-request handshakes, saving 85% cellular quota while gaining instant Last Will & Testament offline alerts."
    },
    alternativeEliminated: {
      tr: "Standart HTTP POST REST çağrıları elendi; zayıf hücresel çekim gücünde TCP/TLS el sıkışması zaman aşımlarına ve yüksek pil/veri tüketimine yol açıyordu.",
      en: "Eliminated HTTP POST calls; repetitive TCP/TLS handshakes caused frequent timeouts and massive data waste on unstable cellular connections."
    },
    challenge: {
      tr: "Kırsal baz istasyonu geçişlerinde hücresel modemin AT komut döngüsünde asılı kalması; donanımsal transistör anahtarlaması ile bağımsız modem güç kesme/yeniden başlatma devresi kurularak çözüldü.",
      en: "Cellular modems hanging in AT command states during rural tower handoffs; solved by engineering a hardware transistor power-cycle circuit controlled by GPIO."
    },
    caseLink: {
      text: { tr: "Dosya 01: Plasmon Vaka Çalışması →", en: "Case 01: Plasmon Case Study →" },
      href: "#case-plasmon"
    }
  },
  {
    id: "queue",
    order: "03",
    name: {
      tr: "Kuyruk & Dengeleme",
      en: "Queue & Buffering"
    },
    badge: {
      tr: "Mesajlaşma",
      en: "Ingestion Mesh"
    },
    tech: ["RabbitMQ", "AMQP", "Dead Letter Exchange (DLX)", "Consistent Hash", "RPC Worker Pool"],
    whatIDid: {
      tr: "Yüz binlerce cihazdan gelen eşzamanlı telemetri akışını karşılayan, anlık yük patlamalarını emen ve arka uç işleyicilerine dağıtan RabbitMQ kümesi kurdum.",
      en: "Configured a RabbitMQ cluster ingesting concurrent telemetry bursts across high-density device fleets, buffering incoming load and dispatching to worker queues."
    },
    whyDecision: {
      tr: "Doğrudan veritabanı yazımı yerine araya RabbitMQ koydum; veritabanı bakım, restart veya yoğun yük anlarında telemetri kaybını önledi ve arka uç yazma hızını diskin I/O hızına göre regüle etti.",
      en: "Decoupled ingestion from storage via RabbitMQ; smoothed database write spikes during peak hours and guaranteed zero data drop during database restarts."
    },
    alternativeEliminated: {
      tr: "Apache Kafka ertelendi; cihaz bazlı komut-yanıt (RPC) desenleri, karmaşık routing key filtreleri ve küçük ayak izli operasyon ihtiyacı nedeniyle bu ölçekte RabbitMQ çok daha çevik ve verimliydi.",
      en: "Deferred Apache Kafka; per-device RPC request-reply patterns, lightweight resource footprint, and topic routing flexibility made RabbitMQ superior for this fleet."
    },
    challenge: {
      tr: "Bozuk veya uyumsuz sensör paketlerinin tüketici (consumer) thread'lerini kilitlemesi; Dead Letter Exchange (DLX) ve kademeli exponential-backoff kuyrukları ile zehirli mesajlar (poison pills) izole edildi.",
      en: "Corrupted frames stalling consumer workers; resolved by routing unparseable payloads into isolated Dead Letter Exchanges (DLX) with exponential retry policies."
    },
    caseLink: {
      text: { tr: "Dosya 01: Plasmon Vaka Çalışması →", en: "Case 01: Plasmon Case Study →" },
      href: "#case-plasmon"
    }
  },
  {
    id: "storage",
    order: "04",
    name: {
      tr: "Depolama & Zaman Serisi",
      en: "Storage & Time-Series"
    },
    badge: {
      tr: "Kalıcılık Katmanı",
      en: "Persistence Layer"
    },
    tech: ["PostgreSQL", "TimescaleDB Hypertables", "Continuous Aggregates", "Columnar Compression"],
    whatIDid: {
      tr: "Milyarlarca sensör okumasını zaman dilimli (chunked) hypertables üzerinde depolayan TimescaleDB mimarisini kurdum. Otomatik sıkıştırma ve continuous aggregates özet tabloları uyguladım.",
      en: "Architected a TimescaleDB persistence layer chunking billions of sensor readings across hypertables, paired with automated continuous aggregates and columnar compression."
    },
    whyDecision: {
      tr: "NoSQL doküman veritabanı yerine ilişkisel PostgreSQL + TimescaleDB seçtim; cihaz metaverileri, müşteri hiyerarşisi ve sensör okumalarını tek bir ACID işlem sınırında, güçlü SQL analitiğiyle birleştirdim.",
      en: "Selected relational PostgreSQL + TimescaleDB over NoSQL; unified customer hierarchies, device topology, and high-frequency time-series within a single ACID SQL engine."
    },
    alternativeEliminated: {
      tr: "MongoDB ve InfluxDB elendi; kurumsal raporlama için gerekli olan karmaşık SQL join kabiliyetleri ve ACID garantisi eksikliği nedeniyle elendi.",
      en: "Eliminated MongoDB and InfluxDB; lacking native relational JOIN performance and strict transaction boundaries required for enterprise audit reports."
    },
    challenge: {
      tr: "Eski hypertable verileri üzerinde disk tüketiminin yüzlerce gigabayta fırlaması; 7 günden eski chunk'ları sütunsal sıkıştırmaya (columnar compression) alarak disk kullanımını %90 düşürdüm.",
      en: "Uncompressed disk growth exploding across historical hypertables; resolved by applying TimescaleDB columnar compression on chunks older than 7 days, cutting disk size by 90%."
    },
    caseLink: {
      text: { tr: "Dosya 02: Sapmapayı Vaka Çalışması →", en: "Case 02: Sapmapayı Case Study →" },
      href: "#case-sapmapayi"
    }
  },
  {
    id: "delivery",
    order: "05",
    name: {
      tr: "Teslimat & Sıfır Kopyalama",
      en: "Delivery & Zero-Copy"
    },
    badge: {
      tr: "Veri Çıkışı",
      en: "Egress & Analytics"
    },
    tech: ["Apache Arrow (IPC)", "WebSocket", "Protobuf", "Streaming API", "Canvas / WebGL"],
    whatIDid: {
      tr: "Veritabanından çekilen 250.000+ satırlık telemetriyi JSON yerine Apache Arrow ikili akışı (IPC stream) ile ön yüze ve analitik motoruna aktardım. Canlı uyarıları WebSocket kanalıyla yayınladım.",
      en: "Streamed 250,000+ telemetry rows directly to browser frontends via Apache Arrow binary IPC streams instead of JSON, broadcasting real-time sensor events over WebSockets."
    },
    whyDecision: {
      tr: "Tarayıcı JavaScript motorundaki string parsing yükünü ortadan kaldırmak için Apache Arrow seçtim; gelen veri doğrudan Float64Array belleğine eşlenir, ana iş parçacığı donmaz.",
      en: "Eliminated browser JavaScript string parsing overhead with Apache Arrow IPC; binary streams map directly into Float64Array memory buffers without thread-locking serialization."
    },
    alternativeEliminated: {
      tr: "Geleneksel JSON REST payload'ları elendi; 100K satırlık veri JSON ile 25MB tutup tarayıcıyı 800ms kilitlerken, Arrow ile <3MB ve <15ms içinde işlendi.",
      en: "Eliminated JSON REST endpoints; a 100K-row dataset dropped from 25MB JSON (800ms browser freeze) down to <3MB binary Arrow with sub-15ms parsing."
    },
    challenge: {
      tr: "Tarayıcı grafik kütüphanelerinin Arrow columnar belleğini doğrudan render edememesi; TypedArray bloklarını GPU buffer'ına doğrudan eşleyen özel bir Canvas köprüsü yazılarak aşıldı.",
      en: "Standard charting packages failing to ingest columnar buffers; engineered a lightweight bridge mapping Arrow TypedArrays straight into Canvas/WebGL render passes."
    },
    caseLink: {
      text: { tr: "Dosya 02: Sapmapayı Vaka Çalışması →", en: "Case 02: Sapmapayı Case Study →" },
      href: "#case-sapmapayi"
    }
  },
  {
    id: "security",
    order: "06",
    name: {
      tr: "Güven, İmza & Denetim",
      en: "Trust, Sign & Audit"
    },
    badge: {
      tr: "Doğrulama & Mühür",
      en: "Security & Signing"
    },
    tech: ["Redis RBAC", "Keycloak SSO", "X.509 e-İmza", "RFC 3161 Zaman Damgası", "TÜBİTAK Kamu SM"],
    whatIDid: {
      tr: "Mikroservisler arasında yetkileri JWT içine gömmek yerine Redis tabanlı anında iptal edilebilir (instant revocation) model kurdum. Üretilen soğuk zincir raporlarını X.509 e-imza ve RFC 3161 zaman damgasıyla mühürledim.",
      en: "Architected a Redis-backed permission registry enabling instant revocation across microservices, sealing compliance PDF reports with certified X.509 signatures and RFC 3161 timestamps."
    },
    whyDecision: {
      tr: "Durumsuz JWT'nin 'iptal edilememe' güvenlik açığını kapattım; operatörün yetkisi alındığında token süresini beklemeden, <1 milisaniyede tüm servislerde oturumunun kesilmesini sağladım.",
      en: "Neutralized the security hole of stateless JWT expiration; when an operator is suspended, permissions revoke in <1ms without awaiting token TTL expiration."
    },
    alternativeEliminated: {
      tr: "Token karalama listesi (blacklist) tutmak elendi; milyonlarca hash saklamak yerine kullanıcı başına tekil bir integer 'yetki versiyonu' (versioned claims) ile tüm eski token'lar tek işlemle geçersiz kılındı.",
      en: "Eliminated token blacklists; replaced unbounded ID caches with a single incrementing user version integer that atomically invalidates all prior tokens."
    },
    challenge: {
      tr: "Resmi HSM donanım modüllerinin senkron isteklerde 500ms gecikme üretmesi; toplu PDF imzalama işlemleri için izole bir PKCS#11 asenkron worker havuzu kurularak ana API rahatlatıldı.",
      en: "Cryptographic hardware security modules (HSMs) causing 500ms blocking latency; designed an asynchronous PKCS#11 worker pool handling background batch notarization."
    },
    caseLink: {
      text: { tr: "Dosya 03: Ortak Auth Servisi Vaka Çalışması →", en: "Case 03: Common Auth Service →" },
      href: "#case-auth"
    }
  }
];

export const INFRASTRUCTURE_STRIP = [
  { name: "Proxmox VE 8", desc: "KVM & LXC Sanallaştırma" },
  { name: "ZFS RAID-Z", desc: "Scrub & Blok Bütünlüğü" },
  { name: "PBS", desc: "Tekilleştirilmiş Artımlı Yedek" },
  { name: "Docker", desc: "İzole Servis Dağıtımı" },
  { name: "Nginx / Caddy", desc: "Statik & TLS Ters Vekil" },
  { name: "Prometheus / Grafana", desc: "Altyapı Metrikleri" },
  { name: "Oracle Database", desc: "AWR / ASH Analitiği" }
];
