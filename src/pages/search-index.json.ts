import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import GithubSlugger from 'github-slugger';
import { getPostSlug } from '../data/slugUtils';
import {
  calculateReadingTime,
  getCategoryMetaForSlug,
  getParentSlugSet,
  resolvePostBadge,
  sortPostsSmart
} from '../utils/postHelpers';

interface HeadingItem {
  depth: 2 | 3;
  text: string;
  slug: string;
}

interface SectionChunk {
  headingSlug: string;
  headingText: string;
  text: string;
}

function stripInlineMarkdown(input: string): string {
  // Replace inline code first without stripping underscores inside identifiers
  const codeTokens: string[] = [];
  const withPlaceholders = input.replace(/`([^`]+)`/g, (_m, code) => {
    const idx = codeTokens.length;
    codeTokens.push(code);
    return `@@CODE${idx}@@`;
  });

  const stripped = withPlaceholders
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/(?<![\w])__([^_]+)__(?![\w])/g, '$1')
    .replace(/(?<![\w])_([^_]+)_(?![\w])/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return stripped.replace(/@@CODE(\d+)@@/g, (_m, idxStr) => codeTokens[Number(idxStr)] || '');
}

function cleanBodyText(raw: string): string {
  return raw
    .replace(/^import\s+.*$/gm, ' ')
    .replace(/<Mermaid[\s\S]*?\/>/g, ' ')
    .replace(/<References[\s\S]*?\/>/g, ' ')
    .replace(/<Figure[\s\S]*?\/>/g, ' ')
    .replace(/<DataPageAnatomy[\s\S]*?\/>/g, ' ')
    .replace(/```[\s\S]*?```/g, (block) => {
      // Retain SQL/identifier tokens inside code blocks for parameter/command searchability while removing fence markers
      return block
        .replace(/```[a-zA-Z0-9_-]*\n?/g, ' ')
        .replace(/```/g, ' ')
        .replace(/--.*$/gm, ' ')
        .replace(/\s+/g, ' ');
    })
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^>\s*(\[![A-Z]+\])?/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(/---+/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeadingsAndSections(body: string): {
  headings: HeadingItem[];
  sections: SectionChunk[];
} {
  const slugger = new GithubSlugger();
  const headings: HeadingItem[] = [];
  const sections: SectionChunk[] = [];

  const lines = body.split(/\r?\n/);
  let inCodeFence = false;
  let inJsxTag = false;

  let currentHeadingSlug = '';
  let currentHeadingText = '';
  let currentBuffer: string[] = [];

  const flushSection = () => {
    const cleaned = cleanBodyText(currentBuffer.join('\n'));
    if (cleaned.length > 0) {
      sections.push({
        headingSlug: currentHeadingSlug,
        headingText: currentHeadingText,
        text: cleaned,
      });
    }
    currentBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      currentBuffer.push(line);
      continue;
    }

    if (!inCodeFence) {
      if (/^<(Mermaid|References|Figure|DataPageAnatomy)\b/.test(trimmed) && !trimmed.includes('/>')) {
        inJsxTag = true;
        continue;
      }
      if (inJsxTag) {
        if (trimmed.includes('/>')) {
          inJsxTag = false;
        }
        continue;
      }

      const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*$/);
      if (headingMatch) {
        flushSection();
        const depth = headingMatch[1].length as 2 | 3;
        const cleanText = stripInlineMarkdown(headingMatch[2]);
        const slug = slugger.slug(cleanText);
        headings.push({ depth, text: cleanText, slug });
        currentHeadingSlug = slug;
        currentHeadingText = cleanText;
        continue;
      }
    }

    currentBuffer.push(line);
  }

  flushSection();

  return { headings, sections };
}

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('posts');
  const sortedPosts = sortPostsSmart(allPosts);
  const parentSlugs = getParentSlugSet(allPosts);

  const items = await Promise.all(
    sortedPosts.map(async (post) => {
      const slug = getPostSlug(post);
      const { groupTitle, sectionTitle } = getCategoryMetaForSlug(slug);
      const { sections } = extractHeadingsAndSections(post.body || '');
      const { headings: renderedHeadings } = await render(post);
      const headings: HeadingItem[] = renderedHeadings
        .filter((h) => h.depth === 2 || h.depth === 3)
        .map((h) => ({
          depth: h.depth as 2 | 3,
          text: h.text,
          slug: h.slug,
        }));
      const readingTime = calculateReadingTime(post.body, post.data.readingTime);
      const badge = resolvePostBadge(post, parentSlugs);

      return {
        id: slug,
        lang: post.data.lang || 'tr',
        translationKey: post.data.translationKey || null,
        url: `/posts/${slug}`,
        title: post.data.title,
        category: groupTitle !== 'Teknik Notlar' ? groupTitle : sectionTitle,
        section: sectionTitle,
        badge: badge || null,
        readingTime,
        tags: post.data.tags,
        summary: post.data.summary,
        headings,
        sections,
      };
    })
  );

  return new Response(
    JSON.stringify({
      version: 1,
      total: items.length,
      items,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );
};
