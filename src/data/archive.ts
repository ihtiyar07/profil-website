export interface ArchiveItem {
  year: string;
  title: { tr: string; en: string };
  category: { tr: string; en: string };
  description: { tr: string; en: string };
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    year: "2024",
    title: {
      tr: "GDZ Elektrik Dağıtım Şebekesi Analitiği",
      en: "GDZ Electricity Distribution Grid Analytics"
    },
    category: { tr: "Zaman Serisi Modelleme", en: "Time-Series Modeling" },
    description: {
      tr: "İzmir ve Manisa dağıtım bölgeleri için saatlik elektrik tüketim profili tahminleme motoru; LightGBM, meteorolojik kovaryantlar ve yüksek frekanslı mevsimsellik mimarisi.",
      en: "Hourly electricity consumption forecasting engine for regional power distribution grids; LightGBM, meteorological covariates, and multi-scale seasonality modeling."
    }
  },
  {
    year: "2024",
    title: {
      tr: "Anadolu Hayat Emeklilik Risk Skorlama Motoru",
      en: "Anadolu Hayat Pension Risk Scoring Engine"
    },
    category: { tr: "Aktüeryal Analitik & Risk", en: "Actuarial Analytics & Risk" },
    description: {
      tr: "Bireysel Emeklilik Sistemi (BES) portföyünde erken ayrılma olasılıklarını gerçek zamanlı tespit eden sınıflandırma modeli ve dağıtık risk skorlama hattı.",
      en: "Real-time surrender probability classification model and distributed risk scoring pipeline for pension policyholder portfolios."
    }
  },
  {
    year: "2023",
    title: {
      tr: "ATP Tech & Alibaba Cloud Dağıtık Katalog İndeksleme",
      en: "ATP Tech & Alibaba Cloud Distributed Catalog Indexing"
    },
    category: { tr: "Yüksek Eşzamanlı Arama", en: "High-Concurrency Search" },
    description: {
      tr: "Büyük ölçekli e-ticaret platformlarında yüksek eşzamanlı ürün arama, filtreleme gecikmesi optimizasyonu ve bulut ölçekli katalog indeksleme mimarisi.",
      en: "High-concurrency product search optimization, multi-faceted filtering latency reduction, and cloud-scale catalog indexing architecture."
    }
  },
  {
    year: "2022–2023",
    title: {
      tr: "ROTA Hyperloop: Kapsül Telemetri & Gömülü Kontrol",
      en: "ROTA Hyperloop: Pod Telemetry & Embedded Control"
    },
    category: { tr: "Gömülü Sistemler & CAN Bus", en: "Embedded Systems & CAN Bus" },
    description: {
      tr: "Hyperloop prototip kapsülü için gerçek zamanlı gömülü kontrol yazılımları, ROS (Robot Operating System) düğümleri, C/C++ telemetri yayıncıları ve deterministik CAN bus haberleşmesi.",
      en: "Real-time embedded control software for prototype Hyperloop pod, ROS nodes, C/C++ telemetry publishers, and deterministic CAN bus arbitration."
    }
  },
  {
    year: "2022",
    title: {
      tr: "EXEDRA & MK Hizmet: Saha Operasyon Altyapısı",
      en: "EXEDRA & MK Services: Field Operations Infrastructure"
    },
    category: { tr: "Kurumsal Arka Uç & Telemetri", en: "Enterprise Backend & Telemetry" },
    description: {
      tr: "Saha teknisyen iş akışları, anlık arıza bildirim altyapısı ve kurumsal arka uç servislerinin yüksek erişilebilirlikli dağıtımı.",
      en: "Field operations dispatch workflows, real-time ticketing telemetry infrastructure, and high-availability enterprise backend deployments."
    }
  }
];
