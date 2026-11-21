/**
 * A date picked on the availability calendar, handed to the inquiry forms on
 * the same page. Kept in memory only: it never reaches the URL or storage.
 */

type Listener = () => void;

let pickedDate = "";
const listeners = new Set<Listener>();

/** Fills "Roughly when?" on every inquiry form currently on the page. `date` is YYYY-MM-DD. */
export function prefillInquiryDate(date: string): void {
  pickedDate = date;
  listeners.forEach((listener) => listener());
}

export function subscribeToPrefillDate(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function readPrefillDate(): string {
  return pickedDate;
}

/** Server render has no picked date. */
export function noPrefillDate(): string {
  return "";
}
