// Core data model for an interactive Call of Duty zombies map.
//
// Positions (`x`, `y`) are expressed as PERCENTAGES (0–100) of the source
// image's width/height. This keeps the data resolution-independent: the map
// image can be any size and markers stay in the right spot. The kowakujo
// source image happens to be 2912×2912, and it carries a printed grid
// (columns B–J, rows 1–9) you can eyeball against when placing markers.
//
// One file per map exports a `MapData`; `registry.ts` lists them all and the
// routing + map switcher derive everything else from that list.

/**
 * Category ids the UI keys behaviour off. A map's `categories` should use these
 * ids for the matching concepts so every map behaves the same:
 *  - `ee`   → the toggle that reveals Easter-egg routes on the map.
 *  - `perk` → gets the extra "Perk Names" always-show-labels toggle.
 */
export const EGG_CATEGORY_ID = "ee";
export const PERK_CATEGORY_ID = "perk";

/** A point on the map, in percent of image width/height (0–100). */
export interface MapPoint {
  x: number;
  y: number;
}

/**
 * A category groups markers under a single filter toggle + legend entry.
 * `kind` drives how markers in the category are drawn.
 */
export interface MarkerCategory {
  id: string;
  /** Display name shown in the legend and filter list. */
  label: string;
  /** Hex/CSS color used for the marker and its legend swatch. */
  color: string;
  /**
   * How members of this category render:
   *  - "icon"  → a labelled pin/dot (perks, machines, spawns…)
   *  - "step"  → an Easter-egg step node (numbered, part of a sequence)
   *  - "area"  → a named region label (no pin, just text)
   */
  kind: "icon" | "step" | "area";
  /** Optional emoji/short glyph drawn inside icon markers. */
  glyph?: string;
  /** Whether this category is visible by default. */
  defaultVisible?: boolean;
  /** Short description shown in the legend. */
  description?: string;
  /**
   * Heading this category sits under in the sidebar's filter panel. Categories
   * sharing a group render together in declaration order; omit to fall under
   * the default "Map Markers" heading.
   */
  group?: string;
}

/** A single placeable thing on the map. */
export interface MapMarker {
  id: string;
  categoryId: string;
  /** Short name (e.g. "Juggernog", "Pack-a-Punch"). */
  label: string;
  position: MapPoint;
  /**
   * Which floor/level this marker sits on (a `Floor.id`). Untagged markers
   * belong to the first declared floor (ground). The floor switcher hides
   * markers that aren't on the active floor.
   */
  floor?: string;
  /** Optional longer note shown on hover / in a popover. */
  note?: string;
  /**
   * Optional custom icon image (URL) drawn inside the marker instead of the
   * category's emoji glyph — e.g. a perk logo. Use a static image import's
   * `.src` (see kowakujo.ts) so the asset can live under src/ without copying
   * it into /public.
   */
  icon?: string;
  /**
   * Optional reveal image: a screenshot of this spot in-game. Clicking the
   * marker (or its Easter-egg step) opens this in a lightbox so players know
   * what they're looking for. A URL string or a static image import's `.src`.
   */
  revealImage?: string;
  /** Caption shown under the reveal image. */
  revealCaption?: string;
}

/** A named region of the map, drawn as a text label (optionally an outline). */
export interface MapArea {
  id: string;
  /**
   * Display name. Use "\n" to force line breaks (e.g. "Central\nCourthouse"
   * renders on two centred lines).
   */
  label: string;
  /** Label anchor (the text's centre point), in percent of image size. */
  position: MapPoint;
  /**
   * Which floor/level this area sits on (a `Floor.id`). Areas without a floor
   * are treated as the first declared floor (ground). Used by the floor
   * switcher to avoid stacking overlapping upper-story zones.
   */
  floor?: string;
  /**
   * Color that links the label text and its zone border. Defaults to a
   * neutral slate if omitted.
   */
  color?: string;
  /**
   * Font size in *world* pixels (relative to the source image). Because the
   * label lives inside the zoom transform, this means the text scales up/down
   * as you zoom. Defaults to 56.
   */
  fontSize?: number;
  /**
   * Optional zone border(s), in percent coords, drawn as a colored outline.
   * Either a single polygon (`MapPoint[]`) or several disjoint polygons
   * (`MapPoint[][]`) for an area split across multiple footprints. Plot these
   * with the in-app Draw tool.
   */
  outline?: MapPoint[] | MapPoint[][];
}

/**
 * Normalize an area outline (which may be a single polygon or several) into a
 * consistent list of polygons for rendering.
 */
export function toPolygons(
  outline?: MapPoint[] | MapPoint[][],
): MapPoint[][] {
  if (!outline || outline.length === 0) return [];
  return Array.isArray(outline[0])
    ? (outline as MapPoint[][])
    : [outline as MapPoint[]];
}

/**
 * How well-verified a step is.
 *  - "confirmed"   → reproduced in our own run, or strong community agreement.
 *  - "partial"     → the step works, but some exact conditions are still open.
 *  - "unconfirmed" → a current lead only; not proven to work.
 * Omit for confirmed steps — only the shakier ones need calling out.
 */
export type StepStatus = "confirmed" | "partial" | "unconfirmed";

/**
 * One step of an Easter-egg stage. Selecting a step draws its dotted route on
 * the map and places an icon (e.g. a dragon banner) at the route's end; the
 * player clicks that icon to open the step's reveal screenshot + details.
 */
