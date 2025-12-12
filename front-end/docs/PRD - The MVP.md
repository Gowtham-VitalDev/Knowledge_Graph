# The Problem Statement
Readers of technology, inventions, and AI research content frequently encounter online articles that are dense, poorly structured, and difficult to navigate. This leads to:
*   **Information Overload:** Long, unbroken paragraphs with embedded links or images that disrupt reading flow and make it hard to extract key information.
*   **Inefficient Navigation:** A lack of clear outlines or table of contents, forcing readers to scroll extensively to find specific sections.
*   **Limited Multimedia Integration:** Difficulty in consuming related video content directly within the article, requiring users to leave the page.

These pain points result in reader frustration, reduced comprehension, and a less engaging experience when trying to learn about complex technical subjects.

---

# "What" (The Vision & Solution)
**Vision:** To deliver the minimum viable version of Knowledge Graph that introduces a foundational, revolutionary reading and learning experience for technology enthusiasts and developers.

**Solution:** The Knowledge Graph MVP will be a publicly accessible tech blog built on a Next.js and Supabase DB project base. It will directly address the identified problems by providing:
*   **Markdown Renderable Articles:** Content will be written and displayed using Markdown, ensuring fast loading, clean presentation, and an inherently structured format. This solves the problem of dense, confusing text blocks.
*   **Automatic Outline Generation:** Each article will feature an automatically generated, clickable outline (Table of Contents) based on its heading hierarchy. This significantly improves navigation, allowing readers to quickly jump to relevant sections and understand the content's structure.
*   **Inline YouTube Vlog Embedding:** Users can embed YouTube videos directly into articles using a simple "!" syntax. This provides seamless multimedia integration, allowing readers to consume related video content without leaving the page, catering to diverse learning preferences.

This MVP focuses on establishing a core, highly readable, and navigable content consumption experience that is a significant improvement over traditional blog formats.

---

# User Personas: The "Who"

### Persona 1: The Tech Explorer
*   **Name:** Alex
*   **Background:** A curious individual who enjoys staying updated on the latest tech news, inventions, and AI breakthroughs. Not necessarily a developer, but keen to understand new concepts.
*   **Goals:**
    *   Quickly grasp the main points of technical articles without getting overwhelmed.
    *   Easily navigate through content to find sections of interest.
    *   Watch relevant video explanations directly within the article.
*   **Pain Points:** Gets frustrated by long, unstructured articles; struggles to find specific information; dislikes leaving the page to watch videos.

### Persona 2: The Developer Deep-Diver
*   **Name:** Sam
*   **Background:** A software developer or AI researcher who needs to efficiently consume technical documentation, tutorials, and research papers. Values clarity and speed.
*   **Goals:**
    *   Rapidly scan and jump to specific technical details or code examples.
    *   Benefit from a clean, fast-loading reading environment.
    *   Access supplementary video content without interruption.
*   **Pain Points:** Wastes time scrolling through poorly formatted content; finds embedded links disruptive; needs efficient ways to consume information.

---

# Features / User Stories: The "What We Build"

### Epic 1: Core Article Display & Navigation
*   **As a tech reader, I want markdown articles** so content loads instantly and is easy to read with clear formatting (H1-H6, bullets, bold/italic, code blocks).
*   **As a tech reader, I want auto outlines** so I can jump to sections fast and understand the article's structure at a glance.
*   **As an administrator, I want to upload Markdown articles** so I can publish content efficiently.

### Epic 2: Multimedia Content Consumption
*   **As a video learner, I want inline YouTube vlogs** so I don't leave the page and can consume related content in a responsive embedded player.
*   **As an administrator, I want to attach YouTube links** using a simple `!https://youtube.com/watch?v=xxx` syntax, so videos are automatically embedded.

### Epic 3: Public Content Access
*   **As a visitor, I want public access** so I can read immediately without any login or registration barriers.
*   **As an administrator, I want to publish static articles and vlogs** so they are publicly available via SEO-friendly URLs.

---

# Goals & Success Metrics: The "How We Win"

1.  **Goal: Validate the Core Reading & Navigation Experience.**
    *   **Metric:** Average time spent per article (for articles with outlines and embeds) is at least 2 minutes within 1 month post-launch.
    *   **Metric:** Bounce rate for article pages is below 60% within 1 month post-launch.
2.  **Goal: Establish a Functional and Accessible Content Platform.**
    *   **Metric:** 5 static articles and 3 vlogs are successfully published and publicly accessible with 100% uptime for core content pages in the first week.
    *   **Metric:** Markdown rendering and auto-outline function perfectly for 100% of test articles.
3.  **Goal: Achieve Initial Public Reach.**
    *   **Metric:** Attain 1,000 unique monthly visitors within 2 months of launch.

---

# Assumptions, Risks, & Constraints

**Assumptions:**
*   The Next.js framework and Supabase database provide a stable and performant foundation for the MVP.
*   The chosen Markdown rendering library will accurately and efficiently display all specified Markdown elements (H1-H6, bullets, bold/italic, code blocks).
*   YouTube's embedding functionality will remain stable and compatible with our implementation.
*   Administrators have the necessary skills to create content in Markdown and manage YouTube links.

**Risks:**
*   **Performance Degradation:** Poor optimization of Markdown rendering or YouTube embeds could lead to slow page load times, negatively impacting user experience.
*   **Content Creation Bottleneck:** Even with simplified tools, consistently producing high-quality Markdown articles and relevant YouTube vlogs might be challenging for administrators.
*   **Technical Integration Issues:** Unexpected complexities in integrating Markdown rendering or YouTube embedding could delay the MVP launch.
*   **Security Vulnerabilities:** As a publicly accessible platform, there's a risk of security exploits if not properly secured, especially with content rendering.

**Constraints:**
*   The MVP is strictly limited to the 3 core features: Markdown rendering + auto-outline, YouTube vlog embedding, and public access.
*   No user login or profile management will be implemented in this version.
*   Content creation and management will be manual for administrators; no dedicated admin dashboard.
*   The project is built on a Next.js and Supabase DB base.

---

# Out of Scope (What We Are Not Building)
*   **Excalidraw Drawing Integration:** No visual diagrams or interactive drawings will be included.
*   **User Profiles/Accounts:** No login, registration, or personalized features (e.g., saving articles, reading history).
*   **Admin Dashboard:** No dedicated interface for content management, analytics, or user management.
*   **Search Functionality:** No search bar or content search capabilities.
*   **Notifications:** No system for alerts or updates.
*   **Chat/Discussion System:** No public commenting or interaction features.
*   **AI Article Summarizer:** No AI-powered content summarization.
*   **Payment System:** No monetization features (e.g., subscriptions, ads).
*   **Custom Themes:** No options for users to change the website's appearance.
*   **Mobile App:** No native mobile applications.
*   **Multi-Author Blogging System:** Only a single administrator/content creator is supported.

---

# _Meta_Information
*   **Project Name:** Knowledge Graph (MVP)
*   **Product Owner:** 
*   **Date of Creation:** 2025-12-08
*   **Last Updated:** 2025-12-08
*   **Status:** MVP Draft