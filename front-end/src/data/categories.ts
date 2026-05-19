import type { Category, CategoryId } from "../types/article";

export const CATEGORIES: Category[] = [
  { id: "ai-ml",       label: "AI Models",     badgeLabel: "AI MODELS" },
  { id: "quantum",     label: "Quantum",        badgeLabel: "QUANTUM" },
  { id: "crypto",      label: "Crypto",         badgeLabel: "CRYPTO" },
  { id: "synth-bio",   label: "Synth-Bio",      badgeLabel: "SYNTH-BIO" },
  { id: "vr-ar",       label: "VR/AR",          badgeLabel: "VR/AR" },
  { id: "cybersec",    label: "Cyber-sec",      badgeLabel: "CYBER-SEC" },
  { id: "neural",      label: "Neural-Links",   badgeLabel: "NEURAL-LINKS" },
  { id: "robotics",    label: "Robotics",       badgeLabel: "ROBOTICS" },
];

export const FILTER_PILLS: { id: CategoryId | "all"; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "cybersec",  label: "Cyber-sec" },
  { id: "ai-ml",     label: "AI Models" },
  { id: "quantum",   label: "Quantum" },
  { id: "crypto",    label: "Crypto" },
  { id: "synth-bio", label: "Synth-Bio" },
  { id: "vr-ar",     label: "VR/AR" },
  { id: "neural",    label: "Neural-Links" },
  { id: "robotics",  label: "Robotics" },
];

export function getCategoryBadgeLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.badgeLabel ?? id.toUpperCase();
}

export function getCategoryTokenClass(id: string): string {
  const map: Record<string, string> = {
    "ai-ml":     "cat-ai-models",
    "quantum":   "cat-quantum",
    "crypto":    "cat-crypto",
    "synth-bio": "cat-synth-bio",
    "vr-ar":     "cat-vr-ar",
    "cybersec":  "cat-cybersec",
    "neural":    "cat-neural",
  };
  return map[id] ?? "cat-default";
}
