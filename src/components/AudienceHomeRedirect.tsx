"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { homeRedirectTarget } from "@/lib/audience";

/**
 * Backstop for in-site navigation to the general homepage (a "Back to home"
 * link, the browser's back button). First loads are handled earlier by
 * HOME_REDIRECT_SCRIPT in the page head. Renders nothing.
 */
export default function AudienceHomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    let cookieHeader = "";
    try {
      cookieHeader = document.cookie;
    } catch {
      // Cookies blocked: stay on the general homepage.
    }
    const { pathname, search, hash } = window.location;
    const target = homeRedirectTarget({ pathname, search, hash, cookieHeader });
    if (target) router.replace(target);
  }, [router]);

  return null;
}
