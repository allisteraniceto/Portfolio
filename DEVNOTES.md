# Developer Notes

Personal reference for the portfolio project. Not meant to be pretty, just useful.

---

## Commands

```bash
npm run dev        # Start Vite dev server with HMR at localhost:5173
npm run build      # tsc type-check → Vite production build → output to /dist
npm run preview    # Serve the /dist build locally (test before deploying)
npm run lint       # ESLint across all src files
npm run deploy     # Runs build then gh-pages -d dist (pushes to gh-pages branch)
```

> `predeploy` runs `build` automatically before `deploy`, so just `npm run deploy` is all you need.

---

## Tech Stack

| Layer | Library / Tool | Version |
|-------|---------------|---------|
| UI framework | React | 19 |
| Language | TypeScript | 5.8 |
| Build tool | Vite | 6 |
| 3D renderer | Three.js + React Three Fiber | 0.183 / 9 |
| 3D helpers | @react-three/drei | 10 |
| Post-processing | @react-three/postprocessing | 3 |
| Animation | Framer Motion | 12 |
| State | Zustand | 5 |
| Linter | ESLint + typescript-eslint | 9 |
| Deploy | gh-pages | 6 |

**Fonts (Google Fonts, loaded in `index.html`):**
- Space Grotesk 500/600/700 — display headings, brand mark
- Inter 300–800 — body text
- JetBrains Mono 400/500 — code, labels, mono accents

---

## Deployment

Deployed to GitHub Pages at `https://allister18.github.io/WebPortfolio`.

Vite `base` in `vite.config.ts` is set to `/Portfolio/` — **this must match the repo name exactly** or asset paths break.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
```

The `gh-pages` package pushes `/dist` to the `gh-pages` branch, which GitHub Pages serves. The `main` branch is source-only.

---

## Project Structure

```
src/
├── App.tsx                    # Canvas setup + UI overlay layer
├── main.tsx                   # React root
├── styles/index.css           # Global CSS vars, resets, keyframes
│
├── store/
│   └── usePortfolioStore.ts   # Zustand store — all app state + CAMERA_POSITIONS
│
├── hooks/
│   └── useIsMobile.ts         # isMobile (resize-aware) + isTouch (static)
│
├── data/                      # Static content — edit these to update portfolio content
│   ├── site.ts                # Name, role, tagline, email, social links
│   ├── projects.ts            # Project cards
│   ├── education.ts           # Degree + certifications
│   └── experience.ts          # Work history
│
├── ui/                        # HTML overlay components (rendered on top of Canvas)
│   ├── LoadingScreen.tsx
│   ├── IntroOverlay.tsx
│   ├── HUD.tsx                # Brand mark, nav pill, social links — desktop & mobile
│   ├── BackButton.tsx
│   ├── SectionPanel.tsx       # Sliding detail panel (right on desktop, bottom on mobile)
│   ├── icons.tsx              # All SVG icon components
│   └── panels/
│       ├── ProjectsPanel.tsx
│       ├── EducationPanel.tsx
│       └── ExperiencePanel.tsx
│
└── scene/                     # Everything inside the R3F Canvas
    ├── Scene.tsx              # Root scene: background, fog, click zones, hotspot markers
    ├── CameraRig.tsx          # Reads activeSection → lerps camera to CAMERA_POSITIONS
    ├── room/
    │   └── Room.tsx           # Floor, walls, ceiling, rug — imports all furniture
    ├── furniture/
    │   ├── Desk.tsx           # Monitor, keyboard, lamp, chair, PC tower
    │   ├── Bookshelf.tsx      # Randomized books (useMemo, seeded)
    │   ├── Whiteboard.tsx     # Board surface, markers, sticky notes
    │   ├── Plant.tsx          # Snake-plant with animated sway
    │   ├── Window.tsx         # Right wall window with sky + sun
    │   ├── WallArt.tsx        # 5 picture frames on back wall
    │   └── CeilingLight.tsx   # Pendant lamp mesh
    ├── interactive/
    │   ├── ClickZone.tsx      # Invisible box mesh — hover/click dispatch
    │   └── HotspotMarker.tsx  # Billboard ring marker above each zone
    └── effects/
        ├── RoomLighting.tsx   # All light sources
        ├── PostProcessing.tsx # Bloom + ChromaticAberration + Vignette
        └── DustParticles.tsx  # Ambient floating motes
