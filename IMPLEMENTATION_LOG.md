# IMPLEMENTATION_LOG — Deep Space Odyssey

## 2026-11-13 — Session 1

### Stage 0 — Audit
- Workspace empty → new project. Chose Vite 8, React 19, three.js r187, JavaScript.
- Wrote PROJECT_SPEC.md, TECHNICAL_ARCHITECTURE.md, IMPLEMENTATION_PLAN.md.
- Decided against R3F, GSAP and the `postprocessing` package (see architecture doc).

### Stage 1 — Spacecraft & environment
- `Engine` with two-scene rendering, HalfFloat composer (bloom → CinematicPass → OutputPass/ACES).
- `SkyStars`, `SkyDome` (baked haze), `WrappedField` (mid-field + dust), `WarpTunnel`.
- `ShipExterior` (primitives + canvas panel textures + PMREM environment).
- `Cockpit` with real window openings, shutters, sliding hatch, corridor, `CockpitScreens`.
- `IntroSequence` (orbit + boarding timeline) on a small `Animator` with skip/cancel tokens.
- Fixes after first render: ship was an unlit silhouette (added a camera-side key light for the arrival shot);
  radiator emissive too strong; title moved low so the ship owns the frame.

### Stage 2 — Celestial objects
- `PlanetBaker` + `surfaces.js` (13 procedural surfaces) → `Planet` shader (bump from height, clouds + cloud
  shadows, specular oceans, night emissive, ring shadow, companion light) and atmosphere shells.
- `Rings` (1-D profile texture, lit/back-lit, planet shadow), `AsteroidBelt` (InstancedMesh).
- `Nebula` (instanced billboards from a baked 2×2 atlas + dust + embedded stars).
- `SpiralGalaxy`, `EllipticalGalaxy`, `IrregularGalaxy`, `GlobularCluster`.
- Fixes: planets and nebulae over-exposed (sun intensity 1.6–1.9 → 1.05–1.3, bloom threshold 0.82 → 0.98,
  nebula opacity down); Earth twilight band far too wide and red; Jupiter bands rebuilt from 1-D noise;
  Great Red Spot was hidden below the console sill (moved the vantage south, set initial spin).

### Stage 3 — Interactions
- `CameraController`, `PickingSystem` (ray vs. POI spheres, deck occlusion test), `NavigationSystem`,
  navigation panel, target card, control bar, view presets, keyboard shortcuts.

### Stage 4 — Cinematic & audio
- `EventSystem`: flyby, nebula passage, galaxy reveal (deck lights dim, music swells).
- `AudioSystem`: buses, generated reverb, generative pad + bells per mood, engine, nebula bed, warp loop,
  ~17 one-shots.

### Stage 5 — Polish & optimisation
- `QualityManager` (tiers + adaptive resolution), Reduced Motion path, performance read-out.
- Portrait/tablet: wider vertical FOV, bottom-sheet panels.
- Replaced deprecated `THREE.Clock` with `THREE.Timer`; PCFSoft → PCF shadows (r187).
- One-shot voice counter switched from `onended` events to end-time tracking after the counter was seen
  creeping upward under rapid skipping.
- Interior relit twice (too dark → too flat → dim with readable silhouettes); glass haze reduced; seats moved
  out of the centre of the view.

### Verification performed
See PROJECT_STATUS.md → "Implemented and checked" and "Measured". Real-GPU frame rate and audio listening
were **not** possible in this environment.

## 2026-11-13 · Vietnamese language (i18n)

- Added `src/i18n/` (`index.js`, `vi.js`). English strings are the keys; the engine still emits English codes and only the display layer translates (`tr`, `useT`, `trTarget`, `trRange`).
- `store.lang` (`en` | `vi`), saved in `localStorage` as `dso.lang`; first visit follows the browser language. `<html lang>` follows it.
- `LanguageSwitch` on the title screen (top right) and in Settings.
- Translated: loading, intro, HUD, status/ship-AI lines, navigation, destinations, target cards (all 25 bodies, same figures, vi number format), audio, settings, help, errors, and the four cockpit canvas screens.
- Left in English on purpose: DEEP SPACE ODYSSEY, ODYSSEY-01, invented proper names (Azure Veil, Helix Crown, Vespera...), WARP.
- Checked headless at 1280x720 (low tier): switch on intro, boarding, nav panel, Earth target card, settings, help, console screens, persistence after reload, no clipped labels, clean console. Not checked: narrow phone widths in Vietnamese.


## 2026-11-13 · Solar System enhancement

### Stage 1 — audit
Gap analysis recorded in PROJECT_STATUS.md. Decision: keep engine, store, cockpit API, warp and audio; replace the hand-placed planet "stages" with one orbital model.

### Stage 2 — Solar System
- `src/config/solar.js`: `YEAR`, `SUN`, `PLANETS`, `BELT` (orbit radius, period, inclination, node, phase, radius, vantage points, flyby waypoints), `orbitPosition`, `angularSpeed`.
- `src/scenes/Universe.js`: `advance(dt)` moves every body each frame; live `positions[id]`; Sun body, glow sprite, orbit paths.
- `src/objects/Stars/Sun.js`, `src/objects/Planets/Orbits.js` (new). `Planet.js`: zonal flow, shared tiling detail texture. `Rings.js`: thin-ring texture, shadow option. `AsteroidBelt.js`: `BeltRing`. `surfaces.js`: Mercury, Venus, Uranus, Neptune, Triton, Phobos.
- `src/scenes/SolarSystem.js`: one `planetSector` builder for all eight planets and their moons, plus the belt.

### Stage 3 — navigation
- `Engine.anchor`: the ship is carried along with the body it is parked at, so orbital motion never reads as ship speed.
- `src/systems/Vantage.js`: vantage points written in a Sun-facing frame (ring-plane frame for Saturn), so the lit side is always where the config expects it.
- `NavigationSystem`: resolves a destination to live coordinates; drops out of warp far out and falls into far orbit.
- `EventSystem`: `glide` (far ⇄ close) and `flyby` (spline pass, Saturn in the ring plane with a debris lane).
- UI: nav tabs, flight brief with facts, `SystemMap.jsx` (key `O`), three distance buttons on the target card.

### Stage 4 — cockpit, light, sound
- `Cockpit.js`: eye moved to the glass, corner gussets, trim, overhead annunciators, leather seats, brighter warm cabin light.
- `AudioSystem`: proximity opens the pad filter and adds rumble.

### Stage 5 — checks and fixes found by looking at screenshots
- Saturn's far orbit was exactly edge-on to the rings → views now use the ring-plane frame.
- Flybys ended on the night side (black screen) → paths now sweep across the sunlit face.
- Mars looked lumpy, gas giants grainy at the terminator → bump and detail strengths cut.
- Sun was a white blob up close → glow sprite fades in close, surface gain lowered.
- Orbit lines streaked across the windows from inside the ecliptic → opacity follows elevation above the plane.
- Vietnamese added for every new string; nav rows no longer truncate names.

## 2026-11-14 — link to the companion site
- `src/components/Links/SisterLink.jsx`: link to Tuan's other project https://explore-solarsystem.netlify.app/ (new tab, `rel="noopener"`).
- Shown on the intro screen under the start button, and pinned to the bottom of the navigation panel as "SISTER MISSION".
- Vietnamese strings added to `vi.js`. Checked in headless Chromium at 1280×720 (EN and VI); not checked on phones.
