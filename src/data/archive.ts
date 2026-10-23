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
      tr: "GDZ Elektrik Datathon",
      en: "GDZ Electricity Datathon"
    },
    category: { tr: "Zaman Serisi / Tahmin", en: "Time-Series / ML" },
    description: {
      tr: "İzmir ve Manisa dağıtım bölgeleri için saatlik elektrik tüketim tahminleme modeli; LightGBM, hava durumu kovaryantları ve mevsimsellik özellikleri.",
      en: "Hourly electricity consumption forecasting for regional distribution grid; LightGBM, meteorological covariates, and seasonality modeling."
    }
  },
  {
    year: "2024",
    title: {
      tr: "Anadolu Hayat Emeklilik Datathon",
      en: "Anadolu Hayat Pension Datathon"
    },
    category: { tr: "Müşteri Terki / ML", en: "Customer Churn / ML" },
    description: {
      tr: "Bireysel Emeklilik Sistemi (BES) müşterilerinin erken ayrılma (churn) olasılığını tespit eden sınıflandırma modeli ve risk skorlama motoru.",
      en: "Predictive classification model and risk-scoring pipeline identifying early surrender risks for pension policyholders."
    }
  },
  {
    year: "2023",
    title: {
      tr: "ATP Tech & Alibaba Cloud Hackathon",
      en: "ATP Tech & Alibaba Cloud Hackathon"
    },
    category: { tr: "Arama & Büyük Veri", en: "Search & Big Data" },
    description: {
      tr: "E-ticaret platformlarında yüksek eşzamanlı ürün arama, filtreleme gecikmesi optimizasyonu ve bulut ölçekli katalog indeksleme mimarisi.",
      en: "High-concurrency e-commerce product search optimization, filter latency reduction, and cloud catalog indexing architecture."
    }
  },
  {
    year: "2023",
    title: {
      tr: "Techcareer PredictaThon",
      en: "Techcareer PredictaThon"
    },
    category: { tr: "Tahminsel Analitik", en: "Predictive Analytics" },
    description: {
      tr: "Yapılandırılmış tablosal verilerde regresyon, öznitelik mühendisliği ve anomali tespiti modelleme yarışması.",
      en: "Tabular data regression, advanced feature engineering, and anomaly detection modeling challenge."
    }
  },
  {
    year: "2022–2023",
    title: {
      tr: "ROTA Hyperloop Takımı",
      en: "ROTA Hyperloop Team"
    },
    category: { tr: "Gömülü Sistemler & Robotik", en: "Embedded & Robotics" },
    description: {
      tr: "Hyperloop prototip kapsülü için gömülü kontrol yazılımları, ROS (Robot Operating System) entegrasyonu, C/C++ telemetri düğümleri ve CAN bus haberleşmesi.",
      en: "Embedded control software for prototype Hyperloop pod, ROS integration, C/C++ telemetry publisher nodes, and CAN bus bus arbitration."
    }
  },
  {
    year: "2022",
    title: {
      tr: "EXEDRA & MK Hizmet",
      en: "EXEDRA & MK Services"
    },
    category: { tr: "Saha & Arka Uç Sistemleri", en: "Field & Backend Systems" },
    description: {
      tr: "Saha operasyonları, arıza bildirim altyapısı ve kurumsal arka uç servislerinin geliştirilmesi.",
      en: "Field operations workflows, ticketing infrastructure, and backend service integrations."
    }
  },
  {
    year: "2021–2022",
    title: {
      tr: "Bitki Hastalığı Teşhisi (CV) & Sahte İçerik Tespiti (NLP)",
      en: "Plant Disease Detection (CV) & Fake News NLP"
    },
    category: { tr: "Akademik / Yan Dal", en: "Academic / Exploratory" },
    description: {
      tr: "Tarım yaprak fotoğraflarından derin öğrenme ile hastalık tespiti (CNN / Transfer Learning) ve Türkçe metinlerde dezenformasyon tespiti (BERT).",
      en: "Deep learning leaf pathology classification via CNNs and Turkish misinformation detection using fine-tuned BERT models."
    }
  }
];
