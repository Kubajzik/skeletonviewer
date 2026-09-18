import React from "react";
import { MousePointerClick, Orbit, Stethoscope } from "lucide-react";

const FEATURES = [
  {
    icon: Orbit,
    title: "True 3D exploration",
    text: "Orbit, zoom and pan the complete skeleton in space — no static plates, no washed-out projector slides.",
  },
  {
    icon: Stethoscope,
    title: "Clinical-grade detail",
    text: "21 bone groups with proper anatomical terminology and the clinical pearls that show up on exams.",
  },
  {
    icon: MousePointerClick,
    title: "Click-to-reveal teaching",
    text: "Tap any bone mid-lecture to project its facts, or isolate a region to keep every pair of eyes on the structure you are describing.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-display text-3xl font-bold text-[#F4F1E8] md:text-4xl">
        Built for the lecture hall
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-[#23252e] bg-[#1C1E24] p-6 transition-colors hover:border-[#FF9F0A]/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#FF9F0A]/30 bg-[#FF9F0A]/10">
              <f.icon className="h-5 w-5 text-[#FF9F0A]" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-[#F4F1E8]">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#9a97a3]">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}