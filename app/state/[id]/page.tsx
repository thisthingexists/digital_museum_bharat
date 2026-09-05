import Link from "next/link";
import { states, getState } from "@/data/states";
import { getArtifact } from "@/data/artifacts";

export function generateStaticParams() {
  return states.map((s) => ({ id: s.id }));
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const state = getState(id);

  if (!state) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0c0a09] px-6">
        <h1 className="text-2xl font-bold text-amber-50">State not found</h1>
        <Link href="/#map" className="mt-4 text-amber-300 underline">← Back to Map</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl bg-[#0c0a09] px-6 py-16">
      <Link href="/#map" className="text-sm text-stone-400 hover:text-amber-200">← Map</Link>
      <h1 className="mt-4 text-4xl font-bold text-amber-50">{state.name}</h1>
      <p className="mt-1 text-stone-400">Capital: {state.capital}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(
          [
            ["Art", state.art],
            ["Dance", state.dance],
            ["Music", state.music],
            ["Festivals", state.festivals],
            ["Architecture", state.architecture],
            ["Cuisine", state.cuisine],
          ] as [string, string[]][]
        ).map(([label, items]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h2 className="text-xs tracking-widest text-amber-200 uppercase">{label}</h2>
            <p className="mt-1 text-sm text-stone-200">{items.join(" • ")}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-8 text-sm tracking-widest text-amber-200 uppercase">
        Artifacts from here
      </h2>
      <ul className="mt-3 space-y-2">
        {state.artifactIds.map((aid) => {
          const a = getArtifact(aid);
          if (!a) return null;
          return (
            <li key={aid}>
              <Link href={`/artifact/${aid}`} className="text-amber-200 underline">
                {a.name} →
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
