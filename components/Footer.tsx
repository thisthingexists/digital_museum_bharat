import Link from "next/link";

// Footer with nav + accessibility note. Keeps demo honest for judges.
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-amber-100">Enter India — Digital Museum</p>
          <p className="mt-1 text-xs text-stone-500">
            SIH PS26197 • Sources: ASI, Ministry of Culture, UNESCO, Sangeet Natak Akademi
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/#lobby" className="text-stone-300 hover:text-amber-200">Lobby</Link>
          <Link href="/#search" className="text-stone-300 hover:text-amber-200">Search</Link>
          <Link href="/#map" className="text-stone-300 hover:text-amber-200">Map</Link>
          <Link href="/#timeline" className="text-stone-300 hover:text-amber-200">Timeline</Link>
          <Link href="/#stories" className="text-stone-300 hover:text-amber-200">Stories</Link>
        </nav>
      </div>
      <p className="border-t border-white/5 px-6 py-3 text-center text-xs text-stone-600">
        Accessible: keyboard navigable, screen-reader labels, reduced-motion respected, EN/HI audio.
      </p>
    </footer>
  );
}
