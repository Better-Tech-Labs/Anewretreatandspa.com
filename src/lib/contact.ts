/** The estate's phone line, shown wherever we invite a call. */
export const PHONE_DISPLAY = "(206) 471-1243";
export const PHONE_HREF = "tel:+12064711243";

/** The same number in the international form structured data expects. */
export const PHONE_E164 = "+12064711243";
export const CONTACT_EMAIL = "Admin@anewretreatandspa.com";
/** Where the estate is. Must match the Google Business Profile and the wedding listings exactly. */
export const ADDRESS = {
  street: "16527 74th Ave NE",
  locality: "Kenmore",
  region: "WA",
  postalCode: "98028",
  country: "US",
} as const;
/** Opens the address in Google Maps. */
export const MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `ANEW Retreat and Spa, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
)}`;
/** Google "Locator Plus" map page for the estate, shown in a frame. Allowed by frame-src in firebase.json. */
export const MAP_EMBED_SRC =
  "https://storage.googleapis.com/maps-solutions-6mmvqoyzri/locator-plus/htd6/locator-plus.html";
/** Official profiles, also linked from the footer. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/anewretreatandspa",
  "https://www.facebook.com/anewretreatandspa",
  "https://www.pinterest.com/anewretreatandspa",
] as const;
