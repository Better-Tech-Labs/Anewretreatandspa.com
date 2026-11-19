const CHECKOUT_PATH = "/booking";

/**
 * Value for next/link's `prefetch` prop. The checkout page pulls in Stripe
 * (about 950KB of scripts, iframes and a third-party cookie), and prefetching
 * it loaded all of that on any page with a visible "Book" link. Links to it
 * are therefore never prefetched; every other link keeps the default.
 */
export function prefetchFor(href: string): false | undefined {
  return href === CHECKOUT_PATH || href.startsWith(`${CHECKOUT_PATH}?`) ? false : undefined;
}
