import { searchMuseum, getArtifact } from "@/lib/museum";
import { timeline } from "@/data/timeline";

export type GuideCitation = { label: string; href: string };
export type GuideAnswer = { text: string; citations: GuideCitation[] };

// Retrieval-only brain. NEVER invents facts — answers ONLY from
// data/artifacts.ts, data/states.ts, data/timeline.ts.
// Future LLM plugs in AFTER this: we send this context to LLM, LLM rephrases.
export function answerLocally(query: string): GuideAnswer {
  const q = query.trim().toLowerCase();
  if (q.length < 2)
    return { text: "Ask me e.g. “What is Warli art?” or “Tell me about Kerala”.", citations: [] };

  const { artifacts, states } = searchMuseum(q);
  const era = timeline.find((t) =>
    [t.title, t.year, t.description].join(" ").toLowerCase().includes(q)
  );

  // Greetings
  if (/^(hi|hello|namaste)/.test(q))
    return {
      text: "Namaste! 🙏 I guide using only our museum database. Ask about an artifact, state, dance or period.",
      citations: [],
    };

  // Best: artifact found
  if (artifacts.length > 0) {
    const top = artifacts.slice(0, 3);
    const first = top[0];
    const lines = top.map(
      (a) => `• ${a.name} (${a.period}, ${a.yearRange}) — ${a.description}`
    );
    return {
      text: `Based on our museum database:\n${lines.join("\n")}\n\nTop match: ${first.history} Why it matters: ${first.significance}`,
      citations: top.map((a) => ({ label: a.name, href: `/artifact/${a.id}` })),
    };
  }

  if (states.length > 0) {
    const s = states[0];
    return {
      text: `${s.name} (capital ${s.capital}) — Art: ${s.art.join(", ")}. Dance: ${s.dance.join(", ")}. Festivals: ${s.festivals.join(", ")}. Architecture: ${s.architecture.join(", ")}.`,
      citations: [
        { label: `${s.name} page`, href: `/state/${s.id}` },
        ...s.artifactIds.slice(0, 2).map((id) => {
          const a = getArtifact(id);
          return { label: a?.name ?? id, href: `/artifact/${id}` };
        }),
      ],
    };
  }

  if (era) {
    return {
      text: `${era.title} (${era.year}): ${era.description} Highlights: ${era.highlights.join(", ")}.`,
      citations: era.artifactIds.slice(0, 3).map((id) => {
        const a = getArtifact(id);
        return { label: a?.name ?? id, href: `/artifact/${id}` };
      }),
    };
  }

  return {
    text: "I couldn't find that in our museum database — I don't invent history. Try “Madhubani”, “Kathakali”, “Mughal” or “Assam”.",
    citations: [],
  };
}
