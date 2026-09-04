import MuseumGate from "@/components/MuseumGate";

export default function Home() {
  return (
    <main className="bg-[#0c0a09]">
      <MuseumGate />

      {/* Lobby preview - M3 will expand this into full lobby */}
      <section
        id="lobby"
        className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
      >
        <p className="text-sm tracking-[0.3em] text-amber-400/80 uppercase">
          Smart India Hackathon • PS26197
        </p>
        <h2 className="mt-4 text-4xl font-bold text-amber-50 sm:text-6xl">
          Museum Lobby
        </h2>
        <p className="mt-4 max-w-xl text-lg text-stone-300">
          You walked through the gate. Milestone 2 is working.
          Next: full gallery doors.
        </p>
        <div className="mt-8 flex gap-3 text-sm">
          <span className="rounded-full border border-amber-400/30 px-4 py-2 text-amber-200">
            Gate ✓
          </span>
          <span className="rounded-full border border-white/20 px-4 py-2 text-stone-400">
            Lobby → M3
          </span>
          <span className="rounded-full border border-white/20 px-4 py-2 text-stone-400">
            Data → M4
          </span>
        </div>
      </section>
    </main>
  );
}
