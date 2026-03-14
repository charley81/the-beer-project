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
- **Senior Developer Standards:** All recommendations must favor modern, up-to-date design patterns (e.g., Tailwind 4, React 19 primitives, Astro 5 Content Layer).
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

## Recent Progress (Theming & Navigation)

- [x] **Semantic Theming:** Migrated from hardcoded color classes to shadcn-style OKLCH theme variables in `global.css`.
- [x] **Dark Mode Implementation:** Added an inline script in `BaseLayout.astro` for flash-protection and implemented a `ModeToggle` component.
- [x] **Responsive Navigation:** Built a high-performance, accessible responsive nav using shadcn `Sheet`.
- [x] **Architectural Refactor:**
    - [x] Centralized nav links in `src/lib/navigation.ts`.
    - [x] Created `UserAuth.tsx` to isolate authentication UI logic.
    - [x] Refactored `NavMenu.tsx` into a lean coordinator component.
    - [x] Optimized active states by passing server-side `pathname` from Astro to React.
- [x] **Success Lifecycle:** Implemented a 2-second "Success/Redirecting" delay in `AuthForm` to provide visual feedback before navigation.

## Current Status / Next Steps

- [ ] **SEO & Metadata Scaling:** Continue adding TypeScript `Props` interfaces to remaining `.astro` components.
- [ ] **Hero & Brewery Search (New Feature):**
    - [ ] **Step 1:** Implement "Fredoka" Google Font in `BaseLayout.astro`.
    - [ ] **Step 2:** Build 100vh Hero section in `index.astro` with `hero.jpg` and absolute `MainNav`.
    - [ ] **Step 3:** Create `BrewerySearch.tsx` (React 19) with city search and results list.
    - [ ] **Step 4:** Build dynamic `src/pages/brewery/[id].astro` for full brewery details.
- [ ] **Favorites Feature:** Build CRUD functionality for brewery favorites using Astro DB (Schema designed).
