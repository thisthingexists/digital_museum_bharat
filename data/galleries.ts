import type { Gallery } from "@/types";

// Single source of truth. Lobby + future pages read from here.
// To add a gallery, add one object — no component edits needed.
export const galleries: Gallery[] = [
  {
    id: "civilization",
    title: "Gallery of Civilization",
    subtitle: "2500 BCE → 1947",
    description: "Indus Valley, Maurya, Gupta, Mughal, Colonial, Independence.",
    icon: "🏛️",
    accent: "border-amber-400/40 text-amber-300",
    status: "open",
  },
  {
    id: "art",
    title: "Gallery of Art",
    subtitle: "Madhubani • Warli • Gond",
    description: "Folk and classical painting traditions of India.",
    icon: "🎨",
    accent: "border-rose-400/40 text-rose-300",
    status: "open",
  },
  {
    id: "dance",
    title: "Gallery of Dance",
    subtitle: "8 Classical Forms",
    description: "Bharatanatyam, Kathak, Odissi, Kathakali and more.",
    icon: "💃",
    accent: "border-purple-400/40 text-purple-300",
    status: "open",
  },
  {
    id: "music",
    title: "Gallery of Music",
    subtitle: "Hindustani • Carnatic • Folk",
    description: "Ragas, instruments and living folk traditions.",
    icon: "🎶",
    accent: "border-sky-400/40 text-sky-300",
    status: "soon",
  },
  {
    id: "festivals",
    title: "Gallery of Festivals",
    subtitle: "Diwali • Holi • Onam",
    description: "How India celebrates light, harvest and faith.",
    icon: "🎉",
    accent: "border-orange-400/40 text-orange-300",
    status: "soon",
  },
  {
    id: "architecture",
    title: "Gallery of Architecture",
    subtitle: "Temples • Forts • Stepwells",
    description: "Stupas, temples, forts, palaces and ancient cities.",
    icon: "🕌",
    accent: "border-emerald-400/40 text-emerald-300",
    status: "soon",
  },
];

export function getGallery(id: string) {
  return galleries.find((g) => g.id === id);
}
