// What a Gallery looks like. All components use this shape.
// Adding a new gallery later = just add one entry in data/galleries.ts
export type Gallery = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: string; // tailwind border/text tint class
  status: "open" | "soon";
};

// One museum object. Never hard-code these inside components —
// components read them from data/artifacts.ts via lib/museum.ts
export type Artifact = {
  id: string;
  name: string;
  galleryId: string; // civilization | art | dance | music | festivals | architecture
  category: string;
  stateIds: string[];
  period: string;
  yearRange: string;
  description: string; // 1-2 lines for cards
  history: string; // 2-4 sentences, historically careful
  significance: string;
  image?: string; // URL or /public path. Empty = UI shows icon fallback.
  audioText?: string; // short narration script for TTS (M5)
  relatedIds: string[];
  sources: { label: string; url: string }[];
};

// One state/region. Scalable: add a new state = add one object.
export type CulturalRegion = {
  id: string;
  name: string;
  capital: string;
  art: string[];
  dance: string[];
  music: string[];
  festivals: string[];
  architecture: string[];
  cuisine: string[];
  artifactIds: string[];
};
