"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import type { MapData, MapMarker, MapPoint } from "@/lib/maps/types";
import { PERK_CATEGORY_ID, toPolygons } from "@/lib/maps/types";
import type { DrawShape } from "./DrawPanel";

/** Resolved geometry for an egg step's route drawn on the map. */
export interface EggRoute {
  /** The step id (used when its icon is clicked). */
  id: string;
  points: MapPoint[];
  color: string;
  icon?: string;
  iconPosition: MapPoint | null;
  /** Possible-location spots: numbered circles, single icons, or paw trails. */
  locations: {
    index: number;
    label: string;
    color: string;
    /** Solid-bordered circle (mandatory) vs dashed (possible). */
    solid: boolean;
    position?: MapPoint;
    positions?: MapPoint[];
    positionLabels?: string[];
    positionImageIndices?: number[];
    path?: MapPoint[];
    icon?: string;
  }[];
}

const MIN_SCALE = 0.05;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.2;

export interface MapStageHandle {
  /** Zoom toward the centre of the viewport. */
  zoomBy: (factor: number) => void;
  /** Reset to fit-the-image view. */
  reset: () => void;
  /** Pan + zoom so a given image point sits centred and enlarged. */
  focusPoint: (p: MapPoint, scale?: number) => void;
}

interface Transform {
  x: number;
  y: number;
  scale: number;
}

interface InteractiveMapProps {
  data: MapData;
  /** Set of category ids currently visible. */
  visibleCategories: Set<string>;
  /** Whether area name labels are shown. */
  showAreas: boolean;
  /** Whether area zone outlines (colored borders) are shown. */
  showZones: boolean;
  /** Active floor id, or "all" to show every floor's areas at once. */
  activeFloor: string;
  /** When true, perk marker names are always shown (instead of on hover). */
  showPerkNames: boolean;
  /** Marker id to ring-highlight (e.g. the selected egg step's target). */
  highlightMarkerId: string | null;
  /** Show a live cursor-coordinate readout (handy for placing markers). */
  devCoords: boolean;
  onMarkerClick: (marker: MapMarker) => void;
  /** Egg step routes to draw (dotted lines + end icons). Always on top. */
  eggRoutes: EggRoute[];
  /** Called with a step id when its route icon is clicked. */
  onEggIconClick: (stepId: string) => void;
  /**
   * Called when a location is clicked: the step id, the location index, and
   * which gallery image to open first (0 = start/default, 1 = path end).
   */
  onEggLocationClick: (
    stepId: string,
    index: number,
    imageIndex: number,
  ) => void;
  /** When true, clicks plot points instead of doing nothing. */
  drawMode: boolean;
  /** Whether the draw tool is plotting a closed zone or an open path. */
  drawShape: DrawShape;
  /** In-progress vertices (percent coords). */
  drawPoints: MapPoint[];
  /** Called with the image-% position when the user clicks in draw mode. */
  onDrawPoint: (p: MapPoint) => void;
}

