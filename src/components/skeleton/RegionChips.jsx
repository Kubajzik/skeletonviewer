import React from "react";
import { REGIONS } from "@/data/bones";
import { cn } from "@/lib/utils";

export default function RegionChips({ activeRegion, onRegionClick }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-[#23252e] px-3 py-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {REGIONS.map((r) => (
        <button
          key={r.id}
          onClick={() => onRegionClick(r.id)}
          className={cn(
            "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            activeRegion === r.id
              ? "border-[#FF9F0A]/60 bg-[#FF9F0A]/15 text-[#FF9F0A]"
              : "border-[#23252e] bg-[#171922] text-[#9a97a3] hover:text-[#EDEAE2]"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}