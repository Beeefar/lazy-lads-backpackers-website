import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { siteContent } from '@/config/site-content';

const posts = siteContent.blog.posts;
const { seo, siteName, hotel } = siteContent;

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: `Post not found | ${siteName}` };
  }

  const pageUrl = `${seo.siteUrl}/blog/${post.slug}`;
  const ogImage = post.image.startsWith('http')
    ? post.image
    : `${seo.siteUrl}${post.image}`;

  return {
    title: `${post.title} | ${siteName}`,
    description: post.excerpt,
    keywords: `${post.category.toLowerCase()}, ${seo.keywords}`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${post.title} | ${siteName}`,
      description: post.excerpt,
      type: 'article',
      url: pageUrl,
      publishedTime: post.date,
      authors: [hotel.legalName],
      tags: [post.category],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${seo.twitterHandle}`,
      title: `${post.title} | ${siteName}`,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

/** Category badge colour map */
const categoryStyles: Record<string, string> = {
  'Hostel Life': 'bg-blue-100 text-blue-800',
  'Travel Guide': 'bg-emerald-100 text-emerald-800',
  Adventure: 'bg-orange-100 text-orange-800',
  'Digital Nomad': 'bg-violet-100 text-violet-800',
};

function CategoryBadge({ category }: { category: string }) {
  const cls = categoryStyles[category] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide ${cls}`}>
      {category}
    </span>
  );
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs
            segments={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Not found' },
            ]}
          />
          <p className="mt-6 text-gray-700">This post could not be found.</p>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pageUrl = `${seo.siteUrl}/blog/${post.slug}`;
  const postImage = post.image.startsWith('http')
    ? post.image
    : `${seo.siteUrl}${post.image}`;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: postImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: hotel.legalName,
      url: seo.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: hotel.legalName,
      url: seo.siteUrl,
      logo: { '@type': 'ImageObject', url: `${seo.siteUrl}/images/icons/logo.png` },
    },
    mainEntityOfPage: pageUrl,
    inLanguage: 'en',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: seo.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${seo.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <main className="bg-secondary pb-16 pt-10 sm:pb-24 sm:pt-16">
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          segments={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <article className="mt-6 rounded-2xl border border-accent bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={post.category} />
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 font-medium text-gray-600">{post.excerpt}</p>
          <hr className="my-6 border-accent" />
          <div className="space-y-4 text-sm leading-relaxed text-gray-800 whitespace-pre-line">
            {post.content}
          </div>
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-secondary transition-colors"
          >
            ← Back to all posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-accent px-4 py-2 text-sm text-gray-700 hover:bg-accent transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

type Crumb = { label: string; href?: string };

function Breadcrumbs({ segments }: { segments: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-medium text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {segments.map((seg, index) => (
          <li key={`${seg.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <span className="text-gray-400">/</span>}
            {seg.href ? (
              <Link href={seg.href} className="hover:text-primary">{seg.label}</Link>
            ) : (
              <span className="text-primary">{seg.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
