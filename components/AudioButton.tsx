"use client";

import { useState } from "react";

// Browser text-to-speech. Zero cost, Hindi + English, no API key.
// Future: swap speechSynthesis with AI voice API — same button.
export default function AudioButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState<string | null>(null);

  const speak = (lang: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Audio not supported in this browser. Read the story below.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.95;
    u.onend = () => setPlaying(null);
    setPlaying(lang);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-stone-400">🎧 Listen:</span>
      <button
        onClick={() => (playing ? stop() : speak("en-IN"))}
        className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
      >
        {playing === "en-IN" ? "⏹ Stop" : "▶ English"}
      </button>
      <button
        onClick={() => (playing ? stop() : speak("hi-IN"))}
        className="rounded-full border border-amber-300/50 px-4 py-2 text-sm text-amber-200 hover:bg-white/10"
      >
        {playing === "hi-IN" ? "⏹ रोकें" : "▶ हिन्दी"}
      </button>
    </div>
  );
}
