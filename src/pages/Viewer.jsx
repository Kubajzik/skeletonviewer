import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bone, RotateCcw, X } from "lucide-react";
import SkeletonViewer from "@/components/skeleton/SkeletonViewer";
import RegionMenu from "@/components/skeleton/RegionMenu";
import RegionChips from "@/components/skeleton/RegionChips";
import BoneInfoPanel from "@/components/skeleton/BoneInfoPanel";
import { BONE_GROUPS, REGIONS } from "@/data/bones";

export default function Viewer() {
  const viewerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [activeRegionId, setActiveRegionId] = useState(null);
  const activeRegion = REGIONS.find((r) => r.id === activeRegionId) || null;

  const handleRegion = (regionId) => {
    if (activeRegionId === regionId) {
      setActiveRegionId(null);
      viewerRef.current?.resetView();
    } else {
      setActiveRegionId(regionId);
      setSelectedId(null);
      viewerRef.current?.focusRegion(regionId);
    }
  };

  const clearIsolation = () => {
    setActiveRegionId(null);
    viewerRef.current?.resetView();
  };

  const handleBoneFromMenu = (groupId) => {
    setSelectedId(groupId);
    viewerRef.current?.focusGroup(groupId);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#0D0E12] text-[#EDEAE2]">
      <header className="z-20 flex items-center justify-between gap-3 border-b border-[#23252e] bg-[#101118] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            aria-label="Back to home"
            className="rounded-md p-1.5 text-[#8b8896] transition-colors hover:bg-[#1C1E24] hover:text-[#EDEAE2]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Bone className="h-5 w-5 shrink-0 text-[#FF9F0A]" />
          <span className="font-display text-lg font-bold tracking-wide">OsteoView</span>
          {activeRegion && (
            <span className="hidden rounded-full border border-[#FF9F0A]/40 bg-[#FF9F0A]/10 px-2.5 py-0.5 text-xs font-medium text-[#FF9F0A] sm:inline-block">
              Isolated — {activeRegion.label}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {activeRegion && (
            <button
              onClick={clearIsolation}
              className="flex items-center gap-1.5 rounded-md border border-[#23252e] bg-[#1C1E24] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[#FF9F0A]/50 hover:text-[#FF9F0A]"
            >
              <X className="h-3.5 w-3.5" /> Full skeleton
            </button>
          )}
          <button
            onClick={() => viewerRef.current?.resetView()}
            className="flex items-center gap-1.5 rounded-md border border-[#23252e] bg-[#1C1E24] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[#FF9F0A]/50 hover:text-[#FF9F0A]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset view
          </button>
        </div>
      </header>

      <RegionChips activeRegion={activeRegionId} onRegionClick={handleRegion} />

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-[#23252e] bg-[#101118]/70 lg:block">
          <RegionMenu
            activeRegion={activeRegionId}
            onRegionClick={handleRegion}
            selectedGroup={selectedId}
            onBoneClick={handleBoneFromMenu}
          />
        </aside>
        <main className="relative min-w-0 flex-1">
          <SkeletonViewer
            ref={viewerRef}
            selectedGroupId={selectedId}
            isolatedRegion={activeRegionId}
            onBoneSelect={setSelectedId}
          />
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#23252e] bg-[#0D0E12]/80 px-4 py-1.5 text-[11px] text-[#8b8896] backdrop-blur">
            Drag to rotate · Scroll to zoom · Click any bone
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 hidden text-[10px] text-[#4f4c58] md:block">
            3D model: Z-Anatomy · CC BY-SA 4.0
          </div>
          <BoneInfoPanel
            bone={selectedId ? BONE_GROUPS[selectedId] : null}
            onClose={() => setSelectedId(null)}
          />
        </main>
      </div>
    </div>
  );
}