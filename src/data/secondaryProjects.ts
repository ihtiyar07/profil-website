export interface SecondaryProject {
  id: string;
  name: string;
  whatItDid: { tr: string; en: string };
  stack: string;
  year: string | { tr: string; en: string };
}

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: "diventra-wms",
    name: "Diventra WMS",
    whatItDid: {
      tr: "Depo yönetim sistemi ve kurumsal ERP entegrasyonu; PostgreSQL işlem yönetimi, paletleme, seri/lot takibi ve el terminali iş akışları",
      en: "Warehouse management system and enterprise ERP integration; PostgreSQL transaction management, lot tracking, and mobile terminal workflows"
    },
    stack: "C# .NET, SAP/Logo Entegrasyonu, PostgreSQL, Redis",
    year: "2024–2025"
  },
  {
    id: "media-payment",
    name: "Ulusal Medya Kuruluşu Ödeme Motoru (Anonim)",
    whatItDid: {
      tr: "Çoklu istemci sanal POS ve merkezi işlem motoru; SQL Server üzerinde idempotent istek yürütme, Redis dağıtık kilitleri ve Keycloak SSO",
      en: "Multi-client virtual POS and central payment engine; idempotent execution on SQL Server, Redis distributed locking, and Keycloak SSO"
    },
    stack: ".NET 10, Keycloak, Redis Distributed Lock, RabbitMQ, SQL Server",
    year: "2025"
  },
  {
    id: "field-service-pwa",
    name: "Saha Servis PWA",
    whatItDid: {
      tr: "Saha teknisyenleri için çevrimdışı öncelikli rota optimizasyonu, PostGIS mekânsal sorguları ve ekipman arıza bildirim sistemi",
      en: "Offline-first field service app with route optimization, PostGIS spatial queries, and equipment diagnostics"
    },
    stack: ".NET 10, PostGIS, SignalR, Workbox PWA, PostgreSQL",
    year: "2024"
  },
  {
    id: "proxmox-hypervisor",
    name: "Proxmox & Linux Hipervizör Altyapısı",
    whatItDid: {
      tr: "Bare-metal KVM/LXC sanallaştırma kümesi, ZFS depolama havuzları, PBS blok düzeyinde tekilleştirilmiş artımlı yedekleme ve WireGuard ağ izolasyonu",
      en: "Bare-metal KVM/LXC virtualization cluster, ZFS storage pools, automated PBS deduplicated backups, and WireGuard tunnels"
    },
    stack: "Proxmox VE 8, Fedora Linux, ZFS Pools, PBS, Docker, Caddy",
    year: {
      tr: "2023–günümüz",
      en: "2023–present"
    }
  }
];
