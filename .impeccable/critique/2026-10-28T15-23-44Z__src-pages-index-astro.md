---
target: src/pages/index.astro
total_score: 29
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:/home/ihtiyar/Documents/hobi/profil-website/src/pages/index.astro"
target_fingerprint: "sha256:e3358456872efa17fd78da37105f149151120244771089e1159b7e3b185ef0fa"
target_path: /home/ihtiyar/Documents/hobi/profil-website/src/pages/index.astro
timestamp: 2026-10-28T15-23-44Z
slug: src-pages-index-astro
---
Method: dual-agent (A: 8585e846-55ea-48fe-98e4-1e7d0cdcd9d3 · B: a94d2b37-3e9c-40d4-b464-f72b0c556014)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|:---:|---|
| 1 | Visibility of System Status | 3 | Station state visible across SVG & tabs, but mobile scroller lacks overflow fade |
| 2 | Match System / Real World | 4 | Flawless industrial domain fidelity (Modbus RTU, ring-buffers, TimescaleDB, Arrow) |
| 3 | User Control and Freedom | 3 | Clean anchors and toggles; pipeline station selection lacks URL deep-linking |
| 4 | Consistency and Standards | 4 | Unified Swiss grid, tactile micro-classes, and shared CSS token system |
| 5 | Error Prevention | 4 | No form walls to break; clipboard copy has graceful fallback |
| 6 | Recognition Rather Than Recall | 3 | Sticky navigation headers orient reader; tab switching hides previous station metrics |
| 7 | Flexibility and Efficiency | 3 | W3C APG keyboard pattern on pipeline tabs; lacks global jump accelerator keys |
| 8 | Aesthetic and Minimalist Design | 2 | Excessive "box-in-a-box" frames, 24+ repetitive CAD crosshairs, visual noise |
| 9 | Error Recovery | 3 | Clean clipboard exception handling and dedicated 404 page |
| 10 | Help and Documentation | n/a | Persuade/Experience portfolio surface; narrative is self-documenting |
| **Total** | | **29/36** | **Good (80.5%)** |

### Design Specificity Verdict

**Verdict**: Genuinely authored industrial systems substance beneath a visual scaffolding that flirts with category-interchangeable AI/techno-editorial tropes.

**LLM Assessment**:
The engineering narrative is unmistakably authentic: solving RS-485 electromagnetic interference from industrial chillers, eliminating `malloc` heap fragmentation via FreeRTOS ring-buffers on ESP32, bypassing browser `JSON.parse` thread freezes with Apache Arrow columnar IPC streams into `Float64Array`, and sub-millisecond Redis `ver` counter increments for instant token revocation. These are battle-tested decisions from real production friction.
However, the visual scaffolding leans heavily into repetitive tropes:
1. *Frame Exhaustion ("Box-in-a-Box")*: Every section rigidly repeats a 4-col sticky / 8-col content split packed with bordered containers, accent stripes, and CAD crosshairs.
2. *CAD Crosshair Overload*: Over 24 decorative `+` glyphs adorn every corner, turning a neat drafting motif into a stylized techno-brutalist cliché.
3. *AI Editorial Font Stack*: Pairing Newsreader italic serif with Geist Sans and JetBrains Mono echoes the 2024–2026 Anthropic/Linear template aesthetic, occasionally feeling like an academic monograph draped over industrial machine code.

**Deterministic Scan**:
- **Live URL Scan (`http://localhost:4321`)**: 91 findings (62 warnings, 29 advisories).
- **Static AST Build Scan (`dist/index.html`)**: 210 findings.
- **Top Verified Defects**:
  - `low-contrast`: Hardcoded `--text-dim: #64748B` fails WCAG AA (4.40:1 on light paper `#F4F6F9`, 4.02:1 on dark navy `#0A0F1D`). White text on cyan accent `#38BDF8` collapses to 2.16:1 in dark mode. Green status `#10B981` on paper is 2.30:1.
  - `undersized-ui-text` & `tiny-text`: 42 live instances of 9px–10px micro-type across badges and metadata.
  - `overused-font`: Primary body font `'Geist Sans'` flagged as overused modern template boilerplate.
  - `pulsing-dot`: Infinite `@keyframes led-pulse-live` simulates fake liveness on a static site.
  - `dark-glow`: Neon zero-offset blur glows on packets and LEDs violate crisp drafting discipline.
- **False Positives**: 113 static `cramped-padding` warnings were AST artifacts that rendered cleanly in Chromium (0 live layout violations).

**Visual Overlays**:
Live overlay presentation was not injected into an interactive browser canvas in this headless environment. Ground truth was captured via Headless Chromium computed styles and deterministic AST evaluation.

### Overall Impression
The portfolio possesses top 1% engineering authenticity and remarkable candor. Its biggest opportunity is shedding the rigid "box-in-a-box" containers and generic AI-boilerplate fonts to let the industrial data pipeline breathe as a confident, human-crafted engineering dossier.

