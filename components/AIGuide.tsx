"use client";

import { useState } from "react";
import Link from "next/link";

type Msg = { role: "user" | "guide"; text: string; cites?: { label: string; href: string }[] };

const QUICK = ["What is Warli art?", "Tell me about Kerala", "Mughal period?", "What is Sattriya?"];

// Floating guide. Talks to /api/guide (retrieval-only, no hallucination).
export default function AIGuide() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "guide", text: "Namaste! 🙏 Ask me about any artifact, state or period — I answer only from our museum database." },
  ]);
  const [loading, setLoading] = useState(false);

  const ask = async (q: string) => {
    const query = q.trim();
    if (!query || loading) return;
    setMsgs((m) => [...m, { role: "user", text: query }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "guide", text: data.text ?? "Sorry, try again.", cites: data.citations }]);
    } catch {
      setMsgs((m) => [...m, { role: "guide", text: "Network hiccup — try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close museum guide" : "Open museum guide"}
        className="fixed right-5 bottom-5 z-50 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black shadow-xl hover:bg-amber-300"
      >
        {open ? "✕ Guide" : "🧭 AI Guide"}
      </button>

      {open && (
        <div className="fixed right-5 bottom-20 z-50 flex h-[480px] w-[330px] flex-col overflow-hidden rounded-2xl border border-amber-200/30 bg-[#1c1410] shadow-2xl">
          <div className="border-b border-white/10 p-3">
            <p className="font-semibold text-amber-100">Museum Guide</p>
            <p className="text-xs text-stone-400">Retrieval-based • cites sources • no hallucination</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <p
                  className={`inline-block max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${
                    m.role === "user" ? "bg-amber-400 text-black" : "bg-white/10 text-stone-100"
                  }`}
                >
                  {m.text}
                </p>
                {m.cites && m.cites.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {m.cites.map((c) => (
                      <Link key={c.href} href={c.href} className="text-xs text-amber-300 underline">
                        {c.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <p className="text-xs text-stone-400">Searching museum database…</p>}
          </div>
          <div className="flex flex-wrap gap-1 border-t border-white/10 p-2">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="rounded-full border border-white/15 px-2 py-1 text-xs text-stone-300 hover:border-amber-300"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2 p-2"
          >
            <label htmlFor="guide-input" className="sr-only">Ask the guide</label>
            <input
              id="guide-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What is this artifact?"
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-amber-50 focus:border-amber-300 focus:outline-none"
            />
            <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black">
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  );
}
