import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { Article } from "../models/Article";
import { TrendingRanking } from "../models/TrendingRanking";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber";
import { SiteSettings } from "../models/SiteSettings";

const MONGO_URI = process.env.MONGO_URI!;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("[seed] Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    Category.deleteMany({}),
    Tag.deleteMany({}),
    User.deleteMany({}),
    Article.deleteMany({}),
    TrendingRanking.deleteMany({}),
    NewsletterSubscriber.deleteMany({}),
    SiteSettings.deleteMany({}),
  ]);
  console.log("[seed] Cleared existing collections");

  // ── CATEGORIES ───────────────────────────────────────────────
  const categories = await Category.insertMany([
    { name: "AI Models",    slug: "ai-ml",    description: "Artificial intelligence and machine learning breakthroughs", icon: "🤖", colorCode: "#FF2D95", articleCount: 0 },
    { name: "Quantum",      slug: "quantum",  description: "Quantum computing and cryptography", icon: "⚛️",  colorCode: "#BF5AF2", articleCount: 0 },
    { name: "Crypto",       slug: "crypto",   description: "Cryptocurrency and blockchain technology", icon: "🔗", colorCode: "#FF9F0A", articleCount: 0 },
    { name: "Synth-Bio",    slug: "synth-bio",description: "Synthetic biology and biotech", icon: "🧬",       colorCode: "#32D74B", articleCount: 0 },
    { name: "VR/AR",        slug: "vr-ar",    description: "Virtual and augmented reality", icon: "🥽",       colorCode: "#0A84FF", articleCount: 0 },
    { name: "Cyber-sec",    slug: "cybersec", description: "Cybersecurity and digital defence", icon: "🛡️",   colorCode: "#FF453A", articleCount: 0 },
    { name: "Neural-Links", slug: "neural",   description: "Brain-computer interfaces and neural tech", icon: "🧠", colorCode: "#64D2FF", articleCount: 0 },
    { name: "Robotics",     slug: "robotics", description: "Robotics and autonomous systems", icon: "🦾",     colorCode: "#FFD60A", articleCount: 0 },
  ]);
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c._id]));
  console.log(`[seed] Inserted ${categories.length} categories`);

  // ── TAGS ─────────────────────────────────────────────────────
  const tags = await Tag.insertMany([
    { name: "AI MODELS",   slug: "ai-models",   usageCount: 3 },
    { name: "CRYPTO",      slug: "crypto",       usageCount: 2 },
    { name: "QUANTUM",     slug: "quantum",      usageCount: 2 },
    { name: "NEURAL-LINKS",slug: "neural-links", usageCount: 1 },
    { name: "SYNTH-BIO",   slug: "synth-bio",    usageCount: 1 },
    { name: "VR/AR",       slug: "vr-ar",        usageCount: 1 },
    { name: "SECURITY",    slug: "security",     usageCount: 2 },
    { name: "HARDWARE",    slug: "hardware",     usageCount: 2 },
  ]);
  const tagMap = Object.fromEntries(tags.map((t) => [t.slug, t._id]));
  console.log(`[seed] Inserted ${tags.length} tags`);

  // ── USERS (authors) ───────────────────────────────────────────
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@1234";
  const adminHash = await bcrypt.hash(adminPassword, 10);

  const users = await User.insertMany([
    {
      fullName: "Admin", username: "admin", email: process.env.ADMIN_EMAIL ?? "admin@knowledgegraph.io",
      passwordHash: adminHash, role: "admin",
      bio: "Platform administrator.",
      avatarUrl: "https://i.pravatar.cc/64?u=admin",
      isVerified: true, status: "active",
    },
    {
      fullName: "Dr. Aris Thorne", username: "aris-thorne", email: "aris@knowledgegraph.io",
      passwordHash: "$2b$10$placeholder", role: "author",
      bio: "AI researcher and algorithmic trading analyst.",
      avatarUrl: "https://i.pravatar.cc/64?u=aris-thorne",
      isVerified: true, status: "active",
    },
    {
      fullName: "Elena Rostova", username: "elena-rostova", email: "elena@knowledgegraph.io",
      passwordHash: "$2b$10$placeholder", role: "author",
      bio: "Quantum cryptography researcher at Neo-Geneva institute.",
      avatarUrl: "https://i.pravatar.cc/64?u=elena-rostova",
      isVerified: true, status: "active",
    },
    {
      fullName: "Jax Zero Vance", username: "jax-vance", email: "jax@knowledgegraph.io",
      passwordHash: "$2b$10$placeholder", role: "author",
      bio: "Hardware journalist covering neural interfaces.",
      avatarUrl: "https://i.pravatar.cc/64?u=jax-vance",
      isVerified: true, status: "active",
    },
    {
      fullName: "Kenji Sato", username: "kenji-sato", email: "kenji@knowledgegraph.io",
      passwordHash: "$2b$10$placeholder", role: "author",
      bio: "Synthetic biology and food technology writer.",
      avatarUrl: "https://i.pravatar.cc/64?u=kenji-sato",
      isVerified: true, status: "active",
    },
    {
      fullName: "Mira Okafor", username: "mira-okafor", email: "mira@knowledgegraph.io",
      passwordHash: "$2b$10$placeholder", role: "author",
      bio: "VR/AR technology reviewer and immersive media critic.",
      avatarUrl: "https://i.pravatar.cc/64?u=mira-okafor",
      isVerified: true, status: "active",
    },
  ]);
  const userMap = Object.fromEntries(users.map((u) => [u.username, u._id]));
  console.log(`[seed] Inserted ${users.length} users`);

  // ── ARTICLES ──────────────────────────────────────────────────
  const articles = await Article.insertMany([
    {
      slug: "ghost-in-the-machine-sentient-algorithms",
      title: "Ghost in the Machine: The Rise of Sentient Algorithms in High-Frequency Trading",
      excerpt: "As LLMs scale to unprecedented parameter counts and are integrated directly into dark pool trading algorithms, market analysts are observing emergent, highly coordinated behaviors that defy current theoretical economic models. Are we witnessing the dawn of machine consensus?",
      content: `## Introduction

As LLMs scale to unprecedented parameter counts, they are being integrated directly into dark pool trading algorithms. Market analysts are observing emergent, highly coordinated behaviors that defy current theoretical economic models.

![Neural network architecture visualised as a glowing circuit board](https://picsum.photos/seed/neon-circuit-wide/900/400)

## How It Works — The Signal Flow

The diagram below shows how a sentient algorithm processes market signals in real time:

\`\`\`mermaid
flowchart TD
    A[Market Data Feed] --> B[LLM Signal Parser]
    B --> C{Consensus Check}
    C -->|Aligned| D[Execute Trade]
    C -->|Divergent| E[Hold Position]
    D --> F[Dark Pool Router]
    E --> B
    F --> G[Settlement Layer]
    G -->|Feedback| B
\`\`\`

## The Emergence Problem

When multiple LLM-based trading agents share the same base model weights, they tend to converge on identical strategies — a phenomenon researchers call **model consensus collapse**.

### Consistency vs. Availability

Strong consistency models like linearizability simplify reasoning at the cost of availability during partitions. In HFT, a 40ms delay can mean millions in missed opportunity.

### Risk Propagation

\`\`\`mermaid
sequenceDiagram
    participant A as Agent Alpha
    participant B as Agent Beta
    participant M as Market
    A->>M: Buy signal (confidence 94%)
    B->>M: Buy signal (confidence 96%)
    M-->>A: Liquidity thinning
    M-->>B: Liquidity thinning
    A->>B: Consensus lock detected
    B->>M: Emergency unwind
\`\`\`

## A Deep Dive — Watch This Explanation

https://www.youtube.com/watch?v=aircAruvnKk

## Patterns Worth Adopting

- **Idempotent producers** — every message handler should tolerate replays.
- **Backpressure as a first-class concern** — never let unbounded queues form.
- **Service-level objectives** — internal targets sharpen prioritization.
- **Model divergence enforcement** — intentionally introduce weight perturbations across agents to prevent consensus collapse.

## Infrastructure Architecture

\`\`\`mermaid
graph LR
    subgraph Ingestion
        A[Bloomberg Feed] --> C[Normalizer]
        B[Reuters Feed] --> C
    end
    subgraph Processing
        C --> D[LLM Cluster]
        D --> E[Risk Engine]
    end
    subgraph Execution
        E --> F[Order Router]
        F --> G[Dark Pool A]
        F --> H[Dark Pool B]
    end
\`\`\`

## Conclusion

Distributed systems do not get simpler. The job is to keep the *kinds* of complexity you accept aligned with the problems you are actually solving. As sentient algorithms proliferate, the next frontier is **intentional divergence** — building systems that resist the gravitational pull of consensus.`,
      coverImage: "https://picsum.photos/seed/neon-circuit/1200/675",
      categoryId: catMap["ai-ml"],
      tagIds: [tagMap["ai-models"], tagMap["crypto"]],
      authorId: userMap["aris-thorne"],
      status: "published", featured: true,
      trendingScore: 98, readTime: 12, views: 14200, likes: 890, shares: 340, bookmarks: 210,
      seoTitle: "Ghost in the Machine: Sentient Algorithms in HFT",
      seoDescription: "Exploring emergent AI behavior in high-frequency trading dark pools.",
      publishedAt: new Date("2042-10-24"),
    },
    {
      slug: "quantum-cryptography-q256-broken",
      title: "Quantum Cryptography Protocol Q-256 Broken by Novel Temporal Attack Vector",
      excerpt: "Researchers at the Neo-Geneva institute have demonstrated a theoretical exploit bypassing the standard Q-256 encryption. The implications for global secure communications are staggering.",
      content: `## Quantum Key Distribution Under Siege

The Q-256 protocol has long been considered unbreakable under classical assumptions. The novel temporal attack vector exploits micro-timing differentials in photon entanglement handshakes.

## Implications

Global financial infrastructure relying on Q-256 must begin migration immediately. The Neo-Geneva team estimates a 14-month window before weaponized tooling emerges in the wild.`,
      coverImage: "https://picsum.photos/seed/quantum-sphere/440/280",
      categoryId: catMap["quantum"],
      tagIds: [tagMap["quantum"], tagMap["security"]],
      authorId: userMap["elena-rostova"],
      status: "published", featured: false,
      trendingScore: 87, readTime: 8, views: 9800, likes: 540, shares: 210, bookmarks: 180,
      seoTitle: "Q-256 Quantum Cryptography Protocol Broken",
      seoDescription: "Neo-Geneva researchers break Q-256 with a temporal attack vector.",
      publishedAt: new Date("2042-10-23"),
    },
    {
      slug: "neuralink-v3-cortical-streaming",
      title: "Neuralink's V3 Interface: Hands-On with Direct Cortical Streaming",
      excerpt: "We spent a week with the controversial new implant. The bandwidth is staggering, but the sensory bleed from background processes raises serious questions about cognitive privacy.",
      content: `## First Week With V3

The installation took 40 minutes under local anaesthetic. By day two, the latency between intent and digital action had dropped below 8ms — below conscious perception threshold.

## The Bleed Problem

Background OS processes manifest as phantom sensory input: a faint hum during heavy I/O, a pressure sensation during garbage collection cycles. Neuralink calls this "ambient telemetry." Critics call it involuntary advertising.`,
      coverImage: "https://picsum.photos/seed/neural-chip/440/280",
      categoryId: catMap["neural"],
      tagIds: [tagMap["neural-links"], tagMap["hardware"]],
      authorId: userMap["jax-vance"],
      status: "published", featured: false,
      trendingScore: 76, readTime: 10, views: 8100, likes: 420, shares: 180, bookmarks: 140,
      seoTitle: "Neuralink V3 Hands-On Review: Cortical Streaming",
      seoDescription: "A week with Neuralink V3 — bandwidth, sensory bleed, and cognitive privacy.",
      publishedAt: new Date("2042-10-21"),
    },
    {
      slug: "lab-grown-protein-neo-tokyo",
      title: "Synthesizing Meat: The Lab-Grown Protein Taking Over Neo-Tokyo",
      excerpt: "Vat-grown wagyu is now cheaper than soy-paste. An inside look at the bio-reactors of OmniCorp and the cultural shift in synthetic consumption across the megacity.",
      content: `## The Bio-Reactor Economy

OmniCorp's third district facility now produces 40 tonnes of cultured protein daily. The marginal cost curve has finally crossed the threshold that makes synthetic wagyu accessible to every tier of Neo-Tokyo's food economy.

## Cultural Resistance

Traditionalists remain vocal. The Authentic Meat Collective has filed seventeen legal challenges this quarter alone. But among the under-30 demographic, the shift is irreversible.`,
      coverImage: "https://picsum.photos/seed/bio-neon/440/280",
      categoryId: catMap["synth-bio"],
      tagIds: [tagMap["synth-bio"]],
      authorId: userMap["kenji-sato"],
      status: "published", featured: false,
      trendingScore: 65, readTime: 7, views: 6500, likes: 310, shares: 120, bookmarks: 90,
      seoTitle: "Lab-Grown Wagyu Takes Over Neo-Tokyo",
      seoDescription: "Inside OmniCorp's bio-reactors and the cultural shift in synthetic food.",
      publishedAt: new Date("2042-10-19"),
    },
    {
      slug: "vr-ar-haptic-feedback-2042",
      title: "Beyond Pixels: Full-Body Haptic Rigs Are Redefining VR Presence",
      excerpt: "The latest haptic exosuits from SensaTech deliver full-body tactile feedback at sub-5ms latency. We tested them in combat simulations and deep-sea environments.",
      content: `## The Presence Problem Solved

Every VR researcher from the 2020s identified the same gap: visual fidelity outpaced tactile feedback by decades. SensaTech's exosuit finally closes that gap.

## Test Conditions

Fourteen scenarios across three environments: zero-gravity orbital repair, abyssal trench exploration, and close-quarters combat. Presence scores averaged 94/100 across testers — higher than any previous hardware generation.`,
      coverImage: "https://picsum.photos/seed/vr-haptic/440/280",
      categoryId: catMap["vr-ar"],
      tagIds: [tagMap["vr-ar"], tagMap["hardware"]],
      authorId: userMap["mira-okafor"],
      status: "published", featured: false,
      trendingScore: 72, readTime: 9, views: 7300, likes: 380, shares: 155, bookmarks: 110,
      seoTitle: "Full-Body Haptic Rigs Redefine VR Presence in 2042",
      seoDescription: "SensaTech's exosuit reviewed — sub-5ms latency and 94/100 presence scores.",
      publishedAt: new Date("2042-10-17"),
    },
  ]);

  // Update articleCount on each category
  for (const article of articles) {
    await Category.updateOne({ _id: article.categoryId }, { $inc: { articleCount: 1 } });
  }
  console.log(`[seed] Inserted ${articles.length} articles`);

  // ── TRENDING RANKINGS ─────────────────────────────────────────
  const weekStart = new Date("2042-10-21");
  const articleMap = Object.fromEntries(articles.map((a) => [a.slug, a._id]));

  await TrendingRanking.insertMany([
    { articleId: articleMap["ghost-in-the-machine-sentient-algorithms"], weekStartDate: weekStart, rank: 1, score: 98 },
    { articleId: articleMap["quantum-cryptography-q256-broken"],         weekStartDate: weekStart, rank: 2, score: 87 },
    { articleId: articleMap["vr-ar-haptic-feedback-2042"],               weekStartDate: weekStart, rank: 3, score: 72 },
    { articleId: articleMap["neuralink-v3-cortical-streaming"],          weekStartDate: weekStart, rank: 4, score: 76 },
  ]);
  console.log("[seed] Inserted trending rankings");

  // ── SITE SETTINGS ─────────────────────────────────────────────
  await SiteSettings.create({
    homepageHeroTitle: "The Future, Decoded.",
    homepageHeroSubtitle: "Cutting-edge coverage of AI, quantum computing, neural interfaces, and the technologies reshaping civilization.",
    featuredArticleId: articleMap["ghost-in-the-machine-sentient-algorithms"],
    newsletterEnabled: true,
    maintenanceMode: false,
    seoDefaults: {
      metaTitle: "KnowledgeGraph — Tech News from 2042",
      metaDescription: "In-depth articles on AI, quantum, neural tech, synth-bio, VR/AR and more.",
      keywords: ["AI", "quantum computing", "neural interfaces", "tech news"],
    },
  });
  console.log("[seed] Inserted site settings");

  console.log("\n✅ Seed complete. Collections populated:");
  console.log(`   categories: ${categories.length}`);
  console.log(`   tags:       ${tags.length}`);
  console.log(`   users:      ${users.length}`);
  console.log(`   articles:   ${articles.length}`);
  console.log("   trending:   4");
  console.log("   settings:   1");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[seed] Error:", err);
  process.exit(1);
});
