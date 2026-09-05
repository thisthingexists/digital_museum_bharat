"use client";

import { useMemo } from "react";
import geo from "@/data/india-geo.json";

type Feature = {
  properties: { name: string };
  geometry:
    | { type: "Polygon"; coordinates: number[][][] }
    | { type: "MultiPolygon"; coordinates: number[][][][] };
};

const W = 400;
const H = 440;
const PAD = 8;
const D2R = Math.PI / 180;

function merc(lng: number, lat: number): [number, number] {
  const mx = lng * D2R;
  const my = Math.log(Math.tan(Math.PI / 4 + (lat * D2R) / 2));
  return [mx, my];
}

export function slugifyGeoName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Renders real boundaries, no D3 needed. Tiny mercator fit in ~30 lines.
export default function IndiaMapSvg({
  selected,
  onSelect,
  hasData,
}: {
  selected: string | null;
  onSelect: (name: string) => void;
  hasData: (name: string) => boolean;
}) {
  const shapes = useMemo(() => {
    const feats = (geo as unknown as { features: Feature[] }).features;
    const pts: [number, number][] = [];
    feats.forEach((f) => {
      const polys =
        f.geometry.type === "Polygon"
          ? [f.geometry.coordinates]
          : f.geometry.coordinates;
      polys.forEach((poly) =>
        poly.forEach((ring) => ring.forEach(([lng, lat]) => pts.push(merc(lng, lat))))
      );
    });
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scale = Math.min(
      (W - PAD * 2) / (maxX - minX),
      (H - PAD * 2) / (maxY - minY)
    );
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    const project = (lng: number, lat: number): [number, number] => {
      const [mx, my] = merc(lng, lat);
      return [W / 2 + (mx - midX) * scale, H / 2 - (my - midY) * scale];
    };

    return feats.map((f) => {
      const polys =
        f.geometry.type === "Polygon"
          ? [f.geometry.coordinates]
          : f.geometry.coordinates;
      let d = "";
      let sx = 0;
      let sy = 0;
      let n = 0;
      polys.forEach((poly) =>
        poly.forEach((ring) => {
          ring.forEach(([lng, lat], i) => {
            const [x, y] = project(lng, lat);
            d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            sx += x;
            sy += y;
            n++;
          });
          d += "Z";
        })
      );
      return { name: f.properties.name, d, cx: sx / Math.max(1, n), cy: sy / Math.max(1, n) };
    });
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="group"
      aria-label="Map of India. Tab through states, press Enter to select."
      className="mx-auto h-auto w-full max-w-[420px]"
    >
      {shapes.map((s) => {
        const isSel = selected === s.name;
        const data = hasData(s.name);
        return (
          <path
            key={s.name}
            d={s.d}
            tabIndex={0}
            role="button"
            aria-label={`${s.name}${data ? " — exhibits available" : " — coming soon"}`}
            aria-pressed={isSel}
            onClick={() => onSelect(s.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(s.name);
              }
            }}
            transform={
              isSel
                ? `translate(${s.cx},${s.cy}) scale(1.08) translate(${-s.cx},${-s.cy})`
                : undefined
            }
            className="outline-none"
            style={{
              cursor: "pointer",
              fill: isSel ? "#f59e0b" : data ? "#b45309" : "#292524",
              stroke: isSel ? "#fffbeb" : data ? "#fbbf24" : "#78716c",
              strokeWidth: isSel ? 1.4 : 0.7,
              transition: "fill 160ms ease, transform 160ms ease, filter 160ms ease",
              filter: isSel
                ? "drop-shadow(0 6px 12px rgba(245,158,11,0.55))"
                : undefined,
            }}
            onMouseEnter={(e) => {
              if (selected !== s.name)
                e.currentTarget.style.filter = "brightness(1.5)";
            }}
            onMouseLeave={(e) => {
              if (selected !== s.name) e.currentTarget.style.filter = "";
            }}
          >
            <title>{s.name}</title>
          </path>
        );
      })}
    </svg>
  );
}
