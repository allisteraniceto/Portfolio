# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint across the project
- `npm run preview` — Preview the production build locally
- `npm run deploy` — Build and deploy to GitHub Pages via `gh-pages -d dist`

## Tech Stack

React 19 + TypeScript + Vite. 3D rendering with React Three Fiber (@react-three/fiber, @react-three/drei, @react-three/postprocessing). Animations via Framer Motion. State management with Zustand.

Deployed to GitHub Pages at `https://allister18.github.io/WebPortfolio` (Vite `base` is set to `/WebPortfolio/`).

## Architecture

This is an interactive 3D portfolio site built as a virtual room. Users navigate by clicking on furniture/zones that represent portfolio sections (projects, education, experience).

### Core Flow

`App.tsx` renders a full-viewport R3F `<Canvas>` with the 3D `<Scene>` and an HTML overlay layer for UI components. The app state machine flows: loading → intro overlay → 3D room exploration → section detail panels.

### State Management

`src/store/usePortfolioStore.ts` — Single Zustand store managing all app state: loading status, entry state, active section, hovered zone, and camera transitions. Camera positions for each section are defined as `CAMERA_POSITIONS` in this file.

### Directory Layout

- `src/scene/` — All 3D content: room geometry (`room/`), furniture pieces (`furniture/`), interactive click zones and hotspot markers (`interactive/`), camera rig (`CameraRig.tsx`), lighting and post-processing (`effects/`)
- `src/ui/` — HTML overlay components: `LoadingScreen`, `IntroOverlay`, `HUD`, `BackButton`, `SectionPanel`. Section-specific panels live in `ui/panels/`
- `src/data/` — Static content data files (`projects.ts`, `education.ts`, `experience.ts`)
- `src/styles/` — Global CSS (`index.css`)

### Key Patterns

- **Camera navigation**: `CameraRig.tsx` reads `activeSection` from the store and smoothly interpolates the R3F camera to predefined positions
- **Click zones**: Invisible 3D box meshes (`ClickZone`) detect clicks/hovers and dispatch store actions; `HotspotMarker` provides visual indicators
- **Section panels**: `SectionPanel` conditionally renders the appropriate panel component (`ProjectsPanel`, `EducationPanel`, `ExperiencePanel`) based on `activeSection`
- Fonts: Inter and JetBrains Mono loaded from Google Fonts in `index.html`
