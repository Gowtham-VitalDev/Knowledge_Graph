# Repository Guidelines

## Project Structure & Module Organization
Work primarily inside `front-end/`. Source lives in `front-end/src/` with feature-specific folders (`app/` for routing, `components/` for shared UI, `theme/` for tokens/providers, `utils/` for parsing helpers, `services/` and `store/` for future data/state work). Place tests in `src/__tests__/`. The public assets and fonts sit in `front-end/public/`, while research and product context live under `front-end/docs/` and `.codex/`—reference these before adding new modules to stay aligned with the documented roadmap.

## Build, Test, and Development Commands
Run all commands from `front-end/`.
- `npm install` – install dependencies; rerun after updating `package.json`.
- `npm run dev` – start the Next.js dev server at `http://localhost:3000`.
- `npm run build` – create an optimized production bundle; use before deploying.
- `npm run start` – serve the build locally to smoke-test production mode.
- `npm run lint` – run the Next.js ESLint config (`eslint.config.mjs`) for type-safe linting; fix issues or explain waivers in your PR.

## Coding Style & Naming Conventions
Use TypeScript with the Next.js App Router defaults: two-space indentation, modules exported via ES modules, and React components in PascalCase (`MarkdownPreview.tsx`). Hooks should start with `use`, utility files stay lowercase (`markdown.ts`), and CSS lives in `src/app/globals.css` plus Tailwind tokens in `src/theme/`. Favor functional, stateless components and colocate styles or tokens when possible. Always run `npm run lint` before pushing; if you add formatting tooling (e.g., Prettier), document it in this guide.

## Testing Guidelines
Unit and integration tests belong in `src/__tests__/` using filenames like `FeatureCard.test.tsx`. Target new UI, parsers, and theme helpers, exercising both happy-path rendering and failure states (e.g., Markdown edge cases). Keep fixtures lightweight and mock service calls. If you introduce a runner (Vitest/Jest), add an npm script (`"test": "vitest run"`) and update this section so future contributors can run the same command. PRs without accompanying tests should state why coverage is unnecessary.

## Commit & Pull Request Guidelines
Existing commits (`markdown syntax convert`, `next js version changes`) are short, imperative statements—continue that style and keep messages scoped to one change. Reference issue IDs when available (`feat: outline panel #42`). Every PR should include: a short summary of intent, screenshots for UI-visible changes, steps to reproduce/fix, command logs for builds/tests, and links to any docs updated under `front-end/docs/`. Keep diffs focused; split unrelated work into separate branches for easier review.
