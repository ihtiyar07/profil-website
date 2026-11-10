export interface SecondaryProject {
  id: string;
  name: string;
  whatItDid: string;
  stack: string;
  year: string;
}

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: "diventra-wms",
    name: "Diventra WMS",
    whatItDid: "Depo yönetim sistemi ve kurumsal ERP entegrasyonu; PostgreSQL işlem yönetimi, paletleme, seri/lot takibi ve el terminali iş akışları",
    stack: "C# .NET, SAP/Logo Entegrasyonu, PostgreSQL, Redis",
    year: "2024–2025"
  },
  {
    id: "media-payment",
    name: "Ulusal Medya Kuruluşu Ödeme Motoru (Anonim)",
    whatItDid: "Çoklu istemci sanal POS ve merkezi işlem motoru; SQL Server üzerinde idempotent istek yürütme, Redis dağıtık kilitleri ve Keycloak SSO",
    stack: ".NET 10, Keycloak, Redis Distributed Lock, RabbitMQ, SQL Server",
    year: "2025"
  },
  {
    id: "field-service-pwa",
    name: "Saha Servis PWA",
    whatItDid: "Saha teknisyenleri için çevrimdışı öncelikli rota optimizasyonu, PostGIS mekânsal sorguları ve ekipman arıza bildirim sistemi",
    stack: ".NET 10, PostGIS, SignalR, Workbox PWA, PostgreSQL",
    year: "2024"
  },
  {
    id: "proxmox-hypervisor",
    name: "Proxmox & Linux Hipervizör Altyapısı",
    whatItDid: "Bare-metal KVM/LXC sanallaştırma kümesi, ZFS depolama havuzları, PBS blok düzeyinde tekilleştirilmiş artımlı yedekleme ve WireGuard ağ izolasyonu",
    stack: "Proxmox VE 8, Fedora Linux, ZFS Pools, PBS, Docker, Caddy",
    year: "2023–günümüz"
  }
];
