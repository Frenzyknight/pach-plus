export type ProductIngredient = {
  name: string;
  description: string;
  accent: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductTestimonial = {
  quote: string;
  author: string;
  location: string;
  color: string;
};

export type ProductComparisonRow = {
  label: string;
  pach: string;
  pills: string;
  alternatives: string;
};

export type Product = {
  slug: string;
  src: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  tagline: string;
  accent: string;
  accentLight: string;
  bg: string;
  badges: string[];
  heroDescription: string;
  heroSubcopy: string;
  detailLine: string;
  stat: string;
  statFootnote: string;
  bestFor: string[];
  whatsInside: string;
  howToTake: string;
  quickFacts: {
    label: string;
    value: string;
  }[];
  layerTitle: string;
  layerOuter: string;
  layerInner: string;
  comparisonTitle: string;
  comparisonRows: ProductComparisonRow[];
  testimonials: ProductTestimonial[];
  ingredientsHeading: string;
  ingredientsCopy: string;
  ingredients: ProductIngredient[];
  faqs: ProductFaq[];
  relatedSlugs: string[];
};

const SHARED_COMPARISON_ROWS: ProductComparisonRow[] = [
  {
    label: "Steady transdermal delivery",
    pach: "yes",
    pills: "no",
    alternatives: "no",
  },
  {
    label: "No swallowing or digestion step",
    pach: "yes",
    pills: "no",
    alternatives: "yes",
  },
  {
    label: "Plant-forward formulas",
    pach: "yes",
    pills: "yes",
    alternatives: "no",
  },
  {
    label: "Comfortable daily wear",
    pach: "yes",
    pills: "no",
    alternatives: "no",
  },
  {
    label: "Simple, mess-free routine",
    pach: "yes",
    pills: "yes",
    alternatives: "no",
  },
  {
    label: "Affordable",
    pach: "$24",
    pills: "~$32",
    alternatives: "~$48",
  },
];

const SHARED_FAQS: ProductFaq[] = [
  {
    question: "How do pach+ patches work?",
    answer:
      "Each patch is designed to sit comfortably on clean, dry skin while its ingredient layer supports a slow, steady wellness ritual throughout the day.",
  },
  {
    question: "Where should I apply the patch?",
    answer:
      "Apply to a clean, dry, low-friction area such as the upper arm, shoulder, back, or abdomen. Rotate placement daily for best comfort.",
  },
  {
    question: "How long should I wear one?",
    answer:
      "Wear one patch for up to 8 hours, then remove and discard it. Do not apply to irritated or broken skin.",
  },
  {
    question: "Can I use them daily?",
    answer:
      "Yes. pach+ patches are built for a daily routine. If you are pregnant, nursing, taking medication, or managing a health condition, check with your healthcare provider first.",
  },
  {
    question: "Can I combine different pach+ products?",
    answer:
      "You can build a routine across categories, but start with one patch at a time to understand how each formula fits your day.",
  },
];

const REVIEW_CARD_COLORS = {
  teal: "#0D3E32",
  purple: "#381E79",
  pink: "#BA3F82",
};

export const PRODUCTS: Product[] = [
  {
    slug: "happy-muscles",
    src: "/package.png",
    name: "Happy Muscles",
    type: "Recovery Patch",
    price: 24,
    rating: 4.8,
    reviews: 16,
    tagline: "For Clean, Targeted Recovery*",
    accent: "#574092",
    accentLight: "#896CC4",
    bg: "#E9D5FF",
    badges: ["Plant-Based", "8 Hr Wear", "No Pills", "Targeted"],
    heroDescription:
      "A comfort-first recovery patch designed to support sore muscles, post-workout wind-downs, and everyday body tension without adding another pill to your routine.",
    heroSubcopy:
      "Stick-on relief made for daily movement, recovery days, and the moments your body asks for extra care.*",
    detailLine: "Targeted Body Recovery* - 30 patches - Daily Wear",
    stat: "91% Felt more comfortable within the first hour of wearing Happy Muscles*",
    statFootnote: "*Based on an internal product feedback group of 25 people.",
    bestFor: [
      "Post-workout muscle recovery*",
      "Everyday shoulder, back, and leg tension*",
      "Low-effort support while moving through your day*",
      "Replacing bulky creams with a clean wearable ritual*",
    ],
    whatsInside:
      "A recovery-focused blend featuring magnesium, turmeric, arnica, menthol, eucalyptus, peppermint, and vitamin-supporting botanicals in a flexible adhesive patch.",
    howToTake:
      "Apply one patch to clean, dry skin near the area you want to support. Wear for up to 8 hours and rotate placement daily.",
    quickFacts: [
      { label: "Time to Feel", value: "Gentle onset within 30-60 minutes*" },
      { label: "Post Use", value: "No sticky cream or residue-heavy routine*" },
      { label: "The Science", value: "Topical delivery for targeted daily support*" },
      { label: "Experience More", value: "Pairs well with stretching and hydration*" },
    ],
    layerTitle:
      "An innovative layered patch that works with your routine for body, movement, and recovery.*",
    layerOuter: "Soft protective layer made for flexible everyday wear",
    layerInner: "Infused reservoir designed for steady 8 hour release",
    comparisonTitle: "Happy Muscles",
    comparisonRows: SHARED_COMPARISON_ROWS,
    testimonials: [
      {
        quote:
          "I wore it after a long workout and noticed my shoulders felt easier by the end of the day. It made recovery feel simple.",
        author: "Avery R.",
        location: "Austin",
        color: REVIEW_CARD_COLORS.teal,
      },
      {
        quote:
          "Loved that it stayed put under my shirt. No messy cream, no smell taking over the room, just a nice recovery ritual.",
        author: "Nina K.",
        location: "Denver",
        color: REVIEW_CARD_COLORS.purple,
      },
      {
        quote:
          "I keep these in my gym bag now. They are especially helpful after leg day or a long travel day.",
        author: "Marco S.",
        location: "Chicago",
        color: REVIEW_CARD_COLORS.pink,
      },
    ],
    ingredientsHeading:
      "Recovery patches backed by plant-forward ingredients and daily comfort design.",
    ingredientsCopy:
      "Happy Muscles combines familiar recovery botanicals with minerals and cooling aromatics in a wearable format that keeps your ritual easy.",
    ingredients: [
      {
        name: "Magnesium",
        description:
          "A key mineral commonly used to support muscle function and relaxation-focused routines.",
        accent: "#574092",
      },
      {
        name: "Turmeric",
        description:
          "A golden botanical traditionally used in movement and recovery rituals.",
        accent: "#C2B84A",
      },
      {
        name: "Arnica",
        description:
          "A classic topical botanical often associated with body comfort and recovery care.",
        accent: "#D45B72",
      },
      {
        name: "Menthol",
        description:
          "A cooling aromatic that gives the patch a fresh, active feel on skin.",
        accent: "#B7B7B7",
      },
      {
        name: "Eucalyptus",
        description:
          "A crisp plant extract selected for a clean, refreshing recovery experience.",
        accent: "#4D9475",
      },
      {
        name: "Peppermint",
        description:
          "A bright botanical that supports the patch's cooling, fresh finish.",
        accent: "#8A6070",
      },
    ],
    faqs: SHARED_FAQS,
    relatedSlugs: ["happy-breathe", "happy-hormones"],
  },
  {
    slug: "happy-breathe",
    src: "/package2.png",
    name: "Happy Breathe",
    type: "Nasal Comfort Patch",
    price: 24,
    rating: 4.5,
    reviews: 19,
    tagline: "For Easy, Plant-Based Breathing*",
    accent: "#1E3A8A",
    accentLight: "#93C5FD",
    bg: "#DBEAFE",
    badges: ["Plant-Based", "Aromatic", "No Pills", "Daily Wear"],
    heroDescription:
      "A crisp nasal comfort patch made with refreshing aromatics to support easier-feeling breathing during busy days, travel, and bedtime routines.",
    heroSubcopy:
      "A simple stick-on ritual for when you want your breath to feel open, clear, and supported.*",
    detailLine: "Nasal Comfort Support* - 30 patches - Fresh Aroma",
    stat: "89% Said their breathing routine felt easier and cleaner with Happy Breathe*",
    statFootnote: "*Based on an internal product feedback group of 25 people.",
    bestFor: [
      "Fresh-feeling nasal comfort*",
      "Travel, dry air, and seasonal routines*",
      "Aromatherapy-inspired daily support*",
      "A simple patch instead of bulky balms*",
    ],
    whatsInside:
      "A breathable patch blend with eucalyptus, menthol, peppermint, lavender, and plant-forward aromatic support.",
    howToTake:
      "Apply one patch to clean, dry skin on the chest, upper arm, or another comfortable area. Wear for up to 8 hours.",
    quickFacts: [
      { label: "Time to Feel", value: "Fresh aromatic lift within minutes*" },
      { label: "Post Use", value: "No greasy balm or heavy residue*" },
      { label: "The Science", value: "Aromatic comfort in a wearable patch*" },
      { label: "Experience More", value: "Great for travel and nighttime routines*" },
    ],
    layerTitle:
      "An innovative layered patch that works with your routine for breath, calm, and clarity.*",
    layerOuter: "Soft protective layer that keeps the aromatic patch comfortable",
    layerInner: "Infused reservoir designed to preserve fresh plant aromatics",
    comparisonTitle: "Happy Breathe",
    comparisonRows: SHARED_COMPARISON_ROWS,
    testimonials: [
      {
        quote:
          "I used it during a long flight and loved the clean eucalyptus feel. It made my travel routine feel more comfortable.",
        author: "Priya M.",
        location: "Seattle",
        color: REVIEW_CARD_COLORS.teal,
      },
      {
        quote:
          "The scent is fresh without being too much. I liked having a patch instead of reapplying balm all day.",
        author: "Cole B.",
        location: "Boston",
        color: REVIEW_CARD_COLORS.purple,
      },
      {
        quote:
          "It became part of my evening routine. Easy to wear, easy to remove, and it feels really clean.",
        author: "Lena P.",
        location: "Portland",
        color: REVIEW_CARD_COLORS.pink,
      },
    ],
    ingredientsHeading:
      "Breathing comfort patches with crisp aromatics and plant-based daily support.",
    ingredientsCopy:
      "Happy Breathe uses familiar cooling botanicals and calming aromatic notes in a flexible patch made for clean, easy wear.",
    ingredients: [
      {
        name: "Eucalyptus",
        description:
          "A crisp aromatic selected for a fresh, open-feeling breathing ritual.",
        accent: "#1E3A8A",
      },
      {
        name: "Menthol",
        description:
          "A cooling aromatic that creates a clean, refreshing sensory cue.",
        accent: "#B7B7B7",
      },
      {
        name: "Peppermint",
        description:
          "A bright botanical often used for fresh-feeling respiratory comfort.",
        accent: "#4D9475",
      },
      {
        name: "Lavender",
        description:
          "A soft aromatic note that rounds out the patch with a calmer finish.",
        accent: "#896CC4",
      },
      {
        name: "Tea Tree",
        description:
          "A clean botanical used for its crisp, clarifying aromatic profile.",
        accent: "#C2B84A",
      },
      {
        name: "Rosemary",
        description:
          "A herbal note that adds brightness and depth to the breathable blend.",
        accent: "#8A6070",
      },
    ],
    faqs: SHARED_FAQS,
    relatedSlugs: ["happy-muscles", "happy-gut"],
  },
  {
    slug: "happy-hormones",
    src: "/package3.png",
    name: "Happy Hormones",
    type: "Balance Patch",
    price: 24,
    rating: 5.0,
    reviews: 29,
    tagline: "For Hormonal Harmony & Balance*",
    accent: "#BE185D",
    accentLight: "#F9A8D4",
    bg: "#FCE7F3",
    badges: ["For Her", "Plant-Based", "No Pills", "Daily Wear"],
    heroDescription:
      "A daily balance patch designed for cycle-aware routines, mood support, and the moments your body wants a gentler wellness ritual.",
    heroSubcopy:
      "Stick-on support for feeling more steady, centered, and in sync with your day.*",
    detailLine: "Hormonal Balance Support* - 30 patches - Daily Wear",
    stat: "93% Felt more balanced and comfortable during their daily routine*",
    statFootnote: "*Based on an internal product feedback group of 25 people.",
    bestFor: [
      "Cycle-aware daily support*",
      "Mood and body balance rituals*",
      "Replacing supplement clutter with one wearable step*",
      "Low-effort consistency through busy weeks*",
    ],
    whatsInside:
      "A balance-focused blend with vitex, inositol, chasteberry, magnesium, ginger, and calming botanicals in a wearable patch format.",
    howToTake:
      "Apply one patch to clean, dry skin and wear for up to 8 hours. Rotate placement daily and use consistently as part of your routine.",
    quickFacts: [
      { label: "Time to Feel", value: "Steady daily support with consistent use*" },
      { label: "Post Use", value: "No pill organizer or added drink mix*" },
      { label: "The Science", value: "Botanical balance in a wearable format*" },
      { label: "Experience More", value: "Pairs well with sleep and hydration rituals*" },
    ],
    layerTitle:
      "An innovative layered patch that works with your routine for balance, mood, and body.*",
    layerOuter: "Soft protective layer designed for comfortable daily wear",
    layerInner: "Infused reservoir designed to support consistent 8 hour release",
    comparisonTitle: "Happy Hormones",
    comparisonRows: SHARED_COMPARISON_ROWS,
    testimonials: [
      {
        quote:
          "This made my routine feel less complicated. I liked having one simple step that I could actually remember.",
        author: "Sophia H.",
        location: "New York",
        color: REVIEW_CARD_COLORS.teal,
      },
      {
        quote:
          "I felt more steady through the day and loved that it was wearable. It fit into my schedule better than capsules.",
        author: "Mimosa T.",
        location: "California",
        color: REVIEW_CARD_COLORS.purple,
      },
      {
        quote:
          "The biggest win was consistency. I put it on in the morning and did not have to think about it again.",
        author: "Mara M.",
        location: "Nashville",
        color: REVIEW_CARD_COLORS.pink,
      },
    ],
    ingredientsHeading:
      "Balance patches backed by thoughtful botanicals and a low-effort daily ritual.",
    ingredientsCopy:
      "Happy Hormones brings together plant-based balance ingredients in a format designed to make consistency feel easier.",
    ingredients: [
      {
        name: "Vitex",
        description:
          "A botanical traditionally used in cycle-aware wellness and balance routines.",
        accent: "#BE185D",
      },
      {
        name: "Inositol",
        description:
          "A nutrient often associated with metabolic and hormone-supportive wellness rituals.",
        accent: "#C2B84A",
      },
      {
        name: "Chasteberry",
        description:
          "A classic plant ingredient selected for daily balance support.",
        accent: "#D45B72",
      },
      {
        name: "Magnesium",
        description:
          "A mineral commonly used for calm, body comfort, and relaxation routines.",
        accent: "#B7B7B7",
      },
      {
        name: "Ginger",
        description:
          "A warming botanical that supports a grounded daily body ritual.",
        accent: "#4D9475",
      },
      {
        name: "Lemon Balm",
        description:
          "A calming herb that helps round out the blend with a soothing profile.",
        accent: "#8A6070",
      },
    ],
    faqs: SHARED_FAQS,
    relatedSlugs: ["happy-muscles", "happy-gut"],
  },
  {
    slug: "happy-gut",
    src: "/package4.png",
    name: "Happy Gut",
    type: "Nourish Patch",
    price: 24,
    rating: 4.9,
    reviews: 12,
    tagline: "For Gut Health & Metabolism*",
    accent: "#065F46",
    accentLight: "#6EE7B7",
    bg: "#D1FAE5",
    badges: ["Plant-Based", "Digestive", "No Pills", "Daily Wear"],
    heroDescription:
      "A nourishing daily patch designed to support gut-focused routines, body comfort, and metabolic wellness without adding more capsules to your shelf.",
    heroSubcopy:
      "Simple wearable support for days when your digestion routine needs to feel cleaner and easier.*",
    detailLine: "Gut & Metabolism Support* - 30 patches - Daily Wear",
    stat: "90% Said Happy Gut made their digestive wellness routine easier to keep up with*",
    statFootnote: "*Based on an internal product feedback group of 25 people.",
    bestFor: [
      "Digestive wellness routines*",
      "Daily metabolism support*",
      "Travel and busy-day consistency*",
      "People who do not want another capsule*",
    ],
    whatsInside:
      "A gut-focused patch blend with ginger, peppermint, probiotic-inspired support, fennel, lemon balm, and botanical comfort ingredients.",
    howToTake:
      "Apply one patch to clean, dry skin on the abdomen, upper arm, or another comfortable area. Wear for up to 8 hours.",
    quickFacts: [
      { label: "Time to Feel", value: "Gentle support that fits daily routines*" },
      { label: "Post Use", value: "No drink mix, shaker, or pill burden*" },
      { label: "The Science", value: "Wearable support for consistency*" },
      { label: "Experience More", value: "Pairs well with water and balanced meals*" },
    ],
    layerTitle:
      "An innovative layered patch that works with your routine for gut, body, and daily nourishment.*",
    layerOuter: "Soft protective layer made for comfortable all-day movement",
    layerInner: "Infused reservoir designed to preserve the botanical blend",
    comparisonTitle: "Happy Gut",
    comparisonRows: SHARED_COMPARISON_ROWS,
    testimonials: [
      {
        quote:
          "I liked how easy it was to add to my morning routine. It helped me stay consistent without thinking about another supplement.",
        author: "June A.",
        location: "Miami",
        color: REVIEW_CARD_COLORS.teal,
      },
      {
        quote:
          "The patch format is the best part. I packed it for a work trip and it felt much simpler than powders.",
        author: "Elena V.",
        location: "Phoenix",
        color: REVIEW_CARD_COLORS.purple,
      },
      {
        quote:
          "Happy Gut became a little daily cue for me to hydrate and eat slower. The routine felt good.",
        author: "Sam R.",
        location: "Atlanta",
        color: REVIEW_CARD_COLORS.pink,
      },
    ],
    ingredientsHeading:
      "Gut wellness patches built with familiar botanicals and wearable daily support.",
    ingredientsCopy:
      "Happy Gut focuses on digestive wellness staples in a patch designed for consistency, comfort, and fewer supplement steps.",
    ingredients: [
      {
        name: "Ginger",
        description:
          "A warming botanical traditionally used in digestive comfort rituals.",
        accent: "#065F46",
      },
      {
        name: "Peppermint",
        description:
          "A bright plant extract often used for fresh, soothing gut-focused routines.",
        accent: "#4D9475",
      },
      {
        name: "Fennel",
        description:
          "A classic digestive botanical with a naturally sweet herbal profile.",
        accent: "#C2B84A",
      },
      {
        name: "Lemon Balm",
        description:
          "A calming herb selected to support a relaxed daily wellness ritual.",
        accent: "#B7B7B7",
      },
      {
        name: "Dandelion",
        description:
          "A plant traditionally used in nourishment and digestive wellness routines.",
        accent: "#D45B72",
      },
      {
        name: "Chamomile",
        description:
          "A gentle botanical that rounds out the blend with a soft calming note.",
        accent: "#8A6070",
      },
    ],
    faqs: SHARED_FAQS,
    relatedSlugs: ["happy-breathe", "happy-hormones"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return product.relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((related): related is Product => Boolean(related));
}
