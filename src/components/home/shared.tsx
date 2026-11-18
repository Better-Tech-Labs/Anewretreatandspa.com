import { Fragment } from "react";
import Link from "next/link";
import InquireLink from "@/components/InquireLink";
import type { SectionAction } from "./types";

export const EYEBROW_CLASS = "text-[11px] tracking-[0.4em] uppercase text-accent mb-4";

export const UNDERLINE_LINK_CLASS =
  "text-[11px] tracking-[0.3em] uppercase text-dark border-b border-dark pb-1 hover:text-accent hover:border-accent transition-colors duration-300";

const SOLID_BUTTON_CLASS =
  "text-[11px] tracking-[0.3em] uppercase bg-dark text-white px-6 py-3 hover:bg-accent transition-colors duration-500";

interface LinesProps {
  lines: readonly string[];
  /** Classes for the <br> between lines, e.g. "hidden sm:block". */
  breakClassName?: string;
}

/** Renders a heading as fixed lines, with a line break between each. */
export function Lines({ lines, breakClassName }: LinesProps) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br className={breakClassName} />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function SectionActionLink({ action }: { action: SectionAction }) {
  if (action.kind === "inquire") {
    return (
      <InquireLink variant="label" type={action.inquireType}>
        {action.label}
      </InquireLink>
    );
  }
  return (
    <Link href={action.href} className={action.kind === "button" ? SOLID_BUTTON_CLASS : UNDERLINE_LINK_CLASS}>
      {action.label}
    </Link>
  );
}
