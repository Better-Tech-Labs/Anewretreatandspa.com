import PostCard from "@/components/blog/PostCard";
import { blogPosts } from "@/content/blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The ANEW Journal: Retreat, Wedding & Wellness Planning near Seattle",
  description:
    "Planning guides from ANEW Retreat & Spa in Kenmore, WA: corporate retreats, small weddings, wellness weekends and gatherings near Seattle.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-36 sm:pt-44 pb-28 px-6">
      <div className="max-w-[1400px] mx-auto lg:px-6">
        <header className="max-w-2xl mb-16 sm:mb-24">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">Journal</p>
          <h1 className="font-heading font-normal text-5xl sm:text-6xl text-dark leading-[1.05] mb-6">The ANEW Journal</h1>
          <p className="text-muted text-base leading-relaxed">
            Practical guides for planning a retreat, a small wedding or a weekend away near Seattle, written from the estate in Kenmore.
          </p>
        </header>

        {featured ? (
          <>
            <PostCard post={featured} isFeatured />
            {rest.length > 0 && (
              <section aria-labelledby="more-articles" className="mt-24 pt-16 border-t border-border">
                <h2 id="more-articles" className="text-[11px] tracking-[0.4em] uppercase text-accent mb-12">More articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <p className="text-muted">The first articles are on their way.</p>
        )}
      </div>
    </div>
  );
}
