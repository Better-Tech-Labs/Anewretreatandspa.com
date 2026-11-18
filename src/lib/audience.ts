/**
 * Which audience a visitor belongs to, remembered in a first-party cookie so
 * the site can keep showing them the layout that matches the ad they came from.
 *
 * Everything here is pure (no window/document) so it can be tested; the
 * browser side lives in src/components/AudienceTracker.tsx.
 */

export const AUDIENCES = ["corporate"] as const;
export type Audience = (typeof AUDIENCES)[number];

/** Ad links are tagged ?aud=<audience>. ?aud=reset forgets the audience. */
export const AUDIENCE_PARAM = "aud";
export const AUDIENCE_RESET = "reset";

export const AUDIENCE_COOKIE = "anew_aud";
const DAYS_REMEMBERED = 30;
export const AUDIENCE_MAX_AGE_SECONDS = DAYS_REMEMBERED * 24 * 60 * 60;

/** The landing page built for each audience. Arriving on it from outside the site counts as joining the audience. */
export const AUDIENCE_HOME: Record<Audience, string> = {
  corporate: "/corporate-retreats",
};

export type AudienceSignal = Audience | typeof AUDIENCE_RESET | null;

export type AudienceDecision =
  | { action: "set"; audience: Audience }
  | { action: "clear" }
  | { action: "keep" };

function toAudience(value: string | null | undefined): Audience | null {
  const wanted = value?.trim().toLowerCase();
  return AUDIENCES.find((audience) => audience === wanted) ?? null;
}

/** Reads ?aud= from a location.search string. Unknown values are ignored. */
export function audienceSignalFromQuery(search: string): AudienceSignal {
  const raw = new URLSearchParams(search).get(AUDIENCE_PARAM);
  if (raw?.trim().toLowerCase() === AUDIENCE_RESET) return AUDIENCE_RESET;
  return toAudience(raw);
}

/** The audience whose landing page this is, if any. */
export function audienceForPath(pathname: string): Audience | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return AUDIENCES.find((audience) => AUDIENCE_HOME[audience] === path) ?? null;
}

interface PageView {
  search: string;
  pathname: string;
  /** True when this is the page the visitor arrived on from outside the site (an ad, a search result, a typed address). */
  isEntryPage: boolean;
}

/**
 * What a page view does to the remembered audience. A tagged link always
 * decides, so the most recent ad click wins. An audience page counts only when
 * the visitor arrived on it: someone browsing the general site who clicks
 * through to the corporate page is not moved into the corporate version.
 */
export function decideAudience({ search, pathname, isEntryPage }: PageView): AudienceDecision {
  const signal = audienceSignalFromQuery(search);
  if (signal === AUDIENCE_RESET) return { action: "clear" };
  const audience = signal ?? (isEntryPage ? audienceForPath(pathname) : null);
  return audience ? { action: "set", audience } : { action: "keep" };
}

/** The remembered audience from a document.cookie string. Anything unexpected reads as none. */
export function readAudience(cookieHeader: string): Audience | null {
  const prefix = `${AUDIENCE_COOKIE}=`;
  const pair = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return pair ? toAudience(pair.slice(prefix.length)) : null;
}

interface CookieOptions {
  /** True on https. Left off for plain-http local testing, where browsers may drop Secure cookies. */
  secure: boolean;
}

function cookieString(value: string, maxAgeSeconds: number, { secure }: CookieOptions): string {
  const parts = [`${AUDIENCE_COOKIE}=${value}`, `Max-Age=${maxAgeSeconds}`, "Path=/", "SameSite=Lax"];
  return (secure ? [...parts, "Secure"] : parts).join("; ");
}

/** Value to assign to document.cookie to remember an audience for 30 days. */
export function audienceCookie(audience: Audience, options: CookieOptions): string {
  return cookieString(audience, AUDIENCE_MAX_AGE_SECONDS, options);
}

/** Value to assign to document.cookie to forget the audience. */
export function clearAudienceCookie(options: CookieOptions): string {
  return cookieString("", 0, options);
}

// ----------------------------------------------------------------------------
// Following the audience around the site.
// ----------------------------------------------------------------------------

const GENERAL_HOME = "/";

/** Event type the inquiry form gets when an audience visitor hasn't picked one. Must be in EVENT_TYPES. */
export const AUDIENCE_EVENT_TYPE: Record<Audience, string> = {
  corporate: "Corporate Retreat",
};

/**
 * The way out: opens the general homepage and forgets the audience. Works as a
 * plain link (new tab, no JavaScript) because ?aud=reset is honoured on arrival.
 */
export const GENERAL_SITE_HREF = `${GENERAL_HOME}?${AUDIENCE_PARAM}=${AUDIENCE_RESET}`;

/** Where the logo and "home" links should go. */
export function homeHrefFor(audience: Audience | null): string {
  return audience ? AUDIENCE_HOME[audience] : GENERAL_HOME;
}

interface HomeVisit {
  pathname: string;
  search: string;
  hash: string;
  cookieHeader: string;
}

/**
 * Where to send a visitor who opened the general homepage, or null to leave
 * them there. Only "/" redirects; a link to a homepage section (/#contact) and
 * ?aud=reset are honoured as asked. Ad parameters are kept so attribution survives.
 */
export function homeRedirectTarget({ pathname, search, hash, cookieHeader }: HomeVisit): string | null {
  if (pathname !== GENERAL_HOME || hash) return null;
  const signal = audienceSignalFromQuery(search);
  if (signal === AUDIENCE_RESET) return null;
  const audience = signal ?? readAudience(cookieHeader);
  return audience ? `${AUDIENCE_HOME[audience]}${search}` : null;
}

/**
 * The same rule as homeRedirectTarget, as a tiny script for the page <head>.
 * It runs before anything is drawn, so a corporate visitor never sees the
 * general homepage flash by. Built from the constants above and checked
 * against homeRedirectTarget case by case in audience.test.ts.
 */
export const HOME_REDIRECT_SCRIPT = `(function(){try{
var l=location;if(l.pathname!==${JSON.stringify(GENERAL_HOME)}||l.hash)return;
var homes=${JSON.stringify(AUDIENCE_HOME)};
var own=function(k){return typeof k==="string"&&Object.prototype.hasOwnProperty.call(homes,k)};
var q=new URLSearchParams(l.search).get(${JSON.stringify(AUDIENCE_PARAM)});
q=q?q.trim().toLowerCase():"";
if(q===${JSON.stringify(AUDIENCE_RESET)})return;
var a=q;
if(!own(a)){var m=document.cookie.match(/(?:^|;\\s*)${AUDIENCE_COOKIE}=([^;]*)/);a=m?m[1].trim().toLowerCase():""}
if(own(a))l.replace(homes[a]+l.search);
}catch(e){}})();`;
