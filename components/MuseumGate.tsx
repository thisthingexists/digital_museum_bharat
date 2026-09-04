"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

function DoorPattern({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full flex-col items-center justify-center gap-6 border-amber-200/20 bg-gradient-to-b from-[#3b2410] via-[#241407] to-[#160c04] p-6 ${
        side === "left" ? "border-r-2" : "border-l-2"
      }`}
    >
      {/* Top arch medallion */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-300/60 bg-[#120a04] shadow-[0_0_40px_rgba(251,191,36,0.25)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/40">
          <span className="text-3xl text-amber-300">❋</span>
        </div>
      </div>
      {/* Studs rows - looks like fort door */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-md"
          />
        ))}
      </div>
      {/* Carved lines */}
      <div className="w-full space-y-2 opacity-60">
        <div className="h-px w-full bg-amber-200/40" />
        <div className="h-px w-full bg-amber-200/30" />
        <div className="h-px w-full bg-amber-200/20" />
      </div>
      <p className="text-xs tracking-[0.35em] text-amber-200/60 uppercase">
        {side === "left" ? "भारत" : "INDIA"}
      </p>
    </div>
  );
}

export default function MuseumGate() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Doors slide apart as you scroll 0 -> 70%
  const leftX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);
  // Light behind grows 20% -> 60%
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const beamWidth = useTransform(scrollYProgress, [0.2, 0.7], ["4px", "60vw"]);
  // Camera push-in feel
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  // Hint fades fast, inner text fades in late
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const innerOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);

  const scrollToLobby = () => {
    document.getElementById("lobby")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#0c0a09]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Top label */}
        <div className="absolute top-0 z-30 flex w-full items-center justify-center pt-6">
          <p className="text-xs tracking-[0.4em] text-amber-200/80 uppercase">
            Digital Museum of Indian Heritage
          </p>
        </div>

        {/* Marigold garland - pure CSS dots */}
        <div aria-hidden="true" className="absolute top-12 z-30 flex w-full justify-center gap-2 px-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${
                i % 2 === 0 ? "bg-amber-400" : "bg-orange-600"
              } shadow-[0_0_10px_rgba(251,146,60,0.8)]`}
            />
          ))}
        </div>

        {/* BEHIND THE DOORS: light + lobby teaser */}
        <motion.div style={{ scale }} className="absolute inset-0 flex items-center justify-center">
          {/* Warm glow */}
          <motion.div
            style={{ opacity: reduceMotion ? 1 : glowOpacity }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.45)_0%,rgba(120,53,15,0.35)_35%,#0c0a09_70%)]"
          />
          {/* Vertical light beam in the crack */}
          <motion.div
            style={{
              opacity: reduceMotion ? 0.8 : glowOpacity,
              width: reduceMotion ? "40vw" : beamWidth,
            }}
            className="absolute h-full bg-gradient-to-b from-amber-100/80 via-amber-300/50 to-orange-500/20 blur-xl"
          />
          {/* Inner text */}
          <motion.div
            style={{ opacity: reduceMotion ? 1 : innerOpacity }}
            className="relative z-10 px-6 text-center"
          >
            <p className="text-sm tracking-[0.3em] text-amber-200 uppercase">
              A civilization told through thousands of stories
            </p>
            <h2 className="mt-3 text-4xl font-bold text-amber-50 sm:text-6xl">
              Welcome to India
            </h2>
            <button
              onClick={scrollToLobby}
              className="mt-8 rounded-full bg-amber-400 px-8 py-3 font-semibold text-black transition hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Enter Museum ↓
            </button>
          </motion.div>
        </motion.div>

        {/* FRONT: the two doors */}
        <motion.div
          style={{ x: reduceMotion ? "-100%" : leftX }}
          className="absolute top-0 left-0 z-20 h-full w-1/2 shadow-2xl"
        >
          <DoorPattern side="left" />
        </motion.div>
        <motion.div
          style={{ x: reduceMotion ? "100%" : rightX }}
          className="absolute top-0 right-0 z-20 h-full w-1/2 shadow-2xl"
        >
          <DoorPattern side="right" />
        </motion.div>

        {/* Center seam + lock */}
        <motion.div
          style={{ opacity: reduceMotion ? 0 : hintOpacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300 bg-black/70 text-2xl text-amber-300">
            ✦
          </div>
          <h1 className="mt-6 px-6 text-center text-5xl font-bold text-amber-50 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:text-7xl">
            Enter India
          </h1>
          <p className="mt-3 animate-bounce text-sm tracking-widest text-amber-200 uppercase">
            Scroll to open ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
}
