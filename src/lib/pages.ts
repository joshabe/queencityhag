import sanitizeHtml from "sanitize-html";

export const PAGE_SLUGS = ["about"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export function isPageSlug(value: string): value is PageSlug {
  return (PAGE_SLUGS as readonly string[]).includes(value);
}

// Shown until the page is first saved from the admin editor.
export const DEFAULT_PAGE_HTML: Record<PageSlug, string> = {
  about:
    "<p>If a french tire company can tell you where to eat, I can make a list too.</p>" +
    "<p>This is a Charlotte-native's guide to the best food and drinks in the Queen City and beyond. If you're looking for a great date night or a place to take your parents while they're in town, you can trust the hag to give it to you straight.</p>" +
    '<p data-variant="fine">All opinions expressed and restaurants visited by a real person who paid for their own food (meaning, honest, real reviews).</p>',
};

export function sanitizePageHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      p: ["data-variant"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
      p: (tagName, attribs) => {
        const kept: Record<string, string> = {};
        if (attribs["data-variant"] === "fine") kept["data-variant"] = "fine";
        return { tagName, attribs: kept };
      },
    },
  });
}
