import Link from "next/link";
import type { Artifact } from "@/types";

// Card used in gallery grid. Links to /artifact/[id].
export default function ArtifactCard({
  artifact,
  icon,
}: {
  artifact: Artifact;
  icon: string;
}) {
  return (
    <Link
      href={`/artifact/${artifact.id}`}
      aria-label={`Open ${artifact.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
    >
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#2a1a0e] to-[#120a04]">
        <span className="text-5xl transition group-hover:scale-110" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs tracking-[0.2em] text-amber-300/80 uppercase">
          {artifact.category} • {artifact.period}
        </p>
        <h3 className="mt-2 font-semibold text-amber-50">{artifact.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-stone-300">
          {artifact.description}
        </p>
        <span className="mt-4 text-sm font-semibold text-amber-200">
          Examine <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
