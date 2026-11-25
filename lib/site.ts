// Central site config. Items marked TODO need confirmation from Willowpack before launch.
export const site = {
  name: "Willowpack",
  tagline: "Packaging, made with precision.",
  description:
    "Willowpack manufactures labels, folding cartons, pouches, roll stock and can labels in-house for food and beverage brands that need packaging they can count on.",
  email: "hello@willowpack.com", // TODO: confirm public inbox
  phone: "", // TODO: add main sales line
  location: "Ontario, Canada", // TODO: confirm address to publish
  nav: [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export const stats = [
  { value: "~5", unit: "business days", label: "Typical production turnaround" },
  { value: "0", unit: "plates", label: "All-digital print means no plate costs or remakes" },
  { value: "5", unit: "formats", label: "Labels, cartons, pouches, roll stock and can labels under one roof" },
  { value: "100%", unit: "in-house", label: "Print, lamination, die-cutting, converting and finishing" },
];

export const proof = [
  {
    client: "Great Lakes Coffee Roasters",
    format: "Roll stock · Managed inventory",
    story:
      "We produce and store their roll stock across multiple SKUs, then ship it the next business day whenever they order. No reorder overhead and no stock-outs.",
  },
  {
    client: "Bassé Nuts",
    format: "Roll stock · 5 SKUs",
    story:
      "400,000 units across five SKUs for a launch into a new retailer. Retail-ready film that stands out on the shelf and keeps the product fresh.",
  },
  {
    client: "Sweets from the Earth",
    format: "Folding cartons · 4 versions",
    story:
      "80,000 cookie cartons across four designs. Die-cut, folded, glued and packed by version, ready for the line.",
  },
  {
    client: "Coppa Inc.",
    format: "Roll labels · Redesign",
    story:
      "A month of previews, physical samples and colour work, finished with white ink on clear labels in time for their peak summer launch.",
    quote: "It was a HUGE success!",
    quoteBy: "CEO, Coppa",
  },
];
