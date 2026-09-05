"use client";

import { useState } from "react";
import { stories } from "@/data/stories";

// Reusable story stepper: Silk → Weaver → … → Saree.
// Same component renders any story from data/stories.ts
export default function StoryMode({ storyId = "banarasi-saree" }: { storyId?: string }) {
  const story = stories.find((s) => s.id === storyId) ?? stories[0];
  const [step, setStep] = useState(0);
  const stage = story.stages[step];

  return (
    <section id="stories" aria-label="Story mode" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
        <p className="text-sm tracking-[0.3em] text-amber-400/80 uppercase">Story Mode</p>
        <h2 className="mt-2 text-3xl font-bold text-amber-50">{story.title}</h2>
        <p className="mt-1 text-sm text-stone-400">{story.subtitle}</p>

        <div className="mt-6 flex justify-center gap-1" aria-hidden="true">
          {story.stages.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 w-10 rounded-full ${i <= step ? "bg-amber-300" : "bg-white/15"}`}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="text-6xl" aria-hidden="true">{stage.icon}</div>
          <h3 className="mt-4 text-xl font-bold text-amber-50">{stage.title}</h3>
          <p className="mx-auto mt-2 max-w-md text-stone-300">{stage.text}</p>
          <p className="mt-4 text-xs text-stone-500">
            Step {step + 1} of {story.stages.length}
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-stone-200 disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(story.stages.length - 1, s + 1))}
            disabled={step === story.stages.length - 1}
            className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
