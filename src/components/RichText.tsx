import Link from "next/link";
import { isExternalHref, parseInlineLinks } from "@/lib/richText";

const LINK_CLASS = "text-dark underline decoration-dark/30 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors";

/** Renders copy from a content file, turning [label](/path) into links. */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {parseInlineLinks(text).map((part, i) => {
        if (!part.href) return <span key={i}>{part.text}</span>;
        return isExternalHref(part.href) ? (
          <a key={i} href={part.href} className={LINK_CLASS} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        ) : (
          <Link key={i} href={part.href} className={LINK_CLASS}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}
