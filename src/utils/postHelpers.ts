import type { CollectionEntry } from 'astro:content';
import { getPostSlug } from '../data/slugUtils';
import { navSections } from '../data/navigation';

export function normalizeTurkish(str: string): string {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

export function calculateReadingTime(body?: string, override?: string): string {
  if (override) return override;
  if (!body) return '3 dk okuma';

  const cleanText = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import\s+.*$/gm, '')
    .replace(/<Mermaid[\s\S]*?\/>/g, ' ')
    .replace(/<References[\s\S]*?\/>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, (block) => {
      // Code block'ları çok şişirmeden makul okuma ağırlığıyla say
      const words = block.split(/\s+/).filter(Boolean).length;
      return ' word '.repeat(Math.ceil(words * 0.45));
    })
    .replace(/[#*_`[\]()>|]/g, ' ');

  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(wordCount / 185));
  return `${minutes} dk okuma`;
}

export function getParentSlugSet(posts: CollectionEntry<'posts'>[]): Set<string> {
  const parents = new Set<string>();
  for (const post of posts) {
    if (post.data.parent) {
      parents.add(post.data.parent);
    }
  }
  return parents;
}

export function resolvePostBadge(
  post: CollectionEntry<'posts'>,
  parentSlugs: Set<string>
): string | undefined {
  if (post.data.badge) return post.data.badge;
  const slug = getPostSlug(post);
  if (!post.data.parent && parentSlugs.has(slug)) {
    return 'Ana Rehber';
  }
  if (post.data.tags.some((t) => normalizeTurkish(t) === 'laboratuvar')) {
    return 'Lab';
  }
  return undefined;
}

export function sortPostsSmart(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  const parentSlugs = getParentSlugSet(posts);

  return [...posts].sort((a, b) => {
    const timeDiff = new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    if (timeDiff !== 0) return timeDiff;

    const prioDiff = (b.data.priority ?? 0) - (a.data.priority ?? 0);
    if (prioDiff !== 0) return prioDiff;

    const aSlug = getPostSlug(a);
    const bSlug = getPostSlug(b);
    const aIsParent = !a.data.parent && parentSlugs.has(aSlug);
    const bIsParent = !b.data.parent && parentSlugs.has(bSlug);

    if (aIsParent !== bIsParent) return aIsParent ? -1 : 1;

    // Eğer biri diğerinin parent'ı ise parent üstte gelsin
    if (b.data.parent === aSlug) return -1;
    if (a.data.parent === bSlug) return 1;

    // Aynı seri altındaki alt yazılarda order sırası
    if (a.data.parent && b.data.parent && a.data.parent === b.data.parent) {
      return (a.data.order ?? 99) - (b.data.order ?? 99);
    }

    // Farklı serilerden aynı tarihte olanlarda ana yazı üstte
    if (!a.data.parent && b.data.parent) return -1;
    if (a.data.parent && !b.data.parent) return 1;

    return a.data.title.localeCompare(b.data.title, 'tr');
  });
}

export function getCategoryMetaForSlug(slug: string): {
  sectionTitle: string;
  groupTitle: string;
  isTopLevel: boolean;
} {
  const targetHref = `/posts/${slug}`;
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.href.replace(/\/+$/, '') === targetHref) {
        return {
          sectionTitle: section.title,
          groupTitle: item.title,
          isTopLevel: true,
        };
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.href.replace(/\/+$/, '') === targetHref) {
            return {
              sectionTitle: section.title,
              groupTitle: item.title,
              isTopLevel: false,
            };
          }
        }
      }
    }
  }
  return {
    sectionTitle: 'PostgreSQL',
    groupTitle: 'Teknik Notlar',
    isTopLevel: true,
  };
}
