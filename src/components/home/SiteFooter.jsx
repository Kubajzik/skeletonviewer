import React from "react";
import { Link } from "react-router-dom";
import { Bone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#23252e]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2.5">
          <Bone className="h-5 w-5 text-[#FF9F0A]" />
          <div>
            <p className="font-display text-sm font-bold text-[#F4F1E8]">OsteoView</p>
            <p className="text-xs text-[#6f6c78]">An interactive anatomy study aid for educators.</p>
          </div>
        </div>
        <Link to="/viewer" className="text-xs font-medium text-[#FF9F0A] hover:underline">
          Open the 3D viewer →
        </Link>
      </div>
      <div className="border-t border-[#23252e] px-6 py-4 text-center">
        <p className="text-[11px] text-[#6f6c78]">
          For educational purposes only — not a substitute for formal clinical training.
          <br />
          3D model:{" "}
          <a
            href="https://github.com/Z-Anatomy/Models-of-human-anatomy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FF9F0A]"
          >
            Z-Anatomy
          </a>{" "}
          · CC BY-SA 4.0
        </p>
      </div>
    </footer>
  );
}