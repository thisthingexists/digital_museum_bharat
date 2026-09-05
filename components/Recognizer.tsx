"use client";

import { useState } from "react";
import Link from "next/link";
import { searchMuseum, artifacts } from "@/lib/museum";

// WOW prototype: upload → mock vision → best matches from OUR database.
// Real vision model plugs in later at the marked line — UI stays same.
export default function Recognizer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [hits, setHits] = useState<typeof artifacts>([]);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setName(f.name);
    setDone(false);
    setHits([]);
  };

  const identify = () => {
    setBusy(true);
    // PLUG REAL VISION HERE: send image → model returns label → searchMuseum(label)
    const guess = name.replace(/\.[a-z]+$/i, "").replace(/[-_]+/g, " ");
    setTimeout(() => {
      const { artifacts: found } = searchMuseum(guess);
      setHits((found.length > 0 ? found : artifacts).slice(0, 3));
      setBusy(false);
      setDone(true);
    }, 1200);
  };

  return (
    <section id="recognize" aria-label="Artifact recognition" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
        <p className="text-sm tracking-[0.3em] text-amber-400/80 uppercase">WOW • Prototype</p>
        <h2 className="mt-2 text-3xl font-bold text-amber-50">Snap an Artifact → Identify</h2>
        <p className="mt-2 text-sm text-stone-400">
          Upload a photo. Mock vision matches it against our database. Real model plugs in later.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-amber-200/40 bg-white/[0.03] p-6">
          <label htmlFor="artifact-photo" className="sr-only">Upload artifact photo</label>
          <input
            id="artifact-photo"
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            className="w-full text-sm text-stone-300"
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Uploaded artifact preview" className="mx-auto mt-4 max-h-56 rounded-xl" />
          )}
          <button
            onClick={identify}
            disabled={!preview || busy}
            className="mt-4 rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-black disabled:opacity-40"
          >
            {busy ? "Seeing…" : "Identify ✨"}
          </button>
        </div>

        {done && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <p className="text-sm text-stone-400">
              “Terracotta Bull • Indus Valley • c. 2500 BCE” style result — matched from OUR data:
            </p>
            <ul className="mt-3 space-y-2">
              {hits.map((a, i) => (
                <li key={a.id} className="flex items-center justify-between gap-3">
                  <Link href={`/artifact/${a.id}`} className="text-sm text-amber-200 underline">
                    {a.name} — {a.period}
                  </Link>
                  <span className="text-xs text-stone-500">{92 - i * 9}% match (mock)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
