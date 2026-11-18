import { EVENT_TYPES } from "./booking.ts";

export const INQUIRE_PATH = "/inquire";
const TYPE_PARAM = "type";

/** The EVENT_TYPES entry matching `value` (case-insensitive), or "" if none does. */
function matchEventType(value: string | null | undefined): string {
  const wanted = value?.trim().toLowerCase();
  if (!wanted) return "";
  return EVENT_TYPES.find((t) => t.toLowerCase() === wanted) ?? "";
}

/**
 * Link to the inquiry form, pre-selecting `type` when it is a real event type.
 * An unknown type falls back to the plain form rather than a broken prefill.
 */
export function inquireHref(type?: string): string {
  const known = matchEventType(type);
  if (!known) return INQUIRE_PATH;
  return `${INQUIRE_PATH}?${new URLSearchParams({ [TYPE_PARAM]: known })}`;
}

/** Reads ?type= from a location.search string. Only exact event types are accepted. */
export function eventTypeFromQuery(search: string): string {
  return matchEventType(new URLSearchParams(search).get(TYPE_PARAM));
}
