"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  /** True until the sign-in state is known. */
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function useAuth() {
  return useContext(AuthContext);
}

/** Pages that need the sign-in state the moment they open. */
const AUTH_PAGES = ["/profile", "/chef-portal", "/booking", "/chefs"];
/** Remembers, in this browser only, that someone is signed in. Holds no account details. */
const SIGNED_IN_HINT_KEY = "anew_signed_in";

function readSignedInHint(): boolean {
  try {
    return window.localStorage.getItem(SIGNED_IN_HINT_KEY) === "1";
  } catch {
    return false; // Storage blocked: fall back to loading on first interaction.
  }
}

function writeSignedInHint(isSignedIn: boolean): void {
  try {
    if (isSignedIn) window.localStorage.setItem(SIGNED_IN_HINT_KEY, "1");
    else window.localStorage.removeItem(SIGNED_IN_HINT_KEY);
  } catch {
    // Storage blocked: the hint is only a speed-up, so there is nothing to recover.
  }
}
/** Anything that shows a person is really using the page. */
const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((page) => pathname === page || pathname.startsWith(`${page}/`));
}

/**
 * Provides the signed-in user. The sign-in library (Firebase) is about 190KB
 * compressed, and it used to load on every page before anything else. It now
 * loads when it is needed: at once on account, chef and booking pages and for
 * anyone who was signed in on their last visit, and on the first tap, click or
 * key press for everyone else.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const needsAuthNow = isAuthPage(pathname);

  const hasStarted = useRef(false);
  const unsubscribe = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Start once and keep listening for the life of the app, even after leaving an account page.
    const start = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      import("@/lib/auth")
        .then(({ onAuth }) => {
          unsubscribe.current = onAuth((nextUser) => {
            writeSignedInHint(nextUser !== null);
            setUser(nextUser);
            setLoading(false);
          });
        })
        .catch((error: unknown) => {
          console.error("Could not load sign-in", error);
          // Treat as signed out, so pages waiting on `loading` are not stuck.
          setLoading(false);
        });
    };

    if (hasStarted.current) return;
    if (needsAuthNow || readSignedInHint()) {
      start();
      return;
    }
    for (const type of FIRST_INTERACTION_EVENTS) {
      window.addEventListener(type, start, { once: true, passive: true });
    }
    return () => {
      for (const type of FIRST_INTERACTION_EVENTS) window.removeEventListener(type, start);
    };
  }, [needsAuthNow]);

  useEffect(() => () => unsubscribe.current?.(), []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