const InteractiveMap = forwardRef<MapStageHandle, InteractiveMapProps>(
  function InteractiveMap(
    {
      data,
      visibleCategories,
      showAreas,
      showZones,
      activeFloor,
      showPerkNames,
      highlightMarkerId,
      devCoords,
      onMarkerClick,
      eggRoutes,
      onEggIconClick,
      onEggLocationClick,
      drawMode,
      drawShape,
      drawPoints,
      onDrawPoint,
    },
    ref,
  ) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState<Transform>({
      x: 0,
      y: 0,
      scale: 1,
    });
    const [dragging, setDragging] = useState(false);
    const [cursor, setCursor] = useState<MapPoint | null>(null);
    const [copiedCoords, setCopiedCoords] = useState<string | null>(null);
    const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dragState = useRef<{
      startX: number;
      startY: number;
      origX: number;
      origY: number;
      moved: boolean;
    } | null>(null);

    const { width: imgW, height: imgH } = data.imageSize;

    const clampScale = (s: number) =>
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

    // Fit the image inside the viewport and centre it.
    const fitView = useCallback(() => {
      const vp = viewportRef.current;
      if (!vp) return;
      const { clientWidth: vw, clientHeight: vh } = vp;
      if (!vw || !vh) return;
      const scale = clampScale(Math.min(vw / imgW, vh / imgH));
      setTransform({
        scale,
        x: (vw - imgW * scale) / 2,
        y: (vh - imgH * scale) / 2,
      });
    }, [imgW, imgH]);

    useEffect(() => {
      fitView();
      const vp = viewportRef.current;
      if (!vp) return;
      const ro = new ResizeObserver(() => fitView());
      ro.observe(vp);
      return () => ro.disconnect();
      // Only run on mount / size change; user zoom shouldn't re-fit.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Zoom keeping the given viewport-relative point stationary.
    const zoomAt = useCallback(
      (factor: number, px: number, py: number) => {
        setTransform((t) => {
          const newScale = clampScale(t.scale * factor);
          const k = newScale / t.scale;
          return {
            scale: newScale,
            x: px - (px - t.x) * k,
            y: py - (py - t.y) * k,
          };
        });
      },
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        zoomBy(factor) {
          const vp = viewportRef.current;
          if (!vp) return;
          zoomAt(factor, vp.clientWidth / 2, vp.clientHeight / 2);
        },
        reset() {
          fitView();
        },
        focusPoint(p, scale = 2.5) {
          const vp = viewportRef.current;
          if (!vp) return;
          const s = clampScale(scale);
          const worldX = (p.x / 100) * imgW;
          const worldY = (p.y / 100) * imgH;
          setTransform({
            scale: s,
            x: vp.clientWidth / 2 - worldX * s,
            y: vp.clientHeight / 2 - worldY * s,
          });
        },
      }),
      [zoomAt, fitView, imgW, imgH],
    );

    // ── Wheel zoom ─────────────────────────────────────────────────────────
    const onWheel = useCallback(
      (e: React.WheelEvent) => {
        e.preventDefault();
        const vp = viewportRef.current;
        if (!vp) return;
        const rect = vp.getBoundingClientRect();
        const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
        zoomAt(factor, e.clientX - rect.left, e.clientY - rect.top);
      },
      [zoomAt],
    );

    // Convert a viewport pointer event to image-percent coordinates (0–100).
    const clientToImagePercent = (clientX: number, clientY: number): MapPoint | null => {
      const vp = viewportRef.current;
      if (!vp) return null;
      const rect = vp.getBoundingClientRect();
      const wx = (clientX - rect.left - transform.x) / transform.scale;
      const wy = (clientY - rect.top - transform.y) / transform.scale;
      return {
        x: +((wx / imgW) * 100).toFixed(1),
        y: +((wy / imgH) * 100).toFixed(1),
      };
    };

    // ── Pointer pan ────────────────────────────────────────────────────────
    const onPointerDown = (e: React.PointerEvent) => {
      // Ignore drags that start on a marker button.
      if ((e.target as HTMLElement).closest("[data-marker]")) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: transform.x,
        origY: transform.y,
        moved: false,
      };
      setDragging(true);
    };

    const onPointerMove = (e: React.PointerEvent) => {
      // Live coordinate readout.
      if (devCoords) {
        const vp = viewportRef.current;
        if (vp) {
          const rect = vp.getBoundingClientRect();
          const wx = (e.clientX - rect.left - transform.x) / transform.scale;
          const wy = (e.clientY - rect.top - transform.y) / transform.scale;
          setCursor({
            x: +((wx / imgW) * 100).toFixed(1),
            y: +((wy / imgH) * 100).toFixed(1),
          });
        }
      }
      const d = dragState.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) d.moved = true;
      setTransform((t) => ({ ...t, x: d.origX + dx, y: d.origY + dy }));
    };

    const endDrag = (e: React.PointerEvent) => {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      // A click (no meaningful drag) in draw mode plots a polygon point.
      const wasClick = dragState.current && !dragState.current.moved;
      dragState.current = null;
      setDragging(false);
      if (wasClick) {
        const p = clientToImagePercent(e.clientX, e.clientY);
        if (p && drawMode) {
          onDrawPoint(p);
        } else if (p && !drawMode && devCoords) {
          const text = `{ x: ${p.x}, y: ${p.y} }`;
          navigator.clipboard.writeText(text).then(() => {
            setCopiedCoords(text);
            if (copiedTimer.current) clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setCopiedCoords(null), 1500);
          });
        }
      }
    };

    // ── Derived render data ──────────────────────────────────────────────
    const categoryById = new Map(data.categories.map((c) => [c.id, c]));

    // Floor filter — untagged items belong to the first (ground) floor; "all"
    // shows every floor.
    const groundFloorId = data.floors?.[0]?.id;
    const onActiveFloor = (floor?: string) =>
      activeFloor === "all" || (floor ?? groundFloorId) === activeFloor;

    const visibleMarkers = data.markers.filter(
      (m) => visibleCategories.has(m.categoryId) && onActiveFloor(m.floor),
    );
    const visibleAreas = data.areas.filter((a) => onActiveFloor(a.floor));

    const markerSize = 28; // px on screen (counter-scaled)

    const toPx = (p: MapPoint) =>
      `${(p.x / 100) * imgW},${(p.y / 100) * imgH}`;

    return (
      <div
        ref={viewportRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={(e) => {
          endDrag(e);
          setCursor(null);
        }}
        className="relative h-full w-full overflow-hidden bg-black touch-none select-none"
        style={{
          cursor: dragging ? "grabbing" : drawMode ? "crosshair" : "grab",
        }}
      >
        {/* World layer */}
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: imgW,
            height: imgH,
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={`${data.name} map`}
            width={imgW}
            height={imgH}
            draggable={false}
            className="pointer-events-none block max-w-none"
          />


          {/* Area zone outlines (colored borders) — an area may have several
              disjoint polygons (e.g. split footprints). */}
          {showZones &&
            visibleAreas.some((a) =>
              toPolygons(a.outline).some((poly) => poly.length > 1),
            ) && (
              <svg
                className="pointer-events-none absolute inset-0"
                width={imgW}
                height={imgH}
                viewBox={`0 0 ${imgW} ${imgH}`}
              >
                {visibleAreas.flatMap((a) =>
                  toPolygons(a.outline)
                    .filter((poly) => poly.length > 1)
                    .map((poly, i) => (
                      <polygon
                        key={`${a.id}-${i}`}
                        points={poly
                          .map(
                            (p) => `${(p.x / 100) * imgW},${(p.y / 100) * imgH}`,
                          )
                          .join(" ")}
                        fill={`${a.color ?? "#64748b"}1f`}
                        stroke={a.color ?? "#64748b"}
                        strokeWidth={4}
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    )),
                )}
              </svg>
            )}

          {/* Area name labels — font size is in world px, so text scales with zoom */}
          {showAreas &&
            visibleAreas.map((a) => {
              const color = a.color ?? "#e2e8f0";
              return (
                <div
                  key={a.id}
                  className="pointer-events-none absolute z-[5] text-center font-bold uppercase leading-tight tracking-wider"
                  style={{
                    left: `${a.position.x}%`,
                    top: `${a.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    color,
                    fontSize: a.fontSize ?? 56,
                    textShadow:
                      "0 0 6px #000, 0 0 12px #000, 0 2px 4px #000, 0 0 2px #000",
                  }}
                >
                  {a.label.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              );
            })}

          {/* Markers */}
          {visibleMarkers.map((m) => {
            const cat = categoryById.get(m.categoryId);
            if (!cat) return null;
            const highlighted = highlightMarkerId === m.id;
            const hasIcon = !!m.icon;
            const size = hasIcon ? 44 : markerSize;
            return (
              <button
                key={m.id}
                data-marker
                type="button"
                title={m.note ? `${m.label} — ${m.note}` : m.label}
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkerClick(m);
                }}
                // Image markers are the bare icon (no disc/ring); glyph markers
                // keep the colored circle. Circles are reserved for quest nodes.
                className={
                  hasIcon
                    ? "group absolute z-10 flex items-center justify-center transition-transform hover:z-20"
                    : "group absolute z-10 flex items-center justify-center rounded-full border-2 text-[14px] shadow-lg transition-transform hover:z-20"
                }
                style={{
                  left: `${m.position.x}%`,
                  top: `${m.position.y}%`,
                  width: size,
                  height: size,
                  background: hasIcon ? "transparent" : cat.color,
                  borderColor: hasIcon ? undefined : "rgba(0,0,0,0.55)",
                  transform: `translate(-50%, -50%) scale(${(highlighted ? 1.25 : 1) / transform.scale})`,
                  boxShadow: hasIcon
                    ? undefined
                    : highlighted
                      ? `0 0 0 4px ${cat.color}66, 0 0 14px ${cat.color}`
                      : "0 2px 6px rgba(0,0,0,.5)",
                }}
              >
                {hasIcon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.icon}
                    alt={m.label}
                    className="h-full w-full object-contain"
                    draggable={false}
                    style={{
                      filter: highlighted
                        ? `drop-shadow(0 0 5px ${cat.color}) drop-shadow(0 0 2px #000)`
                        : "drop-shadow(0 1px 2px rgba(0,0,0,.85))",
                    }}
                  />
                ) : (
                  <span className="leading-none">{cat.glyph ?? "•"}</span>
                )}
                {/* Label — always shown for perks when the toggle is on,
                    otherwise revealed on hover. */}
                <span
                  className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/85 px-1.5 py-0.5 text-[11px] font-medium text-white ${
                    showPerkNames && cat.id === PERK_CATEGORY_ID
                      ? "opacity-100"
                      : "opacity-0 transition-opacity group-hover:opacity-100"
                  }`}
                  style={{ textShadow: "none" }}
                >
                  {m.label}
                </span>
              </button>
            );
          })}

          {/* Draw-mode shape in progress */}
          {drawMode && drawPoints.length > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 z-30"
              width={imgW}
              height={imgH}
              viewBox={`0 0 ${imgW} ${imgH}`}
            >
              {/* edges */}
              <polyline
                points={drawPoints.map(toPx).join(" ")}
                fill={drawShape === "zone" ? "#22d3ee22" : "none"}
                stroke="#22d3ee"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* closing edge preview (last → first), zones only */}
              {drawShape === "zone" && drawPoints.length > 2 && (
                <line
                  x1={(drawPoints[drawPoints.length - 1].x / 100) * imgW}
                  y1={(drawPoints[drawPoints.length - 1].y / 100) * imgH}
                  x2={(drawPoints[0].x / 100) * imgW}
                  y2={(drawPoints[0].y / 100) * imgH}
                  stroke="#22d3ee"
                  strokeWidth={2}
                  strokeDasharray="8 6"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.6}
                />
              )}
              {/* vertices */}
              {drawPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={(p.x / 100) * imgW}
                  cy={(p.y / 100) * imgH}
                  r={6 / transform.scale}
                  fill={i === 0 ? "#f59e0b" : "#22d3ee"}
                  stroke="#000"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          )}

          {/* ── Easter-egg routes + location trails — rendered last + highest z
                so nothing on the map sits above them. ────────────────────────── */}
          {eggRoutes.some(
            (r) =>
              r.points.length > 1 ||
              r.locations.some((l) => (l.path?.length ?? 0) > 1),
          ) && (
            <svg
              className="pointer-events-none absolute inset-0 z-[55]"
              width={imgW}
              height={imgH}
              viewBox={`0 0 ${imgW} ${imgH}`}
            >
              {eggRoutes.map((r) => (
                <g key={r.id}>
                  {r.points.length > 1 && (
                    <>
                      <polyline
                        points={r.points.map(toPx).join(" ")}
                        fill="none"
                        stroke={r.color}
                        strokeWidth={5}
                        strokeDasharray="14 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle
                        cx={(r.points[0].x / 100) * imgW}
                        cy={(r.points[0].y / 100) * imgH}
                        r={7 / transform.scale}
                        fill={r.color}
                        stroke="#000"
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                      />
                    </>
                  )}
                  {r.locations.map((loc) =>
                    loc.path && loc.path.length > 1 ? (
                      <polyline
                        key={loc.index}
                        points={loc.path.map(toPx).join(" ")}
                        fill="none"
                        stroke={loc.color}
                        strokeWidth={5}
                        strokeDasharray="14 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ) : null,
                  )}
                </g>
              ))}
            </svg>
          )}

          {eggRoutes.map((r) =>
            r.icon && r.iconPosition ? (
              <button
                key={r.id}
                data-marker
                type="button"
                title="Open step details"
                onClick={(e) => {
                  e.stopPropagation();
                  onEggIconClick(r.id);
                }}
                className="absolute z-[60] flex items-center justify-center transition-transform hover:z-[60]"
                style={{
                  left: `${r.iconPosition.x}%`,
                  top: `${r.iconPosition.y}%`,
                  width: 46,
                  height: 46,
                  transform: `translate(-50%, -50%) scale(${1 / transform.scale})`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.icon}
                  alt="Egg step location"
                  className="h-full w-full object-contain"
                  draggable={false}
                  style={{
                    filter: `drop-shadow(0 0 6px ${r.color}) drop-shadow(0 1px 2px #000)`,
                  }}
                />
              </button>
            ) : null,
          )}

          {/* Location markers: numbered circles, point icons, or the START of
              a trail (the trail's end is usually a later step's marker).
              Spots that share the same map position are fanned out
              side-by-side (in screen px, so the spread is zoom-independent)
              to keep every circle visible and clickable. */}
          {(() => {
            interface LocSpot {
              key: string;
              pos: MapPoint;
              label: string;
              imageIndex: number;
              routeId: string;
              loc: EggRoute["locations"][number];
            }
            const spots: LocSpot[] = [];
            for (const r of eggRoutes) {
              for (const loc of r.locations) {
                if (loc.path && loc.path.length) {
                  spots.push({
                    key: `${r.id}-${loc.index}-s`,
                    pos: loc.path[0],
                    label: loc.label,
                    imageIndex: 0,
                    routeId: r.id,
                    loc,
                  });
                } else if (loc.positions && loc.positions.length) {
                  loc.positions.forEach((p, k) =>
                    spots.push({
                      key: `${r.id}-${loc.index}-${k}`,
                      pos: p,
                      label: loc.positionLabels?.[k] ?? loc.label,
                      imageIndex: loc.positionImageIndices?.[k] ?? 0,
                      routeId: r.id,
                      loc,
                    }),
                  );
                } else if (loc.position) {
                  spots.push({
                    key: `${r.id}-${loc.index}`,
                    pos: loc.position,
                    label: loc.label,
                    imageIndex: 0,
                    routeId: r.id,
                    loc,
                  });
                }
              }
            }

            // Group spots that land on (nearly) the same point — within 0.15%
            // of the image — and compute a horizontal pixel offset for each.
            const groups = new Map<string, LocSpot[]>();
            for (const s of spots) {
              const gk = `${Math.round(s.pos.x / 0.15)}|${Math.round(s.pos.y / 0.15)}`;
              const g = groups.get(gk);
              if (g) g.push(s);
              else groups.set(gk, [s]);
            }
            const fanOffset = (s: LocSpot): number => {
              const gk = `${Math.round(s.pos.x / 0.15)}|${Math.round(s.pos.y / 0.15)}`;
              const g = groups.get(gk)!;
              if (g.length < 2) return 0;
              return (g.indexOf(s) - (g.length - 1) / 2) * 40;
            };

            return spots.map((spot) => {
              const { loc } = spot;
              // Applied after the counter-scale, so it lands in screen px.
              const xf = `translate(-50%, -50%) scale(${1 / transform.scale}) translate(${fanOffset(spot)}px, 0)`;
              return loc.icon ? (
                <button
                  key={spot.key}
                  data-marker
                  type="button"
                  title={`Location ${spot.label} - open details`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEggLocationClick(spot.routeId, loc.index, spot.imageIndex);
                  }}
                  className="absolute z-[60] flex items-center justify-center"
                  style={{
                    left: `${spot.pos.x}%`,
                    top: `${spot.pos.y}%`,
                    width: 42,
                    height: 42,
                    transform: xf,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.icon}
                    alt={`Location ${spot.label}`}
                    className="h-full w-full object-contain"
                    draggable={false}
                    style={{
                      filter: `drop-shadow(0 0 6px ${loc.color}) drop-shadow(0 1px 2px #000)`,
                    }}
                  />
                </button>
              ) : (
                <button
                  key={spot.key}
                  data-marker
                  type="button"
                  title={`Location ${spot.label} - open details`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEggLocationClick(spot.routeId, loc.index, spot.imageIndex);
                  }}
                  className="absolute z-[60] flex items-center justify-center rounded-full font-bold text-white"
                  style={{
                    left: `${spot.pos.x}%`,
                    top: `${spot.pos.y}%`,
                    width: 34,
                    height: 34,
                    fontSize: 15,
                    border: `3px ${loc.solid ? "solid" : "dashed"} ${loc.color}`,
                    background: "rgba(9,9,11,0.78)",
                    boxShadow: `0 0 8px ${loc.color}, 0 1px 3px #000`,
                    transform: xf,
                  }}
                >
                  {spot.label}
                </button>
              );
            });
          })()}
        </div>

        {/* Dev coordinate readout */}
        {devCoords && cursor && (
          <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-2">
            <div className="rounded bg-black/80 px-2 py-1 font-mono text-xs text-emerald-300">
              x: {cursor.x}%　y: {cursor.y}%
            </div>
            {copiedCoords && (
              <div className="rounded bg-emerald-600/90 px-2 py-1 font-mono text-xs text-white animate-pulse">
                Copied {copiedCoords}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default InteractiveMap;
