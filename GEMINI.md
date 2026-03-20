# GEMINI.md

## Project Overview

**The Beer Project** is a personal learning project built with **Astro 5**, **React 19**, and **Tailwind CSS 4**. It serves as a playground for exploring modern web development features including third-party API integration (Open Brewery DB), CRUD functionality, authentication, internationalization, e-commerce, and blogging.

### Key Technologies

- **Framework:** [Astro](https://astro.build/) (v5.18.0)
- **UI Library:** [React](https://react.dev/) (v19.2.0)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.17) with OKLCH color space.
- **State/Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Components:** Radix UI primitives and shadcn/ui-inspired components.

## Directory Structure

- `src/pages/`: Contains Astro routes. The blog posts and content are also located here under `blog/`.
- `src/components/`: A mix of `.astro` and `.tsx` (React) components.
  - `ui/`: Lower-level UI primitives (Button, Card, Input, etc.).
- `src/layouts/`: Shared layouts like `base-layout.astro` and `blog-layout.astro`.
- `src/content.config.ts`: Configures the **Astro Content Layer** (specifically the `blog` collection).
- `src/styles/global.css`: Central CSS file using Tailwind 4 `@import` syntax and custom theme variables.

## Building and Running

This project uses `pnpm` (inferred from `pnpm-lock.yaml`).

| Command          | Action                                                  |
| :--------------- | :------------------------------------------------------ |
| `pnpm install`   | Install dependencies.                                   |
| `pnpm dev`       | Start the local development server at `localhost:4321`. |
| `pnpm build`     | Build the production site.                              |
| `pnpm preview`   | Preview the production build locally.                   |
| `pnpm astro ...` | Run Astro CLI commands directly.                        |

## Development Conventions & Collaboration Style

- **Senior Engineer Collaboration:** Gemini acts as a senior engineer, taking responsibility for writing and maintaining the codebase while adhering to industry best practices.
- **Approval Workflow:** Gemini must explain the proposed changes and obtain explicit user approval before creating, editing, or deleting any files.
- **Clear Explanations:** Instead of heavy inline "lesson notes" within the code, Gemini provides comprehensive, high-level explanations of the architecture, logic, and technical decisions in the chat.
- **Senior Developer Standards:** All implementations favor modern, up-to-date design patterns (e.g., Tailwind 4, React 19 primitives, Astro 5 Content Layer). 
- **Core Principles:** 
    - **Separation of Concerns:** Isolate logic into hooks, UI into primitives, and layouts into coordinators.
    - **D.R.Y. (Don't Repeat Yourself):** Abstract repetitive logic and styles into reusable utilities or components.
- **TypeScript:** The project is configured with TypeScript (`tsconfig.json`). Ensure strict type safety for all new components and logic.
- **Tailwind 4:** Use modern Tailwind 4 patterns (OKLCH, `@theme` variables).
- **SSR Safety:** Wrap browser-specific APIs in `useEffect` or check `typeof window !== 'undefined'`.
- **Formatting:** Prettier is used for code formatting.

## Planned Features (Roadmap)

- [x] Integration with Open Brewery DB API.
- [x] CRUD functionality for managing blog posts with Astro DB + Turso.
- [x] User authentication with Better-Auth (Sign Up, Login, Logout).
- [ ] CRUD functionality for managing beer/brewery favorites.
- [ ] Internationalization (i18n) support.
- [ ] E-commerce functionality (Store).
- [ ] Expanded blog with more content.

## Recent Progress (Theming, Navigation & Hero)

- [x] **Semantic Theming:** Migrated from hardcoded color classes to shadcn-style OKLCH theme variables in `global.css`.
- [x] **Dark Mode Implementation:** Added an inline script in `BaseLayout.astro` for flash-protection and implemented a `ModeToggle` component.
- [x] **Responsive Navigation:** Built a high-performance, accessible responsive nav using shadcn `Sheet`.
- [x] **Success Lifecycle:** Implemented a 2-second "Success/Redirecting" delay in `AuthForm` to provide visual feedback before navigation.
- [x] **Astro 6 Font API:** Implemented "Fredoka" Google Font using the new built-in Font API (`fontProviders.google()`) and the `<Font />` component for zero-layout-shift and self-hosting.
- [x] **Client Router (View Transitions):** Enabled `<ClientRouter />` and `transition:persist` on `NavMenu` to prevent auth-state flickering and provide an "App-like" navigation experience.
- [x] **Full-Screen Hero Refinement:**
    - [x] Implemented left-aligned Hero content matching `MainNav` container logic.
    - [x] Applied Fredoka typography and custom `hero-description` utility for maximum impact.
    - [x] Added `bg-linear-to-b` gradient to `MainNav` for seamless hero integration.
- [x] **UI System Audit & Refactor:**
    - [x] Audited interactive components for consistency.
    - [x] Refactored `UserAuth.tsx` and `NavMenu.tsx` to use shadcn `Button` primitives with `asChild`.
- [x] **Modern Navigation & Layout Engine:**
    - [x] Implemented sticky navigation with scroll-triggered glassmorphism.
    - [x] Resolved 100vh "mystery scroll" using Flexbox `grow` and `min-h-0` strategy.
    - [x] Refined `BaseLayout` to support both full-screen Hero sections and centered content pages.
- [x] **Advanced Search Architecture:**
    - [x] Implemented React 19 `useActionState` with Astro Actions for type-safe searching.
    - [x] Added URL Query Param persistence for shareable, refresh-proof searches.
    - [x] Built interactive "Suggested Search" chips in a decomposed `SearchEmptyState` component.
    - [x] Achieved Zero Layout Shift (CLS) by aligning `SearchSkeletons` with `BreweryCard` dimensions.
    - [x] Added a "Clear" (X) reset button with URL and focus synchronization.
    - [x] Completed Accessibility (a11y) Audit (aria-live, aria-busy, and semantic labeling).
- [x] **Brewery Detail Engine:**
    - [x] Implemented `getBreweryById` API utility in `src/lib/api/brewery.ts`.
    - [x] Configured Google Maps Platform (Maps Embed API enabled with proper restrictions).
    - [x] Implemented `src/components/brewery/brewery-hero.astro` with grayscale map integration and OKLCH overlays.
    - [x] Implemented `src/components/brewery/brewery-details.astro` (Location & Contact cards).
    - [x] Finalized the SSR Orchestrator in `src/pages/brewery/[id].astro`.

## Current Status / Next Steps

- [ ] **Step 5: Favorites Feature:** Build CRUD functionality for brewery favorites using Astro DB.
    - [ ] Define the `favorites` table in `db/config.ts`.
    - [ ] Create an Astro Action for toggling favorites.
    - [ ] Implement the Favorite Button component (React).
    - [ ] Integrate the button into `BreweryHero` and `BreweryCard`.
