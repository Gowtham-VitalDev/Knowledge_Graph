import type { Article } from "../types/article";

const PICSUM = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const AVATAR = (seed: string) => `https://i.pravatar.cc/64?u=${seed}`;

export const ARTICLES: Article[] = [
  {
    slug: "the-future-of-distributed-systems",
    title:
      "The Future of Distributed Systems: Navigating Complexity in Cloud-Native Architectures",
    excerpt:
      "As microservices proliferate, understanding the inherent trade-offs in distributed system design becomes critical. We explore the latest patterns for resilience and scalability.",
    category: "systems",
    breadcrumb: ["Systems", "Distributed Architecture"],
    tags: ["Architecture", "DevOps", "Performance"],
    author: {
      name: "Dr. Elena Rostova",
      avatarUrl: AVATAR("elena-rostova"),
    },
    coverImageUrl: PICSUM("distributed-systems", 1200, 720),
    thumbnailUrl: PICSUM("distributed-systems", 240, 180),
    readTimeMinutes: 12,
    publishedAt: "2026-10-12",
    isHero: true,
    body: `## Introduction

As organizations migrate workloads to cloud-native infrastructure, the seams between services become the dominant source of risk. The patterns that worked at single-service scale often break — silently — when a system spans regions, teams, and runtime environments.

## The Trade-Off Triangle

Every distributed system designer is, whether they realize it or not, navigating a triangle of consistency, availability, and operational simplicity.

### Consistency vs. Availability

Strong consistency models like linearizability simplify reasoning at the cost of availability during partitions. Eventual consistency flips the trade-off — but pushes the complexity to the application layer.

### Operational Surface Area

The third corner is rarely discussed: every additional moving part is a new on-call burden. A system that is technically correct but operationally fragile is not a system worth running.

## Patterns Worth Adopting

- **Idempotent producers** — every message handler should tolerate replays.
- **Backpressure as a first-class concern** — never let unbounded queues form.
- **Service-level objectives over service-level agreements** — internal targets sharpen prioritization.

## Conclusion

Distributed systems do not get simpler. The job is to keep the *kinds* of complexity you accept aligned with the problems you are actually solving.`,
  },

  {
    slug: "demystifying-large-language-models",
    title: "Demystifying Large Language Models: Beyond the Hype",
    excerpt:
      "A pragmatic look at how LLMs actually work under the hood, their current limitations, and practical applications in modern software.",
    category: "ai-ml",
    breadcrumb: ["AI & ML", "LLMs"],
    tags: ["Python", "Architecture"],
    author: { name: "Marcus Chen", avatarUrl: AVATAR("marcus-chen") },
    coverImageUrl: PICSUM("llm-demystified", 1200, 720),
    thumbnailUrl: PICSUM("llm-demystified", 240, 180),
    readTimeMinutes: 8,
    publishedAt: "2026-10-10",
    body: `## What is a language model, really?

Strip away the marketing and an LLM is a function that scores the likelihood of a token given a context. Everything else — chain of thought, tool use, agents — is built on top of that one primitive.

## Where they shine

- Pattern completion in well-structured domains
- Translation between formal representations
- Summarization of redundant text

## Where they break

- Multi-step arithmetic without scratchpad
- Reasoning over deeply nested conditional logic
- Anything requiring stable working memory across long horizons

## Practical advice

Treat LLMs like a junior collaborator who can read fast and write fluently but forgets what they were doing every five minutes. Design systems around that profile, not around the press releases.`,
  },

  {
    slug: "the-return-to-server-side-rendering",
    title: "The Return to Server-Side Rendering",
    excerpt:
      "Why the pendulum is swinging back from SPAs to SSR, and how modern frameworks are combining the best of both worlds.",
    category: "web",
    breadcrumb: ["Web Development", "Frameworks"],
    tags: ["React", "Performance", "JavaScript"],
    author: { name: "Sarah Jenkins", avatarUrl: AVATAR("sarah-jenkins") },
    coverImageUrl: PICSUM("ssr-return", 1200, 720),
    thumbnailUrl: PICSUM("ssr-return", 240, 180),
    readTimeMinutes: 6,
    publishedAt: "2026-10-08",
    body: `## The pendulum swings back

For a decade the SPA was the default. The cost — bundle bloat, hydration cliffs, accessibility regressions — eventually outweighed the developer ergonomics. Modern frameworks now ship hybrid models by default.

## The new contract

You write components once. The framework decides which run on the server, which run on the client, and which run on both. The trade-off is no longer SSR vs. SPA — it's the granularity of that decision.

## What to look for

- **Streaming responses** — first byte beats first paint.
- **Selective hydration** — pay for interactivity only where you need it.
- **Edge runtime support** — proximity is the new perf budget.`,
  },

  {
    slug: "building-real-time-data-pipelines-with-kafka",
    title: "Building Real-Time Data Pipelines with Kafka",
    excerpt:
      "An architect's guide to designing robust, fault-tolerant streaming data architectures capable of handling millions of events per second.",
    category: "data",
    breadcrumb: ["Data Science", "Streaming"],
    tags: ["Databases", "Architecture", "Performance"],
    author: { name: "David Okafor", avatarUrl: AVATAR("david-okafor") },
    coverImageUrl: PICSUM("kafka-pipelines", 1200, 720),
    thumbnailUrl: PICSUM("kafka-pipelines", 240, 180),
    readTimeMinutes: 15,
    publishedAt: "2026-10-05",
    body: `## Streaming is not batch with smaller windows

The mental shift required to build real-time pipelines is harder than the technology. Throughput, latency, and ordering guarantees compete for the same resources.

## Topology fundamentals

- **Partitioning strategy** drives parallelism and ordering.
- **Consumer group semantics** dictate failure recovery behavior.
- **Schema evolution** is the silent killer six months in.

## Operating posture

Plan for replays before you ever go to production. The day you wish you had idempotent processing is the day you do not have it.`,
  },

  {
    slug: "effective-code-review-culture",
    title: "Effective Code Review Culture",
    excerpt:
      "How to move beyond nitpicking syntax to fostering a collaborative environment that actually improves code quality and team velocity.",
    category: "engineering",
    breadcrumb: ["Engineering", "Practices"],
    tags: ["Leadership", "Career"],
    author: { name: "Emily Davis", avatarUrl: AVATAR("emily-davis") },
    coverImageUrl: PICSUM("code-review", 1200, 720),
    thumbnailUrl: PICSUM("code-review", 240, 180),
    readTimeMinutes: 5,
    publishedAt: "2026-10-02",
    body: `## Reviews are conversations, not gates

The fastest way to ruin a review culture is to treat reviews as a quality checkpoint instead of a knowledge transfer. The first frame produces friction; the second produces leverage.

## Three habits worth building

1. **Lead with intent** — describe what you tried to do, not just what changed.
2. **Separate "must" from "could"** — an unflagged opinion becomes a blocker.
3. **Approve and ship** — reviews that linger past 24 hours hurt morale and quality.`,
  },

  {
    slug: "typography-in-ui-a-practical-guide",
    title: "Typography in UI: A Practical Guide",
    excerpt:
      "Establishing clear hierarchy, selecting appropriate typefaces, and fine-tuning spacing for maximum readability in web applications.",
    category: "design",
    breadcrumb: ["Design", "Typography"],
    tags: ["CSS", "Design"],
    author: { name: "Alex Rivera", avatarUrl: AVATAR("alex-rivera") },
    coverImageUrl: PICSUM("typography-ui", 1200, 720),
    thumbnailUrl: PICSUM("typography-ui", 240, 180),
    readTimeMinutes: 9,
    publishedAt: "2026-09-28",
    body: `## Type is the interface

Before color, before motion, type is what users actually read. A typography system is a contract about hierarchy, rhythm, and emphasis.

## Three rules

- **Constrain the scale** — five sizes is plenty.
- **Anchor on body, derive the rest** — start at 16px and walk outward.
- **Line length over font size** — readability lives in measure, not points.`,
  },

  {
    slug: "scaling-graph-neural-networks-for-fraud-detection",
    title: "Scaling Graph Neural Networks for Real-Time Fraud Detection",
    excerpt:
      "How to operate Graph Neural Networks at production scale for sub-100ms fraud inference, and why the bottleneck is rarely the model itself.",
    category: "research",
    breadcrumb: ["Engineering", "System Architecture"],
    tags: ["Architecture", "Databases", "Performance"],
    author: { name: "Dr. Elena Rostova", avatarUrl: AVATAR("elena-rostova") },
    coverImageUrl: PICSUM("gnn-fraud", 1200, 720),
    thumbnailUrl: PICSUM("gnn-fraud", 240, 180),
    readTimeMinutes: 8,
    publishedAt: "2026-10-12",
    body: `Graph Neural Networks (GNNs) have emerged as the premier architecture for identifying complex, multi-hop patterns in interconnected data. Unlike traditional machine learning models that treat entities as isolated tabular records, GNNs explicitly model the relationships—the edges—between these entities.

However, transitioning these powerful models from static, academic datasets (like Cora or PubMed) to a high-throughput, low-latency production environment presents significant distributed systems challenges.

## The Challenge of Scale

When moving to production, the primary bottleneck is rarely the neural network's forward pass; rather, it is the data preparation phase. To compute the embedding for a single target node, a GNN must aggregate features from its neighbors, its neighbors' neighbors, and so on.

### Neighborhood Explosion

This recursive dependency leads to a phenomenon known as *neighborhood explosion*. If the average degree of a node is \`d\`, a \`k\`-hop GNN requires fetching features for \`d^k\` nodes. In highly connected graphs—such as financial transaction networks—this number grows exponentially.

\`\`\`python
def sample_neighborhood(node_id, graph_store, hops=2, max_degree=15):
    """
    Uniformly samples a computational graph to prevent
    exponential blowup during inference.
    """
    frontier = [node_id]
    sampled_nodes = set([node_id])

    for hop in range(hops):
        next_frontier = []
        for n in frontier:
            neighbors = graph_store.get_neighbors(n)
            # Cap the number of neighbors to bounded constant
            sampled = random.sample(neighbors, min(len(neighbors), max_degree))
            next_frontier.extend(sampled)
            sampled_nodes.update(sampled)

        frontier = next_frontier

    return list(sampled_nodes)
\`\`\`

As demonstrated in the snippet above, bounded neighbor sampling is non-negotiable. Without it, a single inference request could theoretically require reading a significant fraction of the entire database into memory.

### System Requirements

To support sub-100ms inference for fraud detection, the infrastructure must provide:

- **High-Concurrency Graph Storage:** The graph structure must reside in memory, distributed across a cluster, allowing for microsecond-level neighbor traversals.
- **Decoupled Feature Stores:** Node properties (features) should be stored separately in a highly optimized KV store (e.g., Redis or DynamoDB), allowing parallel bulk-fetches once the computational graph is sampled.
- **Asynchronous Computation:** The sampling, fetching, and tensor computation phases should be pipelined to maximize GPU utilization.

## Architectural Deep Dive

In the next section, we will detail the specific architecture we deployed using PyTorch Geometric and a custom distributed graph database tailored for temporal property graphs.

### Storage Layer

A temporal property graph stores edges with timestamps, allowing time-travel queries that match the exact state of the graph at the moment a transaction occurred.

### Inference Pipeline

The pipeline is structured as a three-stage async DAG: sample, fetch, infer. Each stage has its own backpressure boundary.

## Conclusion

GNNs in production are a systems problem first and a modeling problem second. The model architecture choices that win on benchmarks rarely survive the latency budget — but the architectures that survive deliver detection capabilities tabular models simply cannot match.`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getHeroArticle(): Article | undefined {
  return ARTICLES.find((a) => a.isHero);
}

export function getFeedArticles(): Article[] {
  return ARTICLES.filter((a) => !a.isHero && a.category !== "research");
}
