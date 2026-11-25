// Scripted conversation for the project-intake flow.
// Each step asks one thing. Answers are collected into `Answers` and posted to /api/lead.

export type Answers = Record<string, string>;

export type Step = {
  id: string;
  ask: (a: Answers) => string;
  kind: "choice" | "text" | "contact";
  options?: (a: Answers) => string[];
  placeholder?: string;
  optional?: boolean;
  when?: (a: Answers) => boolean;
};

export const FORMATS = [
  "Labels",
  "Folding cartons",
  "Pouches",
  "Roll stock",
  "Cut & stack can labels",
  "Several formats",
  "Not sure yet",
];

const formatDetail: Record<string, { ask: string; options: string[] }> = {
  Labels: {
    ask: "What will the labels go on?",
    options: ["Glass jars / bottles", "Plastic tubs / squeeze bottles", "Pouches or bags", "Boxes", "Refrigerated or frozen packs"],
  },
  "Folding cartons": {
    ask: "What goes inside the carton?",
    options: ["Snacks or bars", "Confectionery / baked goods", "Frozen food", "Supplements or wellness", "Something heavier (1 lb+)"],
  },
  Pouches: {
    ask: "Which pouch style are you picturing?",
    options: ["Stand-up with zipper", "Stand-up, no zipper", "Lay-flat 3-side seal", "Child-resistant (cannabis)", "Not sure, I'd like advice"],
  },
  "Roll stock": {
    ask: "What machine will the film run on?",
    options: ["VFFS (vertical)", "HFFS / flow wrap", "Stick pack", "Co-packer handles it", "Not sure"],
  },
  "Cut & stack can labels": {
    ask: "What goes in the can, and which size?",
    options: ["Vegetables or beans", "Tuna or fish", "Soup or sauce", "Several can sizes", "Not sure yet"],
  },
};

export const steps: Step[] = [
  {
    id: "product",
    kind: "text",
    ask: () => "Let's start with the product. What are you packaging?",
    placeholder: "e.g. Granola bars, cold brew, freeze-dried pet treats…",
  },
  {
    id: "format",
    kind: "choice",
    ask: (a) => `Good, ${a.product ? a.product.toLowerCase() : "that"} is something we pack often. Which format do you need?`,
    options: () => FORMATS,
  },
  {
    id: "detail",
    kind: "choice",
    when: (a) => Boolean(formatDetail[a.format]),
    ask: (a) => formatDetail[a.format].ask,
    options: (a) => formatDetail[a.format].options,
  },
  {
    id: "situation",
    kind: "choice",
    ask: () => "What's prompting the project?",
    options: () => [
      "Launching a new product",
      "Switching from my current supplier",
      "Consolidating suppliers",
      "Adding a new format",
      "Reordering / scaling up",
    ],
  },
  {
    id: "skus",
    kind: "choice",
    ask: () => "How many SKUs or designs should we plan for?",
    options: () => ["1", "2–4", "5–10", "11–25", "25+"],
  },
  {
    id: "quantity",
    kind: "choice",
    ask: () => "About how many units per SKU, per order?",
    options: () => ["Under 5,000", "5,000–25,000", "25,000–100,000", "100,000+", "Not sure yet"],
  },
  {
    id: "spend",
    kind: "choice",
    ask: () => "What's your approximate annual packaging spend, across all suppliers?",
    options: () => ["Under $25K", "$25K–$100K", "$100K–$500K", "$500K+", "Prefer not to say"],
  },
  {
    id: "timeline",
    kind: "choice",
    ask: () => "When do you need packaging in hand?",
    options: () => ["Within 2 weeks", "Within a month", "1–3 months", "Just planning ahead"],
  },
  {
    id: "notes",
    kind: "text",
    optional: true,
    ask: () =>
      "Anything else we should know? Finishes, sizes, a current supplier issue, a retailer deadline. You can skip this.",
    placeholder: "Optional",
  },
  {
    id: "contact",
    kind: "contact",
    ask: () => "Last step. Where should a packaging specialist reach you?",
  },
];

export function nextStepIndex(from: number, a: Answers): number {
  let i = from + 1;
  // Skip steps that don't apply, and steps already answered (e.g. preset from a product page).
  while (i < steps.length && ((steps[i].when && !steps[i].when!(a)) || a[steps[i].id] !== undefined)) i++;
  return i;
}

// Rough A/B tier signal for routing. Final qualification happens in Salesforce.
export function scoreTier(a: Answers): "A" | "B" | "C" {
  let s = 0;
  s += { "Under $25K": 0, "$25K–$100K": 1, "$100K–$500K": 3, "$500K+": 4 }[a.spend] ?? 1;
  s += { "1": 0, "2–4": 1, "5–10": 2, "11–25": 3, "25+": 3 }[a.skus] ?? 0;
  s += { "Under 5,000": 0, "5,000–25,000": 1, "25,000–100,000": 2, "100,000+": 3 }[a.quantity] ?? 0;
  if (a.situation === "Consolidating suppliers" || a.situation === "Switching from my current supplier") s += 1;
  if (a.format === "Several formats") s += 1;
  if (s >= 6) return "A";
  if (s >= 3) return "B";
  return "C";
}
