import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { getCaseSlug, getPostSlug } from '../../data/slugUtils';

export interface Props {
  title: string;
  subtitle: string;
  badge: string;
  meta?: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine: number = 38): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

function generateSvgCard({ title, subtitle, badge, meta }: Props): string {
  const lines = wrapText(title, 34);
  const tspans = lines
    .map((line, idx) => `<tspan x="96" dy="${idx === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0F1D" />
  
  <!-- Subtle border grid -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#1E293B" stroke-width="2" />
  
  <!-- Top brand bar -->
  <line x1="36" y1="120" x2="1164" y2="120" stroke="#1E293B" stroke-width="1.5" />
  <rect x="76" y="68" width="10" height="24" fill="#38BDF8" />
  <text x="96" y="86" fill="#F1F5F9" font-family="monospace, ui-monospace, sans-serif" font-size="18" font-weight="700" letter-spacing="2">AHMET İHTİYAR</text>
  <text x="270" y="86" fill="#64748B" font-family="monospace, ui-monospace, sans-serif" font-size="16">·</text>
  <text x="290" y="86" fill="#94A3B8" font-family="monospace, ui-monospace, sans-serif" font-size="16">MÜHENDİSLİK DOSYASI</text>
  
  <!-- Badge -->
  <rect x="96" y="168" width="${Math.max(120, badge.length * 11 + 24)}" height="32" rx="2" fill="#38BDF8" fill-opacity="0.16" stroke="#38BDF8" stroke-width="1.5" />
  <text x="108" y="190" fill="#38BDF8" font-family="monospace, ui-monospace, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">${escapeXml(badge.toUpperCase())}</text>
  
  <!-- Title -->
  <text x="96" y="275" fill="#F1F5F9" font-family="Georgia, serif" font-size="44" font-weight="500" letter-spacing="-0.5">
    ${tspans}
  </text>
  
  <!-- Subtitle -->
  <text x="96" y="460" fill="#94A3B8" font-family="sans-serif, -apple-system, BlinkMacSystemFont" font-size="22" font-weight="400">
    ${escapeXml(subtitle)}
  </text>
  
  <!-- Bottom footer -->
  <line x1="36" y1="510" x2="1164" y2="510" stroke="#1E293B" stroke-width="1.5" />
  <text x="96" y="555" fill="#64748B" font-family="monospace, ui-monospace, sans-serif" font-size="15">
    ahmetihtiyar.com ${meta ? `· ${escapeXml(meta)}` : '· Telemetri ve Veri Altyapısı'}
  </text>
  <circle cx="1100" cy="550" r="5" fill="#38BDF8" />
</svg>`;
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { slug: 'index' },
      props: {
        title: 'Gömülü uç sistemlerden dağıtık mimarilere telemetri ve veri altyapıları geliştiriyorum.',
        subtitle: 'Ahmet İhtiyar — Sistem ve Arka Uç Mühendisi | Diverjans IT',
        badge: 'Mühendislik Dosyası',
        meta: 'ESP32 · RabbitMQ · TimescaleDB · Arrow · Keycloak',
      },
    },
    {
      params: { slug: 'en/index' },
      props: {
        title: 'Engineering telemetry and data infrastructure from embedded edge to distributed backends.',
        subtitle: 'Ahmet İhtiyar — Systems & Backend Engineer | Istanbul',
        badge: 'Engineering Dossier',
        meta: 'ESP32 · RabbitMQ · TimescaleDB · Arrow · Keycloak',
      },
    },
  ];

  // Cases
  const cases = await getCollection('cases');
  for (const entry of cases) {
    const isEn = entry.data.lang === 'en';
    const slug = getCaseSlug(entry);
    paths.push({
      params: { slug: isEn ? `en/cases/${slug}` : `cases/${slug}` },
      props: {
        title: entry.data.title,
        subtitle: entry.data.tagline,
        badge: entry.data.fileNumber,
        meta: entry.data.stack.slice(0, 4).join(' · '),
      },
    });
  }

  // Posts
  const posts = await getCollection('posts');
  for (const post of posts) {
    const isEn = post.data.lang === 'en';
    const slug = getPostSlug(post);
    paths.push({
      params: { slug: isEn ? `en/posts/${slug}` : `posts/${slug}` },
      props: {
        title: post.data.title,
        subtitle: post.data.summary,
        badge: isEn ? 'Technical Note' : 'Mühendislik Yazısı',
        meta: `${post.data.date} · ${post.data.tags.slice(0, 3).join(', ')}`,
      },
    });
  }

  return paths;
}

export async function GET({ props }: { props: Props }) {
  const svg = generateSvgCard(props);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