```

---

## State Machine

All state lives in `usePortfolioStore` (Zustand).

```
isLoaded = false  →  LoadingScreen visible
isLoaded = true, hasEntered = false  →  IntroOverlay visible
hasEntered = true, activeSection = null  →  HUD + 3D room exploration
hasEntered = true, activeSection = 'projects'|'education'|'experience'  →  SectionPanel open
```

Key actions:
- `setLoaded()` — called by LoadingScreen after simulated progress
- `enterSite()` — called on IntroOverlay click/tap
- `navigateTo(section)` — triggers camera move + opens panel
- `exitSection()` — returns to overview
- `setHoveredZone(zone|null)` — drives HUD tooltip and hotspot marker brightness

---

## Camera System

Camera positions are defined as constants in `usePortfolioStore.ts`:

```ts
CAMERA_POSITIONS = {
  overview: { position, target, fov },
  projects: { ... },
  education: { ... },
  experience: { ... },
}
```

`CameraRig.tsx` runs in `useFrame` and lerps the camera toward whichever config is active. FOV is also interpolated (`persp.fov += delta; updateProjectionMatrix()`).

**Mobile portrait** uses a separate `OVERVIEW_MOBILE` config inside `CameraRig.tsx` (not in the store) — pulled back to `[0, 4.8, 9.0]` with FOV `82` so the wide room fits a narrow viewport.

**Idle float** — in overview mode the camera drifts on a sine curve. On desktop it also follows mouse pointer (parallax). On touch devices, parallax is disabled but the sine float stays.

---

## Interactive Zones

Each section has two 3D elements:

1. **`ClickZone`** — an invisible `boxGeometry` mesh. `onPointerEnter/Leave/Click` dispatch to the store. Sized to wrap both the furniture AND the hotspot marker above it so there's no dead area.

2. **`HotspotMarker`** — a `Billboard` from drei (always faces camera) with layered ring + pulsing halo + center dot. Has its own click puck so the marker itself is directly tappable.

Cursor changes (`document.body.style.cursor`) are guarded by `!isTouch` so they don't fire on mobile.

---

## Adding or Editing Content

All content is in `src/data/`. The UI reads from these files; no other code changes needed for content updates.

### Update personal info / tagline / social links
Edit `src/data/site.ts`.

### Add a project
Append to `projects` array in `src/data/projects.ts`. Set `featured: true` to get the teal highlight border.

### Add a certification
Append to `certifications` array in `src/data/education.ts`.

### Add a work experience entry
Append to `experience` array in `src/data/experience.ts`. Entries render in order (top = first).

---

## CSS Design Tokens

Defined in `src/styles/index.css` under `:root`:

```css
/* Surfaces */
--color-bg, --color-bg-elevated, --color-surface, --color-surface-strong
--color-border, --color-border-strong

/* Text */
--color-text, --color-text-soft, --color-muted, --color-faint

/* Accents */
--color-accent          /* purple #7c5cff */
--color-accent-teal     /* #00d4ff */
--color-accent-green    /* #56c596 */
--color-accent-orange   /* #f7971e */
--color-accent-pink     /* #ff5c8a */

/* Gradients */
--grad-hero  /* purple → teal */
--grad-warm  /* pink → orange */
--grad-cool  /* green → teal */

/* Layout */
--panel-width           /* 440px desktop, 100vw mobile (<768px) */
--radius-sm/md/lg       /* 6px / 10px / 16px */
--shadow-soft, --shadow-glow
```

---

## Mobile Notes

- `useIsMobile()` hook: returns `{ isMobile, isTouch }`. `isMobile` updates on resize. `isTouch` is set once at mount.
- The static export `isTouch` from the hook is used in 3D files (outside React) to guard cursor changes.
- Section panels slide up from the bottom on mobile instead of right.
- BackButton is hidden on mobile — the panel's own close button handles dismissal.
- DPR is capped at 1.5 on mobile (`dpr={[1, isMobile ? 1.5 : 2]}`).

---

## Known Gotchas

- **Vite base path** — must be `/Portfolio/` (matches GitHub repo name). If you rename the repo, update `vite.config.ts`.
- **Bookshelf books are randomized with `useMemo`** — they re-randomize on hot reload during dev but are stable in production builds.
- **`dvh` units** — mobile panel uses `88dvh` (dynamic viewport height). Falls back to `88vh` in older browsers, which is fine.
- **Billboard markers and depth** — markers use `depthTest={false}` so they render on top of any geometry. This is intentional so they're always visible floating above furniture.
- **Tone mapping** — canvas uses `ACESFilmicToneMapping` with exposure `1.22`. Adjusting `toneMappingExposure` in `App.tsx` is the easiest way to make the whole scene brighter or darker.
- **`@react-three/postprocessing` peer deps** — requires `postprocessing` package (included transitively). `ChromaticAberration` needs `THREE.Vector2` imported from `three`, not from postprocessing.
