export const GREAT_FOR_SUGGESTIONS = [
  "Date Night",
  "Brunch",
  "Groups",
  "Solo",
  "Late Night",
  "Outdoor Seating",
  "Happy Hour",
  "Takeout",
];

export function parseGreatFor(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function serializeGreatFor(tags: string[]): string | null {
  return tags.length > 0 ? tags.join(",") : null;
}
