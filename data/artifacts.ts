import type { Artifact } from "@/types";

// 15 starter artifacts: 5 civilization + 5 art + 5 dance.
// Matches the 3 "Open" galleries in the lobby.
// Content kept short + historically careful. Sources are authoritative
// homepages — see specific monument pages there for details.
const ASI = { label: "Archaeological Survey of India", url: "https://asi.nic.in" };
const CULTURE = { label: "Ministry of Culture, Govt. of India", url: "https://www.indiaculture.gov.in" };
const UNESCO = { label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org" };
const SANGEET = { label: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in" };

export const artifacts: Artifact[] = [
  // ---- CIVILIZATION (5) ----
  {
    id: "great-bath-mohenjodaro",
    name: "The Great Bath, Mohenjo-daro",
    galleryId: "civilization",
    category: "Urban Planning",
    stateIds: [],
    period: "Indus Valley Civilization",
    yearRange: "c. 2500–1900 BCE",
    description: "Watertight brick pool in Mohenjo-daro — among the earliest public baths.",
    history:
      "Excavated in present-day Pakistan, the Great Bath is a rectangular brick tank made watertight with bitumen. Scholars associate it with ritual bathing, though its exact use is debated. It shows the Indus cities had advanced drainage and town planning.",
    significance: "Evidence of planned cities, water management and public ritual life 4000+ years ago.",
    relatedIds: ["ashoka-pillar-lion", "iron-pillar-delhi"],
    sources: [ASI, UNESCO],
  },
  {
    id: "ashoka-pillar-lion",
    name: "Lion Capital of Ashoka, Sarnath",
    galleryId: "civilization",
    category: "Sculpture",
    stateIds: ["uttar-pradesh"],
    period: "Mauryan Empire",
    yearRange: "c. 250 BCE",
    description: "Four-lion sandstone capital — India's national emblem today.",
    history:
      "Commissioned under Emperor Ashoka at Sarnath, where the Buddha first taught. The polished sandstone lions stand back-to-back above a wheel (chakra) and animal frieze. The original is kept in the Sarnath Museum.",
    significance: "Symbol of Mauryan statecraft, Buddhism's spread, and modern India's emblem.",
    relatedIds: ["great-bath-mohenjodaro", "sanchi-stupa"],
    sources: [ASI, CULTURE],
  },
  {
    id: "sanchi-stupa",
    name: "Great Stupa, Sanchi",
    galleryId: "civilization",
    category: "Architecture",
    stateIds: ["madhya-pradesh"],
    period: "Mauryan → Gupta",
    yearRange: "3rd century BCE onwards",
    description: "Buddhist dome with carved gateways telling Jataka stories.",
    history:
      "Begun under Ashoka and enlarged later, Sanchi's Great Stupa is a hemispherical dome ringed by stone railings and four ornate torana gateways. Its carvings depict the Buddha's life through symbols rather than human form.",
    significance: "Oldest surviving stone Buddhist monument; UNESCO World Heritage Site.",
    relatedIds: ["ashoka-pillar-lion", "iron-pillar-delhi"],
    sources: [ASI, UNESCO],
  },
  {
    id: "iron-pillar-delhi",
    name: "Iron Pillar of Delhi",
    galleryId: "civilization",
    category: "Metallurgy",
    stateIds: ["delhi"],
    period: "Gupta Period",
    yearRange: "c. 400 CE",
    description: "7-metre rust-resistant iron column from Gupta-era craftsmanship.",
    history:
      "Standing in the Qutb complex, this Sanskrit-inscribed pillar praises a king named Chandra (often linked to Chandragupta II). Its high-purity wrought iron has resisted corrosion for 1600 years, showing advanced metallurgy.",
    significance: "Proof of Gupta-era science and metal technology.",
    relatedIds: ["sanchi-stupa", "taj-mahal"],
    sources: [ASI, CULTURE],
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal, Agra",
    galleryId: "civilization",
    category: "Architecture",
    stateIds: ["uttar-pradesh"],
    period: "Mughal Period",
    yearRange: "1632–1653 CE",
    description: "White-marble mausoleum built by Shah Jahan — wonder of the world.",
    history:
      "Commissioned by Mughal emperor Shah Jahan in memory of Mumtaz Mahal, the Taj combines Persian, Islamic and Indian styles. White marble, pietra-dura inlay and charbagh gardens make it the finest Mughal monument.",
    significance: "UNESCO World Heritage Site; symbol of Mughal art at its peak.",
    relatedIds: ["iron-pillar-delhi", "charkha-freedom"],
    sources: [ASI, UNESCO],
  },
  {
    id: "charkha-freedom",
    name: "The Charkha — Symbol of Swadeshi",
    galleryId: "civilization",
    category: "Freedom Movement",
    stateIds: ["gujarat", "delhi"],
    period: "Independence Movement",
    yearRange: "1920s–1947",
    description: "Spinning wheel that became the emblem of self-reliance and protest.",
    history:
      "Mahatma Gandhi promoted the charkha and khadi (hand-spun cloth) as peaceful resistance to British textile imports. Spinning became a daily act of freedom — later placed at the centre of India's first flag designs.",
    significance: "Shows how an everyday tool became a political and cultural symbol.",
    relatedIds: ["taj-mahal", "great-bath-mohenjodaro"],
    sources: [CULTURE],
  },
  // ---- ART (5) ----
  {
    id: "madhubani-art",
    name: "Madhubani Painting",
    galleryId: "art",
    category: "Folk Painting",
    stateIds: ["bihar"],
    period: "Living tradition",
    yearRange: "Ancient origins, documented 20th century",
    description: "Geometric Mithila wall art of fish, trees and gods.",
    history:
      "Made traditionally by women in Bihar's Mithila region on walls and paper, using natural dyes, rice paste and bamboo pens. Themes come from Ramayana, village life and nature. It gained national fame after the 1970s drought-relief sales.",
    significance: "GI-tagged living art; example of community knowledge passed mother-to-daughter.",
    audioText: "Fish means prosperity. Every line in Madhubani tells a village story.",
    relatedIds: ["warli-art", "gond-art"],
    sources: [CULTURE],
  },
  {
    id: "warli-art",
    name: "Warli Painting",
    galleryId: "art",
    category: "Tribal Art",
    stateIds: ["maharashtra", "gujarat"],
    period: "Living tribal tradition",
    yearRange: "Possibly 2500 BCE roots, modern form 20th century",
    description: "White-on-mud stick figures dancing in circles.",
    history:
      "The Warli tribe of Maharashtra–Gujarat paints with rice paste on mud walls: triangles for bodies, circles for heads. Scenes show harvest dances, weddings and the sun-moon. Artist Jivya Soma Mashe brought it to galleries in the 1970s.",
    significance: "Minimal visual language; now used in design worldwide.",
    relatedIds: ["madhubani-art", "pattachitra-art"],
    sources: [CULTURE],
  },
  {
    id: "pattachitra-art",
    name: "Pattachitra of Odisha",
    galleryId: "art",
    category: "Scroll Painting",
    stateIds: ["odisha"],
    period: "Medieval → living",
    yearRange: "c. 12th century onwards",
    description: "Cloth scrolls of Jagannath and Krishna myths in fine lines.",
    history:
      "Pattachitra means cloth-picture. Artists (chitrakars) of Puri and Raghurajpur paint Jagannath, Krishna-lila and temple rituals on treated cloth with mineral colours. The craft is tied to the Jagannath temple calendar.",
    significance: "Temple-linked craft cluster; GI-tagged heritage village Raghurajpur.",
    relatedIds: ["warli-art", "tanjore-painting"],
    sources: [CULTURE],
  },
  {
    id: "gond-art",
    name: "Gond Painting",
    galleryId: "art",
    category: "Tribal Art",
    stateIds: ["madhya-pradesh"],
    period: "Living tradition",
    yearRange: "Modern form from 1980s",
    description: "Dots-and-dashes forests, animals and songs of the Gonds.",
    history:
      "Gond artists of central India paint beliefs — trees, tigers, village songs — built from dots and dashes. Jangarh Singh Shyam, discovered in the 1980s, turned wall art into paper and canvas that now hangs in museums worldwide.",
    significance: "Shows how tribal memory became contemporary Indian art.",
    relatedIds: ["madhubani-art", "tanjore-painting"],
    sources: [CULTURE],
  },
  {
    id: "tanjore-painting",
    name: "Thanjavur (Tanjore) Painting",
    galleryId: "art",
    category: "Classical Painting",
    stateIds: ["tamil-nadu"],
    period: "Maratha Nayak → living",
    yearRange: "16th–18th century onwards",
    description: "Gold-foil gods with rich colour and glass inlay.",
    history:
      "Flourishing under Thanjavur's Nayak and Maratha courts, these dense wood-panel icons of Krishna, Lakshmi and saints use gold foil, gems and vivid colour. They are worshipped as much as displayed.",
    significance: "Courtly devotional art; GI-tagged craft of Tamil Nadu.",
    relatedIds: ["pattachitra-art", "gond-art"],
    sources: [CULTURE],
  },
  // ---- DANCE (5) ----
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    galleryId: "dance",
    category: "Classical Dance",
    stateIds: ["tamil-nadu"],
    period: "Ancient → revived 20th century",
    yearRange: "Roots in Natya Shastra, modern form 1930s",
    description: "Tamil temple dance of fire-like footwork and storytelling eyes.",
    history:
      "Danced by devadasis in Tamil temples, Bharatanatyam was rebuilt in the 1930s by figures like Rukmini Devi Arundale. It follows Carnatic music, with nritta (pure dance), nritya (expression) and natya (drama).",
    significance: "First dance to be called classical in modern India; taught worldwide.",
    relatedIds: ["kathak-dance", "odissi-dance"],
    sources: [SANGEET, CULTURE],
  },
  {
    id: "kathak-dance",
    name: "Kathak",
    galleryId: "dance",
    category: "Classical Dance",
    stateIds: ["uttar-pradesh", "rajasthan"],
    period: "Mughal courts → living",
    yearRange: "15th–19th century form",
    description: "Storytelling dance of spins, footwork and ghazal-like grace.",
    history:
      "Kathakars were travelling storytellers; under Mughal and Awadh courts Kathak absorbed Persian grace, fast pirouettes and rhythmic mathematics with tabla. Lucknow, Jaipur and Benares are its three gharanas.",
    significance: "Hindu-Muslim cultural fusion on stage; famed for tatkar footwork.",
    relatedIds: ["bharatanatyam", "kathakali-dance"],
    sources: [SANGEET, CULTURE],
  },
  {
    id: "odissi-dance",
    name: "Odissi",
    galleryId: "dance",
    category: "Classical Dance",
    stateIds: ["odisha"],
    period: "Temple → revived mid-20th century",
    yearRange: "2nd century BCE roots, revival 1950s",
    description: "Fluid tribhangi poses echoing temple sculptures of Odisha.",
    history:
      "Performed in the Jagannath temple by maharis, Odissi mirrors the sculptures of Konark and Puri — bent neck, torso and knee (tribhangi). Gurus like Kelucharan Mohapatra revived it after independence.",
    significance: "Living temple sculpture; Odisha's cultural emblem.",
    relatedIds: ["bharatanatyam", "kathakali-dance"],
    sources: [SANGEET, CULTURE],
  },
  {
    id: "kathakali-dance",
    name: "Kathakali",
    galleryId: "dance",
    category: "Classical Dance-Drama",
    stateIds: ["kerala"],
    period: "17th century → living",
    yearRange: "c. 1600s onwards",
    description: "Kerala's painted-face epics — Mahabharata overnight in dance.",
    history:
      "Kathakali combines dance, drama, music and elaborate green-face makeup and costumes. All-night performances enact Ramayana and Mahabharata with drums (chenda), songs and codified eye movements.",
    significance: "Most theatrical classical form; Kerala's global icon with Theyyam and Kalaripayattu.",
    relatedIds: ["kathak-dance", "sattriya-dance"],
    sources: [SANGEET, CULTURE],
  },
  {
    id: "sattriya-dance",
    name: "Sattriya",
    galleryId: "dance",
    category: "Classical Dance",
    stateIds: ["assam"],
    period: "Monastery tradition, classical status 2000",
    yearRange: "15th–16th century onwards",
    description: "Monk dance of Assam's Vaishnavite sattras.",
    history:
      "Created by saint Srimanta Sankardev in Assam's monasteries (sattras) to tell Krishna stories, Sattriya was danced by celibate monks with khol drums and cymbals. It was recognised as classical in 2000.",
    significance: "Youngest classical dance; carries Assam's Bhakti heritage and Majuli island culture.",
    relatedIds: ["kathakali-dance", "bharatanatyam"],
    sources: [SANGEET, CULTURE],
  },
];

export function getArtifact(id: string) {
  return artifacts.find((a) => a.id === id);
}
