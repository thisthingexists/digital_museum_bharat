export type TimelineEra = {
  id: string;
  year: string;
  title: string;
  description: string;
  highlights: string[];
  artifactIds: string[];
};

// 7 eras. Content moves when visitor clicks — same pattern as StoryMode.
export const timeline: TimelineEra[] = [
  {
    id: "indus",
    year: "2500 BCE",
    title: "Indus Valley Civilization",
    description:
      "Planned cities with drains, wells and granaries — among the world's earliest urban life.",
    highlights: ["Mohenjo-daro grid", "Great Bath", "Seals + weights"],
    artifactIds: ["great-bath-mohenjodaro"],
  },
  {
    id: "maurya",
    year: "321 BCE",
    title: "Mauryan Empire",
    description:
      "Ashoka's pillars and stupas spread Buddhism and stone craft across India.",
    highlights: ["Sarnath capital", "Sanchi Stupa", "Edicts"],
    artifactIds: ["ashoka-pillar-lion", "sanchi-stupa"],
  },
  {
    id: "gupta",
    year: "400 CE",
    title: "Gupta Period",
    description:
      "Often called a classical age — advances in science, math, art and temples.",
    highlights: ["Iron Pillar metallurgy", "Temple sculpture", "Sanskrit texts"],
    artifactIds: ["iron-pillar-delhi"],
  },
  {
    id: "medieval",
    year: "1200 CE",
    title: "Medieval India",
    description:
      "Temple cities, bronze icons and living folk arts like Pattachitra take shape.",
    highlights: ["Konark + Thanjavur temples", "Bhakti songs", "Scroll painting"],
    artifactIds: ["pattachitra-art", "tanjore-painting", "odissi-dance"],
  },
  {
    id: "mughal",
    year: "1600 CE",
    title: "Mughal Period",
    description:
      "Persian-Indian fusion in domes, gardens, music and Kathak dance.",
    highlights: ["Taj Mahal", "Miniatures", "Kathak courts"],
    artifactIds: ["taj-mahal", "kathak-dance"],
  },
  {
    id: "colonial",
    year: "1900 CE",
    title: "Colonial Period",
    description:
      "Railways and printing meet Swadeshi resistance — craft becomes protest.",
    highlights: ["Khadi + charkha", "Folk revival", "Museums founded"],
    artifactIds: ["charkha-freedom", "madhubani-art"],
  },
  {
    id: "modern",
    year: "1947 →",
    title: "Independence + Modern India",
    description:
      "Classical dances recognised, tribal art enters galleries, festivals go global.",
    highlights: ["Sattriya recognised 2000", "Gond + Warli in museums", "Festivals worldwide"],
    artifactIds: ["sattriya-dance", "gond-art", "warli-art", "bharatanatyam", "kathakali-dance"],
  },
];
