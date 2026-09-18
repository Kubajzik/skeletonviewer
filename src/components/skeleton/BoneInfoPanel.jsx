import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BoneInfoPanel({ bone, onClose }) {
  return (
    <AnimatePresence>
      {bone && (
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-x-3 bottom-3 max-h-[55%] overflow-y-auto rounded-xl border border-[#FF9F0A]/25 bg-[#1C1E24]/95 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur md:inset-x-auto md:bottom-4 md:right-4 md:top-4 md:max-h-none md:w-[360px]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#2a2d38] p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FF9F0A]">
                {bone.regionLabel}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-[#F4F1E8]">{bone.name}</h3>
              <p className="mt-0.5 text-sm italic text-[#8b8896]">{bone.latin}</p>
            </div>
            <button
              aria-label="Close panel"
              onClick={onClose}
              className="rounded-md p-1.5 text-[#8b8896] transition-colors hover:bg-[#23252e] hover:text-[#EDEAE2]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <p className="rounded-md border border-[#FF9F0A]/20 bg-[#FF9F0A]/5 px-3 py-2 text-xs font-medium text-[#FF9F0A]">
              {bone.count}
            </p>
            <p className="text-sm leading-relaxed text-[#c7c4ce]">{bone.description}</p>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8b8896]">
                Clinical notes
              </p>
              <ul className="space-y-3.5">
                {bone.facts.map((fact) => (
                  <li key={fact.title} className="border-l-2 border-[#FF9F0A]/50 pl-3">
                    <p className="text-sm font-semibold text-[#EDEAE2]">{fact.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#9a97a3]">{fact.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}