import Link from "next/link";
import { artifacts, getArtifact } from "@/data/artifacts";
import { getGallery } from "@/data/galleries";
import { getRelatedArtifacts, getState } from "@/lib/museum";
import ArtifactViewer from "@/components/ArtifactViewer";
import AudioButton from "@/components/AudioButton";

export function generateStaticParams() {
  return artifacts.map((a) => ({ id: a.id }));
}

const GALLERY_ICONS: Record<string, string> = {
  civilization: "🏛️",
  art: "🎨",
  dance: "💃",
  music: "🎶",
  festivals: "🎉",
  architecture: "🕌",
};

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artifact = getArtifact(id);

  if (!artifact) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0c0a09] px-6 text-center">
        <h1 className="text-3xl font-bold text-amber-50">Artifact not found</h1>
        <Link href="/#lobby" className="mt-6 text-amber-300 underline">
          ← Back to Lobby
        </Link>
      </main>
    );
  }

  const gallery = getGallery(artifact.galleryId);
  const icon = GALLERY_ICONS[artifact.galleryId] ?? "🏺";
  const related = getRelatedArtifacts(artifact.id);
  const origins = artifact.stateIds
    .map((sid) => getState(sid))
    .filter((s) => s !== undefined);
  const narration =
    artifact.audioText ??
    `${artifact.name}. ${artifact.description} ${artifact.significance}`;

  return (
    <main className="mx-auto w-full max-w-5xl bg-[#0c0a09] px-6 py-12">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-stone-400">
        <Link href="/#lobby" className="hover:text-amber-200">
          Lobby
        </Link>
        <span aria-hidden="true">/</span>
        {gallery && (
          <>
            <Link
              href={`/gallery/${gallery.id}`}
              className="hover:text-amber-200"
            >
              {gallery.title}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span className="text-amber-200">{artifact.name}</span>
      </nav>

      <p className="mt-6 text-xs tracking-[0.25em] text-amber-300/80 uppercase">
        {artifact.category} • {artifact.period} • {artifact.yearRange}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-amber-50 sm:text-5xl">
        {artifact.name}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ArtifactViewer artifact={artifact} icon={icon} />
        <div>
          <AudioButton text={narration} />
          <p className="mt-5 text-lg leading-8 text-stone-200">
            {artifact.description}
          </p>
          <h2 className="mt-6 text-sm tracking-[0.25em] text-amber-200 uppercase">
            Historical context
          </h2>
          <p className="mt-2 leading-7 text-stone-300">{artifact.history}</p>
          <h2 className="mt-6 text-sm tracking-[0.25em] text-amber-200 uppercase">
            Why it matters
          </h2>
          <p className="mt-2 leading-7 text-stone-300">
            {artifact.significance}
          </p>
          <h2 className="mt-6 text-sm tracking-[0.25em] text-amber-200 uppercase">
            Origin
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            {origins.length > 0
              ? origins.map((s) => `${s!.name} (capital ${s!.capital})`).join(" • ")
              : "Pan-Indian / location debated — see sources"}
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section aria-label="Related artifacts" className="mt-12">
          <h2 className="text-sm tracking-[0.25em] text-amber-200 uppercase">
            Related artifacts
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r!.id}>
                <Link
                  href={`/artifact/${r!.id}`}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-300/40"
                >
                  <p className="font-semibold text-amber-50">{r!.name}</p>
                  <p className="mt-1 text-xs text-stone-400">{r!.period}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources — trust for judges */}
      <section aria-label="Sources" className="mt-10">
        <h2 className="text-sm tracking-[0.25em] text-amber-200 uppercase">
          Sources
        </h2>
        <ul className="mt-3 space-y-1 text-sm">
          {artifact.sources.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-200 underline hover:text-amber-100"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
