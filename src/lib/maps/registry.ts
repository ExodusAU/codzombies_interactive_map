import type { Metadata } from "next";
import type { MapData, MapSummary } from "./types";
import { toMapSummary } from "./types";
import { kowakujo } from "./kowakujo";
import { rexInfernus } from "./rex-infernus";

// The list of maps the site serves.
//
// Adding a map is three steps:
//   1. drop its data module in `src/lib/maps/<slug>.ts` (export a `MapData`),
//      starting from `template.ts`,
//   2. give it the next `number` (release order — highest wins as "latest"),
//   3. import it and add it to `registered` below.
//
// A work-in-progress map can sit here with `visible: false`: it stays out of
// the switcher and never becomes the `/` default, but keeps rendering at its
// own `/<slug>` URL so you can build it up in place. Flip the flag to ship it.
//
// Routing (`/`, `/<slug>`, `/<number>`), the sidebar switcher, and per-map
// metadata all read from here, so nothing else needs touching.
const registered: MapData[] = [kowakujo, rexInfernus];

/** Every registered map, newest release first — hidden ones included. */
export const maps: MapData[] = [...registered].sort(
  (a, b) => b.number - a.number,
);

/** Whether a map is finished enough to advertise (the default). */
export function isVisible(map: MapData): boolean {
  return map.visible !== false;
}

/** The maps players can actually pick between, newest first. */
export const visibleMaps: MapData[] = maps.filter(isVisible);

/**
 * The most recent shipped release — what `/` opens. Falls back to the newest
 * registered map so the site still boots if every map is hidden.
 */
export const latestMap: MapData = visibleMaps[0] ?? maps[0];

/** Switcher-sized view of the registry (no markers, areas, or quest data). */
export const mapSummaries: MapSummary[] = visibleMaps.map(toMapSummary);

/** Canonical path for a map. */
export function mapHref(map: { id: string }): string {
  return `/${map.id}`;
}

/**
 * Resolve a `/[map]` segment, which may be a slug ("kowakujo") or a release
 * number ("3"). Returns undefined for anything unknown so the page can 404.
 */
export function findMap(param: string): MapData | undefined {
  const bySlug = maps.find((map) => map.id === param);
  if (bySlug) return bySlug;
  if (!/^\d+$/.test(param)) return undefined;
  return maps.find((map) => map.number === Number(param));
}

/** Page metadata for a map — shared by `/` and `/<slug>` so they stay in sync. */
export function mapMetadata(map: MapData): Metadata {
  return {
    title: `${map.name} — Interactive Zombies Map`,
    description: `Interactive Call of Duty Zombies map for ${map.name}: zoom, filter icons, legend, and clickable Easter-egg steps.`,
    alternates: { canonical: mapHref(map) },
    // Unlisted maps are previewable but shouldn't turn up in search results.
    robots: isVisible(map) ? undefined : { index: false, follow: false },
  };
}
