# Action-Point Portfolio

Personal portfolio of a front-end engineer with 15+ years of continuous experience — from Flash/ActionScript 3 through modern React and Next.js.

Live: [action-point.vercel.app](https://action-point.vercel.app)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | devicon + @icons-pack/react-simple-icons + lucide-react |
| Map | Leaflet (dynamic import, SSR disabled) |
| Testing | Jest + React Testing Library |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Architecture & Design Decisions

### Single fetch, centralised data layer
All portfolio content lives in a single `public/data/data.json` file fetched once on app load via `DataContext`. No section ever fetches independently — data is distributed via `useData()` hook. This decouples content from UI: updating the portfolio requires no rebuild, only a content push.

### Context hierarchy
```
TooltipProvider         — global UI state, outermost
  DataProvider          — single fetch, distributes data slices
    Navbar              — always visible, no data dependency
    Preloader           — reads isLoading, animates until data ready
    {children}          — sections consume via useData()
```

### Type safety without runtime cost
TypeScript interfaces live in `src/types/types.ts`. The root `AppData` interface validates the fetched JSON shape at the boundary — components only import the slice type they need (`Job`, `Skill`, `Project` etc). No runtime validation library needed for a portfolio.

### Icon resolution pattern
Simple icons (from `@icons-pack/react-simple-icons`) cannot be serialised to JSON. An `iconMap` in `SkillCard.tsx` and `Contact.tsx` maps string keys from JSON (`"SiTailwindcss"`) to the actual React components at render time. Adding a new icon requires one entry in the map and one in JSON — single responsibility maintained.

### Tooltip architecture
A single always-mounted tooltip `<div>` lives at the app root inside `TooltipProvider`. Components call `show(text, anchorRect)` and `hide()` via `useTooltip()` — no per-component tooltip instances, no inherited opacity issues from parent animations.

### Testing philosophy
Tests mock `useData()` using real data from `public/data/data.json` via `require()` inside `jest.mock()` callbacks (bypassing ES module hoisting). This ensures tests break when real content changes — not when mock data drifts. `next/dynamic` is mocked globally in `jest.setup.ts` to prevent async `act()` warnings across the suite.

### Page transitions
Framer Motion `AnimatePresence` handles animated transitions between routes. Each section is a proper Next.js page — the Navbar remains fixed and unaffected across all navigation.

---

## Project Structure

```
src/
  app/
    layout.tsx          — root layout, providers, Navbar, Preloader
    page.tsx            — Home route
    about/
      page.tsx          — About route
      About.test.tsx
    contact/
      page.tsx          — Contact route
      Contact.test.tsx
    experience/
      page.tsx          — Experience route
      Experience.test.tsx
    home/
      page.tsx          — Home section
      Home.test.tsx
    projects/
      page.tsx          — Projects route
    skills/
      page.tsx          — Skills route
      Skills.test.tsx
    favicon.ico
    globals.css
  components/
    Navbar.tsx
    Navbar.test.tsx
    PageTransition.tsx
    Preloader.tsx
    ui/
      ContactMap.tsx    — Leaflet map, dynamic import
      ProjectModal.tsx  — expanded project detail modal
      ProjectTile.tsx   — project grid tile
      SkillCard.tsx     — skill icon card with tooltip
  contexts/
    DataContext.tsx     — fetch + useData() hook
    TooltipContext.tsx  — global tooltip + useTooltip() hook
    TransitionContext.tsx
  lib/
    api.ts              — fetchData() — single fetch helper
    navLinks.tsx        — shared navigation link definitions
  types/
    types.ts            — all interfaces (Job, Skill, Project, AppData...)
public/
  data/
    data.json           — single source of truth for all content
  AP_logo.png
  favicon.ico
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

```bash
pnpm test              # run all test suites
pnpm test -- Navbar    # run single suite
pnpm build             # production build
```

---

## Roadmap

- [ ] Real project data + screenshots
- [ ] Real personal contact details
- [ ] Day / night theme toggle (dark navy ↔ black & yellow 🐝)
- [ ] i18n — Polish / English
- [ ] References page (`references-action-point.vercel.app`)
- [ ] WebGL / Three.js showcase project
