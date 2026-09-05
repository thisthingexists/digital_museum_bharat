"use client";

import { useState } from "react";
import Link from "next/link";
import { states } from "@/data/states";
import { getArtifact } from "@/data/artifacts";
import IndiaMapSvg, { slugifyGeoName } from "@/components/IndiaMapSvg";

// Real SVG map (from india_map_claude.html GeoJSON) + detail panel.
// Tap a state → it pops out (scale 1.08) and selects. No API key, offline-safe.
export default function IndiaMap() {
  const [selectedId, setSelectedId] = useState(states[0]?.id ?? "");
  const [selectedGeo, setSelectedGeo] = useState<string | null>(null);

  const selected = states.find((s) => s.id === selectedId);

  const hasData = (geoName: string) =>
    states.some((s) => s.id === slugifyGeoName(geoName));

  const handleGeoSelect = (geoName: string) => {
    setSelectedGeo(geoName);
    const id = slugifyGeoName(geoName);
    // Tamil Nadu -> tamil-nadu etc. If we have data, show it in panel.
    if (states.some((s) => s.id === id)) setSelectedId(id);
  };

  return (
    <section id="map" aria-label="Interactive India map" className="mx-auto w-full max-w-6xl px-6 py-20">
      <p className="text-center text-sm tracking-[0.3em] text-amber-400/80 uppercase">
        Interactive Map
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold text-amber-50 sm:text-4xl">
        Explore by State
      </h2>
      <p className="mt-2 text-center text-sm text-stone-400">
        Tap a state — it pops out. Gold states have exhibits ready.
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <IndiaMapSvg
            selected={selectedGeo}
            onSelect={handleGeoSelect}
            hasData={hasData}
          />
          {selectedGeo && (
            <p className="mt-2 text-center text-sm text-amber-200" aria-live="polite">
              Selected: {selectedGeo}
            </p>
          )}
        </div>

        {selected ? (
          <div className="rounded-2xl border border-amber-200/20 bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-amber-50">{selected.name}</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-stone-500">Art</dt><dd className="text-stone-200">{selected.art.join(" • ")}</dd></div>
              <div><dt className="text-stone-500">Dance</dt><dd className="text-stone-200">{selected.dance.join(" • ")}</dd></div>
              <div><dt className="text-stone-500">Festivals</dt><dd className="text-stone-200">{selected.festivals.join(" • ")}</dd></div>
              <div><dt className="text-stone-500">Architecture</dt><dd className="text-stone-200">{selected.architecture.join(" • ")}</dd></div>
            </dl>
            <div className="mt-4">
              <p className="text-xs tracking-widest text-stone-500 uppercase">Artifacts</p>
              <ul className="mt-2 space-y-1">
                {selected.artifactIds.map((aid) => {
                  const a = getArtifact(aid);
                  if (!a) return null;
                  return (
                    <li key={aid}>
                      <Link href={`/artifact/${aid}`} className="text-sm text-amber-200 underline hover:text-amber-100">
                        {a.name} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link
              href={`/state/${selected.id}`}
              className="mt-5 inline-block rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-300"
            >
              Open {selected.name} →
            </Link>
          </div>
        ) : (
          selectedGeo && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-bold text-amber-50">{selectedGeo}</h3>
              <p className="mt-2 text-sm text-stone-300">
                Exhibits for this state are coming next. Researchers: add it in
                data/states.ts + data/artifacts.ts.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
