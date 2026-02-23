import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { AdventureCategoryBadge } from '@/components/Adventures';

const adventures = siteContent.adventures.items;
const contact = siteContent.contact;
const { seo, siteName } = siteContent;

type Params = { slug: string };

export function generateStaticParams() {
  return adventures.map((adv) => ({ slug: adv.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const adventure = adventures.find((a) => a.slug === params.slug);

  if (!adventure) {
    return { title: `Adventure not found | ${siteName}` };
  }

  // Use the adventure's own image for social sharing; fall back to seo.defaultImage
  const ogImage = adventure.image.startsWith('http')
    ? adventure.image
    : `${seo.siteUrl}${adventure.image}`;

  return {
    title: `${adventure.title} | Adventures | ${siteName}`,
    description: adventure.description,
    keywords: `${adventure.title.toLowerCase()} pokhara, ${seo.keywords}`,
    openGraph: {
      title: `${adventure.title} | ${siteName}`,
      description: adventure.description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: adventure.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${seo.twitterHandle}`,
      title: `${adventure.title} | ${siteName}`,
      description: adventure.description,
      images: [ogImage],
    },
  };
}

export default function AdventureDetailPage({ params }: { params: Params }) {
  const adventure = adventures.find((a) => a.slug === params.slug);

  if (!adventure) {
    return (
      <main className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs
            segments={[
              { label: 'Home', href: '/' },
              { label: 'Adventures', href: '/#adventures' },
              { label: 'Not found' },
            ]}
          />
          <p className="mt-6 text-gray-700">This adventure could not be found.</p>
        </div>
      </main>
    );
  }

  const isExternal = adventure.image.startsWith('http');
  const baseMessage = contact.whatsAppMessageAdventure.replace('[ADVENTURE]', adventure.title);
  const whatsAppHref = contact.whatsAppNumber
    ? `https://wa.me/${contact.whatsAppNumber}?text=${encodeURIComponent(baseMessage)}`
    : null;

  return (
    <main className="bg-secondary pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Breadcrumbs
          segments={[
            { label: 'Home', href: '/' },
            { label: 'Adventures', href: '/#adventures' },
            { label: adventure.title },
          ]}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-accent bg-white shadow-sm">
          {/* Hero image */}
          <div className="relative h-64 sm:h-80">
            {isExternal ? (
              <Image
                src={adventure.image}
                alt={adventure.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized={adventure.image.startsWith('https://images.unsplash.com')}
              />
            ) : (
              <Image
                src={adventure.image}
                alt={adventure.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* ── Category badge — prominently displayed near the title ── */}
            <div className="mb-3">
              <AdventureCategoryBadge category={adventure.category} />
            </div>

            <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              {adventure.title}
            </h1>
            <p className="mt-3 text-gray-700 font-medium">{adventure.description}</p>
            <p className="mt-5 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
              {adventure.fullDescription}
            </p>

            {/* Booking info box */}
            <section className="mt-8 rounded-xl bg-accent p-5">
              <h2 className="font-heading text-lg font-semibold text-primary">
                How to book this adventure
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                All adventures are arranged through our on-site travel desk once you arrive at
                Lazy Lads. This way we can:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li>Check the latest weather and safety updates.</li>
                <li>Match you with a guide or operator that fits your style.</li>
                <li>Help you organise gear rental, transport, and snacks.</li>
              </ul>
              <p className="mt-3 text-sm text-gray-700">
                Just mention this adventure at reception and we will walk you through options,
                pricing, and departure times.
              </p>
              {whatsAppHref && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#22c35e] transition-colors"
                  >
                    Chat on WhatsApp about {adventure.title}
                  </a>
                </div>
              )}
            </section>

            {/* Back links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#adventures"
                className="inline-flex items-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-secondary transition-colors"
              >
                ← Back to all adventures
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border border-accent px-4 py-2 text-sm text-gray-700 hover:bg-accent transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
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