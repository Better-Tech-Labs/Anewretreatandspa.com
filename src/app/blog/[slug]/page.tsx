import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import PostCard from "@/components/blog/PostCard";
import RichText from "@/components/RichText";
import { blogPosts, findPost } from "@/content/blog";
import type { BlogPost } from "@/content/blog/types";
import { formatPostDate, readingMinutes } from "@/lib/blog";
import { SITE_NAME, SITE_URL, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, jsonLd } from "@/lib/structuredData";

/** Only the articles listed in src/content/blog exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const RELATED_COUNT = 2;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return pageMeta({ title: `${post.title} | ANEW Journal`, description: post.description, path: `/blog/${post.slug}` });
}

function articleSchema(post: BlogPost): Record<string, unknown> {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const publisher = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `${SITE_URL}${post.image.src}`,
    author: publisher,
    publisher,
    mainEntityOfPage: url,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((other) => other.slug !== post.slug).slice(0, RELATED_COUNT);
  const [lead, ...introRest] = post.intro;

  return (
    <article className="pt-36 sm:pt-44 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(post)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema(SITE_URL, [
              { name: "Home", path: "/" },
              { name: "Journal", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(post.faqs)) }} />
      )}

      <header className="px-6 max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-accent-deep mb-6">
          <Link href="/blog" className="hover:text-dark transition-colors">Journal</Link>
          <span aria-hidden="true" className="text-border mx-2">/</span>
          {post.category}
        </p>
        <h1 className="font-heading font-normal text-4xl sm:text-5xl lg:text-6xl text-dark leading-[1.08] mb-6">{post.title}</h1>
        <p className="text-xs tracking-[0.15em] uppercase text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true" className="mx-2">·</span>
          {readingMinutes(post)} min read
        </p>
      </header>

      <div className="px-6 max-w-5xl mx-auto mb-14 sm:mb-20">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="px-6 max-w-2xl mx-auto">
        {lead && (
          <p className="font-heading text-2xl sm:text-[1.7rem] leading-[1.45] text-dark mb-8">
            <RichText text={lead} />
          </p>
        )}
        {introRest.map((paragraph) => (
          <p key={paragraph} className="text-[17px] leading-[1.8] text-muted mb-6">
            <RichText text={paragraph} />
          </p>
        ))}

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-14">
            <h2 className="font-heading font-normal text-3xl text-dark leading-tight mb-6">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.8] text-muted mb-6">
                <RichText text={paragraph} />
              </p>
            ))}
            {section.bullets && (
              <ul className="space-y-3 mb-6">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4 text-[17px] leading-[1.7] text-muted">
                    <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span><RichText text={bullet} /></span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {post.faqs && post.faqs.length > 0 && (
          <section aria-labelledby="post-faq" className="mt-16">
            <h2 id="post-faq" className="font-heading font-normal text-3xl text-dark leading-tight mb-4">Common questions</h2>
            {post.faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-border">
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <h3 className="text-dark text-[16px] pr-4 group-hover:text-primary transition-colors">{faq.q}</h3>
                  <ChevronDown className="w-4 h-4 text-muted shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="text-[15px] text-muted leading-relaxed pb-5">{faq.a}</p>
              </details>
            ))}
          </section>
        )}

        <aside className="mt-16 border border-border bg-cream/60 px-7 py-10 sm:px-12 sm:py-12 text-center">
          <h2 className="font-heading font-normal text-3xl text-dark mb-4">{post.cta.heading}</h2>
          <p className="text-muted text-[15px] leading-relaxed max-w-md mx-auto mb-8">{post.cta.text}</p>
          <Link
            href={post.cta.href}
            className="inline-block text-[11px] tracking-[0.3em] uppercase bg-dark text-white px-8 py-3.5 hover:bg-accent transition-colors duration-500"
          >
            {post.cta.label}
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="keep-reading" className="px-6 max-w-5xl mx-auto mt-24 pt-16 border-t border-border">
          <h2 id="keep-reading" className="text-[11px] tracking-[0.4em] uppercase text-accent-deep mb-12">Keep reading</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-16">
            {related.map((other) => (
              <PostCard key={other.slug} post={other} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
