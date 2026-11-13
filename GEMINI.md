# Proje ve Dokümantasyon Standartları (GEMINI.md)

Bu döküman, projedeki tüm teknik dökümanların, bileşenlerin ve tasarım tercihlerinin standartlarını belirler. **Projeye dahil olan tüm agent'lar ve geliştiriciler bu kurallara tavizsiz uymalıdır.**

---

## 1. Dökümantasyon ve İçerik Standartları

### 1.1. Monolitik Döküman Yasağı (Odaklı ve Modüler İçerik)
- **Tekil Bir Döküman Şişirilemez:** Bir makale devasa, onlarca konuyu aynı anda anlatan monolitik bir sayfaya (250+ satır) dönüştürülemez.
- **İdeal Boyut:** 
  - Kısa not/inceleme: 40–80 satır
  - Standart teknik rehber: 80–150 satır
  - Üst genel bakış (Parent Overview): ~100–140 satır
- **Böl ve Yönet (Parent-Child Mimarisi):** Derinlemesine detay gerektiren konular (örn. 8KB Data Page ve Tuple Anatomisi, MVCC ve WAL Mekanizması, Bellek Yönetimi ve Buffer Pool) ana genel bakış makalesinde özetlenir ve her biri **ayrı bir alt makale (child post)** olarak açılır.

### 1.2. Frontmatter Şeması (`parent` ve `order`)
Tüm `src/content/posts/*.mdx` dökümanları aşağıdaki şemaya uygun olmalıdır:

```yaml
---
title: "Başlık"
slug: "ozel-slug" # opsiyonel (dosya adından otomatik alınabilir)
date: "YYYY-MM-DD"
lang: "tr"
summary: "Teknik özet (1-2 cümle)"
tags: ["PostgreSQL", "Veritabanı", "Mimari"]
parent: "parent-post-slug" # Eğer bir alt dökümansa, üst dökümanın slug'ı
order: 1 # Parent altındaki sıralama sırası (1, 2, 3...)
---
```

### 1.3. Terminoloji ve Dil Kuralları
- **Zorlama Çeviri Yapma:** Sektörde doğrudan kabul görmüş teknik kavramları Türkçe'ye çevirip anlaşılmaz hale getirme.
  - ❌ *İstemci Uygulamaları* ➔ ✅ **Client**
  - ❌ *Veri Sayfaları* ➔ ✅ **Data Page**
  - ❌ *Kurban Tampon* ➔ ✅ **Victim Buffer**
  - ❌ *Ölü Satırlar* ➔ ✅ **Dead Tuples**
  - ✅ **Tuple, Line Pointer, Buffer Pool, Shared Buffers, WAL, Indirection, Spill to Disk, Clock Sweep** doğrudan kullanılmalıdır.
- **Mühendislik Tonu:** "Devrimsel", "harika", "kusursuz", "rakipsiz" gibi AI klişeleri ve boş övgü sıfatları kesinlikle yasaktır. Cümleler sakin, kısa, spesifik ve ölçülebilir teknik gerçeklere dayanmalıdır.

---

## 2. Görselleştirme ve Şema Standartları

### 2.1. Mermaid Şemaları: Sekmeli Değil, Sıralı / Alt Alta
- **Sekmeli (Tabs) Mega-Şema Yasağı:** Birden fazla kavramı tek bir bileşen içinde tab'lere saklayarak gizlemek yerine; konunun akışına göre **alt alta, odaklı ve sıralı (sequential inline)** şemalar kullanılmalıdır.
- **Kompakt Tasarım:** Şemalar sayfada gereksiz devasa alan kaplamamalı, kompakt ve doğrudan akışı gösterecek sadelikte tutulmalıdır.
- **Metin Yoğunluğu:** Şema düğümlerinin içine paragraflar doldurulmaz (maks 2-4 kelime). Açıklama şemanın altında metin olarak verilir veya etkileşimli panelde gösterilir.
- **Renk Hiyerarşisi (Sakin Blueprint Paleti):**
  - **Süreçler (Process):** Mavi/Lacivert tonları (`#EFF6FF` zemin, `#2563EB` kenarlık)
  - **Bellek (Memory):** Teal/Turkuaz tonları (`#F0FDFA` zemin, `#0D9488` kenarlık)
  - **Disk/Depolama (Storage):** Nötr sıcak gri (`#F5F5F4` zemin, `#78716C` kenarlık)
  - **Vurgu/Kritik:** Sitenin ana aksanı (`var(--accent)`)
  - Aşırı doygun renkler, neon degradeler ve parlamalar yasaktır.

