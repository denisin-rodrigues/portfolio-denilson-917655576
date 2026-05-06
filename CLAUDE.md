# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Static export build (outputs to /out)
npm run lint     # ESLint via next lint
npm run start    # Serve the production build
```

There are no tests in this project.

## Architecture

This is a **single-page portfolio** built with Next.js 14 (App Router) configured for **static export** (`output: "export"` in `next.config.mjs`). All images are `unoptimized: true` as a result. It deploys to Netlify.

### Page Composition

`app/page.tsx` is the sole route. It imports and stacks all section components in order: `Navigation → BackgroundGrid → Hero → About → Skills → Projects → LiveDemo → Stack → Teaching → Contact`. Each section maps to a file in `components/`.

### Animation System

All animation logic is built on **GSAP + Lenis**, wired together in `lib/gsap.ts` (client-only module). Lenis handles smooth scrolling and pipes scroll events into `ScrollTrigger.update`. Every component that animates must:

1. Import from `@/lib/gsap` (not directly from `gsap`) to ensure plugins are registered and Lenis is initialized.
2. Guard with `if (typeof window === "undefined") return` and check `prefers-reduced-motion` before running animations.
3. Wrap all GSAP calls in `gsap.context(() => { ... }, ref)` and call `ctx.revert()` on cleanup.

The `hooks/useGSAP.ts` hook encapsulates this pattern for scroll-triggered section animations. Components may also use it inline (as `Hero` does) when finer control is needed.

### 3D / WebGL

- **Orb** (`components/ui/Orb.tsx`): custom WebGL shader via the OGL library. It must be loaded with `dynamic(() => import(...), { ssr: false })` because it directly accesses `window` and the WebGL context.
- **Spline**: the `<spline-viewer>` web component is loaded via a CDN `<Script>` tag in `app/layout.tsx`. `SplineShowcase` renders it only after mount (`useState(false)` → set true in `useEffect`) using `dangerouslySetInnerHTML` to avoid SSR issues.

### Design System

Tokens are defined in two places that must stay in sync:
- `tailwind.config.ts` — Tailwind theme extensions (`bg-bg-primary`, `text-accent-blue`, etc.)
- `app/globals.css` — CSS custom properties (`--bg-primary`, `--accent-blue`, etc.)

**Color palette**: near-black backgrounds (`#050505` primary), blue accent (`#9ED8FF`) and gold accent (`#CFAE6E`).

**Typography**:
- `font-display` → Michroma (for headings, labels, nav, uppercase UI text)
- `font-body` → Inter (body copy)
- `font-mono` → Geist Mono (code blocks)

Custom font size scale: `display-xl` through `display-xs` (tight leading `0.9`, large letter-spacing `-0.065em`) and `heading-xl` through `heading-xs`. Labels use `.text-label-*` with wide tracking (`0.18em`).

**Gradient text** classes: `.text-gradient-blue` and `.text-gradient-gold` (defined in globals.css).

### Path Aliases

The `@/` alias maps to the project root. Standard usage: `@/components`, `@/lib`, `@/hooks`.

### UI Primitives

- `components/ui/border-beam.tsx` — animated border effect using `motion/react` (Framer Motion). Requires `position: relative; overflow: hidden` on the parent.
- `components/ui/SplitText.tsx` — splits a string into individual `<span>` chars for per-character GSAP animations.
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge) used everywhere for conditional class merging.

### Section IDs (anchor links)

`#hero`, `#sobre`, `#habilidades`, `#projetos`, `#demos`, `#stack`, `#contato` — these are the nav anchor targets and must remain stable when sections are modified.
