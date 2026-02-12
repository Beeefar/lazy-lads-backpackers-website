import type { Metadata } from 'next';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';

const posts = siteContent.blog.posts;

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post not found | Lazy Lads',
    };
  }

  return {
    title: `${post.title} | Blog | ${siteContent.siteName}`,
    description: post.excerpt,
  };
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
              { label: 'Blog', href: '#blog' },
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
    month: 'short',
    day: 'numeric',
  });

  return (
    <main className="bg-secondary pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          segments={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '#blog' },
            { label: post.title },
          ]}
        />

        <article className="mt-6 rounded-2xl border border-accent bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
            {formattedDate}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-gray-700">{post.excerpt}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-800 whitespace-pre-line">
            {post.content}
          </div>
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#blog"
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

type Crumb = {
  label: string;
  href?: string;
};

function Breadcrumbs({ segments }: { segments: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-medium text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {segments.map((seg, index) => (
          <li key={`${seg.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <span className="text-gray-400">/</span>}
            {seg.href ? (
              <Link href={seg.href} className="hover:text-primary">
                {seg.label}
              </Link>
            ) : (
              <span className="text-primary">{seg.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

