"use client";

import { useState } from "react";
import Link from "next/link";
import { searchMuseum } from "@/lib/museum";

export default function SearchSection() {
  const [q, setQ] = useState("");
  const { artifacts, states } = searchMuseum(q);

  return (
    <section id="search" aria-label="Global search" className="mx-auto w-full max-w-4xl px-6 py-16">
      <h2 className="text-center text-2xl font-bold text-amber-50">Search the Museum</h2>
      <p className="mt-2 text-center text-sm text-stone-400">
        Artifact, state, festival, dance, period… try “madhubani”, “kerala”, “mughal”
      </p>
      <label htmlFor="museum-search" className="sr-only">
        Search artifacts and states
      </label>
      <input
        id="museum-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="mt-6 w-full rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-amber-50 placeholder:text-stone-500 focus:border-amber-300 focus:outline-none"
      />
      {q.trim().length >= 2 && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          {artifacts.length === 0 && states.length === 0 ? (
            <p className="text-sm text-stone-400">No matches. Try another word.</p>
          ) : (
            <>
              {artifacts.length > 0 && (
                <div>
                  <p className="text-xs tracking-widest text-stone-500 uppercase">Artifacts ({artifacts.length})</p>
                  <ul className="mt-2 space-y-1">
                    {artifacts.slice(0, 6).map((a) => (
                      <li key={a.id}>
                        <Link href={`/artifact/${a.id}`} className="text-sm text-amber-200 underline">
                          {a.name} — {a.period}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {states.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs tracking-widest text-stone-500 uppercase">States ({states.length})</p>
                  <ul className="mt-2 space-y-1">
                    {states.slice(0, 6).map((s) => (
                      <li key={s.id}>
                        <Link href={`/state/${s.id}`} className="text-sm text-amber-200 underline">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