export interface EggStep {
  id: string;
  /**
   * Verification level, badged in the sidebar and story sheet so players can
   * see at a glance which steps are safe to burn a run on. Defaults to
   * "confirmed" when omitted.
   */
  status?: StepStatus;
  /** Short heading shown in the nav. */
  title: string;
  /** Full description of what the player does. */
  instruction: string;
  /**
   * Dotted route waypoints (an open polyline, plotted with the Draw tool's
   * Path mode). The last point is where `icon` sits unless `iconPosition` is
   * given.
   */
  path?: MapPoint[];
  /** Icon image (URL) placed at the end of the route. */
  icon?: string;
  /** Explicit icon position; defaults to the last `path` point. */
  iconPosition?: MapPoint;
  /**
   * Several possible spots for this step (numbered dotted circles). Use instead
   * of a single `icon` when the objective can appear in one of a few places.
   */
  locations?: EggLocation[];
  /** Screenshot shown when the icon is clicked. */
  revealImage?: string;
  /** Multiple screenshots shown as a gallery when the icon is clicked. */
  revealImages?: string[];
  /** Caption under the reveal image; defaults to the instruction. */
  revealCaption?: string;
  /** Overrides the egg color for this step's route + location markers. */
  color?: string;
  /**
   * Draw this step's location circles with a solid border instead of dashed.
   * Use for definite/mandatory markers (e.g. lanterns) vs the dashed circles
   * used for "one of several possible" spots.
   */
  solidMarkers?: boolean;
}

/**
 * One of several possible spots for a step (e.g. an item that randomly spawns
 * in one of three rooms). Rendered as a numbered dotted circle; clicking opens
 * that spot's reveal.
 */
export interface EggLocation {
  /** Single-point spot → numbered dotted circle (unless `icon` is set). */
  position?: MapPoint;
  /**
   * Several spots for ONE sub-task (e.g. an item that can appear in 2 rooms).
   * Renders a circle at each; all open this location's shared reveal.
   */
  positions?: MapPoint[];
  /** Optional labels for each `positions` marker; defaults to this location's label. */
  positionLabels?: string[];
  /** Optional reveal gallery start index for each `positions` marker. */
  positionImageIndices?: number[];
  /** Override the step's `solidMarkers` for this spot (solid vs dashed circle). */
  solid?: boolean;
  /**
   * Route spot → a trail line with `icon` at its START (e.g. paw prints). The
   * trail end is typically a later step's marker (so they don't double up).
   */
  path?: MapPoint[];
  /** Custom icon (URL) for this spot — used at a point or a trail start. */
  icon?: string;
  /** Accent color for this spot's circle/trail/glow; defaults to the egg color. */
  color?: string;
  /** Text inside the circle; defaults to its 1-based index. */
  label?: string;
  /**
   * Sub-task description shown in the nav when the step is selected. Lets a
   * spot (or a location-less, nav-only image) carry its own instructions.
   */
  text?: string;
  /** A single reveal image (shorthand for a one-item gallery). */
  revealImage?: string;
  /** Multiple reveal images shown as a gallery. */
  revealImages?: string[];
  revealCaption?: string;
}

/** A stage groups related steps (e.g. "Acquire the World Seed"). */
export interface EggStage {
  id: string;
  title: string;
  steps: EggStep[];
}

/** A full Easter-egg quest, organized into stages. */
export interface EasterEgg {
  id: string;
  name: string;
  /** CSS color used to tint this egg's routes + icons. */
  color: string;
  stages: EggStage[];
}

/** A building level. Declare these lowest-to-highest; the first is "ground". */
export interface Floor {
  id: string;
  label: string;
}

/** Wordmark image shown above the map switcher in the sidebar. */
export interface MapLogo {
  /** Path relative to /public. */
  src: string;
  /** Natural pixel size — next/image needs both to reserve layout space. */
  width: number;
  height: number;
}

/**
 * The handful of fields the map switcher needs. Passed to the client instead of
 * the whole registry so one map's page never ships every other map's data.
 */
export interface MapSummary {
  id: string;
  number: number;
  name: string;
}

/** Narrow a map down to what the switcher needs. */
export function toMapSummary(map: MapData): MapSummary {
  return { id: map.id, number: map.number, name: map.name };
}

/** Everything needed to render one interactive map. */
export interface MapData {
  /** URL slug for this map — the site serves it at `/<id>`. */
  id: string;
  /**
   * Release order, unique across the registry. The switcher lists maps
   * newest-first on this, `/` opens the highest-numbered one, and `/<number>`
   * redirects to the map's slug. Shipping a new map is: add its file to the
   * registry with the next number.
   */
  number: number;
  name: string;
  /**
   * Whether the map is finished enough to advertise. `false` keeps it out of
   * the map switcher and stops it ever becoming the `/` default, so a map can
   * be built up in the open: its own `/<id>` URL still renders it (unlisted and
   * marked noindex) so you can check your work. Defaults to true when omitted.
   */
  visible?: boolean;
  /** Wordmark for the sidebar header; falls back to `name` as text. */
  logo?: MapLogo;
  /** One-liner under the wordmark. Defaults to "Interactive Zombies Map". */
  tagline?: string;
  /** Path (relative to /public) of the full-resolution map image. */
  image: string;
  /** Natural pixel size of the image (used for aspect ratio). */
  imageSize: { width: number; height: number };
  categories: MarkerCategory[];
  markers: MapMarker[];
  areas: MapArea[];
  eggs: EasterEgg[];
  /**
   * Building floors, lowest-to-highest. When present, a floor switcher lets
   * the player view one level at a time. The first entry is the ground floor
   * that untagged areas belong to. Omit for single-level maps.
   */
  floors?: Floor[];
}
