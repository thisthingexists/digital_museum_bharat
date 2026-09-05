import { NextResponse } from "next/server";
import { answerLocally } from "@/lib/guide";

// POST /api/guide { query } → { text, citations, mode }
// Demo-safe: works offline with zero keys. When you add GEMINI_API_KEY later,
// upgrade here: send retrieval context to LLM — never let LLM answer freely.
export async function POST(req: Request) {
  try {
    const { query } = (await req.json()) as { query?: string };
    if (!query || typeof query !== "string")
      return NextResponse.json({ error: "Missing query" }, { status: 400 });

    const answer = answerLocally(query);

    // Plug-in point for judges: retrieval context already built.
    // const llmKey = process.env.GEMINI_API_KEY;
    // if (llmKey) { ... call LLM with answer.text as context ... }

    return NextResponse.json({ ...answer, mode: "retrieval-local" });
  } catch {
    return NextResponse.json({ error: "Guide failed" }, { status: 500 });
  }
}
