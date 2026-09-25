export type Language = 'tr' | 'en';
export type Persona = 'all' | 'backend' | 'iot' | 'devops' | 'data' | 'iam';

export interface Project {
  id: string;
  personas: Persona[];
  featured: boolean;
  metrics: { label: { tr: string; en: string }; value: string }[];
  title: { tr: string; en: string };
  category: { tr: string; en: string };
  summary: { tr: string; en: string };
  description: { tr: string; en: string };
  architecture: { tr: string; en: string };
  tags: string[];
  links?: { label: string; url: string }[];
}

export interface SkillGroup {
  id: string;
  name: { tr: string; en: string };
  iconName: string;
  items: {
    name: string;
    level: number; // 1-100
    highlight?: boolean;
    experience: string;
    detail: { tr: string; en: string };
  }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Ahmet İhtiyar",
    role: {
      tr: "Kıdemli Sistem & Arka Uç Mühendisi | IoT & Dağıtık Mimari",
      en: "Senior Systems & Backend Engineer | IoT & Distributed Architecture"
    },
    bio: {
      tr: "Donanım seviyesinden (ESP32, Modbus RTU/TCP, 4G GSM) bulut ölçeğindeki dağıtık mikroservislere (Java Spring Boot, C# .NET), kurumsal veri soykütüğüne (MetaDB, Memgraph Graph DB, PostgreSQL) ve altyapı yönetimine (Proxmox VE, Fedora Linux, Docker) kadar uzanan uçtan uca sistem mühendisi.",
      en: "Full-spectrum systems engineer spanning hardware edge (ESP32, Modbus RTU/TCP, 4G GSM) to cloud-scale distributed microservices (Java Spring Boot, C# .NET), enterprise data lineage (MetaDB, Memgraph Graph DB, PostgreSQL), and infrastructure management (Proxmox VE, Fedora Linux, Docker)."
    },
    location: "Türkiye (Open to Global Remote / Hybrid)",
    email: "ahmetihtiyar1453@gmail.com",
    github: "https://github.com/ihtiyar07",
    statusBadge: {
      tr: "Aktif: Yeni Projeler & Mimari Danışmanlık İçin Açık",
      en: "Active: Open for Systems & Architecture Projects"
    }
  },

  personas: [
    { id: 'all', label: { tr: 'Tüm Çözümler', en: 'All Solutions' }, icon: 'Layers' },
    { id: 'backend', label: { tr: 'Backend & Dağıtık Mimari', en: 'Backend & Microservices' }, icon: 'Server' },
    { id: 'iot', label: { tr: 'IoT & Endüstriyel Donanım', en: 'IoT & Hardware Edge' }, icon: 'Cpu' },
    { id: 'devops', label: { tr: 'DevOps & Proxmox Altyapı', en: 'DevOps & Infrastructure' }, icon: 'HardDrive' },
    { id: 'data', label: { tr: 'Veri Soykütüğü & MetaDB', en: 'Data Lineage & MetaDB' }, icon: 'Database' },
    { id: 'iam', label: { tr: 'Kimlik & Güvenlik (IAM)', en: 'IAM & Security' }, icon: 'ShieldCheck' }
  ],

  projects: [
    {
      id: 'metadb',
      personas: ['all', 'data', 'backend'],
      featured: true,
      category: {
        tr: 'Büyük Veri, Dağıtık Sistemler & Soykütüğü (Lineage)',
        en: 'Big Data, Distributed Systems & Data Lineage'
      },
      title: {
        tr: 'MetaDB — Kurumsal Çok Kiracılı Veri Kataloğu & Soykütüğü Platformu',
        en: 'MetaDB — Enterprise Multi-Tenant Metadata & Data Lineage Platform'
      },
      summary: {
        tr: 'Oracle, PostgreSQL, MSSQL ve ODI kaynaklarından toplanan kurumsal meta verileri kanonik GLB şemasına dönüştüren, Memgraph ile soykütüğü çizen mikroservis platformu.',
        en: 'Microservice platform ingesting enterprise metadata from Oracle, Postgres, MSSQL & ODI into canonical GLB schema and rendering lineage graphs via Memgraph.'
      },
      description: {
        tr: 'MetaDB, terabaytlarca veriye sahip üretim veri tabanlarında sıfır yük garantisi (Zero-Impact Guardrail) ile çalışacak şekilde tasarlandı. Canlı sistemlerde locking veya disk maliyeti oluşturmamak için tam tablo sayımı yerine doğrudan veritabanı yerel katalog istatistikleri (pg_class.reltuples, Oracle NUM_ROWS) kullanılır. Ingestion (I), Transformation (T) ve Global (GLB) mimarisiyle veri normalize edilerek Bolt protokolü üzerinden Memgraph grafik veri tabanına aktarılır.',
        en: 'MetaDB is engineered with a strict Zero-Impact Guardrail for multi-terabyte production databases. To prevent locks and disk thrashing on live platforms, it bypasses full table scans in favor of native catalog statistics (pg_class.reltuples, Oracle ALL_TABLES). Using an I-T-G pipeline hierarchy (Ingestion -> Transformation -> Global), metadata is normalized and synchronized via Bolt to Memgraph graph database.'
      },
      architecture: {
        tr: 'Spring Boot 3 (Java 21) Microservices (Auth, Ingestion, API, Orchestrator, Transform, Global), FastAPI Python SQL AST Parser, PostgreSQL (GLB Şeması), Memgraph (Cypher Bolt), TimescaleDB, RabbitMQ, Temporal, React UI.',
        en: 'Spring Boot 3 (Java 21) Microservices, FastAPI Python SQL AST Parser, PostgreSQL (GLB canonical schema), Memgraph (Cypher Bolt connector), TimescaleDB, RabbitMQ, Temporal Workflow, React UI.'
      },
      metrics: [
        { label: { tr: 'Mimari', en: 'Architecture' }, value: 'Microservices + Graph' },
        { label: { tr: 'Kaynak Veri Tabanı Etkisi', en: 'Source DB Impact' }, value: 'Zero-Lock (Catalog Stats)' },
        { label: { tr: 'Soykütüğü Grafı', en: 'Lineage Graph' }, value: 'Memgraph Bolt / Cypher' },
        { label: { tr: 'İş Akışı', en: 'Orchestration' }, value: 'Quartz + Temporal + Batch' }
      ],
      tags: ['Java 21', 'Spring Boot 3', 'Memgraph', 'PostgreSQL', 'TimescaleDB', 'RabbitMQ', 'FastAPI', 'Quartz', 'Zero-Impact']
    },
    {
      id: 'industrial-iot',
      personas: ['all', 'iot'],
      featured: true,
      category: {
        tr: 'IoT & Endüstriyel Otomasyon',
        en: 'IoT & Industrial Automation'
      },
      title: {
        tr: 'Endüstriyel Soğutma & Telemetri IoT Ağ Geçidi (ESP32)',
        en: 'Industrial Cold-Chain & Cooling IoT Gateway (ESP32)'
      },
      summary: {
        tr: 'ESP32 ve Modbus RTU/TCP üzerinden endüstriyel soğutma ünitelerinden veri toplayan, GSM/4G ve Wi-Fi/Ethernet ile buluta aktaran güvenli firmware mimarisi.',
        en: 'Secure firmware architecture on ESP32 polling Modbus RTU/TCP telemetry from industrial chillers and streaming via GSM/4G and MQTT/TLS to cloud.'
      },
      description: {
        tr: 'Kritik soğuk zincir ve endüstriyel soğutma tesislerinde donanım ile bulut arasındaki köprüyü kuran uçtan uca IoT çözümü. ESP32 mikrodenetleyicisi üzerinde FreeRTOS ile koşan firmware; Modbus RTU (RS485) register okumalarını (sıcaklık, emme/basma basınçları, kompresör invertör frekansı ve arıza bobinleri) periyodik olarak okur. Bağlantı kesintilerinde yerel flash ring-buffer ile veri kaybı engellenir; GSM 4G/LTE Cat-M1 modülü otomatik yedekleme (failover) sağlar.',
        en: 'End-to-end IoT solution bridging industrial edge hardware to cloud analytics. Firmware built on ESP32 with FreeRTOS polls Modbus RTU (RS485) registers (temperature, discharge/suction pressure, compressor inverter frequency, fault coils). An on-chip flash ring buffer prevents data loss during cellular drops, while a GSM 4G/LTE Cat-M1 module provides seamless network failover.'
      },
      architecture: {
        tr: 'ESP32 (C/C++), FreeRTOS, Modbus RTU (RS-485) & Modbus TCP, MQTT over TLS / HTTP REST, GSM/4G Modülleri (SIMCom/Quectel), Ring Buffer Flash Storage, Watchdog Timer.',
        en: 'ESP32 (C/C++), FreeRTOS, Modbus RTU (RS-485) & Modbus TCP, MQTT over TLS / HTTP REST, GSM/4G Modules (SIMCom/Quectel), Local Flash Ring Buffer, Hardware Watchdog.'
      },
      metrics: [
        { label: { tr: 'Haberleşme', en: 'Protocols' }, value: 'Modbus RTU + MQTT/TLS' },
        { label: { tr: 'Yedekleme', en: 'Failover' }, value: 'Ethernet -> GSM/4G Auto' },
        { label: { tr: 'Veri Kaybı', en: 'Data Loss Rate' }, value: '0% (Local Edge Buffer)' },
        { label: { tr: 'Çalışma Prensibi', en: 'Reliability' }, value: '24/7 Industrial Watchdog' }
      ],
      tags: ['ESP32', 'Firmware (C/C++)', 'Modbus RTU/TCP', 'MQTT', 'GSM/4G', 'FreeRTOS', 'Industrial IoT']
    },
    {
      id: 'payment-gateway',
      personas: ['all', 'backend'],
      featured: true,
      category: {
        tr: 'Fintech & Dağıtık Arka Uç',
        en: 'Fintech & Distributed Backend'
      },
      title: {
        tr: 'Çoklu Uygulama Merkezi Ödeme & İşlem Motoru',
        en: 'Centralized Multi-Client Payment & Transaction Engine'
      },
      summary: {
        tr: 'C# .NET ve Spring Boot ile tasarlanan, birden fazla istemci ve uygulamanın finansal işlemlerini merkezi olarak yöneten yüksek eşzamanlı ödeme mimarisi.',
        en: 'High-throughput payment gateway engineered in C# .NET & Spring Boot providing centralized transaction routing for multiple client applications.'
      },
      description: {
        tr: 'Farklı istemci uygulamalarının ödeme sağlayıcılarına (Bankalar, Sanal POS, Ödeme Kuruluşları) tek noktadan güvenli ve standart erişimini sağlayan merkezi mimari. "Client/Application" hiyerarşik güvenlik yapısı, idempotent işlem garantisi, dağıtık Redis kilitleri (distributed locks) ve asenkron mutabakat servisleri ile yüksek hacimli para transferlerinde sıfır hata toleransı ile çalışır.',
        en: 'Centralized architecture facilitating secure, uniform access to payment providers (Virtual POS, Banks, Payment Gateways) for diverse client applications. Features Client/Application hierarchical isolation, idempotent transaction guarantees, distributed locking via Redis, and asynchronous reconciliation for high-volume financial traffic.'
      },
      architecture: {
        tr: 'C# .NET (8 / 10 / 4.8), Java Spring Boot WebFlux, SQL Server & PostgreSQL, Redis Dağıtık Kilit, RabbitMQ Mesajlaşma, OAuth2 Token Exchange.',
        en: 'C# .NET (8 / 10 / 4.8), Java Spring Boot WebFlux, SQL Server & PostgreSQL, Redis Distributed Locking, RabbitMQ Messaging, OAuth2 Token Exchange.'
      },
      metrics: [
        { label: { tr: 'İşlem Güvencesi', en: 'Guarantees' }, value: 'Idempotent + ACID' },
        { label: { tr: 'Ölçeklenebilirlik', en: 'Scale' }, value: 'Multi-Tenant Client Mesh' },
        { label: { tr: 'Kilit Yönetimi', en: 'Locking' }, value: 'Redis Distributed Locks' },
        { label: { tr: 'Hata Oranı', en: 'Transaction Errors' }, value: '< 0.001% Resilient Retry' }
      ],
      tags: ['C#', '.NET 8/10', 'Spring Boot', 'Redis', 'RabbitMQ', 'Payment Gateway', 'Idempotency']
    },
    {
      id: 'proxmox-homelab',
      personas: ['all', 'devops'],
      featured: false,
      category: {
        tr: 'DevOps & Sanallaştırma Altyapısı',
        en: 'DevOps & Infrastructure'
      },
      title: {
        tr: 'Proxmox VE Sanallaştırma Kümesi & Fedora Homelab Altyapısı',
        en: 'Proxmox VE Cluster & Fedora Enterprise Homelab'
      },
      summary: {
        tr: 'Proxmox VE, LXC konteynerleri, KVM sanal makineleri ve Fedora Linux üzerinde koşan yüksek erişilebilirlikli mikroservis ve geliştirme altyapısı.',
        en: 'High-availability infrastructure managing LXC containers, KVM virtual machines, and hardened Fedora Linux hosts for microservices & data labs.'
      },
      description: {
        tr: 'Geliştirme, test ve canlıya alma ortamlarının izole şekilde yönetildiği kurumsal düzeyde homelab ve sunucu mimarisi. Proxmox VE hypervisor üzerinde koşan servisler; ZFS depolama havuzları, Proxmox Backup Server (PBS) ile otomatik anlık görüntü (snapshot) ve artımlı yedeklemelerle korunur. Fedora Linux ana sunucuları kernel optimizasyonları, systemd servis konfigürasyonları ve Docker konteyner orkestrasyonu ile yönetilir.',
        en: 'Enterprise-grade homelab and server virtualization cluster isolating dev, staging, and simulation environments. Running on Proxmox VE hypervisor with ZFS storage pools, automated snapshots, and incremental backups via Proxmox Backup Server (PBS). Fedora Linux hosts are tuned at the kernel level with systemd service sandboxing and Docker container orchestration.'
      },
      architecture: {
        tr: 'Proxmox VE 8, Fedora Linux, Docker / Compose, GNOME Boxes, ZFS Pool, PBS Backup Server, Nginx Reverse Proxy, WireGuard VPN.',
        en: 'Proxmox VE 8, Fedora Linux, Docker / Compose, GNOME Boxes, ZFS Storage Pools, PBS Backup Server, Nginx Reverse Proxy, WireGuard VPN.'
      },
      metrics: [
        { label: { tr: 'Hipervizör', en: 'Hypervisor' }, value: 'Proxmox VE 8 (KVM/LXC)' },
        { label: { tr: 'Host İşletim Sistemi', en: 'Host OS' }, value: 'Fedora Linux Enterprise' },
        { label: { tr: 'Yedekleme Stratejisi', en: 'Backups' }, value: 'Automated PBS Snapshots' },
        { label: { tr: 'Çalışma Süresi', en: 'Uptime' }, value: '99.98% High Availability' }
      ],
      tags: ['Proxmox VE', 'Fedora Linux', 'Docker', 'LXC/KVM', 'ZFS', 'DevOps', 'Infrastructure']
    },
    {
      id: 'keycloak-iam',
      personas: ['all', 'iam', 'backend'],
      featured: false,
      category: {
        tr: 'Kimlik Yönetimi & Siber Güvenlik',
        en: 'Identity Management & Cyber Security'
      },
      title: {
        tr: 'Keycloak ile Çok Kiracılı SSO & Merkezi Kimlik Yönetimi (IAM)',
        en: 'Enterprise Multi-Tenant SSO & IAM Federation (Keycloak)'
      },
      summary: {
        tr: 'Kurumsal sistemler için Keycloak üzerinde yapılandırılan OAuth2 / OIDC standartlarında Single Sign-On, Realm izolasyonu ve JWT token doğrulaması.',
        en: 'Single Sign-On (SSO), realm isolation, and JWT token validation configured on Keycloak adhering to OAuth2 / OpenID Connect enterprise standards.'
      },
      description: {
        tr: 'Mikroservis mimarisinde güvenliği merkezileştiren IAM altyapısı. Keycloak üzerinde tanımlı çoklu realm (Multi-Realm) yapısı; hem son kullanıcılar hem de B2B servis-servis (M2M) kimlik doğrulamalarında Client Credentials ve Authorization Code akışlarını yönetir. Dağıtık Spring Boot ve .NET servisleri, merkezi public key (JWKS) ile durumsuz (stateless) JWT doğrulamasını sıfır gecikmeyle gerçekleştirir.',
        en: 'IAM infrastructure centralizing security across distributed microservices. Multi-realm architecture on Keycloak orchestrates Authorization Code and Client Credentials (M2M) flows for both consumer and B2B identities. Downstream Spring Boot and .NET services validate stateless JWTs against rotating JWKS with sub-millisecond overhead.'
      },
      architecture: {
        tr: 'Keycloak, OAuth 2.0, OpenID Connect (OIDC), JWT (jjwt), Spring Security 6, PostgreSQL IAM Veritabanı, Redis Token Blacklist.',
        en: 'Keycloak, OAuth 2.0, OpenID Connect (OIDC), JWT (jjwt), Spring Security 6, PostgreSQL IAM DB, Redis Token Blacklist.'
      },
      metrics: [
        { label: { tr: 'Protokoller', en: 'Protocols' }, value: 'OAuth 2.0 & OIDC' },
        { label: { tr: 'İzolasyon', en: 'Isolation' }, value: 'Multi-Realm Tenant Split' },
        { label: { tr: 'Token Tipi', en: 'Token' }, value: 'Stateless Cryptographic JWT' },
        { label: { tr: 'Yetkilendirme', en: 'Auth Model' }, value: 'Granular RBAC / ABAC' }
      ],
      tags: ['Keycloak', 'OAuth2', 'OIDC', 'Spring Security', 'JWT', 'SSO', 'IAM']
    },
    {
      id: 'multimodal-ai',
      personas: ['all', 'data'],
      featured: false,
      category: {
        tr: 'Yapay Zeka & Derin Öğrenme',
        en: 'AI & Deep Learning'
      },
      title: {
        tr: 'Multimodal Görüntü & NLP Dil Modeli Boru Hattı (BLIP & T5)',
        en: 'Multimodal Vision & NLP Pipeline (BLIP & T5 Transformers)'
      },
      summary: {
        tr: 'BLIP ile görsel açıklama ve nesne sınıflandırma, T5 transformatör modeli ile otomatik metin özetleme ve anlamsal etiketleme sağlayan Python çıkarım mimarisi.',
        en: 'Python inference architecture powering image captioning & object classification via BLIP, alongside automated document summarization via T5.'
      },
      description: {
        tr: 'Görüntü ve doğal dil işleme modellerini üretim mikroservislerine entegre eden asenkron veri boru hattı. BLIP (Bootstrapping Language-Image Pre-training) modeli görsel verilerden otomatik metinsel öznitelikler çıkarırken, T5 modeli bu öznitelikleri anlamsal kategorilere ve özetlere dönüştürür. FastAPI ile sunulan çıkarım servisi, batching ve bellek optimizasyonu ile donatılmıştır.',
        en: 'Asynchronous pipeline integrating computer vision and transformer language models into microservice ecosystems. BLIP extracts textual semantics and descriptions from raw images, while T5 normalizes and generates contextual summaries. Deployed via FastAPI with memory caching and tensor batching.'
      },
      architecture: {
        tr: 'Python 3.11+, PyTorch, Hugging Face Transformers (BLIP, T5), FastAPI, Docker, GPU/CPU Optimized Inference.',
        en: 'Python 3.11+, PyTorch, Hugging Face Transformers (BLIP, T5), FastAPI, Docker, GPU/CPU Optimized Inference.'
      },
      metrics: [
        { label: { tr: 'Modeller', en: 'Models' }, value: 'BLIP (Vision) + T5 (NLP)' },
        { label: { tr: 'Servis', en: 'Serving' }, value: 'FastAPI Async Inference' },
        { label: { tr: 'Görev', en: 'Task' }, value: 'Visual Captioning & Summary' },
        { label: { tr: 'Pipeline', en: 'Pipeline' }, value: 'PyTorch / HuggingFace' }
      ],
      tags: ['Python', 'PyTorch', 'BLIP', 'T5', 'FastAPI', 'Deep Learning', 'Computer Vision']
    }
  ],

  skillGroups: [
    {
      id: 'backend',
      name: { tr: 'Backend & Dağıtık Diller', en: 'Backend & Distributed Languages' },
      iconName: 'Server',
      items: [
        { name: 'Java (Spring Boot 3, WebFlux, Batch)', level: 95, highlight: true, experience: 'Production Lead', detail: { tr: 'Mikroservisler, Spring Security JWT, Batch ETL, Quartz', en: 'Microservices, Spring Security JWT, Batch ETL, Quartz' } },
        { name: 'C# & .NET (4.8, 8, 10)', level: 90, highlight: true, experience: 'Production Lead', detail: { tr: 'Merkezi ödeme servisleri, Client/App mimarisi, LINQ', en: 'Payment engines, Client/App architecture, LINQ' } },
        { name: 'SQL & Database Optimization', level: 92, highlight: true, experience: 'Deep Expertise', detail: { tr: 'Karmaşık indeksleme, EXPLAIN ANALYZE, Zero-Impact katalog sorguları', en: 'Complex indexing, EXPLAIN ANALYZE, Zero-Impact catalog stats' } },
        { name: 'Python (FastAPI, PyTorch)', level: 85, experience: 'Advanced', detail: { tr: 'SQL AST parser servisleri, BLIP/T5 çıkarım API\'leri', en: 'SQL AST parser services, BLIP/T5 inference APIs' } },
        { name: 'C++ & C', level: 82, experience: 'Embedded/Systems', detail: { tr: 'ESP32 firmware, register manipülasyonu, Modbus ayrıştırma', en: 'ESP32 firmware, register manipulation, Modbus parsing' } },
        { name: 'JavaScript / TypeScript (React)', level: 88, experience: 'Full Stack', detail: { tr: 'React 18, Vite, UI durum yönetimi, Tailwind, Canvas', en: 'React 18, Vite, state management, Tailwind, Canvas' } }
      ]
    },
    {
      id: 'iot',
      name: { tr: 'IoT, Gömülü Sistemler & Protokoller', en: 'IoT, Embedded Systems & Protocols' },
      iconName: 'Cpu',
      items: [
        { name: 'ESP32 Firmware Geliştirme', level: 94, highlight: true, experience: 'Hardware Edge', detail: { tr: 'FreeRTOS, Watchdog, Flash Ring-Buffer, OTA güncellemeler', en: 'FreeRTOS, Watchdog, Flash Ring-Buffer, OTA updates' } },
        { name: 'Modbus RTU (RS-485) & Modbus TCP', level: 96, highlight: true, experience: 'Industrial Standard', detail: { tr: 'Holding register okuma/yazma, soğutma üniteleri entegrasyonu', en: 'Holding register R/W, chiller & sensor telemetry' } },
        { name: 'MQTT / TLS & HTTP Telemetri', level: 92, experience: 'Edge-to-Cloud', detail: { tr: 'QoS seviyeleri, JSON/Binary telemetri paketleri, TLS şifreleme', en: 'QoS policies, JSON/Binary telemetry packets, TLS encryption' } },
        { name: 'GSM / 4G LTE Modülleri & Failover', level: 88, experience: 'Field Deployed', detail: { tr: 'AT komutları, SIMCom/Quectel, hücresel otomatik geçiş', en: 'AT commands, SIMCom/Quectel, automatic cellular failover' } }
      ]
    },
    {
      id: 'data',
      name: { tr: 'Veri Tabanı, Soykütüğü & Depolama', en: 'Databases, Lineage & Storage' },
      iconName: 'Database',
      items: [
        { name: 'PostgreSQL (Tuning, Replication, Scaling)', level: 94, highlight: true, experience: 'DBA & Dev', detail: { tr: 'Kurulum, pg_class istatistikleri, partition yönetimi, WAL', en: 'Setup, pg_class catalog stats, partitioning, WAL replication' } },
        { name: 'Memgraph / Neo4j Graph DB', level: 90, highlight: true, experience: 'Lineage Graph', detail: { tr: 'Bolt protokolü, Cypher sorguları, MetaDB soykütüğü grafiği', en: 'Bolt protocol, Cypher queries, MetaDB lineage graphs' } },
        { name: 'TimescaleDB (Time-Series)', level: 86, experience: 'IoT Telemetry', detail: { tr: 'Hipertables, sensör zaman serisi verisi, continuous aggregates', en: 'Hypertables, sensor time-series, continuous aggregates' } },
        { name: 'Redis (Cache & Distributed Lock)', level: 90, experience: 'Distributed Cache', detail: { tr: 'Redlock dağıtık kilit, session cache, pub/sub', en: 'Redlock distributed locks, session cache, pub/sub' } },
        { name: 'Oracle Data Integrator (ODI)', level: 84, experience: 'Enterprise ETL', detail: { tr: 'Veri ambarı ETL süreçleri, model mapping, kurumsal entegrasyon', en: 'Data warehouse ETL, model mapping, enterprise ingestion' } }
      ]
    },
    {
      id: 'infra',
      name: { tr: 'DevOps, Altyapı & Sanallaştırma', en: 'DevOps, Infrastructure & Virtualization' },
      iconName: 'HardDrive',
      items: [
        { name: 'Proxmox VE (KVM & LXC)', level: 92, highlight: true, experience: 'Hypervisor Lead', detail: { tr: 'Küme yönetimi, ZFS depolama, PBS artımlı yedeklemeler', en: 'Cluster ops, ZFS storage, PBS incremental backups' } },
        { name: 'Fedora Linux & Sistem Yönetimi', level: 95, highlight: true, experience: 'Daily Driver / Server', detail: { tr: 'Kernel parametreleri, systemd servisleri, SELinux, bash', en: 'Kernel tuning, systemd services, SELinux, bash scripting' } },
        { name: 'Docker & Konteynerizasyon', level: 92, experience: 'DevOps', detail: { tr: 'Çok aşamalı build\'ler, Docker Compose orkestrasyonu', en: 'Multi-stage builds, Docker Compose orchestration' } },
        { name: 'RabbitMQ & Temporal', level: 85, experience: 'Messaging/Workflow', detail: { tr: 'AMQP kuyruk yönetimi, dağıtık iş akış orkestrasyonu', en: 'AMQP queues, distributed workflow orchestration' } }
      ]
    },
    {
      id: 'security',
      name: { tr: 'Kimlik, Güvenlik & AI', en: 'IAM, Security & AI' },
      iconName: 'ShieldCheck',
      items: [
        { name: 'Keycloak (SSO / IAM)', level: 92, highlight: true, experience: 'IAM Specialist', detail: { tr: 'Multi-realm mimarisi, OAuth2, OpenID Connect, RBAC/ABAC', en: 'Multi-realm, OAuth2, OpenID Connect, RBAC/ABAC federation' } },
        { name: 'Spring Security 6 & OAuth2', level: 90, experience: 'Security Core', detail: { tr: 'Stateless JWT filtreleri, JWKS anahtar rotasyonu', en: 'Stateless JWT filters, JWKS key rotation' } },
        { name: 'Yapay Zeka (BLIP, T5, PyTorch)', level: 82, experience: 'ML Integration', detail: { tr: 'Görüntü etiketleme, metin özetleme, HuggingFace boru hatları', en: 'Image captioning, text summarization, HuggingFace pipelines' } }
      ]
    }
  ],

  projectConsultingAreas: [
    {
      area: {
        tr: 'Yüksek Ölçekli Dağıtık Backend & Ödeme Sistemleri',
        en: 'High-Scale Distributed Backend & Payment Engines'
      },
      summary: {
        tr: 'Milyonlarca satırlık canlı veri tabanlarında kilitlenme (lock) oluşturmayan, asenkron G/Ç modelleri (Spring WebFlux), idempotent işlem rotalama ve Redis dağıtık kilitleri ile finansal düzeyde güvenilir mikroservis mimarileri.',
        en: 'Financial-grade resilient microservices engineered with async I/O (WebFlux), idempotent transaction routing, Redis distributed locks, and Zero-Impact catalog queries on production databases.'
      },
      deliverables: [
        { tr: 'Java 21 / Spring Boot 3 & C# .NET 10', en: 'Java 21 / Spring Boot 3 & C# .NET 10' },
        { tr: 'Merkezi Ödeme ve İstemci Güvenliği', en: 'Central Payment & Client Security' },
        { tr: 'RabbitMQ & Temporal İş Akışı Orkestrasyonu', en: 'RabbitMQ & Temporal Orchestration' },
        { tr: 'Sıfır Kesinti & Idempotent İşlem Güvencesi', en: 'Zero-Downtime & Idempotent Execution' }
      ]
    },
    {
      area: {
        tr: 'Endüstriyel IoT, Telemetri & Donanımdan Buluta Entegrasyon',
        en: 'Industrial IoT, Telemetry & Edge-to-Cloud Integration'
      },
      summary: {
        tr: 'Sensör ve saha cihazlarından (Modbus RTU/TCP) mikrodenetleyici koduna (ESP32 C/C++), hücresel 4G LTE yedeklemesinden buluttaki MQTT/TLS broker ve TimescaleDB zaman serisine kadar uçtan uca saha çözümleri.',
        en: 'Turnkey edge-to-cloud telemetry bridging industrial RS-485/Modbus field controllers to ESP32 FreeRTOS firmware, cellular 4G failover, and cloud time-series analytics.'
      },
      deliverables: [
        { tr: 'ESP32 FreeRTOS Firmware Geliştirme', en: 'ESP32 FreeRTOS Firmware Engineering' },
        { tr: 'Modbus RTU/TCP Sensör & Chiller Entegrasyonu', en: 'Modbus RTU/TCP Sensor & Chiller Integration' },
        { tr: 'GSM 4G/LTE Otomatik Hücresel Failover', en: 'GSM 4G/LTE Seamless Cellular Failover' },
        { tr: 'Flash Ring-Buffer ile Sıfır Veri Kaybı', en: 'Local Flash Ring-Buffer Zero Data Loss' }
      ]
    },
    {
      area: {
        tr: 'Kurumsal Veri Kataloğu, Soykütüğü (MetaDB) & Veritabanı Optimizasyonu',
        en: 'Enterprise Data Lineage (MetaDB) & Database Optimization'
      },
      summary: {
        tr: 'Heterojen kurumsal kaynaklar (Oracle, MSSQL, PostgreSQL, ODI) üzerinde üretim operasyonunu aksatmadan katalog çıkarma, Memgraph grafik veritabanında soykütüğü (lineage) haritası ve PostgreSQL kernel/index optimizasyonu.',
        en: 'Non-intrusive metadata extraction across Oracle, MSSQL, PostgreSQL and ODI, interactive graph lineage via Memgraph Bolt, and database performance tuning.'
      },
      deliverables: [
        { tr: 'MetaDB Mimarisi & Kanonik Şema Normalizasyonu', en: 'MetaDB Architecture & Canonical Schema' },
        { tr: 'Memgraph / Cypher ile Uçtan Uca Soykütüğü Grafı', en: 'End-to-End Lineage Graphs via Memgraph' },
        { tr: 'Üretim Veritabanları İçin Sıfır Yük (Zero-Lock)', en: 'Zero-Impact Catalog Statistics Engine' },
        { tr: 'PostgreSQL Kurulum, Replikasyon & Tuning', en: 'PostgreSQL Setup, Replication & Tuning' }
      ]
    },
    {
      area: {
        tr: 'DevOps, Proxmox Sanallaştırma & Linux Sistem Mühendisliği',
        en: 'DevOps, Proxmox Virtualization & Linux Infrastructure'
      },
      summary: {
        tr: 'Proxmox VE hypervisor üzerinde yüksek erişilebilirlikli KVM/LXC kümeleri, ZFS depolama havuzları, PBS otomatik artımlı yedeklemeler ve kurumsal Fedora Linux sunucu sertleştirme.',
        en: 'High-availability KVM/LXC virtualization clusters on Proxmox VE, ZFS storage management, PBS automated incremental backup pipelines, and Fedora Linux optimization.'
      },
      deliverables: [
        { tr: 'Proxmox VE 8 Kümeleme (KVM / LXC)', en: 'Proxmox VE 8 Clustering (KVM / LXC)' },
        { tr: 'Fedora Linux Kernel & Servis Optimizasyonu', en: 'Fedora Linux Kernel & Service Hardening' },
        { tr: 'Docker & Mikroservis Konteynerizasyonu', en: 'Docker & Multi-Container Orchestration' },
        { tr: 'Keycloak SSO & OAuth2/OIDC Kimlik Mimarisi', en: 'Keycloak SSO & OAuth2/OIDC Security' }
      ]
    }
  ]
};
