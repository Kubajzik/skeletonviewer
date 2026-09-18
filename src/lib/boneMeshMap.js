const CRANIUM_PARTS = [
  "frontal",
  "parietal",
  "temporal",
  "occipital",
  "sphenoid",
  "ethmoid",
  "zygomatic",
  "nasal",
  "lacrimal",
  "palatine",
  "vomer",
  "maxilla",
  "sinus",
  "malleus",
  "incus",
  "stapes",
  "hyoid",
  "concha",
  "tooth",
  "incisor",
  "molar",
  "premolar",
  "canine",
];

const HAND_CARPALS = [
  "capitate",
  "scaphoid",
  "lunate",
  "hamate",
  "pisiform",
  "trapezium",
  "trapezoid",
  "triquetrum",
];

const FOOT_TARSALS = ["calcaneus", "talus", "cuboid", "navicular", "cuneiform"];

export function meshNameToGroup(name) {
  // The GLB uses underscores, glued side suffixes (e.g. "handr") and duplicate
  // numbering ("..._1") — normalise all of that before matching.
  const lower = (name || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s\d+$/, "")
    .trim();
  if (lower.startsWith("upper ")) return "cranium";
  if (lower.startsWith("lower ")) return "mandible";
  if (lower.includes("mandible")) return "mandible";
  if (lower.includes("sternum") || lower.includes("xiphoid")) return "sternum";
  if (lower.includes("atlas") || lower.includes("axis") || /^vertebra c/.test(lower)) return "cervical";
  if (/^vertebra t/.test(lower)) return "thoracic";
  if (/^vertebra l/.test(lower)) return "lumbar";
  if (/(^|\s)rib(\.|$)/.test(lower) || lower.includes("costal cartilage")) return "ribs";
  if (lower.includes("sacrum")) return "sacrum";
  if (lower.includes("coccyx")) return "coccyx";
  if (lower.includes("clavicle")) return "clavicle";
  if (lower.includes("scapula")) return "scapula";
  if (lower.includes("humerus")) return "humerus";
  if (lower.includes("radius")) return "radius";
  if (lower.includes("ulna")) return "ulna";
  if (lower.includes("femur")) return "femur";
  if (lower.includes("patella")) return "patella";
  if (lower.includes("tibia")) return "tibia";
  if (lower.includes("fibula")) return "fibula";
  if (lower.includes("hip bone")) return "pelvis";
  if (
    lower.includes("metacarpal") ||
    lower.includes("finger of hand") ||
    HAND_CARPALS.some((t) => lower.includes(t))
  )
    return "hand";
  if (
    lower.includes("metatarsal") ||
    lower.includes("finger of foot") ||
    lower.includes("sesamoid") ||
    FOOT_TARSALS.some((t) => lower.includes(t))
  )
    return "foot";
  if (CRANIUM_PARTS.some((t) => lower.includes(t))) return "cranium";
  return null;
}