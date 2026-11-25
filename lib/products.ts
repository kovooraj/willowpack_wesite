export type Product = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  image: string;
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
    image: "/media/labels.png",
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
    image: "/media/cartons.png",
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
    image: "/media/pouches.png",
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
    image: "/media/rollstock.png",
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
    name: "Cut & Stack Can Labels",
    short: "Wrap-around labels for aluminum cans, cut to size and stacked.",
    headline: "Can labels sized for short runs and new flavours.",
    intro:
      "Cut-and-stack wrap labels for craft beverage cans, sheeted and stacked for glue-applied labelling. Release a new flavour or seasonal run without committing to printed-can minimums.",
    image: "/media/cans.png",
    bestFor: ["Craft beer & cider", "Sparkling tea & soda", "Seasonal & limited flavours", "Co-packed beverages"],
    specs: [
      { label: "Formats", value: "Full-wrap labels for standard and sleek can sizes" },
      { label: "Stocks", value: "Wet-strength papers suited to cold, wet handling" },
      { label: "Print", value: "Full-colour digital, multiple versions per run" },
      { label: "Delivery", value: "Cut to size, stacked and banded by version" },
    ],
    capabilities: ["No printed-can minimums", "Many flavours per run", "Fast changeovers", "Consistent colour across runs"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
