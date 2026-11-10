export function getPostSlug(post: { id: string; data?: { slug?: string } }): string {
  if (post.data?.slug) {
    return post.data.slug;
  }
  // Remove file extensions and language suffixes (.tr, -tr, .en, -en)
  return post.id
    .replace(/\.(md|mdx)$/, '')
    .replace(/(\.tr|-tr|\.en|-en)$/, '');
}

export const POST_TRANSLATIONS: Record<string, string> = {
  'arrow-ile-dbden-tarayiciya-zero-copy': 'zero-copy-from-db-to-browser-with-apache-arrow',
  'zero-copy-from-db-to-browser-with-apache-arrow': 'arrow-ile-dbden-tarayiciya-zero-copy',
  'awr-ve-ash-ile-bir-oracle-darbogazini-bulmak': 'hunting-oracle-bottlenecks-with-awr-and-ash',
  'hunting-oracle-bottlenecks-with-awr-and-ash': 'awr-ve-ash-ile-bir-oracle-darbogazini-bulmak',
  'dedicated-sunucuya-sifirdan-proxmox-ag-ve-firewall-notlari': 'from-scratch-proxmox-on-dedicated-server-network-and-firewall',
  'from-scratch-proxmox-on-dedicated-server-network-and-firewall': 'dedicated-sunucuya-sifirdan-proxmox-ag-ve-firewall-notlari',
  'jwtde-yetki-tasimak-neden-her-zaman-iyi-fikir-degil': 'why-carrying-permissions-in-jwt-is-bad',
  'why-carrying-permissions-in-jwt-is-bad': 'jwtde-yetki-tasimak-neden-her-zaman-iyi-fikir-degil',
  'timescaledb-continuous-aggregates-ve-retention-pratikte': 'timescaledb-continuous-aggregates-and-retention-in-practice',
  'timescaledb-continuous-aggregates-and-retention-in-practice': 'timescaledb-continuous-aggregates-ve-retention-pratikte',
};

export function getCaseSlug(entry: { id: string; data?: { slug?: string } }): string {
  if (entry.data?.slug) {
    return entry.data.slug;
  }
  // Remove file extensions and language suffixes (.tr, -tr, .en, -en)
  return entry.id
    .replace(/\.(md|mdx)$/, '')
    .replace(/(\.tr|-tr|\.en|-en)$/, '');
}

export function getPostTranslationSlug(slug: string): string | undefined {
  return POST_TRANSLATIONS[slug];
}



