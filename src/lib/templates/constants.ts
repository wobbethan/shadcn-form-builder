export const TEMPLATE_CATEGORIES = [
  "pre-screening",
  "screening",
  "first-visit",
  "second-visit",
  "final-visit",
] as const;

export const TEMPLATE_FALLBACK_SOURCE = "healthcare";

export const TEMPLATE_CATEGORY_LABELS: Record<string, string> = {
  "pre-screening": "Pre-Screening",
  screening: "Screening",
  "first-visit": "First Visit",
  "second-visit": "Second Visit",
  "final-visit": "Final Visit",
};

