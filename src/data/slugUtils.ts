export function getPostSlug(post: { id: string; data?: { slug?: string } }): string {
  if (post.data?.slug) {
    return post.data.slug;
  }
  // Remove file extensions and language suffixes (.tr, -tr)
  return post.id
    .replace(/\.(md|mdx)$/, '')
    .replace(/(\.tr|-tr)$/, '');
}
