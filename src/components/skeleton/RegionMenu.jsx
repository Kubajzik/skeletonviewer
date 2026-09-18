import React, { useState } from "react";
import { Activity, Brain, ChevronDown, Footprints, Hand, Heart, Layers } from "lucide-react";
import { REGIONS, BONE_GROUPS } from "@/data/bones";
import { cn } from "@/lib/utils";

const ICONS = {
  head: Brain,
  spine: Activity,
  thorax: Heart,
  "upper-limb": Hand,
  pelvis: Layers,
  "lower-limb": Footprints,
};

export default function RegionMenu({ activeRegion, onRegionClick, selectedGroup, onBoneClick }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <nav className="p-4">
      <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8b8896]">
        Skeletal regions
      </p>
      <ul className="space-y-1.5">
        {REGIONS.map((region) => {
          const Icon = ICONS[region.id];
          const isActive = activeRegion === region.id;
          const isOpen = expanded === region.id;
          return (
            <li key={region.id}>
              <div
                className={cn(
                  "flex items-center rounded-lg border transition-colors",
                  isActive
                    ? "border-[#FF9F0A]/50 bg-[#FF9F0A]/10"
                    : "border-transparent bg-[#171922] hover:bg-[#1C1E28]"
                )}
              >
                <button
                  className="flex flex-1 items-center gap-2.5 px-3 py-2.5 text-left"
                  onClick={() => onRegionClick(region.id)}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-[#FF9F0A]" : "text-[#8b8896]")} />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-[#FF9F0A]" : "text-[#EDEAE2]"
                    )}
                  >
                    {region.label}
                  </span>
                </button>
                <button
                  aria-label={`List bones of the ${region.label}`}
                  className="px-2.5 py-2"
                  onClick={() => setExpanded(isOpen ? null : region.id)}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-[#8b8896] transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>
              {isOpen && (
                <ul className="mt-1 ml-4 space-y-0.5 border-l border-[#23252e] pl-3">
                  {region.groups.map((g) => (
                    <li key={g}>
                      <button
                        className={cn(
                          "w-full rounded px-2 py-1.5 text-left text-[13px] transition-colors",
                          selectedGroup === g
                            ? "bg-[#FF9F0A]/15 text-[#FF9F0A]"
                            : "text-[#9a97a3] hover:text-[#EDEAE2]"
                        )}
                        onClick={() => onBoneClick(g)}
                      >
                        {BONE_GROUPS[g].name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}