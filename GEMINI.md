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

## Development Conventions & Pedagogical Style

- **Teacher/Student Dynamic:** Gemini acts as a senior engineer/mentor. Gemini provides architectural guidance, code snippets, and explanations, but **does not modify files** unless specifically requested (Directives). The user performs the implementation to reinforce learning.
- **Senior Developer Standards:** All recommendations must favor modern, up-to-date design patterns (e.g., Tailwind 4, React 19 primitives, Astro 5 Content Layer). Gemini will research and apply the most logical and modern patterns for every task.
- **Code Commenting & Documentation:** All code provided by Gemini must be heavily commented with "lesson notes" explaining the *why* and *how* of every line of code to ensure the user understands the underlying logic.
- **Core Principles:** 
    - **Separation of Concerns:** Isolate logic into hooks, UI into primitives, and layouts into coordinators.
    - **D.R.Y. (Don't Repeat Yourself):** Abstract repetitive logic and styles into reusable utilities or components.
- **TypeScript:** The project is configured with TypeScript (`tsconfig.json`). Ensure type safety for all new components.
- **Tailwind 4:** Use modern Tailwind 4 patterns. Styles are mostly handled via `@theme` variables or utility classes.
- **Content Collections:** The blog uses the Astro 5 `glob` loader. New blog posts should follow the schema in `src/content.config.ts`.
- **Component Hybridization:** Use `.astro` components for static parts and `.tsx` (React) for interactive elements.
- **Formatting:** Prettier is used for code formatting.
- **Learning & Documentation Style:** Code should be heavily commented with "lesson notes" explaining the *why* and *how*.
- **SSR Safety:** Wrap browser-specific APIs in `useEffect` or check `typeof window !== 'undefined'`.

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
- [x] **Modern Navigation Engine:**
    - [x] Implemented sticky navigation with scroll-triggered glassmorphism.
    - [x] Added `data-scrolled` and `data-transparent` logic for high-performance CSS transitions.
- [x] **App-Like Layout Engine:**
    - [x] Updated `BaseLayout` with `fixed` viewport-locking support.
    - [x] Implemented nested, contained scroll areas for the search feature.

## Current Status / Next Steps

- [ ] **SEO & Metadata Scaling:** Continue adding TypeScript `Props` interfaces to remaining `.astro` components.
- [ ] **Hero & Brewery Search (Refining & Logic):**
    - [x] **Step 1:** Implement "Fredoka" Google Font in `BaseLayout.astro`.
    - [x] **Step 2:** Build 100vh Hero section in `index.astro` with `hero.png` and absolute/glass `MainNav`.
    - [x] **Step 2.5:** Refine Hero typography and layout styling for maximum impact.
    - [x] **Step 2.6:** Polish `UserAuth.tsx` (fix typos/styles) and ensure `Skeleton`/`Badge` primitives are in place.
    - [x] **Step 3:** Create `BrewerySearch.tsx` (React 19) with city search and results list.
    - [ ] **Step 3.5 (Search Professionalism Audit):**
        - [ ] Implement URL Query Param persistence for shareable searches.
        - [ ] Align `SearchSkeletons` with `BreweryCard` layout for zero layout shift.
        - [ ] Add "Suggested Searches" to the initial empty state.
        - [ ] Add a "Clear" button and UX polish to the search input.
    - [ ] **Step 4:** Build dynamic `src/pages/brewery/[id].astro` for full brewery details.
- [ ] **Favorites Feature:** Build CRUD functionality for brewery favorites using Astro DB (Schema designed).
