import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";
import { formatPostDate, readingMinutes } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
  /** The lead story on the index gets a wide, two-column treatment. */
  isFeatured?: boolean;
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4">
      {post.category} <span aria-hidden="true" className="text-border mx-1">/</span>{" "}
      <time dateTime={post.date} className="text-muted">{formatPostDate(post.date)}</time>
    </p>
  );
}

export default function PostCard({ post, isFeatured = false }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  if (isFeatured) {
    return (
      <article className="group grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <Link href={href} className="lg:col-span-7 relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
          <Image
            src={post.image.src}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="lg:col-span-5">
          <PostMeta post={post} />
          <h2 className="font-heading font-normal text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-dark mb-5">
            <Link href={href} className="hover:text-primary-light transition-colors">{post.title}</Link>
          </h2>
          <p className="text-muted text-[15px] leading-relaxed mb-7 max-w-md">{post.description}</p>
          <Link
            href={href}
            className="text-[11px] tracking-[0.3em] uppercase text-dark border-b border-dark pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
          >
            Read the article <span className="sr-only">: {post.title}</span>
          </Link>
          <p className="text-xs text-muted mt-6">{readingMinutes(post)} min read</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden mb-6" tabIndex={-1} aria-hidden="true">
        <Image
          src={post.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <PostMeta post={post} />
      <h3 className="font-heading font-normal text-2xl leading-snug text-dark mb-3">
        <Link href={href} className="hover:text-primary-light transition-colors">{post.title}</Link>
      </h3>
      <p className="text-muted text-sm leading-relaxed">{post.description}</p>
    </article>
  );
}
