"""
KnowledgeGraph — Database Seed Script
Run from back-end-py/ with the venv activated:

    python scripts/seed.py

Clears all collections and re-inserts the full seed dataset:
  8 categories · 8 tags · 6 users (1 admin + 5 authors) · 5 articles · 4 trending · 1 site settings
"""

import asyncio
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

# Load .env from back-end-py/
load_dotenv(Path(__file__).parent.parent / ".env")

# MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/knowledgegraph")
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://vdevgowtham_db_user:7dsHDDeF1la8Sifa@knowledgegraphcluster.nyna4dm.mongodb.net/?appName=KnowledgeGraphCluster")
DB_NAME   = os.getenv("DB_NAME",   "knowledgegraph")
ADMIN_EMAIL    = os.getenv("ADMIN_EMAIL",    "admin@knowledgegraph.io")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Admin@1234")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def dt(iso: str) -> datetime:
    return datetime.fromisoformat(iso).replace(tzinfo=timezone.utc)


async def seed():
    client = AsyncIOMotorClient(MONGO_URI)
    db     = client[DB_NAME]

    # ── CLEAR ────────────────────────────────────────────────────
    collections = ["categories", "tags", "users", "articles",
                   "trendingrankings", "newslettersubscribers", "sitesettings"]
    for col in collections:
        await db[col].delete_many({})
    print("[seed] Cleared all collections")

    # ── CATEGORIES ───────────────────────────────────────────────
    cat_docs = [
        {"name": "AI Models",    "slug": "ai-ml",    "description": "Artificial intelligence and machine learning breakthroughs", "icon": "🤖", "colorCode": "#FF2D95", "articleCount": 0},
        {"name": "Quantum",      "slug": "quantum",  "description": "Quantum computing and cryptography",                         "icon": "⚛️",  "colorCode": "#BF5AF2", "articleCount": 0},
        {"name": "Crypto",       "slug": "crypto",   "description": "Cryptocurrency and blockchain technology",                   "icon": "🔗", "colorCode": "#FF9F0A", "articleCount": 0},
        {"name": "Synth-Bio",    "slug": "synth-bio","description": "Synthetic biology and biotech",                             "icon": "🧬", "colorCode": "#32D74B", "articleCount": 0},
        {"name": "VR/AR",        "slug": "vr-ar",    "description": "Virtual and augmented reality",                             "icon": "🥽", "colorCode": "#0A84FF", "articleCount": 0},
        {"name": "Cyber-sec",    "slug": "cybersec", "description": "Cybersecurity and digital defence",                         "icon": "🛡️", "colorCode": "#FF453A", "articleCount": 0},
        {"name": "Neural-Links", "slug": "neural",   "description": "Brain-computer interfaces and neural tech",                 "icon": "🧠", "colorCode": "#64D2FF", "articleCount": 0},
        {"name": "Robotics",     "slug": "robotics", "description": "Robotics and autonomous systems",                           "icon": "🦾", "colorCode": "#FFD60A", "articleCount": 0},
    ]
    result   = await db["categories"].insert_many(cat_docs)
    cat_ids  = {cat_docs[i]["slug"]: result.inserted_ids[i] for i in range(len(cat_docs))}
    print(f"[seed] Inserted {len(cat_docs)} categories")

    # ── TAGS ─────────────────────────────────────────────────────
    tag_docs = [
        {"name": "AI MODELS",    "slug": "ai-models",   "usageCount": 3},
        {"name": "CRYPTO",       "slug": "crypto",       "usageCount": 2},
        {"name": "QUANTUM",      "slug": "quantum",      "usageCount": 2},
        {"name": "NEURAL-LINKS", "slug": "neural-links", "usageCount": 1},
        {"name": "SYNTH-BIO",    "slug": "synth-bio",    "usageCount": 1},
        {"name": "VR/AR",        "slug": "vr-ar",        "usageCount": 1},
        {"name": "SECURITY",     "slug": "security",     "usageCount": 2},
        {"name": "HARDWARE",     "slug": "hardware",     "usageCount": 2},
    ]
    result  = await db["tags"].insert_many(tag_docs)
    tag_ids = {tag_docs[i]["slug"]: result.inserted_ids[i] for i in range(len(tag_docs))}
    print(f"[seed] Inserted {len(tag_docs)} tags")

    # ── USERS ─────────────────────────────────────────────────────
    admin_hash = pwd_context.hash(ADMIN_PASSWORD)
    placeholder = pwd_context.hash("placeholder-not-for-login")

    user_docs = [
        {
            "fullName": "Admin", "username": "admin", "email": ADMIN_EMAIL,
            "passwordHash": admin_hash, "role": "admin",
            "bio": "Platform administrator.",
            "avatarUrl": "https://i.pravatar.cc/64?u=admin",
            "isVerified": True, "status": "active",
        },
        # {
        #     "fullName": "Dr. Aris Thorne", "username": "aris-thorne", "email": "aris@knowledgegraph.io",
        #     "passwordHash": placeholder, "role": "author",
        #     "bio": "AI researcher and algorithmic trading analyst.",
        #     "avatarUrl": "https://i.pravatar.cc/64?u=aris-thorne",
        #     "isVerified": True, "status": "active",
        # },
        # {
        #     "fullName": "Elena Rostova", "username": "elena-rostova", "email": "elena@knowledgegraph.io",
        #     "passwordHash": placeholder, "role": "author",
        #     "bio": "Quantum cryptography researcher at Neo-Geneva institute.",
        #     "avatarUrl": "https://i.pravatar.cc/64?u=elena-rostova",
        #     "isVerified": True, "status": "active",
        # },
        # {
        #     "fullName": "Jax Zero Vance", "username": "jax-vance", "email": "jax@knowledgegraph.io",
        #     "passwordHash": placeholder, "role": "author",
        #     "bio": "Hardware journalist covering neural interfaces.",
        #     "avatarUrl": "https://i.pravatar.cc/64?u=jax-vance",
        #     "isVerified": True, "status": "active",
        # },
        # {
        #     "fullName": "Kenji Sato", "username": "kenji-sato", "email": "kenji@knowledgegraph.io",
        #     "passwordHash": placeholder, "role": "author",
        #     "bio": "Synthetic biology and food technology writer.",
        #     "avatarUrl": "https://i.pravatar.cc/64?u=kenji-sato",
        #     "isVerified": True, "status": "active",
        # },
        # {
        #     "fullName": "Mira Okafor", "username": "mira-okafor", "email": "mira@knowledgegraph.io",
        #     "passwordHash": placeholder, "role": "author",
        #     "bio": "VR/AR technology reviewer and immersive media critic.",
        #     "avatarUrl": "https://i.pravatar.cc/64?u=mira-okafor",
        #     "isVerified": True, "status": "active",
        # },
    ]
    result   = await db["users"].insert_many(user_docs)
    user_ids = {user_docs[i]["username"]: result.inserted_ids[i] for i in range(len(user_docs))}
    print(f"[seed] Inserted {len(user_docs)} users (1 admin + {len(user_docs)-1} authors)")

    # ── ARTICLES ─────────────────────────────────────────────────
    now = datetime.now(timezone.utc)

    article_docs = [
        {
            "slug": "ghost-in-the-machine-sentient-algorithms",
            "title": "Ghost in the Machine: The Rise of Sentient Algorithms in High-Frequency Trading",
            "excerpt": "As LLMs scale to unprecedented parameter counts and are integrated directly into dark pool trading algorithms, market analysts are observing emergent, highly coordinated behaviors that defy current theoretical economic models. Are we witnessing the dawn of machine consensus?",
            "content": """## Introduction

As LLMs scale to unprecedented parameter counts, they are being integrated directly into dark pool trading algorithms. Market analysts are observing emergent, highly coordinated behaviors that defy current theoretical economic models.

![Neural network architecture visualised as a glowing circuit board](https://picsum.photos/seed/neon-circuit-wide/900/400)

## How It Works — The Signal Flow

The diagram below shows how a sentient algorithm processes market signals in real time:

```mermaid
flowchart TD
    A[Market Data Feed] --> B[LLM Signal Parser]
    B --> C{Consensus Check}
    C -->|Aligned| D[Execute Trade]
    C -->|Divergent| E[Hold Position]
    D --> F[Dark Pool Router]
    E --> B
    F --> G[Settlement Layer]
    G -->|Feedback| B
```

## The Emergence Problem

When multiple LLM-based trading agents share the same base model weights, they tend to converge on identical strategies — a phenomenon researchers call **model consensus collapse**.

### Risk Propagation

```mermaid
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
```

## A Deep Dive

https://www.youtube.com/watch?v=aircAruvnKk

## Patterns Worth Adopting

- **Idempotent producers** — every message handler should tolerate replays.
- **Backpressure as a first-class concern** — never let unbounded queues form.
- **Model divergence enforcement** — intentionally introduce weight perturbations across agents to prevent consensus collapse.

## Infrastructure Architecture

```mermaid
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
```

## Conclusion

Distributed systems do not get simpler. As sentient algorithms proliferate, the next frontier is **intentional divergence** — building systems that resist the gravitational pull of consensus.""",
            "coverImage": "https://picsum.photos/seed/neon-circuit/1200/675",
            "categoryId": cat_ids["ai-ml"],
            "tagIds": [tag_ids["ai-models"], tag_ids["crypto"]],
            "authorId": user_ids["aris-thorne"],
            "status": "published", "featured": True,
            "trendingScore": 98, "readTime": 12, "views": 14200,
            "likes": 890, "shares": 340, "bookmarks": 210,
            "seoTitle": "Ghost in the Machine: Sentient Algorithms in HFT",
            "seoDescription": "Exploring emergent AI behavior in high-frequency trading dark pools.",
            "publishedAt": dt("2042-10-24"), "createdAt": now, "updatedAt": now,
        },
        {
            "slug": "quantum-cryptography-q256-broken",
            "title": "Quantum Cryptography Protocol Q-256 Broken by Novel Temporal Attack Vector",
            "excerpt": "Researchers at the Neo-Geneva institute have demonstrated a theoretical exploit bypassing the standard Q-256 encryption. The implications for global secure communications are staggering.",
            "content": """## Quantum Key Distribution Under Siege

The Q-256 protocol has long been considered unbreakable under classical assumptions. The novel temporal attack vector exploits micro-timing differentials in photon entanglement handshakes.

## Implications

Global financial infrastructure relying on Q-256 must begin migration immediately. The Neo-Geneva team estimates a 14-month window before weaponized tooling emerges in the wild.""",
            "coverImage": "https://picsum.photos/seed/quantum-sphere/440/280",
            "categoryId": cat_ids["quantum"],
            "tagIds": [tag_ids["quantum"], tag_ids["security"]],
            "authorId": user_ids["elena-rostova"],
            "status": "published", "featured": False,
            "trendingScore": 87, "readTime": 8, "views": 9800,
            "likes": 540, "shares": 210, "bookmarks": 180,
            "seoTitle": "Q-256 Quantum Cryptography Protocol Broken",
            "seoDescription": "Neo-Geneva researchers break Q-256 with a temporal attack vector.",
            "publishedAt": dt("2042-10-23"), "createdAt": now, "updatedAt": now,
        },
        {
            "slug": "neuralink-v3-cortical-streaming",
            "title": "Neuralink's V3 Interface: Hands-On with Direct Cortical Streaming",
            "excerpt": "We spent a week with the controversial new implant. The bandwidth is staggering, but the sensory bleed from background processes raises serious questions about cognitive privacy.",
            "content": """## First Week With V3

The installation took 40 minutes under local anaesthetic. By day two, the latency between intent and digital action had dropped below 8ms — below conscious perception threshold.

## The Bleed Problem

Background OS processes manifest as phantom sensory input: a faint hum during heavy I/O, a pressure sensation during garbage collection cycles. Neuralink calls this "ambient telemetry." Critics call it involuntary advertising.""",
            "coverImage": "https://picsum.photos/seed/neural-chip/440/280",
            "categoryId": cat_ids["neural"],
            "tagIds": [tag_ids["neural-links"], tag_ids["hardware"]],
            "authorId": user_ids["jax-vance"],
            "status": "published", "featured": False,
            "trendingScore": 76, "readTime": 10, "views": 8100,
            "likes": 420, "shares": 180, "bookmarks": 140,
            "seoTitle": "Neuralink V3 Hands-On Review: Cortical Streaming",
            "seoDescription": "A week with Neuralink V3 — bandwidth, sensory bleed, and cognitive privacy.",
            "publishedAt": dt("2042-10-21"), "createdAt": now, "updatedAt": now,
        },
        {
            "slug": "lab-grown-protein-neo-tokyo",
            "title": "Synthesizing Meat: The Lab-Grown Protein Taking Over Neo-Tokyo",
            "excerpt": "Vat-grown wagyu is now cheaper than soy-paste. An inside look at the bio-reactors of OmniCorp and the cultural shift in synthetic consumption across the megacity.",
            "content": """## The Bio-Reactor Economy

OmniCorp's third district facility now produces 40 tonnes of cultured protein daily. The marginal cost curve has finally crossed the threshold that makes synthetic wagyu accessible to every tier of Neo-Tokyo's food economy.

## Cultural Resistance

Traditionalists remain vocal. The Authentic Meat Collective has filed seventeen legal challenges this quarter alone. But among the under-30 demographic, the shift is irreversible.""",
            "coverImage": "https://picsum.photos/seed/bio-neon/440/280",
            "categoryId": cat_ids["synth-bio"],
            "tagIds": [tag_ids["synth-bio"]],
            "authorId": user_ids["kenji-sato"],
            "status": "published", "featured": False,
            "trendingScore": 65, "readTime": 7, "views": 6500,
            "likes": 310, "shares": 120, "bookmarks": 90,
            "seoTitle": "Lab-Grown Wagyu Takes Over Neo-Tokyo",
            "seoDescription": "Inside OmniCorp's bio-reactors and the cultural shift in synthetic food.",
            "publishedAt": dt("2042-10-19"), "createdAt": now, "updatedAt": now,
        },
        {
            "slug": "vr-ar-haptic-feedback-2042",
            "title": "Beyond Pixels: Full-Body Haptic Rigs Are Redefining VR Presence",
            "excerpt": "The latest haptic exosuits from SensaTech deliver full-body tactile feedback at sub-5ms latency. We tested them in combat simulations and deep-sea environments.",
            "content": """## The Presence Problem Solved

Every VR researcher from the 2020s identified the same gap: visual fidelity outpaced tactile feedback by decades. SensaTech's exosuit finally closes that gap.

## Test Conditions

Fourteen scenarios across three environments: zero-gravity orbital repair, abyssal trench exploration, and close-quarters combat. Presence scores averaged 94/100 across testers — higher than any previous hardware generation.""",
            "coverImage": "https://picsum.photos/seed/vr-haptic/440/280",
            "categoryId": cat_ids["vr-ar"],
            "tagIds": [tag_ids["vr-ar"], tag_ids["hardware"]],
            "authorId": user_ids["mira-okafor"],
            "status": "published", "featured": False,
            "trendingScore": 72, "readTime": 9, "views": 7300,
            "likes": 380, "shares": 155, "bookmarks": 110,
            "seoTitle": "Full-Body Haptic Rigs Redefine VR Presence in 2042",
            "seoDescription": "SensaTech's exosuit reviewed — sub-5ms latency and 94/100 presence scores.",
            "publishedAt": dt("2042-10-17"), "createdAt": now, "updatedAt": now,
        },
    
    ]

    result      = await db["articles"].insert_many(article_docs)
    article_ids = {article_docs[i]["slug"]: result.inserted_ids[i] for i in range(len(article_docs))}

    # Bump articleCount for each category that received a published article
    for doc in article_docs:
        if doc["status"] == "published" and doc.get("categoryId"):
            await db["categories"].update_one(
                {"_id": doc["categoryId"]}, {"$inc": {"articleCount": 1}}
            )
    print(f"[seed] Inserted {len(article_docs)} articles")

    # ── TRENDING RANKINGS ─────────────────────────────────────────
    week_start = dt("2042-10-21")
    trending_docs = [
        {"articleId": article_ids["ghost-in-the-machine-sentient-algorithms"], "weekStartDate": week_start, "rank": 1, "score": 98},
        {"articleId": article_ids["quantum-cryptography-q256-broken"],         "weekStartDate": week_start, "rank": 2, "score": 87},
        {"articleId": article_ids["vr-ar-haptic-feedback-2042"],               "weekStartDate": week_start, "rank": 3, "score": 72},
        {"articleId": article_ids["neuralink-v3-cortical-streaming"],          "weekStartDate": week_start, "rank": 4, "score": 76},
    ]
    await db["trendingrankings"].insert_many(trending_docs)
    print(f"[seed] Inserted {len(trending_docs)} trending rankings")

    # ── SITE SETTINGS ─────────────────────────────────────────────
    await db["sitesettings"].insert_one({
        "homepageHeroTitle": "The Future, Decoded.",
        "homepageHeroSubtitle": "Cutting-edge coverage of AI, quantum computing, neural interfaces, and the technologies reshaping civilization.",
        "featuredArticleId": article_ids["ghost-in-the-machine-sentient-algorithms"],
        "newsletterEnabled": True,
        "maintenanceMode": False,
        "seoDefaults": {
            "metaTitle": "KnowledgeGraph — Tech News from 2042",
            "metaDescription": "In-depth articles on AI, quantum, neural tech, synth-bio, VR/AR and more.",
            "keywords": ["AI", "quantum computing", "neural interfaces", "tech news"],
        },
    })
    print("[seed] Inserted site settings")

    # ── SUMMARY ───────────────────────────────────────────────────
    print("\n[seed] Done.")
    print(f"   categories : {len(cat_docs)}")
    print(f"   tags       : {len(tag_docs)}")
    print(f"   users      : {len(user_docs)}  (admin: {ADMIN_EMAIL})")
    print(f"   articles   : {len(article_docs)}")
    print(f"   trending   : {len(trending_docs)}")
    print( "   settings   : 1")

    client.close()


if __name__ == "__main__":
    try:
        asyncio.run(seed())
    except Exception as e:
        print(f"\n[seed] FAILED: {e}", file=sys.stderr)
        sys.exit(1)
