import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_META } from '../data/siteMeta';
import { getPostSlug } from '../data/slugUtils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Ahmet İhtiyar — Mühendislik Yazıları',
    description: SITE_META.bioShort.tr,
    site: context.site || SITE_META.siteUrl,
    items: posts
      .filter((p) => p.data.lang === 'tr')
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.summary,
        link: `/posts/${getPostSlug(post)}`,
      })),
    customData: `<language>tr-TR</language>`,
  });
}
