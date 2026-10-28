# Ahmet İhtiyar — Mühendislik Dosyası (ahmetihtiyar.com)

Bu depo, **Ahmet İhtiyar**'ın kişisel mühendislik sitesinin kaynak kodlarını içerir. 

Şablon veya tipik "developer portfolio" yaklaşımı yerine; **iyi editörlüğü yapılmış bir mühendislik dosyası** konseptiyle sıfırdan tasarlandı. Ziyaretçiye uç sistemlerden dağıtık mimarilere telemetri altyapılarını kurgulayan bir mühendisin mimari kararlarını, değişmezlerini ve vaka analizlerini sunar.

---

## 🏛️ Mimari ve Tasarım Sistemi

- **Varsayılan Tema (Blueprint Vellum / Teknik Parşömen):** Zemin `#F4F6F9`, kartlar `#FFFFFF`, metin `#0F172A`, ikincil metin `#475569`, çizgiler `#D8E2EC`, tek vurgu rengi `#0284C7` (Telemetri Kobaltı / Endüstriyel Mavi). Gradyan, buzlu cam ve yapay kart gölgesi yoktur.
- **Koyu Tema (Derin Teknik Lacivert-Siyah):** Zemin `#0A0F1D`, kartlar `#0F172A`, metin `#F1F5F9`, çizgiler `#1E293B`, vurgu rengi `#38BDF8`. Sistem tercihine göre otomatik + anında manuel geçiş.
- **Tipografi Üçlüsü (Self-hosted WOFF2):**
  - **Başlıklar:** `Newsreader` (karakterli editoryal serif)
  - **Gövde:** `Geist Sans` (sakin, okunabilir sans-serif)
  - **Etiket ve Kod:** `JetBrains Mono` (monospaced detaylar)
- **Verinin Yolu (The Path of Data):** Sitenin omurgasını oluşturan interaktif 6 duraklı mimari hat:
  1. *Cihaz (ESP32, Modbus RTU/TCP)*
  2. *Aktarım (GSM 4G LTE, MQTT over TLS, OTA)*
  3. *Kuyruk (RabbitMQ)*
  4. *Depolama (PostgreSQL, TimescaleDB)*
  5. *Teslimat (Apache Arrow Zero-Copy IPC, WebSocket)*
  6. *Güven (Redis-backed RBAC, Keycloak SSO, e-İmza, RFC 3161 Zaman Damgası)*
  *Altyapı Zemini (Infrastructure Ground):* Proxmox VE 8, ZFS, PBS, Docker, Caddy, Prometheus, Oracle.
- **Sitedeki Tek Dekoratif Animasyon:** Hat üzerinde soldan sağa (mobilde yukarıdan aşağı) ilerleyen paket simülasyonu. `prefers-reduced-motion` aktif olduğunda animasyon tamamen durur.

---

## 📁 Proje Dizin Yapısı

```
profil-website/
├── public/
│   ├── favicon.svg            # Mikroçip/telemetri favikonu
│   ├── profile.png            # Ahmet İhtiyar portre görseli (optimize PNG)
│   ├── profile.webp           # Retina 12KB WebP portre görseli
│   ├── robots.txt             # SEO arama motoru kuralları
│   └── _redirects             # Cloudflare Pages SPA/statik kuralı
├── src/
│   ├── components/
│   │   ├── Header.astro       # Editoryal üst menü, dil ve tema seçici
│   │   ├── Hero.astro         # H1, "şu an" satırı, 2 aksiyon, portre
│   │   ├── DataPipeline.astro # "Verinin Yolu" interaktif hattı ve altyapı şeridi
│   │   ├── CaseFiles.astro    # 3 birincil vaka çalışması (Dosya 01 / 02 / 03)
│   │   ├── SecondaryProjects.astro # İkincil işler (kompakt tek satırlık kayıt)
│   │   ├── Invariants.astro   # 4 alanlı Değişmezler (Kural/Bozulma/Çözüm/Doğrulama)
│   │   ├── WritingSection.astro # MDX teknik yazılar listesi
│   │   ├── ArchiveSection.astro # Sade zaman çizelgesi (Datathonlar, Hyperloop)
│   │   ├── ContactSection.astro # E-posta, GitHub, LinkedIn, CV PDF (form yok)
│   │   └── Footer.astro       # Son güncelleme, tipografi & Proxmox/Caddy notu
│   ├── content/
│   │   ├── cases/             # MDX birincil vaka çalışmaları (TR & EN)
│   │   │   ├── plasmon.mdx
│   │   │   ├── sapmapayi.mdx
│   │   │   └── auth-servisi.mdx
│   │   └── posts/             # MDX teknik makaleler (TR & EN)
│   ├── data/                  # Veri modelleri, değişmezler, duraklar, ikincil işler
│   ├── layouts/
│   │   └── BaseLayout.astro   # SEO, Person Schema JSON-LD, i18n hreflang
│   ├── pages/
│   │   ├── index.astro        # Türkçe ana sayfa (varsayılan)
│   │   ├── en/index.astro     # İngilizce ana sayfa (/en)
│   │   ├── cases/[slug].astro # Dinamik vaka çalışması sayfası
│   │   ├── posts/[slug].astro # Dinamik teknik yazı sayfası
│   │   └── rss.xml.ts         # Otomatik RSS feed motoru
│   └── styles/
│       └── global.css         # Tasarım tokenları ve tipografi stilleri
├── astro.config.mjs           # Astro, MDX, Sitemap, i18n konfigürasyonu
└── package.json
```

---

## 🛠️ Yerel Geliştirme (Local Development)

```bash
cd profil-website

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Statik çıktı derleyin (dist/)
npm run build

# Üretim çıktısını yerel olarak önizleyin
npm run preview
```

---

## 🚀 Dağıtım Notları (Deployment Guide)

### 1. Kendi Proxmox VE Sunucunuzda Caddy ile Yayınlama (Önerilen)

Sitenin `npm run build` ile üretilen `dist/` klasörü saf statik dosyalardan oluşur. Caddy web sunucusu ile sıfır konfigürasyon eforu ve otomatik Let's Encrypt TLS ile servis edebilirsiniz:

`/etc/caddy/Caddyfile`:
```caddy
ahmetihtiyar.com, www.ahmetihtiyar.com {
    root * /var/www/ahmetihtiyar.com/dist
    file_server
    encode gzip zstd

    # Güvenlik ve Önbellek Başlıkları
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Statik Varlıklar İçin 1 Yıllık Önbellekleme
    @static {
        file
        path /_astro/* *.woff2 *.webp *.png *.svg
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # 404 Yönlendirmesi
    handle_errors {
        rewrite * /{err.status_code}.html
        file_server
    }
}
```

Servisi yeniden başlatın:
```bash
sudo systemctl reload caddy
```

### 2. Cloudflare Pages ile Dağıtım

1. Reponuzu GitHub'a push edin.
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Derleme Ayarları:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy**'a tıklayın. Siteniz saniyeler içinde global edge CDN üzerinde yayına girecektir.

---

## 📊 Performans ve Metrikler

- **İlk Yükleme JS Boyutu:** `< 2 KB` (Yalnızca hafif tema geçişi ve interaktif durak seçici kodu).
- **CSS Boyutu:** `~44 KB` (Kritik CSS doğrudan derlenir).
- **Görsel Boyutu:** WebP portre görseli `12.8 KB` (940 KB'tan optimize edildi).
- **Lighthouse Hedefi:** Performance, Accessibility, Best Practices ve SEO kategorilerinde 98–100.
