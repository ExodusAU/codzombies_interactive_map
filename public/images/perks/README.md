# Perk images

Drop perk assets here; reference them from a map's data file (e.g.
`src/lib/maps/kowakujo.ts`) by URL.

- `icons/<name>.webp` — the marker icon shown on the map. The real perk brand
  logo is the same in-game across every custom map, so this folder is
  **shared** — every map's data file points at the same icon files.
  → `icon: "/images/perks/icons/<name>.webp"`
- `ingame/<map-id>/<name>.jpg` — the in-game screenshot of that perk machine,
  shown in the reveal lightbox. Screenshots are **map-specific** (each map's
  vending machine sits in a different spot with different surroundings), so
  each map gets its own subfolder named after its `MapData.id`.
  → `revealImage: "/images/perks/ingame/<map-id>/<name>.jpg"`

The leading `/images/...` path is relative to this `public/` folder.
Files placed here are served as-is (no build step). A missing file just shows
a blank icon — it won't break the build.