### What's Working
1. **Architectural Candor ("Neyi Farklı Yapardım?")**: Documenting eliminated alternatives and lessons learned (e.g. admitting Protobuf would have saved 65% cellular payload over JSON) builds instant credibility with senior tech leads and CTOs.
2. **Architecture Flowcharts in Lieu of Code Dumps**: Clean, compact system schematics communicate end-to-end design capability in 10 seconds.
3. **Robust Keyboard Accessibility**: The Data Pipeline tabs implement full W3C APG standards (`ArrowLeft`/`ArrowRight`/`Home`/`End`) with proper semantic ARIA attributes.

### Priority Issues (P0–P3)

- **[P1] Structural Monotony & "Box-in-a-Box" Frame Exhaustion**
  - *Why it matters*: Every section rigidly repeats the identical 4-col / 8-col split wrapped in bordered cards flanked by repetitive `+` crosshairs. Visitors develop border fatigue and skim past secondary projects and invariants.
  - *Fix*: Break the layout rhythm. Let Case Files flow as an open, borderless editorial spread with generous dividers. Restrict CAD `+` crosshairs strictly to technical diagrams.
  - *Suggested command*: `/impeccable layout` (or `/impeccable quieter`)

- **[P1] Cognitive Overload & Redundant Navigation in "Verinin Yolu"**
  - *Why it matters*: Section 01 presents four competing interaction models simultaneously: sticky sidebar links, SVG bus tap nodes, horizontal tab cards, and an ambient looping pulse packet. Visitors hesitate over what to click.
  - *Fix*: Unify the SVG bus and tab cards into a single cohesive interactive hardware bus. Convert the sidebar into a quiet, passive indicator. Make the traveling packet pulse once on station transition rather than looping continuously.
  - *Suggested command*: `/impeccable distill` (or `/impeccable clarify`)

- **[P2] WCAG AA Contrast Failures on Muted Badges and Dark Accents**
  - *Why it matters*: `--text-dim: #64748B` fails 4.5:1 on both light and dark themes. In dark mode, white text on cyan `#38BDF8` drops to 2.16:1; green status on paper drops to 2.30:1. Technical tags become unreadable under glare.
  - *Fix*: Separate light and dark tokens. In light mode, set `--text-dim: #475569` (>7:1) and status green `#047857`. In dark mode, set `--text-dim: #94A3B8` (>7:1) and ensure accent badges use dark ink text (`text-[#0A0F1D]`).
  - *Suggested command*: `/impeccable harden` (or `/impeccable colorize`)

- **[P2] Micro-Typography & Overused Template Sans (`Geist`)**
  - *Why it matters*: 42 instances of 9px–10px micro-labels impair legibility on mobile. Relying on Geist Sans dilutes the bespoke systems engineer identity with modern AI boilerplate feel.
  - *Fix*: Elevate body typography to `IBM Plex Sans` (engineered specifically for technical and industrial data), enforce an 11px/12px floor for all labels, and apply `text-wrap: pretty;` to eliminate trailing single-word stragglers.
  - *Suggested command*: `/impeccable typeset`

### Persona Red Flags
- **Alex (Principal Architect / Power User)**: Cannot deep-link or share a specific pipeline stage (e.g. TimescaleDB storage) with team leads because station clicks do not update the URL hash (`#pipeline` stays static). The continuous ambient pulse packet is visually distracting when reading technical failure notes.
- **Jordan (Technical Recruiter / First-Timer)**: The poetic hero title requires scrolling to find Ahmet's formal engineering title. Clicking the primary hero CTA ("Vaka Çalışmalarını İncele") jumps straight to `#cases`, bypassing Section 01 ("Verinin Yolu") which is the strongest visual proof of full-stack capability.
- **Sam (Accessibility / Keyboard User)**: Tabbing through Section 01 forces redundant focus steps through both SVG nodes and tab buttons for the same 6 stations. 9px–10px text in slate gray washes out completely at standard zoom.

### Minor Observations
1. **Nav Width Jitter**: In `Header.astro`, the theme button toggles between "KOYU" and "AÇIK", causing a 2px horizontal layout shift in surrounding links due to different character widths.
2. **Hardcoded i18n String**: In `secondaryProjects.ts`, the Proxmox project year is hardcoded as `"2023–günümüz"`, causing Turkish to leak into the English view.
3. **Hero Portrait Hover Gate**: Grayscale-to-color transition requires desktop mouse hover; mobile visitors only see high-contrast monochrome.
4. **Copy Toast Collision**: In `ContactSection.astro`, copying the email triggers native browser tooltip `title="E-postayı kopyala"`, which visually occludes the inline `"✓ Kopyalandı!"` confirmation text.

### Questions to Consider
1. *If an engineering VP or CTO has only 60 seconds, which single system proves your senior caliber beyond doubt—and why does it share equal visual weight with five other sections?*
2. *The CAD crosshairs and hardware bus strongly broadcast 'Embedded Systems,' yet your highest-impact wins are in distributed zero-copy streaming, high-throughput database sharding, and sub-millisecond auth. Do the hardware visual motifs inadvertently understate your backend infrastructure depth?*
3. *What if 'Verinin Yolu' wasn't just a self-contained interactive widget, but the visual spine of the entire page, directly unfolding from edge sensors into deep case studies?*
