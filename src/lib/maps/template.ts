import type { MapData } from "./types";

// Starting point for a new map. Copy this file to `src/lib/maps/<slug>.ts`,
// rename the export, and fill it in — every field below is either required or
// a worked example you can delete.
//
// To put it on the site:
//   1. import it in `registry.ts` and add it to the `registered` array,
//   2. give it the next `number` (release order; the highest visible number is
//      what `/` opens),
//   3. leave `visible: false` while you work — the map stays out of the
//      switcher and off `/`, but still renders at `/<id>` so you can check it,
//   4. flip `visible: true` to ship it.
//
// Positions are percent of the map image (0–100), never pixels, so the data
// survives re-exporting the image at a different size. Set
// NEXT_PUBLIC_SHOW_COORDS=true in .env.local to read coordinates off the
// cursor, and use the in-app Draw tool for `outline` polygons and `path`
// routes.

export const template: MapData = {
  // URL slug — this map is served at `/<id>`.
  id: "template",
  // Release order. Unique across the registry; highest visible one wins `/`.
  number: 0,
  name: "Template",
  // Keep this false until the map is worth showing to players.
  visible: false,
  // Wordmark for the sidebar header. Omit it and the map name renders as text.
  logo: { src: "/maps/template_logo.png", width: 701, height: 242 },
  tagline: "Interactive Zombies Map",

  // The map image, and its natural pixel size (used for the aspect ratio).
  image: "/maps/template.webp",
  imageSize: { width: 2912, height: 2912 },

  // Building levels, lowest first. The first entry is the "ground" floor that
  // untagged markers and areas belong to. Delete for a single-level map.
  floors: [
    { id: "ground", label: "Ground" },
    { id: "upper", label: "Upper" },
  ],

  // ── Filters / legend ──────────────────────────────────────────────────────
  // One entry per filter toggle. Two ids carry behaviour and should be reused
  // as-is: `perk` gains the extra "Perk Names" toggle, and `ee` is the switch
  // that reveals Easter-egg routes. `group` sets the filter-panel heading.
  categories: [
    {
      id: "perk",
      label: "Perk Machines",
      color: "#22d3ee",
      kind: "icon",
      glyph: "🥤",
      defaultVisible: true,
      description: "Perk-a-Cola vending machines.",
      group: "Perks",
    },
    {
      id: "utility",
      label: "Pack-a-Punch",
      color: "#f59e0b",
      kind: "icon",
      glyph: "P",
      defaultVisible: true,
      description: "Pack-a-Punch machine.",
      group: "Map Markers",
    },
    {
      id: "box",
      label: "Mystery Box",
      color: "#a855f7",
      kind: "icon",
      glyph: "❓",
      defaultVisible: true,
      description: "Possible Mystery Box spawn locations.",
      group: "Map Markers",
    },
    {
      id: "wallbuy",
      label: "Wall Buys",
      color: "#84cc16",
      kind: "icon",
      glyph: "🔫",
      defaultVisible: false,
      description: "Wall-mounted weapon purchases.",
      group: "Map Markers",
    },
    {
      id: "spawn",
      label: "Spawn / Exfil",
      color: "#ef4444",
      kind: "icon",
      glyph: "🚩",
      defaultVisible: true,
      description: "Player spawn and exfil points.",
      group: "Map Markers",
    },
    {
      id: "ee",
      label: "Easter Egg Steps",
      color: "#ec4899",
      kind: "step",
      defaultVisible: true,
      description: "Numbered main-quest step locations.",
      group: "Quest",
    },
  ],

  // ── Icons / markers ───────────────────────────────────────────────────────
  // Every marker needs a unique `id`, a `categoryId` from the list above, a
  // label, and a position. `icon` swaps the category glyph for an image, and
  // `revealImage` is the screenshot shown when the marker is clicked.
  markers: [
    {
      id: "spawn-point",
      categoryId: "spawn",
      label: "Spawn",
      position: { x: 50, y: 95 },
    },
    {
      id: "util-pack-a-punch",
      categoryId: "utility",
      label: "Pack-a-Punch",
      position: { x: 50, y: 50 },
      icon: "/images/perks/icons/packapunch.png",
      revealImage: "/images/perks/ingame/kowakujo/perk_pack-a-punch.jpg",
    },
    {
      id: "perk-juggernog",
      categoryId: "perk",
      floor: "ground",
      label: "Juggernog",
      position: { x: 40, y: 40 },
      icon: "/images/perks/icons/juggernog.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_juggernog.jpg",
    },
    {
      id: "box-main",
      categoryId: "box",
      label: "Mystery Box",
      position: { x: 60, y: 60 },
      note: "One of the possible box spawns.",
    },
  ],

  // ── Named regions ─────────────────────────────────────────────────────────
  // `label` renders at `position`; a "\n" in it forces a line break. `outline`
  // is the optional zone border — plot it with the Draw tool in Zone mode and
  // close the polygon by repeating the first point.
  areas: [
    {
      id: "courtyard",
      label: "Central\nCourtyard",
      position: { x: 50, y: 50 },
      color: "#fcd34d",
      outline: [
        { x: 45, y: 45 },
        { x: 55, y: 45 },
        { x: 55, y: 55 },
        { x: 45, y: 55 },
        { x: 45, y: 45 },
      ],
    },
    {
      id: "upper-landing",
      label: "Upper Landing",
      position: { x: 50, y: 30 },
      floor: "upper",
      color: "#f43f5e",
    },
  ],

  // ── Easter eggs ───────────────────────────────────────────────────────────
  // A quest is stages of steps. Each step draws a dotted `path` on the map with
  // its `icon` at the end; `locations` replaces that with numbered circles when
  // an objective can spawn in one of several spots.
  eggs: [
    {
      id: "main-quest",
      name: "Main Quest",
      color: "#ec4899",
      stages: [
        {
          id: "stage-1",
          title: "First Stage",
          steps: [
            {
              // A step with one destination: a route, an icon at its end, and
              // the screenshots shown when that icon is clicked.
              id: "s1-first-objective",
              title: "First Objective",
              instruction:
                "What the player does. Wrap area names in ** to bold them, leave a blank line between paragraphs, and start a line with a dash for bullets.",
              icon: "/images/easteregg/star.svg",
              path: [
                { x: 50, y: 95 },
                { x: 50, y: 70 },
                { x: 50, y: 50 },
              ],
              revealImages: [
                "/images/easteregg/template/stage_01_step_01_a.jpg",
                "/images/easteregg/template/stage_01_step_01_b.jpg",
              ],
            },
            {
              // A step with several possible spots. Each becomes a numbered
              // circle carrying its own text and screenshots; `solidMarkers`
              // makes them solid (fixed) instead of dashed (random).
              id: "s1-find-the-thing",
              title: "Find the Thing",
              instruction:
                "Find the thing in one of three spots around the map.",
              solidMarkers: false,
              locations: [
                {
                  position: { x: 30, y: 40 },
                  text: "**First room:** where to look and what it looks like.",
                  revealImage:
                    "/images/easteregg/template/stage_01_step_02_loc_01.jpg",
                },
                {
                  position: { x: 50, y: 60 },
                  text: "**Second room:** where to look and what it looks like.",
                  revealImage:
                    "/images/easteregg/template/stage_01_step_02_loc_02.jpg",
                },
                {
                  // One sub-task spanning two spots — both circles open this
                  // same reveal, each starting on its own gallery image.
                  positions: [
                    { x: 70, y: 40 },
                    { x: 72, y: 46 },
                  ],
                  positionLabels: ["3a", "3b"],
                  positionImageIndices: [0, 1],
                  text: "**Third room:** two spots, one objective.",
                  revealImages: [
                    "/images/easteregg/template/stage_01_step_02_loc_03_a.jpg",
                    "/images/easteregg/template/stage_01_step_02_loc_03_b.jpg",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "stage-2",
          title: "Second Stage",
          steps: [
            {
              id: "s2-boss-fight",
              title: "Boss Fight",
              instruction: "Start the boss fight and survive.",
              icon: "/images/easteregg/flame.svg",
              // No route — drop the icon straight onto a spot.
              iconPosition: { x: 50, y: 20 },
              // Overrides the per-step palette colour when you want this one to
              // stand out (steps are auto-coloured otherwise).
              color: "#f97316",
            },
          ],
        },
      ],
    },
  ],
};
