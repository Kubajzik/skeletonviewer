import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6">
      <div className="animate-glow absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9F0A] blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0D0E12] to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#FF9F0A]">
          An interactive anatomy atlas
        </p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] text-[#F4F1E8] md:text-7xl">
          The human frame,
          <br />
          <span className="italic text-[#FF9F0A]">illuminated.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#9a97a3] md:text-lg">
          Rotate, isolate and interrogate a full human skeleton in true 3D. Every bone carries
          its anatomical terminology and the clinical facts that matter at the bedside.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/viewer"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF9F0A] px-7 py-3 text-sm font-semibold text-[#0D0E12] transition-all hover:shadow-[0_0_35px_rgba(255,159,10,0.4)]"
          >
            Open the viewer <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-xs text-[#6f6c78]">
            No login · no setup · works on any projector
          </span>
        </div>
      </div>
    </section>
  );
}