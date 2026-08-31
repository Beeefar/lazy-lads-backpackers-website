import type { MetadataRoute } from 'next';
import { siteContent } from '@/config/site-content';

const { seo, blog, adventures } = siteContent;
const baseUrl = seo.siteUrl;
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adventures`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reserve`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // ── Blog post routes ───────────────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = blog.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ── Adventure routes ───────────────────────────────────────────────────────
  const adventureRoutes: MetadataRoute.Sitemap = adventures.items.map((adventure) => ({
    url: `${baseUrl}/adventures/${adventure.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...adventureRoutes];
}
