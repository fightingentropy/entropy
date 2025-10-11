# Repository Guidelines

## Project Structure & Module Organization
This Next.js 16 app uses the App Router under `src/app`. Route folders such as `about`, `ai`, `posts`, `quotes`, and `tweets` each expose a `page.tsx`, while shared UI lives in `src/app/components` and server utilities in `src/app/utils.ts`. Markdown posts belong in `src/app/posts`, and structured quote/tweet data sits in `src/data`. Keep static assets in `public`; anything in `.next` or `out` is build output and should not be edited manually.

## Build, Test, and Development Commands
Use Node ≥ 18 with Bun installed. Run `bun install` once per dependency change. `bun run dev` starts the hot-reloading dev server, and `bun run build` compiles the site for production before `bun run start`. Security tooling relies on Bun as well: `bun run audit` checks dependencies, `bun run audit:fix` attempts remediations, and `bun run security-check` chains the audit with `bun ci` for CI parity.

## Coding Style & Naming Conventions
Match the existing two-space indentation, single quotes, and TypeScript strictness. Name React components in PascalCase and colocate component files as `<Component>.tsx`. Helper modules, hooks, and data loaders use camelCase file names. Default to server components; add `'use client'` only when browser APIs or stateful hooks are required. Markdown front matter must include `title`, `excerpt`, `date`, and `author`; filenames should remain kebab-case to drive URL slugs.

## Testing Guidelines
The project currently has no automated test harness. When adding tests, prefer a Next-compatible runner (Vitest or Playwright) and organize specs alongside the code in `__tests__` folders (e.g., `src/app/components/__tests__/Card.test.tsx`). Until tests exist, document manual verification steps after running `bun run dev`, covering pages touched and any data migrations.

## Commit & Pull Request Guidelines
History favors concise, imperative commit subjects (e.g., `Simplify vercel.json for Next.js auto-detection`). Keep each commit scoped to a coherent change and add bodies when context is needed. Pull requests should include a short summary, affected routes or datasets, evidence of testing (commands and results), and screenshots for UI updates. Link related issues or discussions so reviewers can trace intent.

## Content & Data Updates
For new articles, add a Markdown file under `src/app/posts` and set `private: true` in the front matter when the post should be hidden from the index. Refresh quote or tweet collections in `src/data` with deduplicated entries, keeping exports alphabetical for discoverability. Never commit generated directories like `.next`, `out`, or local analytics dumps unless a static export release explicitly requires it.
