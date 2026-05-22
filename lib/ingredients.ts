export type IngredientPatch = "breathe" | "hormones" | "muscles" | "gut";

export type IngredientIllustrationKind =
  | "leaf"
  | "flower"
  | "root"
  | "mineral"
  | "mushroom";

export type IngredientStudy = {
  label: string;
  url: string;
};

export type Ingredient = {
  index: number;
  name: string;
  latin: string;
  description: string;
  bestFor: string[];
  patch: IngredientPatch;
  illustration: IngredientIllustrationKind;
  stencilImage?: string;
  origins: string;
  whyWeUseIt: string;
  keyStudies: IngredientStudy[];
};

export const PATCH_META: Record<
  IngredientPatch,
  { label: string; accent: string; slug: string }
> = {
  breathe: {
    label: "Happy Breathe",
    accent: "#1E3A8A",
    slug: "happy-breathe",
  },
  hormones: {
    label: "Happy Hormones",
    accent: "#BE185D",
    slug: "happy-hormones",
  },
  muscles: {
    label: "Happy Muscles",
    accent: "#574092",
    slug: "happy-muscles",
  },
  gut: {
    label: "Happy Gut",
    accent: "#33957B",
    slug: "happy-gut",
  },
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
    stencilImage: "/stencil-eucalyptus.png",
    origins:
      "Native to Australia and traditionally used in Aboriginal and herbal respiratory remedies.",
    whyWeUseIt:
      "The active compound eucalyptol helps support clearer breathing and respiratory comfort. Its cooling aromatic profile may help ease congestion, refresh the senses, and promote relaxation during seasonal discomfort.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/17005002/" },
      {
        label: "Study 2",
        url: "https://link.springer.com/article/10.1007/s10787-023-01237-6",
      },
      {
        label: "Study 3",
        url: "https://www.researchgate.net/publication/396199434",
      },
    ],
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
    stencilImage: "/menthol-stencil.png",
    origins:
      "Derived from mint species traditionally used in cooling balms and inhalation remedies.",
    whyWeUseIt:
      "Menthol activates cold-sensitive receptors that create an instant cooling sensation and support the feeling of easier airflow. It also provides refreshing sensory stimulation and mental clarity.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/17950352/" },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/8893526/" },
      {
        label: "Study 3",
        url: "https://www.researchgate.net/publication/399123580",
      },
    ],
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
    stencilImage: "/peppermint-stencil.png",
    origins:
      "Native to Europe and widely used in traditional herbal medicine for respiratory and digestive wellness.",
    whyWeUseIt:
      "Peppermint contains menthol-rich aromatic oils that help support breathing comfort, refresh the senses, and promote a revitalizing feeling of energy and focus.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/16767798/" },
      {
        label: "Study 2",
        url: "https://doaj.org/article/c1dbacbebbc346b09eb5a585f84ba564",
      },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S037851731730414X",
      },
    ],
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
    stencilImage: "/camphor-stencil.png",
    origins:
      "Traditionally sourced from camphor laurel trees native to East Asia and used in therapeutic aromatic preparations.",
    whyWeUseIt:
      "Camphor provides a penetrating cooling sensation that helps create a feeling of respiratory openness while supporting relaxation and physical comfort.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/30022280/" },
      { label: "Study 2", url: "https://jddt.in/index.php/jddt/article/view/679" },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S2225411015001033",
      },
    ],
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
    stencilImage: "/ashwagandha-stencil.png",
    origins:
      "Native to India, Africa, and the Middle East, widely used in Ayurvedic medicine as an adaptogenic herb.",
    whyWeUseIt:
      "Ashwagandha contains withanolides that help support stress resilience, emotional balance, hormonal wellness, and nervous system relaxation.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/31517876/" },
      {
        label: "Study 2",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6979308/",
      },
      {
        label: "Study 3",
        url: "https://www.researchgate.net/publication/354674987",
      },
    ],
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
    stencilImage: "/mg-glycinate-stencil.png",
    origins:
      "A bioavailable magnesium complex widely used in nutritional and recovery formulations.",
    whyWeUseIt:
      "Magnesium supports muscle relaxation, sleep quality, nervous system balance, and hormonal wellness while helping reduce fatigue and tension.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579607/",
      },
      {
        label: "Study 2",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5452159/",
      },
      { label: "Study 3", url: "https://pubmed.ncbi.nlm.nih.gov/23853635/" },
    ],
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
    stencilImage: "/parviflora-stencil.png",
    origins:
      "Native to North America and traditionally used in women's wellness formulations.",
    whyWeUseIt:
      "Rich in gamma-linolenic acid (GLA), evening primrose oil supports hormonal balance, skin wellness, mood stability, and healthy inflammatory responses.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/29446652/" },
      {
        label: "Study 2",
        url: "https://www.sciencedirect.com/science/article/pii/S0378517313002102",
      },
      {
        label: "Study 3",
        url: "https://link.springer.com/chapter/10.1007/978-3-030-80669-3_8",
      },
    ],
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
    stencilImage: "/chamomille-stencil.png",
    origins:
      "Traditionally used across Europe and Asia as a calming botanical remedy.",
    whyWeUseIt:
      "Chamomile contains soothing flavonoids and aromatic compounds that support relaxation, emotional balance, and restful sleep.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/27912875/" },
      {
        label: "Study 2",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2995283/",
      },
      {
        label: "Study 3",
        url: "https://www.ijpsr.com/bft-article/development-and-evaluation-of-herbal-transdermal-patch-of-chamomile-extract/",
      },
    ],
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
    stencilImage: "/mgcl-stencil.png",
    origins:
      "Naturally sourced mineral compound commonly used in muscle recovery and wellness therapies.",
    whyWeUseIt:
      "Magnesium helps support muscle relaxation, recovery after physical activity, neuromuscular balance, and reduction of physical tension and fatigue.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579607/",
      },
      { label: "Study 2", url: "https://www.mdpi.com/2072-6643/9/8/813" },
      { label: "Study 3", url: "https://pubmed.ncbi.nlm.nih.gov/27624531/" },
    ],
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
    stencilImage: "/taurine-stencil.png",
    origins:
      "Naturally occurring amino acid found in muscle and nervous tissue.",
    whyWeUseIt:
      "Taurine supports endurance, hydration balance, muscle recovery, and cellular performance while helping reduce fatigue associated with physical exertion.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5933890/",
      },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/29076412/" },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S1756464620303945",
      },
    ],
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
    stencilImage: "/boswelia-stencil.png",
    origins:
      "Native to India and traditionally used in Ayurvedic medicine for joint and mobility support.",
    whyWeUseIt:
      "Boswellia contains boswellic acids that help support healthy inflammatory responses, joint comfort, mobility, and recovery after physical activity.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/21266047/" },
      {
        label: "Study 2",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3309643/",
      },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S0944711313002422",
      },
    ],
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
    stencilImage: "/coenzyme-stencil.png",
    origins:
      "Naturally occurring antioxidant present in human cells and energy-producing tissues.",
    whyWeUseIt:
      "CoQ10 supports cellular energy production, muscle stamina, recovery, and protection against oxidative stress generated during intense physical activity.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9104583/",
      },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/26864911/" },
      { label: "Study 3", url: "https://www.mdpi.com/2076-3921/10/5/773" },
    ],
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
    stencilImage: "/ginger-stencil.png",
    origins:
      "Native to Southeast Asia and widely used in Ayurvedic and traditional Chinese medicine for digestive wellness.",
    whyWeUseIt:
      "Ginger contains gingerols and shogaols that help support healthy digestion, reduce feelings of bloating and heaviness, and promote gastrointestinal comfort with a naturally warming effect.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6341159/",
      },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/10442508/" },
      {
        label: "Study 3",
        url: "https://www.ijpsjournal.com/article/formulation-and-evaluation-of-herbal-transdermal-patch-containing-ginger-extract",
      },
    ],
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
    stencilImage: "/fennel-stencil.png",
    origins:
      "Native to the Mediterranean region and traditionally used for digestive comfort and bloating relief.",
    whyWeUseIt:
      "Fennel contains aromatic compounds such as anethole that help soothe the digestive tract, support smoother digestion, and reduce occasional abdominal discomfort.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4137549/",
      },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/26051506/" },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S037851731730414X",
      },
    ],
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
    stencilImage: "/peppermint-stencil.png",
    origins:
      "Traditionally used in European and herbal medicine systems for digestive and respiratory support.",
    whyWeUseIt:
      "Peppermint oil provides a cooling and soothing sensation that helps relax digestive muscles, ease bloating, and support overall gut comfort after meals.",
    keyStudies: [
      {
        label: "Study 1",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6337770/",
      },
      { label: "Study 2", url: "https://pubmed.ncbi.nlm.nih.gov/31470006/" },
      {
        label: "Study 3",
        url: "https://doaj.org/article/c1dbacbebbc346b09eb5a585f84ba564",
      },
    ],
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
    stencilImage: "/caraway-stencil.png",
    origins:
      "Native to Europe, North Africa, and Western Asia, traditionally used in digestive herbal preparations.",
    whyWeUseIt:
      "Caraway contains natural aromatic oils that help support healthy digestion, reduce bloating, and promote gastrointestinal balance and comfort.",
    keyStudies: [
      { label: "Study 1", url: "https://pubmed.ncbi.nlm.nih.gov/21140172/" },
      {
        label: "Study 2",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4030608/",
      },
      {
        label: "Study 3",
        url: "https://www.sciencedirect.com/science/article/pii/S0378517319310930",
      },
    ],
  },
];