### 2.2. Fiziksel Bellek / Veri Yapısı Görselleştirmeleri
- Eşit genişlikte kutularla bellek anlatılamaz (Header 24B ile 8KB'lık Free Space eşit kutu çizilemez).
- `DataPageAnatomy.astro` örneğinde olduğu gibi orantılı fiziksel şeritler, yönlü oklar ve görsel zoom (projeksiyon) hissi verilmelidir.
- Monospace font sadece alan adlarında (`t_xmin`, `pd_lower`, `lp_off`) kullanılır; açıklamalar sans-serif okunmalıdır.

---

## 3. Sidebar ve Navigasyon Standartları

### 3.1. Ağaç Hiyerarşisi ve Geri Dönüş
- **Ağaç Hiyerarşisi:** 
  - Sidebar sadece düz makale listesi sunmaz; bir konunun genel bakış dökümanı varsa, onun altındaki alt dökümanlar (child items) girintili (indent) ve hiyerarşik bir ağaç yapısıyla gösterilir.
- **Geri Dönüş Bağlantısı (Breadcrumb & Up-link):**
  - Bir child döküman açıldığında, sayfa başında veya navigasyonunda kullanıcı kolayca parent dökümana dönebilmeli ve kardeş dökümanlar (sibling articles) arasında gezinebilmelidir.

### 3.2. Başlık Formatı ve Kırpılma Yasağı (Sığma Standardı)
- **Gereksiz Ön Ek Yasağı:** Başlıklarda yer israfı yaratan `"Genel Bakış: "` veya `"Bölüm X: "` gibi tekrarlayan gürültülü ön ekler kullanılamaz.
- **2 Terimli ~18-24 Karakter Kuralı:** Yan panelde listelenen ana ve alt başlıklar, yan panel genişliğini aşmayacak ve `...` (ellipsis) ile kesilmeyecek şekilde en fazla 2-3 odaklı teknik terimden oluşmalıdır:
  - ✅ `Mimari & Süreç Modeli` (❌ *PostgreSQL Mimarisi ve Çalışma Prensiplerine Genel Bakış*)
  - ✅ `Bellek & shared_buffers` (❌ *PostgreSQL Bellek Yönetimi ve Buffer Pool Mimarisi*)
  - ✅ `8KB Page & Tuple Düzeni` (❌ *Fiziksel Depolama: 8KB Data Page ve Tuple Anatomisi*)
  - ✅ `MVCC, Autovacuum & WAL` (❌ *Eşzamanlılık ve Güvenlik: MVCC, Autovacuum ve WAL Mekanizması*)
  - ✅ `ZFS & Depolama Düzeni` (❌ *Veritabanı Depolama ve Donanım Altyapısı Mimarisi*)
  - ✅ `Arrow ile Zero-Copy` (❌ *Arrow ile DB'den Tarayıcıya Sıfır Kopyalama Akışı*)

### 3.3. Panel Genişliği ve Esnek Metin Düzeni (Layout & Wrapping)
- **Desktop Sidebar Genişliği:** Desktop yan panel genişliği `w-[280px] xl:w-[300px]` olarak tutulmalıdır.
- **Esnek Metin Sarmalama:** Katı `truncate` tek satır zorlaması yerine `line-clamp-2 leading-snug break-words` kullanılır; olası uzun veya teknik bileşik terimler yatayda taşmadan veya kesilmeden 2 satıra yumuşakça kaymalıdır.
- **Mermi İkonu Hizalaması:** Alt başlıkların solundaki mermi noktaları (bullet dots), metin 2 satıra taştığında ilk satırla hizada kalması için `items-start mt-1.5` ile dikey hizalanmalıdır.

---

## 4. Tasarım Sistemi ve Kod Standartları

- **Tema Uyumu:** Tailwind CSS v4 ile `html[data-theme="dark"]` yapısı kullanılır. Sistem OS temasının açık moda sızmasını engellemek için `global.css` dosyasındaki `@custom-variant dark` kuralı asla silinmemelidir.
- **Sıfır Hata Garantisi:** Yapılan her değişiklik sonrası `npx oxlint` ve `npx tsc --noEmit` ve `npm run build` komutları sıfır hata ile tamamlanmalıdır.
