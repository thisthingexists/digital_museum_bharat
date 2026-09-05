"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { galleries } from "@/data/galleries";

export default function MuseumLobby() {
  return (
    <motion.section
      id="lobby"
      aria-label="Museum lobby"
      className="relative mx-auto w-full max-w-6xl px-6 pt-10 pb-24"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Continuity glow so the gate hands directly to the lobby — no black gap */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.12)_0%,transparent_70%)]"
      />
      {/* Heading — gate already said Welcome, so lobby moves the story forward */}
      <p className="text-center text-sm tracking-[0.3em] text-amber-400/80 uppercase">
        Museum Lobby
      </p>
      <h2 className="mt-3 text-center text-4xl font-bold text-amber-50 sm:text-5xl">
        Where Will You Go First?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-stone-300">
        Six galleries, thousands of years. Step through any door to begin
        exploring.
      </p>

      {/* Gallery doors */}
      <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((g, i) => (
          <motion.li
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <Link
              href={`/gallery/${g.id}`}
              aria-label={`${g.title} — ${g.status === "open" ? "enter" : "preview"}`}
              className={`group flex h-full flex-col rounded-2xl border bg-white/[0.03] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none ${g.accent}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden="true">
                  {g.icon}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs tracking-widest uppercase ${
                    g.status === "open"
                      ? "border-emerald-300/40 text-emerald-200"
                      : "border-white/20 text-stone-400"
                  }`}
                >
                  {g.status === "open" ? "Open" : "M5 soon"}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-amber-50">
                {g.title}
              </h3>
              <p className="mt-1 text-sm font-medium opacity-80">{g.subtitle}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-stone-300">
                {g.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                Enter
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-stone-500">
        Tip: Civilization, Art and Dance open first in M4–M5. Others unlock next.
      </p>
    </motion.section>
  );
}
