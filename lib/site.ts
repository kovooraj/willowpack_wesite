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

export const proof = [
  {
    client: "Great Lakes Coffee Roasters",
    heading: "Roll stock on call",
    product: "Roll stock",
    href: "/products/roll-stock",
    thumb: "/media/rollstock-detail.jpg",
    format: "Roll stock · Managed inventory",
    story:
      "We print and store their roll stock across several SKUs and ship it the next business day after they call.",
  },
  {
    client: "Bassé Nuts",
    heading: "Roll stock for a launch",
    product: "Roll stock",
    href: "/products/roll-stock",
    thumb: "/media/rollstock-plant.jpg",
    format: "Roll stock · 5 SKUs",
    story:
      "400,000 units across five SKUs for a new retailer, in white PE film with a gloss lamination.",
  },
  {
    client: "Sweets from the Earth",
    heading: "Folding cartons",
    product: "Folding cartons",
    href: "/products/folding-cartons",
    thumb: "/media/facility.jpg",
    format: "Folding cartons · 4 versions",
    story:
      "80,000 cookie cartons in four designs, die-cut, glued and packed by version.",
  },
  {
    client: "Coppa Inc.",
    heading: "Roll labels",
    product: "Labels",
    href: "/products/labels",
    thumb: "/media/labels-detail.jpg",
    format: "Roll labels · Redesign",
    story:
      "A label redesign with white ink on clear stock, proofed digitally and on samples before their summer launch.",
    quote: "It was a HUGE success!",
    quoteBy: "CEO, Coppa",
  },
];
