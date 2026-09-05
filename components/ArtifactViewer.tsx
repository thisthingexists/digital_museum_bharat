"use client";

import { useState } from "react";
import type { Artifact } from "@/types";

// Zoomable viewer. No 3D lib needed — scale transform is smooth + cheap.
// Works with real image URL or pretty fallback when image is empty.
export default function ArtifactViewer({
  artifact,
  icon,
}: {
  artifact: Artifact;
  icon: string;
}) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)));
  const reset = () => setZoom(1);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/20 bg-gradient-to-br from-[#2a1a0e] to-[#120a04]">
        {artifact.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artifact.image}
            alt={artifact.name}
            loading="lazy"
            style={{ transform: `scale(${zoom})` }}
            className="h-72 w-full object-cover transition-transform duration-200 sm:h-96"
          />
        ) : (
          <div
            style={{ transform: `scale(${zoom})` }}
            className="flex h-72 w-full flex-col items-center justify-center gap-3 transition-transform duration-200 sm:h-96"
            role="img"
            aria-label={`${artifact.name} — illustrated placeholder`}
          >
            <span className="text-7xl" aria-hidden="true">
              {icon}
            </span>
            <p className="px-6 text-center text-sm tracking-[0.25em] text-amber-200/70 uppercase">
              {artifact.category}
            </p>
          </div>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-amber-200">
          {zoom.toFixed(1)}x
        </span>
      </div>

      {/* Zoom controls — keyboard accessible buttons */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={zoomOut}
          disabled={zoom <= 1}
          aria-label="Zoom out"
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-stone-200 hover:bg-white/10 disabled:opacity-40"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          disabled={zoom >= 3}
          aria-label="Zoom in"
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-stone-200 hover:bg-white/10 disabled:opacity-40"
        >
          +
        </button>
        <button
          onClick={reset}
          aria-label="Reset zoom"
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-stone-200 hover:bg-white/10"
        >
          Reset
        </button>
        <span className="ml-2 text-xs text-stone-500">
          Examine: zoom to inspect details
        </span>
      </div>
    </div>
  );
}
