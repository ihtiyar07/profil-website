# Ahmet İhtiyar — İnteraktif Sistem & Portfolyo Web Sitesi

Bu proje; **Ahmet İhtiyar** için donanım/IoT seviyesinden (ESP32, Modbus RTU/TCP, 4G GSM) dağıtık mikroservislere (Java Spring Boot, C# .NET), kurumsal veri soykütüğüne (MetaDB, Memgraph, PostgreSQL) ve DevOps/Altyapı (Proxmox VE, Fedora Linux, Docker) dünyasına kadar uzanan uçtan uca mühendislik profilini sergileyen, **yüksek etkileşimli ve modern bir portfolyo web uygulamasıdır**.

---

## 🌟 Öne Çıkan İnteraktif Özellikler

1. **İnteraktif Sistem Mimarisi Tuvali (HTML5 Canvas)**:
   - Donanım (ESP32) -> Mesaj Kuyruğu (MQTT/RabbitMQ) -> Mikroservisler (Spring Boot/.NET) -> Veri Soykütüğü (MetaDB/Memgraph) -> Altyapı (Proxmox) arasındaki paket akışını canlı olarak canlandırır.
   - Herhangi bir düğüme tıklandığında desteklenen protokolleri ve teknik detayları gösterir.
2. **Canlı ESP32 & Modbus Telemetri Simülatörü**:
   - Endüstriyel soğutma ünitesinden gelen sıcaklık, emme/basma basınçları ve invertör frekansını gerçek zamanlı günceller.
   - "Sıcaklık Artışı Tetikle", "4G Hücresel Failover" ve "Modbus Holding Register Yaz" butonlarıyla ziyaretçilerin interaktif test yapmasını sağlar.
3. **Geliştirici CLI Terminal Konsolu (`ihtiyar@systems:~$`)**:
   - Klavyeden komut yazarak veya hazır buton haplarına tıklayarak (`help`, `bio`, `skills`, `projects`, `telemetry`, `infra`, `contact`) sistem ve özgeçmiş detaylarını komut satırından sorgulatır.
4. **Dinamik Rol Seçici (Persona Switcher)**:
   - Ziyaretçinin ilgilendiği role göre (**Backend Architect**, **IoT & Embedded**, **DevOps & Infra**, **Data & Lineage**, **IAM & Security**) projeleri, metrikleri ve vurguları filtreler.
5. **Çift Dil Desteği (TR / EN)**:
   - Hem yerli hem global şirketler ve teknik mülakatçılar için tek tıkla Türkçe / İngilizce geçişi.
6. **Kişiselleştirilmiş Yüksek Kaliteli Tasarım**:
   - Yüklenen portre fotoğrafı, neon siber çerçeve, canlı telemetri durum rozetleri ve 1 tıkla e-posta kopyalama & CV yazdırma özelliği.

---

## 🛠️ Yerel Geliştirme (Local Development)

Projeyi yerel bilgisayarınızda çalıştırmak için:

```bash
cd profil-website

# Bağımlılıkları yükleyin (ilk seferde)
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda açılan `http://localhost:5173` adresinden canlı olarak deneyimleyebilirsiniz.

---

## 🚀 Cloudflare Pages ile Dağıtım (Deploy Guide)

Proje, Cloudflare Pages için optimize edilmiştir. Sıfır sunucu maliyeti ve global CDN hızıyla 1 dakikada canlıya alabilirsiniz:

### Yöntem 1: GitHub / GitLab ile Otomatik Dağıtım (Önerilen)
1. Bu projeyi GitHub reponuza push edin.
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** adımlarını izleyin.
3. Proje ayarlarında:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Save and Deploy** butonuna tıklayın. Siteniz saniyeler içinde global edge ağında yayına girecektir.

### Yöntem 2: Wrangler CLI ile Terminalden Doğrudan Dağıtım
```bash
# dist paketini derleyin
npm run build

# Cloudflare Pages'e doğrudan yükleyin
npx wrangler pages deploy dist --project-name=ahmet-ihtiyar-portfolio
```

> **Not:** Tek sayfa uygulama (SPA) yönlendirmeleri için `public/_redirects` dosyası hazırdır (`/* /index.html 200`). Herhangi bir alt sayfa veya yenilemede 404 hatası almazsınız.

---

## 📁 Proje Dizin Yapısı

```
profil-website/
├── public/
│   ├── _redirects         # Cloudflare Pages SPA yönlendirme kuralı
│   ├── favicon.svg        # Özel mikroçip/telemetri favikonu
│   └── profile.png        # Ahmet İhtiyar portre görseli
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Üst menü, persona ribbon, dil seçici
│   │   ├── Hero.tsx               # Portre kartı, telemetri başlığı, hızlı eylemler
│   │   ├── ArchitectureCanvas.tsx # İnteraktif mimari tuvali ve canlı parçacıklar
│   │   ├── TelemetrySimulator.tsx # ESP32 / Modbus canlı telemetri sandbox
│   │   ├── Projects.tsx           # MetaDB, IoT, Ödeme, Proxmox case study kartları
│   │   ├── SkillsMatrix.tsx       # 5 katmanlı teknoloji yığını ve yetkinlik radarı
│   │   ├── TerminalConsole.tsx    # Geliştirici CLI konsolu
│   │   ├── RoleFitGuide.tsx       # IK / Teknik lider rol değerlendirme modülü
│   │   ├── ContactModal.tsx       # 1 tıkla e-posta kopyalama ve CV yazdırma
│   │   ├── Footer.tsx             # Cloudflare Pages edge durumu ve bağlantılar
│   │   └── GithubIcon.tsx         # Vektörel GitHub ikonu
│   ├── data/
│   │   ├── portfolioData.ts       # TR/EN çift dilli içerik, projeler ve yetkinlikler
│   │   └── terminalCommands.ts    # CLI komut motoru
│   ├── App.tsx                    # Ana layout ve reaktif durum yönetimi
│   ├── index.css                  # Tailwind CSS ve siber cam stilleri
│   └── main.tsx                   # React 19 başlangıç noktası
├── dist/                          # Cloudflare Pages üretim paketi
├── package.json
└── vite.config.ts
```
