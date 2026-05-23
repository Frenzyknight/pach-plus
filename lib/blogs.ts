export type BlogCategory = "Science" | "Rituals" | "Ingredients" | "Stories";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  badgeColor: string;
  badgeFg: string;
  accent: string;
  date: string;
  readTime: string;
  author: string;
  heroSubtitle: string;
  body: BlogBlock[];
};

export const BLOGS: Blog[] = [
  {
    slug: "the-science-of-transdermal-delivery",
    title: "The science of transdermal delivery.",
    excerpt:
      "Why bypassing the gut changes how ingredients reach you, and how the patch reservoir keeps release steady through an 8 hour day.",
    category: "Science",
    badgeColor: "#0D3E32",
    badgeFg: "#ffffff",
    accent: "#1A715E",
    date: "May 2026",
    readTime: "5 min read",
    author: "The pach+ lab team",
    heroSubtitle:
      "A quick walkthrough of how a small adhesive square moves plant-forward actives past the gut and into your daily wellness ritual.*",
    body: [
      {
        type: "paragraph",
        text: "Most supplements take a long and noisy route through the body. A capsule lands in the stomach, breaks open in the small intestine, fights for absorption against food and acid, and finally clears the liver before anything useful reaches the rest of you. By the time the body decides what to keep, a lot of the original dose is already gone.",
      },
      {
        type: "paragraph",
        text: "A transdermal patch skips most of that. The reservoir layer sits against clean, dry skin and lets ingredients move slowly through the outermost layer of the epidermis. The result is a steadier flow over hours instead of a sharp spike followed by a slump.",
      },
      {
        type: "heading",
        text: "Why steady wins over spikes",
      },
      {
        type: "paragraph",
        text: "Wellness routines are mostly about consistency. A patch keeps the level of an active much more even across the day, which is closer to how your body would prefer to receive it. There is no peak that fades by lunch, no second dose to remember, and no extra capsule to add to a routine that already has too many steps.",
      },
      {
        type: "quote",
        text: "The best dose is the one you actually use. The patch makes consistency the easy part.",
        attribution: "pach+ formulation notes",
      },
      {
        type: "heading",
        text: "What we look for in a transdermal active",
      },
      {
        type: "list",
        items: [
          "Small molecule size so it can cross the stratum corneum",
          "Plant-forward sourcing that aligns with the rest of the formula",
          "A track record in topical wellness rituals",
          "Stability inside an adhesive reservoir at room temperature",
        ],
      },
      {
        type: "paragraph",
        text: "Every pach+ patch starts as a list of those four constraints. Anything that does not pass is left out. What remains is a short, deliberate blend designed for daily wear and a wellness ritual that feels almost too simple to count as one.",
      },
    ],
  },
  {
    slug: "building-a-daily-patch-ritual",
    title: "Building a daily patch ritual that actually sticks.",
    excerpt:
      "Small placement, timing, and rotation choices that turn a wearable supplement into a routine you keep up for months.",
    category: "Rituals",
    badgeColor: "#574092",
    badgeFg: "#ffffff",
    accent: "#574092",
    date: "April 2026",
    readTime: "4 min read",
    author: "Maya Patel",
    heroSubtitle:
      "The patch only works when it is on. Here is how the pach+ team builds rituals that survive busy weeks, travel days, and the messy in-between.*",
    body: [
      {
        type: "paragraph",
        text: "Most wellness routines fail in week three. The novelty wears off, the bottle ends up at the back of a drawer, and the daily promise quietly disappears. Patches are easier to keep up with than capsules, but they still need a little structure to feel automatic.",
      },
      {
        type: "heading",
        text: "Anchor it to something you already do",
      },
      {
        type: "paragraph",
        text: "Habit research is mostly about pairing a new action to an existing cue. Brushing teeth, making coffee, finishing a shower, sitting at the desk for the first email of the day. Pick one and apply the patch right after. It becomes a tiny extension of a habit you already trust.",
      },
      {
        type: "quote",
        text: "Wellness gets easier the moment it stops feeling like a separate task.",
      },
      {
        type: "heading",
        text: "Rotate the placement",
      },
      {
        type: "list",
        items: [
          "Upper arm for everyday wear and easy under-sleeve placement",
          "Shoulder or upper back when you want the patch out of sight",
          "Lower abdomen for routines that follow a softer pace",
          "Inner forearm for a quick reminder you can see during the day",
        ],
      },
      {
        type: "paragraph",
        text: "Switching the spot keeps the skin comfortable and turns the choice into a tiny daily check-in with the body. Most people in our internal feedback group said the rotation itself became part of what they liked about the routine.",
      },
      {
        type: "heading",
        text: "Plan for the awkward days",
      },
      {
        type: "paragraph",
        text: "Travel days, late mornings, and weekends are where routines slip. Keep a small strip of patches in the bag you carry the most and the routine survives the disruption. The patch is small on purpose so it is easy to bring along.",
      },
    ],
  },
  {
    slug: "ingredient-spotlight-magnesium",
    title: "Ingredient spotlight: why magnesium keeps showing up.",
    excerpt:
      "A short look at the most familiar mineral in the pach+ formulary, and the reasons it earns a spot in more than one patch.",
    category: "Ingredients",
    badgeColor: "#BE185D",
    badgeFg: "#ffffff",
    accent: "#BE185D",
    date: "March 2026",
    readTime: "3 min read",
    author: "Dr. Anya Reyes",
    heroSubtitle:
      "Magnesium is in almost everything for a reason. Here is the pach+ take on why it earns its place in Happy Muscles and Happy Hormones alike.*",
    body: [
      {
        type: "paragraph",
        text: "If you have spent any time reading supplement labels you have seen magnesium more than once. It is one of those names that quietly shows up across recovery, sleep, mood, and cycle-aware routines. The reason is simple. The body relies on it for a long list of small jobs and most modern diets do not deliver enough of it consistently.",
      },
      {
        type: "heading",
        text: "Where it earns its spot",
      },
      {
        type: "list",
        items: [
          "Supports muscle comfort routines after movement and long days",
          "Plays a familiar role in calm-leaning evening rituals",
          "Pairs well with botanicals like vitex and chasteberry in balance-focused formulas",
          "Has a long, well-understood track record in topical wellness",
        ],
      },
      {
        type: "quote",
        text: "Magnesium is rarely the loudest ingredient. It is usually the one that quietly makes everything else work better.",
      },
      {
        type: "heading",
        text: "Why a patch suits it",
      },
      {
        type: "paragraph",
        text: "Magnesium in capsule form can be hard on the stomach for some people and the dose often has to be split across the day. A patch keeps the delivery slow and steady, which lines up with the way most rituals around magnesium are built. You wear it, you forget about it, and the routine takes care of itself.",
      },
      {
        type: "paragraph",
        text: "You will spot it in Happy Muscles, where it sits alongside arnica and menthol for post-movement comfort, and again in Happy Hormones where it rounds out the balance blend. Same ingredient, two different jobs, both built around the same idea of small consistent support.",
      },
    ],
  },
  {
    slug: "why-we-built-pach-plus",
    title: "Why we built pach+ in the first place.",
    excerpt:
      "A short founder note on the shelf of half-used bottles, the missed doses, and the simple idea that turned into a patch company.",
    category: "Stories",
    badgeColor: "#FFCD49",
    badgeFg: "#0D3E32",
    accent: "#FFCD49",
    date: "February 2026",
    readTime: "4 min read",
    author: "The pach+ founders",
    heroSubtitle:
      "We were tired of the shelf of bottles, the missed mornings, and the wellness routines that asked too much. pach+ started as a fix for our own.*",
    body: [
      {
        type: "paragraph",
        text: "The first version of pach+ was not a company. It was a frustration. A shelf full of supplement bottles, most of them half empty, almost all of them past their useful date. A morning routine that took five steps before coffee and still managed to miss the only one that mattered.",
      },
      {
        type: "paragraph",
        text: "We started asking a simple question. What if a wellness routine could be one small step instead of seven? What if the body could meet the ingredient on its own terms instead of pushing it through a noisy gut every morning?",
      },
      {
        type: "heading",
        text: "The first sketch",
      },
      {
        type: "paragraph",
        text: "The first sketch of pach+ was made on the back of a takeaway receipt. It was a square. Then a softer square with rounded corners. Then a square with a plant pressed onto it, because the part we cared about most was where the ingredients came from. That part has not changed since.",
      },
      {
        type: "quote",
        text: "We did not set out to make a product. We set out to remove a step.",
        attribution: "pach+ founder notes",
      },
      {
        type: "heading",
        text: "What we kept and what we left behind",
      },
      {
        type: "list",
        items: [
          "Kept: plant-forward ingredients with a track record we trust",
          "Kept: a daily ritual that takes less than ten seconds",
          "Left behind: pills, powders, shakers, and noisy claims",
          "Left behind: anything we would not happily wear ourselves",
        ],
      },
      {
        type: "paragraph",
        text: "Everything we make now starts with the same question we asked at the beginning. Does this make wellness feel a little easier than it did yesterday? If it does, it stays. If it does not, it goes back to the sketchpad.",
      },
    ],
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return BLOGS.find((blog) => blog.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, limit = 3): Blog[] {
  return BLOGS.filter((blog) => blog.slug !== currentSlug).slice(0, limit);
}
