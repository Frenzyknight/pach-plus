export type IngredientPatch = "breathe" | "hormones" | "muscles" | "gut";

export type IngredientIllustrationKind =
  | "leaf"
  | "flower"
  | "root"
  | "mineral"
  | "mushroom";

export type Ingredient = {
  index: number;
  name: string;
  latin: string;
  description: string;
  bestFor: string[];
  patch: IngredientPatch;
  illustration: IngredientIllustrationKind;
};

export const PATCH_META: Record<
  IngredientPatch,
  { label: string; accent: string }
> = {
  breathe: { label: "Happy Breathe", accent: "#1E3A8A" },
  hormones: { label: "Happy Hormones", accent: "#BE185D" },
  muscles: { label: "Happy Muscles", accent: "#574092" },
  gut: { label: "Happy Gut", accent: "#33957B" },
};

export const INGREDIENTS: Ingredient[] = [
  {
    index: 1,
    name: "Eucalyptus",
    latin: "Eucalyptus globulus",
    description:
      "Known for its refreshing aroma and natural cooling sensation, eucalyptus helps open the airways and promote easier breathing. Its active compounds support respiratory comfort during congestion, seasonal discomfort, and environmental irritation while creating a calming, spa-like breathing experience. Eucalyptus may also help clear mental fog and encourage relaxation through its soothing aromatic effects.",
    bestFor: ["Clear Breathing", "Congestion Relief", "Freshness", "Relaxation"],
    patch: "breathe",
    illustration: "leaf",
  },
  {
    index: 2,
    name: "Menthol",
    latin: "Mentha arvensis",
    description:
      "Menthol delivers an instant cooling effect that helps soothe nasal discomfort and create the sensation of improved airflow. It stimulates cold receptors in the skin and airways, offering a refreshing and invigorating experience that supports comfort during stuffiness or fatigue. Its cooling action may also help promote alertness and mental clarity.",
    bestFor: ["Cooling Relief", "Nasal Comfort", "Freshness", "Mental Clarity"],
    patch: "breathe",
    illustration: "leaf",
  },
  {
    index: 3,
    name: "Peppermint",
    latin: "Mentha piperita",
    description:
      "Peppermint contains natural aromatic oils that support respiratory comfort while delivering a refreshing burst of energy. Traditionally used to soothe tension and support easier breathing, peppermint may help reduce feelings of heaviness and promote a revitalized sensation throughout the day.",
    bestFor: ["Breathing Support", "Refreshment", "Energy", "Focus"],
    patch: "breathe",
    illustration: "leaf",
  },
  {
    index: 4,
    name: "Camphor",
    latin: "Cinnamomum camphora",
    description:
      "Camphor is widely valued for its cooling and soothing properties that help ease feelings of congestion and heaviness. Its penetrating aroma supports a clearer breathing experience while providing a comforting sensation that can help relax the body and refresh the senses.",
    bestFor: ["Congestion Relief", "Cooling Comfort", "Relaxation", "Refreshment"],
    patch: "breathe",
    illustration: "leaf",
  },
  {
    index: 5,
    name: "Ashwagandha",
    latin: "Withania somnifera",
    description:
      "Ashwagandha is a powerful adaptogenic herb traditionally used to help the body manage stress and restore balance. It supports hormonal wellness by helping regulate cortisol levels while promoting emotional calmness, better sleep quality, and mental clarity. Ashwagandha may also contribute to overall reproductive and nervous system support.",
    bestFor: ["Hormonal Balance", "Stress Relief", "Relaxation", "Mental Wellness"],
    patch: "hormones",
    illustration: "root",
  },
  {
    index: 6,
    name: "Magnesium",
    latin: "Magnesium bisglycinate",
    description:
      "Magnesium plays an essential role in muscle relaxation, nervous system support, and hormonal regulation. It may help reduce fatigue, support restful sleep, and ease occasional discomfort associated with stress and hormonal fluctuations. Magnesium also contributes to emotional well-being and overall body recovery.",
    bestFor: ["Relaxation", "Sleep Support", "Stress Relief", "Hormonal Wellness"],
    patch: "hormones",
    illustration: "mineral",
  },
  {
    index: 7,
    name: "Evening Primrose Oil",
    latin: "Oenothera biennis",
    description:
      "Rich in essential fatty acids, evening primrose oil supports hormonal balance and skin wellness while helping the body maintain healthy inflammatory responses. Traditionally used in women's wellness formulations, it may help support mood stability, comfort, and overall reproductive health.",
    bestFor: ["Hormonal Support", "Mood Balance", "Skin Health", "Women's Wellness"],
    patch: "hormones",
    illustration: "flower",
  },
  {
    index: 8,
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    description:
      "Chamomile is widely recognized for its calming and soothing properties. It helps relax the mind and body while supporting emotional balance and restful sleep. Its gentle botanical compounds may also help reduce tension and promote a greater sense of calm during stressful periods.",
    bestFor: ["Relaxation", "Calmness", "Sleep Quality", "Stress Relief"],
    patch: "hormones",
    illustration: "flower",
  },
  {
    index: 9,
    name: "Magnesium Chloride",
    latin: "Magnesium chloride",
    description:
      "Magnesium supports normal muscle function and recovery by helping relax muscle fibers and reduce tension after physical activity. It plays a key role in energy production and neuromuscular performance, making it valuable for post-workout recovery and everyday muscle comfort.",
    bestFor: ["Muscle Recovery", "Relaxation", "Recovery Support", "Performance"],
    patch: "muscles",
    illustration: "mineral",
  },
  {
    index: 10,
    name: "Taurine",
    latin: "Taurine",
    description:
      "Taurine is an amino acid known for supporting endurance, hydration balance, and muscle performance. It helps maintain proper cellular function while supporting recovery after exercise or physical strain. Taurine may also contribute to sustained energy and reduced fatigue.",
    bestFor: ["Endurance", "Muscle Support", "Recovery", "Energy"],
    patch: "muscles",
    illustration: "mineral",
  },
  {
    index: 11,
    name: "Boswellia Serrata",
    latin: "Boswellia serrata",
    description:
      "Boswellia is a botanical extract traditionally used to support joint comfort and healthy inflammatory responses. Its active compounds may help soothe physical tension and promote mobility, making it beneficial for active lifestyles and muscle recovery routines.",
    bestFor: ["Joint Comfort", "Recovery", "Mobility", "Muscle Wellness"],
    patch: "muscles",
    illustration: "leaf",
  },
  {
    index: 12,
    name: "CoQ10",
    latin: "Coenzyme Q10",
    description:
      "CoQ10 is a naturally occurring antioxidant involved in cellular energy production. It helps support muscle performance, stamina, and recovery while protecting cells from oxidative stress caused by intense physical activity. CoQ10 may also contribute to overall vitality and endurance.",
    bestFor: ["Cellular Energy", "Recovery", "Endurance", "Vitality"],
    patch: "muscles",
    illustration: "mineral",
  },
  {
    index: 13,
    name: "Ginger",
    latin: "Zingiber officinale",
    description:
      "Ginger has been traditionally used to support digestion and soothe occasional stomach discomfort. Its natural bioactive compounds help promote digestive comfort, reduce feelings of heaviness, and support healthy gut function while providing a warming and calming effect on the digestive system.",
    bestFor: ["Digestion", "Gut Comfort", "Bloating Relief", "Wellness"],
    patch: "gut",
    illustration: "root",
  },
  {
    index: 14,
    name: "Fennel",
    latin: "Foeniculum vulgare",
    description:
      "Fennel is known for its soothing digestive properties and refreshing aromatic profile. Traditionally used to ease bloating and abdominal discomfort, fennel supports smoother digestion and helps promote overall gastrointestinal balance and comfort.",
    bestFor: ["Digestive Comfort", "Bloating Relief", "Gut Wellness", "Freshness"],
    patch: "gut",
    illustration: "leaf",
  },
  {
    index: 15,
    name: "Peppermint Oil",
    latin: "Mentha piperita",
    description:
      "Peppermint oil delivers a cooling and calming sensation that supports digestive ease and overall gut comfort. It may help relax digestive muscles, reduce feelings of heaviness, and promote a refreshed sensation after meals.",
    bestFor: ["Digestive Ease", "Cooling Relief", "Gut Comfort", "Freshness"],
    patch: "gut",
    illustration: "leaf",
  },
  {
    index: 16,
    name: "Caraway",
    latin: "Carum carvi",
    description:
      "Caraway has been traditionally valued for supporting healthy digestion and reducing occasional digestive discomfort. Its natural plant compounds help promote smoother digestive processes while supporting balance and comfort within the gut.",
    bestFor: ["Digestive Support", "Bloating Relief", "Gut Balance", "Comfort"],
    patch: "gut",
    illustration: "flower",
  },
];
