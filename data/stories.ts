export type StoryStage = {
  id: string;
  title: string;
  text: string;
  icon: string;
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  stages: StoryStage[];
};

// Reusable: add another story = add one object. UI in StoryMode.tsx never changes.
export const stories: Story[] = [
  {
    id: "banarasi-saree",
    title: "Banarasi Saree",
    subtitle: "Silk → Weaver → Loom → Zari → Design → Saree",
    stages: [
      { id: "silk", title: "1. Silk", text: "Fine mulberry silk arrives in Varanasi, prized for shine and strength.", icon: "🧵" },
      { id: "weaver", title: "2. Weaver", text: "Master weavers in family workshops plan the pattern from memory.", icon: "🧑‍🎨" },
      { id: "loom", title: "3. Loom", text: "On pit looms, warp and weft cross thousands of times — one saree takes weeks.", icon: "🖼️" },
      { id: "zari", title: "4. Zari", text: "Gold-wrapped threads are woven in for the shining buttis and borders.", icon: "✨" },
      { id: "design", title: "5. Design", text: "Mughal jaals, mango motifs and temple borders tell Varanasi's story.", icon: "🌸" },
      { id: "saree", title: "6. Finished Saree", text: "A GI-tagged heirloom — worn at weddings, passed mother to daughter.", icon: "🥻" },
    ],
  },
];
