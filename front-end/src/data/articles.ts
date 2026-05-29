import type { Article } from "../types/article";

const PICSUM = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const AVATAR = (seed: string) => `https://i.pravatar.cc/64?u=${seed}`;

export const ARTICLES: Article[] = [
  {
    id: "ghost-in-the-machine-sentient-algorithms",
    slug: "ghost-in-the-machine-sentient-algorithms",
    title: "Ghost in the Machine: The Rise of Sentient Algorithms in High-Frequency Trading",
    excerpt:
      "As LLMs scale to unprecedented parameter counts and are integrated directly into dark pool trading algorithms, market analysts are observing emergent, highly coordinated behaviors that defy current theoretical economic models. Are we witnessing the dawn of machine consensus?",
    category: "ai-ml",
    breadcrumb: ["AI Models", "Trading"],
    tags: ["AI MODELS", "CRYPTO"],
    author: { name: "Dr. Aris Thorne", avatarUrl: AVATAR("aris-thorne") },
    coverImageUrl: PICSUM("neon-circuit", 1200, 675),
    thumbnailUrl: PICSUM("neon-circuit", 440, 280),
    readTimeMinutes: 12,
    publishedAt: "Oct 24, 2042",
    isHero: true,
    body: `## Introduction

As organizations migrate workloads to cloud-native infrastructure, the seams between services become the dominant source of risk.

## The Trade-Off Triangle

Every distributed system designer is navigating a triangle of consistency, availability, and operational simplicity.

### Consistency vs. Availability

Strong consistency models like linearizability simplify reasoning at the cost of availability during partitions.

### Operational Surface Area

Every additional moving part is a new on-call burden. A system that is technically correct but operationally fragile is not worth running.

## Patterns Worth Adopting

- **Idempotent producers** — every message handler should tolerate replays.
- **Backpressure as a first-class concern** — never let unbounded queues form.
- **Service-level objectives** — internal targets sharpen prioritization.

## Conclusion

Distributed systems do not get simpler. The job is to keep the *kinds* of complexity you accept aligned with the problems you are actually solving.`,
  },
  {
    id: "quantum-cryptography-q256-broken",
    slug: "quantum-cryptography-q256-broken",
    title: "Quantum Cryptography Protocol Q-256 Broken by Novel Temporal Attack Vector",
    excerpt:
      "Researchers at the Neo-Geneva institute have demonstrated a theoretical exploit bypassing the standard Q-256 encryption. The implications for global secure communications are staggering.",
    category: "quantum",
    breadcrumb: ["Quantum", "Security"],
    tags: ["QUANTUM"],
    author: { name: "Elena Rostova", avatarUrl: AVATAR("elena-rostova") },
    coverImageUrl: PICSUM("quantum-sphere", 440, 280),
    thumbnailUrl: PICSUM("quantum-sphere", 440, 280),
    readTimeMinutes: 8,
    publishedAt: "Oct 23, 2042",
    body: `## Quantum Key Distribution Under Siege

The Q-256 protocol has long been considered unbreakable under classical assumptions. The novel temporal attack vector exploits micro-timing differentials in photon entanglement handshakes.

## Implications

Global financial infrastructure relying on Q-256 must begin migration immediately. The Neo-Geneva team estimates a 14-month window before weaponized tooling emerges in the wild.`,
  },
  {
    id: "neuralink-v3-cortical-streaming",
    slug: "neuralink-v3-cortical-streaming",
    title: "Neuralink's V3 Interface: Hands-On with Direct Cortical Streaming",
    excerpt:
      "We spent a week with the controversial new implant. The bandwidth is staggering, but the sensory bleed from background processes raises serious questions about cognitive privacy.",
    category: "neural",
    breadcrumb: ["Neural-Links", "Hardware"],
    tags: ["NEURAL-LINKS"],
    author: { name: 'Jax "Zero" Vance', avatarUrl: AVATAR("jax-vance") },
    coverImageUrl: PICSUM("neural-chip", 440, 280),
    thumbnailUrl: PICSUM("neural-chip", 440, 280),
    readTimeMinutes: 10,
    publishedAt: "Oct 21, 2042",
    body: `## First Week With V3

The installation took 40 minutes under local anaesthetic. By day two, the latency between intent and digital action had dropped below 8ms — below conscious perception threshold.

## The Bleed Problem

Background OS processes manifest as phantom sensory input: a faint hum during heavy I/O, a pressure sensation during garbage collection cycles. Neuralink calls this "ambient telemetry." Critics call it involuntary advertising.`,
  },
  {
    id: "lab-grown-protein-neo-tokyo",
    slug: "lab-grown-protein-neo-tokyo",
    title: "Synthesizing Meat: The Lab-Grown Protein Taking Over Neo-Tokyo",
    excerpt:
      "Vat-grown wagyu is now cheaper than soy-paste. An inside look at the bio-reactors of OmniCorp and the cultural shift in synthetic consumption across the megacity.",
    category: "synth-bio",
    breadcrumb: ["Synth-Bio", "Culture"],
    tags: ["SYNTH-BIO"],
    author: { name: "Kenji Sato", avatarUrl: AVATAR("kenji-sato") },
    coverImageUrl: PICSUM("bio-neon", 440, 280),
    thumbnailUrl: PICSUM("bio-neon", 440, 280),
    readTimeMinutes: 7,
    publishedAt: "Oct 19, 2042",
    body: `## The Bio-Reactor Economy

OmniCorp's third district facility now produces 40 tonnes of cultured protein daily. The marginal cost curve has finally crossed the threshold that makes synthetic wagyu accessible to every tier of Neo-Tokyo's food economy.

## Cultural Resistance

Traditionalists remain vocal. The Authentic Meat Collective has filed seventeen legal challenges this quarter alone. But among the under-30 demographic, the shift is irreversible.`,
  },
  {
    id: "vr-ar-haptic-feedback-2042",
    slug: "vr-ar-haptic-feedback-2042",
    title: "Beyond Pixels: Full-Body Haptic Rigs Are Redefining VR Presence",
    excerpt:
      "The latest haptic exosuits from SensaTech deliver full-body tactile feedback at sub-5ms latency. We tested them in combat simulations and deep-sea environments.",
    category: "vr-ar",
    breadcrumb: ["VR/AR", "Hardware"],
    tags: ["VR/AR"],
    author: { name: "Mira Okafor", avatarUrl: AVATAR("mira-okafor") },
    coverImageUrl: PICSUM("vr-haptic", 440, 280),
    thumbnailUrl: PICSUM("vr-haptic", 440, 280),
    readTimeMinutes: 9,
    publishedAt: "Oct 17, 2042",
    body: `## The Presence Problem Solved

Every VR researcher from the 2020s identified the same gap: visual fidelity outpaced tactile feedback by decades. SensaTech's exosuit finally closes that gap.

## Test Conditions

Fourteen scenarios across three environments: zero-gravity orbital repair, abyssal trench exploration, and close-quarters combat. Presence scores averaged 94/100 across testers — higher than any previous hardware generation.`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getHeroArticle(): Article | undefined {
  return ARTICLES.find((a) => a.isHero);
}

export function getFeedArticles(): Article[] {
  return ARTICLES.filter((a) => !a.isHero);
}
