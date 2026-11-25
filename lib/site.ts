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
    stat: "Next day",
    statLabel: "shipping from stock we hold",
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
    stat: "400,000",
    statLabel: "units across five SKUs",
    story:
      "400,000 units across five SKUs for a new retailer, in white PE film with a gloss lamination.",
  },
  {
    client: "Sweets from the Earth",
    heading: "Folding cartons",
    product: "Folding cartons",
    href: "/products/folding-cartons",
    thumb: "/media/cartons-detail.jpg",
    format: "Folding cartons · 4 versions",
    stat: "80,000",
    statLabel: "cartons in four designs",
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
    stat: "",
    statLabel: "",
    story:
      "A label redesign with white ink on clear stock, proofed digitally and on samples before their summer launch.",
    quote: "It was a HUGE success!",
    quoteBy: "CEO, Coppa",
  },
];

// Names only, set in type on the marquee. Never draw imitations of client logos.
export const clients = [
  { name: "Great Lakes Coffee Roasters", style: "serif" },
  { name: "Bassé Nuts", style: "wide" },
  { name: "Chiwis", style: "bold" },
  { name: "Sweets from the Earth", style: "serif" },
  { name: "Coppa", style: "wide" },
  { name: "Olli Brands", style: "bold" },
];

export const industries = [
  {
    name: "Better-for-you foods",
    img: "/media/ind-bfy.jpg",
    alt: "Field & Co. granola pouches and a muesli carton beside a bowl of granola",
    text: "Clean-label snacks, granola and plant-based foods that launch new SKUs often and need to look the part.",
    formats: ["Pouches", "Cartons", "Labels"],
  },
  {
    name: "Coffee and tea",
    img: "/media/ind-coffee.jpg",
    alt: "Northgrove coffee bags and an Earl Grey tea carton with beans and loose leaf",
    text: "Valve pouches, tea cartons and roll stock for auto-fill lines, matched in colour across every blend.",
    formats: ["Pouches", "Roll stock", "Cartons"],
  },
  {
    name: "Bars and snacks",
    img: "/media/ind-snacks.jpg",
    alt: "Oat & Ember flow-wrapped bars and their printed display carton",
    text: "Flow wrap for bars, pillow packs for chips and display cartons for retail, ready for frequent reformulations.",
    formats: ["Roll stock", "Cartons"],
  },
  {
    name: "Pet food and treats",
    img: "/media/ind-pet.jpg",
    alt: "Hollow Creek freeze-dried treat pouches beside a bowl of treats and a dog",
    text: "High-barrier resealable pouches for freeze-dried and soft treats, in every flavour and size you sell.",
    formats: ["Pouches", "Roll stock", "Labels"],
  },
  {
    name: "Protein and supplements",
    img: "/media/ind-supplements.jpg",
    alt: "A Kindred protein pouch with a scoop, a supplement carton and a labelled bottle",
    text: "Moisture and oxygen barrier for powders, plus bottle labels and cartons for natural health products.",
    formats: ["Pouches", "Labels", "Cartons"],
  },
  {
    name: "Cannabis",
    img: "/media/ind-cannabis.jpg",
    alt: "A Low Tide slide carton, child-resistant pouch and labelled jar",
    text: "Child-resistant pouches with formal CR test reports, plus labels and cartons for licensed producers.",
    formats: ["CR pouches", "Labels", "Cartons"],
  },
];
