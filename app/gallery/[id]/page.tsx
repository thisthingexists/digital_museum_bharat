import Link from "next/link";
import { getGallery, galleries } from "@/data/galleries";
import { getArtifactsByGallery } from "@/lib/museum";
import ArtifactCard from "@/components/ArtifactCard";

const GALLERY_ICONS: Record<string, string> = {
  civilization: "🏛️",
  art: "🎨",
  dance: "💃",
  music: "🎶",
  festivals: "🎉",
  architecture: "🕌",
};

export function generateStaticParams() {
  return galleries.map((g) => ({ id: g.id }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gallery = getGallery(id);
  const items = gallery ? getArtifactsByGallery(gallery.id) : [];

  if (!gallery) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0c0a09] px-6 text-center">
        <h1 className="text-3xl font-bold text-amber-50">Gallery not found</h1>
        <Link href="/#lobby" className="mt-6 text-amber-300 underline">
          ← Back to Lobby
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl bg-[#0c0a09] px-6 py-16">
      <Link href="/#lobby" className="text-sm text-stone-400 hover:text-amber-200">
        ← Lobby
      </Link>
      <p className="mt-6 text-center text-sm tracking-[0.3em] text-amber-400/80 uppercase">
        {gallery.subtitle}
      </p>
      <h1 className="mt-3 text-center text-4xl font-bold text-amber-50 sm:text-5xl">
        {gallery.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-stone-300">
        {gallery.description}
      </p>

      <h2 className="mt-10 text-sm tracking-[0.25em] text-amber-200 uppercase">
        Exhibits ({items.length})
      </h2>
      {items.length > 0 ? (
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li key={a.id}>
              <ArtifactCard
                artifact={a}
                icon={GALLERY_ICONS[gallery.id] ?? "🏺"}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-stone-300">
          No exhibits yet for “{gallery.id}”. Add items in
          data/artifacts.ts with galleryId “{gallery.id}”.
        </p>
      )}
    </main>
  );
}
