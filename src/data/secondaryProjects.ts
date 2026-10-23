export interface SecondaryProject {
  id: string;
  name: string;
  whatItDid: { tr: string; en: string };
  stack: string;
  year: string;
}

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: "metadb",
    name: "MetaDB",
    whatItDid: {
      tr: "Çok kiracılı veri kataloğu ve soykütüğü (lineage) platformu; multi-terabayt üretim veritabanlarında sıfır kilit (Zero-Lock) ile metadata çıkarma",
      en: "Multi-tenant enterprise metadata catalog & lineage platform; zero-lock catalog extraction across multi-terabyte production databases"
    },
    stack: "Spring Boot 3, Memgraph (Bolt/Cypher), FastAPI, PostgreSQL, TimescaleDB",
    year: "2024–2025"
  },
  {
    id: "diventra-wms",
    name: "Diventra WMS",
    whatItDid: {
      tr: "Depo yönetim sistemi ve kurumsal ERP entegrasyonu; paletleme, seri/lot takibi, el terminali iş akışları ve ortak auth entegrasyonu",
      en: "Warehouse management system and enterprise ERP integration; palletizing, lot tracking, mobile terminal flows and shared auth"
    },
    stack: "C# .NET, SAP/Logo Entegrasyonu, PostgreSQL, Redis",
    year: "2024–2025"
  },
  {
    id: "media-payment",
    name: "Ulusal Medya Kuruluşu Ödeme Motoru (Anonim)",
    whatItDid: {
      tr: "Çoklu istemci sanal POS ve merkezi işlem motoru; idempotent istek yürütme, Redis dağıtık kilitleri ve Keycloak SSO federasyonu",
      en: "Multi-client virtual POS and central payment engine; idempotent execution, Redis distributed locking, and Keycloak SSO federation"
    },
    stack: ".NET 10, Keycloak, Redis Distributed Lock, RabbitMQ, SQL Server",
    year: "2025"
  },
  {
    id: "field-service-pwa",
    name: "Saha Servis PWA",
    whatItDid: {
      tr: "Saha teknisyenleri için çevrimdışı öncelikli rota optimizasyonu, iş emri takibi ve cihaz arıza bildirim sistemi",
      en: "Offline-first field technician service app with route optimization, work order tracking, and equipment diagnostics"
    },
    stack: ".NET 10, PostGIS, SignalR, Workbox PWA, PostgreSQL",
    year: "2024"
  },
  {
    id: "proxmox-homelab",
    name: "Proxmox & Fedora Homelab",
    whatItDid: {
      tr: "Bare-metal KVM/LXC kümeleme, ZFS depolama havuzları, PBS otomatik artımlı yedeklemeler ve WireGuard ağ izolasyonu",
      en: "Bare-metal KVM/LXC virtualization cluster, ZFS storage pools, automated PBS deduplicated backups, and WireGuard tunnels"
    },
    stack: "Proxmox VE 8, Fedora Linux, ZFS, PBS, Docker, Caddy",
    year: "2023–günümüz"
  }
];
