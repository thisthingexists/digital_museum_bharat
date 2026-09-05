"use client";

import { useState } from "react";
import Link from "next/link";
import { timeline } from "@/data/timeline";
import { getArtifact } from "@/data/artifacts";

export default function Timeline() {
  const [activeId, setActiveId] = useState(timeline[0].id);
  const active = timeline.find((t) => t.id === activeId)!;

  return (
    <section id="timeline" aria-label="Historical timeline" className="border-t border-white/10 bg-black/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="text-center text-sm tracking-[0.3em] text-amber-400/80 uppercase">
          Timeline
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold text-amber-50 sm:text-4xl">
          4000 Years in 7 Steps
        </h2>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Eras">
          {timeline.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === activeId}
              onClick={() => setActiveId(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none ${
                t.id === activeId
                  ? "border-amber-300 bg-amber-300/15 text-amber-100"
                  : "border-white/15 text-stone-300 hover:border-amber-200/40"
              }`}
            >
              {t.year} • {t.title}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-amber-300">{active.year}</p>
          <h3 className="mt-1 text-2xl font-bold text-amber-50">{active.title}</h3>
          <p className="mt-2 text-stone-300">{active.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {active.highlights.map((h) => (
              <li key={h} className="rounded-full border border-white/15 px-3 py-1 text-xs text-stone-300">
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            {active.artifactIds.map((aid) => {
              const a = getArtifact(aid);
              if (!a) return null;
              return (
                <Link key={aid} href={`/artifact/${aid}`} className="text-sm text-amber-200 underline">
                  {a.name} →
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
