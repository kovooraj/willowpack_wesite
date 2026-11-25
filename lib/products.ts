export type Product = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  image: string;
  detail: string;
  inUse: string;
  alt: { image: string; detail: string; inUse: string };
  bestFor: string[];
  specs: { label: string; value: string }[];
  capabilities: string[];
};

export const products: Product[] = [
  {
    slug: "labels",
    name: "Labels",
    short: "Pressure-sensitive roll labels in paper, poly and BOPP.",
    headline: "Labels that hold up on the shelf, in the freezer and in the cooler.",
    intro:
      "Pressure-sensitive roll labels for jars, bottles, tubs and pouches. Printed digitally on the HP Indigo 6900 and laser die-cut in-house, so short runs, new versions and odd shapes cost less.",
    image: "/media/labels.jpg",
    detail: "/media/labels-detail.jpg",
    inUse: "/media/ch-prepress.jpg",
    alt: { image: "Jars and bottles with matte paper labels on a stone shelf", detail: "Matte paper labels peeling from a roll", inUse: "Colour proofs and swatches checked at the prepress table" },
    bestFor: ["Jars & bottles", "Refrigerated & frozen", "Wet or squeezable packs", "Seasonal & limited runs"],
    specs: [
      { label: "Materials", value: "Paper, poly, white / clear / brushed BOPP, Estate #4 kraft, freezer- and wet-strength stocks" },
      { label: "Finishes", value: "Gloss or matte UV, gloss, matte or soft-touch lamination" },
      { label: "Print", value: "CMYK, white ink on clear and metallic stocks, variable data" },
      { label: "Converting", value: "Laser die-cutting and rotary dies (ABG Digilase)" },
    ],
    capabilities: ["No plate costs", "Precise colour matching", "Custom shapes without a new die", "Wound to your applicator"],
  },
  {
    slug: "folding-cartons",
    name: "Folding Cartons",
    short: "Die-cut, folded and glued paperboard for retail shelves.",
    headline: "Retail cartons, folded and glued in-house.",
    intro:
      "Paperboard cartons for snacks, confectionery, frozen foods and nutraceuticals. We print digitally or offset, depending on volume, and handle die-cutting, folding and gluing in our own facility.",
    image: "/media/cartons.jpg",
    detail: "/media/cartons-detail.jpg",
    inUse: "/media/ch-finish.jpg",
    alt: { image: "Printed folding cartons in earth tones on a cream surface", detail: "Flat die-cut carton blanks with one folded on top", inUse: "Folded and glued cartons coming off the folder-gluer" },
    bestFor: ["Snack & cereal multipacks", "Confectionery", "Frozen retail", "Supplements & kits"],
    specs: [
      { label: "Board", value: "SBS C1S 18, 20, 24 and 28pt (food-safe), 32pt E-Flute for mailers" },
      { label: "Styles", value: "Straight & reverse tuck end, auto-lock bottom, sleeves, mailers" },
      { label: "Print", value: "CMYK plus spot colours, inside and/or outside" },
      { label: "Finishes", value: "Gloss or matte flood UV, gloss or matte lamination" },
    ],
    capabilities: ["HP Indigo 18K digital", "Heidelberg offset for volume", "Diana folder-gluer", "Packed by version"],
  },
  {
    slug: "pouches",
    name: "Pouches",
    short: "Stand-up and lay-flat pouches, ready to fill.",
    headline: "Pouches that arrive finished, ready to fill.",
    intro:
      "Stand-up and three-side-seal pouches printed on the HP Indigo 200K, laminated on our own line and converted on Totani and Karlville pouch makers. You don't need form-fill-seal equipment.",
    image: "/media/pouches.jpg",
    detail: "/media/pouches-detail.jpg",
    inUse: "/media/pouches-hand.jpg",
    alt: { image: "Three matte stand-up pouches on a linen table", detail: "The zipper and tear notch of an olive stand-up pouch", inUse: "Two printed coffee and snack pouches held up in sunlight" },
    bestFor: ["Coffee & tea", "Snacks & pet treats", "Supplements", "Cannabis (CR zipper)"],
    specs: [
      { label: "Formats", value: "Stand-up (2\" min. gusset), lay-flat 3-side seal" },
      { label: "Structures", value: "White PE, clear PE, METPET + clear PE (all food-safe)" },
      { label: "Finishes", value: "Gloss, matte or soft-touch lamination" },
      { label: "Features", value: "Zipper, child-resistant zipper, tear notch, hang hole" },
    ],
    capabilities: ["In-house lamination", "In-house pouch making", "Multi-SKU runs", "Low minimums"],
  },
  {
    slug: "roll-stock",
    name: "Roll Stock",
    short: "Printed, laminated film for form-fill-seal lines.",
    headline: "Film built to run on your lines.",
    intro:
      "Printed and laminated film for vertical and horizontal form-fill-seal lines. Wound to your unwind direction, slit to width and barrier-matched to your product's shelf life.",
    image: "/media/rollstock.jpg",
    detail: "/media/rollstock-detail.jpg",
    inUse: "/media/rollstock-plant.jpg",
    alt: { image: "A roll of printed film partly unrolled on a stone floor", detail: "Printed film wrapping granola bars on a flow-wrap machine", inUse: "Rolls of printed bar wrapper film in a packaging plant" },
    bestFor: ["Bars (flow wrap)", "Powders & stick packs", "Pet treats", "Confectionery & baked goods"],
    specs: [
      { label: "Machines", value: "VFFS, HFFS flow wrap, narrow-web stick pack" },
      { label: "Materials", value: "White PE, clear PE (food-safe)" },
      { label: "Laminations", value: "Gloss, matte or soft-touch PET, high-barrier ALOx" },
      { label: "Supply", value: "Managed inventory with next-business-day release available" },
    ],
    capabilities: ["Nordmeccanica laminator", "Karlville slitting", "Custom wind direction", "Vendor-managed inventory"],
  },
  {
    slug: "can-labels",
    name: "Cut & Stack Labels",
    short: "Paper wrap labels for food cans, cut to size and stacked for your labeller.",
    headline: "Labels for canned vegetables, beans, fish and soups.",
    intro:
      "Cut-and-stack paper labels for steel food cans, printed digitally, cut to size and stacked by version for glue-applied wrap-around labelling. Change a recipe, a can size or a private-label customer without a large print commitment.",
    image: "/media/cans.jpg",
    detail: "/media/cans-detail.jpg",
    inUse: "/media/cans-set.jpg",
    alt: { image: "Steel food cans of tomatoes, chickpeas, corn and tuna with matte paper wrap labels", detail: "Food cans moving through a wrap-around labeller with a stack of cut labels in its magazine", inUse: "Banded stacks of cut paper can labels beside two labelled food cans" },
    bestFor: ["Canned vegetables & beans", "Tuna & fish", "Soups & sauces", "Private label & co-packers"],
    specs: [
      { label: "Formats", value: "Wrap-around labels sized to your food can" },
      { label: "Stocks", value: "Coated and wet-strength papers for wet, cold handling on the line" },
      { label: "Print", value: "Full-colour digital, many versions in one run" },
      { label: "Delivery", value: "Cut to size, stacked and banded by version for your labeller's magazine" },
    ],
    capabilities: ["No plate costs", "Many SKUs per run", "Fast changeovers", "Consistent colour across runs"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
