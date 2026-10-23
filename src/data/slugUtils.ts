export function getPostSlug(post: { id: string; data?: { slug?: string } }): string {
  if (post.data?.slug) {
    return post.data.slug;
  }
  // Remove file extensions and language suffixes (.tr, -tr, .en, -en)
  return post.id
    .replace(/\.(md|mdx)$/, '')
    .replace(/(\.tr|-tr|\.en|-en)$/, '');
}

export function getCaseSlug(entry: { id: string; data?: { slug?: string } }): string {
  if (entry.data?.slug) {
    return entry.data.slug;
  }
  // Remove file extensions and language suffixes (.tr, -tr, .en, -en)
  return entry.id
    .replace(/\.(md|mdx)$/, '')
    .replace(/(\.tr|-tr|\.en|-en)$/, '');
}
