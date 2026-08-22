"use client";

import { useRef, useState } from "react";
import type {
  EggStep,
  MapData,
  MapMarker,
  MapPoint,
  MapSummary,
} from "@/lib/maps/types";
import { EGG_CATEGORY_ID } from "@/lib/maps/types";
import { stepColorFor } from "@/lib/maps/stepColors";
import InteractiveMap, { type MapStageHandle } from "./InteractiveMap";
import MapSidebar from "./MapSidebar";
import RevealModal, { type RevealContent } from "./RevealModal";
import DrawPanel, { type DrawShape } from "./DrawPanel";
import StoryMode from "./StoryMode";

interface MapViewerProps {
  data: MapData;
  /** The maps players can switch to (hidden ones excluded). */
  maps: MapSummary[];
}

/**
 * A navigable reveal "unit" — either a step (locationIndex null) or one of its
 * sub-task locations. Prev/Next in the modal walks this flat list so players
 * can read a whole quest without touching the map.
 */
interface RevealUnit {
  eggId: string;
  stageId: string;
  step: EggStep;
  locationIndex: number | null;
}

function unitTitle(u: RevealUnit): string {
  if (u.locationIndex === null) return u.step.title;
  const loc = u.step.locations?.[u.locationIndex];
  return `${u.step.title} — ${loc?.label ?? u.locationIndex + 1}`;
}

/** Find a selected egg step (with its egg and stage index) anywhere in the data. */
function findStep(data: MapData, stepId: string | null) {
  if (!stepId) return null;
  for (const egg of data.eggs)
    for (const stage of egg.stages) {
      const stepIndex = stage.steps.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1)
        return { egg, step: stage.steps[stepIndex], stepIndex };
    }
  return null;
}

/** All steps (with their egg and stage index) belonging to a stage. */
function stepsForStage(data: MapData, stageId: string | null) {
  if (!stageId) return [];
  for (const egg of data.eggs)
    for (const stage of egg.stages)
      if (stage.id === stageId)
        return stage.steps.map((step, stepIndex) => ({ egg, step, stepIndex }));
  return [];
}

/**
 * Every navigable reveal unit in display order: a step contributes one unit per
 * location (its sub-tasks), or a single step-level unit if it has no locations.
 */
function revealUnits(data: MapData): RevealUnit[] {
  const out: RevealUnit[] = [];
  for (const egg of data.eggs)
    for (const stage of egg.stages)
      for (const step of stage.steps) {
        const locs = step.locations ?? [];
        if (locs.length)
          locs.forEach((_, i) =>
            out.push({
              eggId: egg.id,
              stageId: stage.id,
              step,
              locationIndex: i,
            }),
          );
        else
          out.push({
            eggId: egg.id,
            stageId: stage.id,
            step,
            locationIndex: null,
          });
      }
  return out;
}

export default function MapViewer({ data, maps }: MapViewerProps) {
  // Filters default to only area names visible.
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const [showAreas, setShowAreas] = useState(true);
  const [showZones, setShowZones] = useState(false);
  const [showPerkNames, setShowPerkNames] = useState(false);
  // "all" shows every floor's areas; otherwise a Floor.id.
  const [activeFloor, setActiveFloor] = useState<string>(
    () => data.floors?.[0]?.id ?? "all",
  );

  // Draw tool.
  const [drawMode, setDrawMode] = useState(false);
  const [drawShape, setDrawShape] = useState<DrawShape>("zone");
  const [drawPoints, setDrawPoints] = useState<MapPoint[]>([]);

  // Easter eggs.
  const [expandedStageId, setExpandedStageId] = useState<string | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Story mode: full-screen scrollable instruction sheet.
  const [storyMode, setStoryMode] = useState(false);

  const [highlightMarkerId, setHighlightMarkerId] = useState<string | null>(
    null,
  );
  const [reveal, setReveal] = useState<RevealContent | null>(null);
  // Default the cursor-coordinate overlay on when NEXT_PUBLIC_SHOW_COORDS is
  // set (handy while placing markers). This env var is inlined at build time,
  // so it's identical on server + client → no hydration mismatch. The sidebar
  // toggle can still flip it on/off during a session without a restart.
  const [devCoords, setDevCoords] = useState(
    process.env.NEXT_PUBLIC_SHOW_COORDS === "true",
  );

  const stageRef = useRef<MapStageHandle>(null);

  const toggleCategory = (id: string) =>
    setVisibleCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Show-all / hide-all across category filters + area names + zones.
  const allCategoryIds = data.categories.map((c) => c.id);
  const allOn =
    allCategoryIds.every((id) => visibleCategories.has(id)) &&
    showAreas &&
    showZones &&
    showPerkNames;
  const toggleAll = () => {
    const on = !allOn;
    setVisibleCategories(on ? new Set(allCategoryIds) : new Set());
    setShowAreas(on);
    setShowZones(on);
    setShowPerkNames(on);
  };

  // Turn the Easter-egg layer on (clicking a stage or step reveals routes).
  const enableEggLayer = () =>
    setVisibleCategories((prev) =>
      prev.has(EGG_CATEGORY_ID) ? prev : new Set(prev).add(EGG_CATEGORY_ID),
    );

  const units = revealUnits(data);

  function buildUnitContent(u: RevealUnit, startIndex = 0): RevealContent {
    const { step, locationIndex } = u;
    const loc = locationIndex !== null ? step.locations?.[locationIndex] : null;
    const captionParts = [step.instruction];

    if (
      step.revealCaption &&
      !captionParts.includes(step.revealCaption)
    ) {
      captionParts.push(step.revealCaption);
    }

    if (loc) {
      const locationParts = [loc.text, loc.revealCaption].filter(
        (text): text is string =>
          Boolean(text) && !captionParts.includes(text as string),
      );

      if (locationParts.length) {
        const locationLabel = loc.label
          ? `Map location: ${loc.label}`
          : `Map location ${(locationIndex ?? 0) + 1}`;
        captionParts.push(
          `**${locationLabel}**\n\n${[...new Set(locationParts)].join("\n\n")}`,
        );
      }
    }

    // Prev/next across all units in the same quest (steps + sub-tasks).
    const eggUnits = units.filter((x) => x.eggId === u.eggId);
    const i = eggUnits.findIndex(
      (x) => x.step.id === u.step.id && x.locationIndex === u.locationIndex,
    );
    const prev = eggUnits[i - 1];
    const next = eggUnits[i + 1];

    return {
      title: unitTitle(u),
      image: loc ? loc.revealImage : step.revealImage,
      images: loc ? loc.revealImages : step.revealImages,
      startIndex,
      caption: captionParts.join("\n\n"),
      stepNavigation: {
        previous: prev
          ? {
              label: "Previous",
              title: unitTitle(prev),
              onSelect: () => showUnit(prev, { sync: true }),
            }
          : undefined,
        next: next
          ? {
              label: "Next",
              title: unitTitle(next),
              onSelect: () => showUnit(next, { sync: true }),
            }
          : undefined,
      },
    };
  }

  function showUnit(
    u: RevealUnit,
    opts: { startIndex?: number; sync?: boolean } = {},
  ) {
    // `sync` (used by the Prev/Next buttons) follows the unit on the map too.
    if (opts.sync) {
      setSelectedStepId(u.step.id);
      setExpandedStageId(u.stageId);
      enableEggLayer();
    }
    setReveal(buildUnitContent(u, opts.startIndex ?? 0));
  }

  const openMarkerReveal = (marker: MapMarker) => {
    setHighlightMarkerId(marker.id);
    setReveal({
      title: marker.label,
      image: marker.revealImage,
      caption: marker.revealCaption ?? marker.note,
    });
  };

  // Routes drawn on the map: a single selected step, else every step of the
  // expanded stage, else none.
  const selected = findStep(data, selectedStepId);
  const activeStepEntries = selectedStepId
    ? selected
      ? [selected]
      : []
    : stepsForStage(data, expandedStageId);

  const eggRoutes = activeStepEntries.map(({ step, stepIndex }) => {
    const stepColor = stepColorFor(step, stepIndex);
    return {
      id: step.id,
      points: step.path ?? [],
      color: stepColor,
      icon: step.icon,
      iconPosition:
        step.iconPosition ??
        (step.path?.length ? step.path[step.path.length - 1] : null),
      locations: (step.locations ?? []).map((loc, i) => ({
        index: i,
        label: loc.label ?? String(i + 1),
        color: loc.color ?? stepColor,
        solid: loc.solid ?? step.solidMarkers ?? false,
        position: loc.position,
        positions: loc.positions,
        positionLabels: loc.positionLabels,
        positionImageIndices: loc.positionImageIndices,
        path: loc.path,
        icon: loc.icon,
      })),
    };
  });

  // Clicking a stage shows ALL its steps; clicking a step narrows to one.
  const toggleStage = (id: string) => {
    setSelectedStepId(null);
    setExpandedStageId((cur) => (cur === id ? null : id));
    if (expandedStageId !== id) enableEggLayer();
  };

  const selectStep = (step: EggStep) => {
    setSelectedStepId(step.id);
    enableEggLayer();
  };

  const openEggReveal = (stepId: string) => {
    const u = units.find((x) => x.step.id === stepId);
    if (u) showUnit(u);
  };

  const openEggLocationReveal = (
    stepId: string,
    index: number,
    imageIndex: number,
  ) => {
    const u = units.find(
      (x) => x.step.id === stepId && x.locationIndex === index,
    );
    if (u) showUnit(u, { startIndex: imageIndex });
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-black text-zinc-100">
      <MapSidebar
        data={data}
        maps={maps}
        visibleCategories={visibleCategories}
        onToggleCategory={toggleCategory}
        allOn={allOn}
        onToggleAll={toggleAll}
        showAreas={showAreas}
        onToggleAreas={() => setShowAreas((v) => !v)}
        showZones={showZones}
        onToggleZones={() => setShowZones((v) => !v)}
        showPerkNames={showPerkNames}
        onTogglePerkNames={() => setShowPerkNames((v) => !v)}
        floors={data.floors ?? []}
        activeFloor={activeFloor}
        onSelectFloor={setActiveFloor}
        expandedStageId={expandedStageId}
        onToggleStage={toggleStage}
        selectedStepId={selectedStepId}
        onSelectStep={selectStep}
        onViewLocation={(stepId, idx) => openEggLocationReveal(stepId, idx, 0)}
        devCoords={devCoords}
        onToggleDev={() => setDevCoords((v) => !v)}
      />

      <div className="relative flex-1">
        <InteractiveMap
          ref={stageRef}
          data={data}
          visibleCategories={visibleCategories}
          showAreas={showAreas}
          showZones={showZones}
          activeFloor={activeFloor}
          showPerkNames={showPerkNames}
          highlightMarkerId={highlightMarkerId}
          devCoords={devCoords}
          onMarkerClick={openMarkerReveal}
          eggRoutes={visibleCategories.has(EGG_CATEGORY_ID) ? eggRoutes : []}
          onEggIconClick={openEggReveal}
          onEggLocationClick={openEggLocationReveal}
          drawMode={drawMode}
          drawShape={drawShape}
          drawPoints={drawPoints}
          onDrawPoint={(p) => setDrawPoints((prev) => [...prev, p])}
        />

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-lg border border-white/15 bg-zinc-900/90 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => stageRef.current?.zoomBy(1.4)}
            className="h-10 w-10 text-xl text-white transition-colors hover:bg-white/10"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="h-px bg-white/15" />
          <button
            type="button"
            onClick={() => stageRef.current?.zoomBy(1 / 1.4)}
            className="h-10 w-10 text-xl text-white transition-colors hover:bg-white/10"
            aria-label="Zoom out"
          >
            −
          </button>
          <div className="h-px bg-white/15" />
          <button
            type="button"
            onClick={() => stageRef.current?.reset()}
            className="h-10 w-10 text-sm text-white transition-colors hover:bg-white/10"
            aria-label="Reset view"
            title="Reset view"
          >
            ⤢
          </button>
        </div>

        {/* Draw + Story toggles */}
        <div className="absolute left-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={() => setDrawMode((v) => !v)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-lg backdrop-blur transition-colors ${
              drawMode
                ? "border-cyan-400 bg-cyan-500/90 text-black"
                : "border-white/15 bg-zinc-900/90 text-white hover:bg-white/10"
            }`}
            title="Plot a zone or path by clicking the map"
          >
            ✏️ {drawMode ? "Drawing… (click map)" : "Draw"}
          </button>
          <button
            type="button"
            onClick={() => setStoryMode(true)}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur transition-colors hover:bg-white/10"
            title="Read the full walkthrough as a scrollable guide"
          >
            📖 Story
          </button>
        </div>

        {/* Draw panel */}
        {drawMode && (
          <DrawPanel
            points={drawPoints}
            shape={drawShape}
            onShapeChange={setDrawShape}
            onUndo={() => setDrawPoints((prev) => prev.slice(0, -1))}
            onClear={() => setDrawPoints([])}
            onClose={() => setDrawMode(false)}
          />
        )}

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-3 right-4 rounded bg-black/60 px-2 py-1 text-[11px] text-zinc-400">
          {drawMode
            ? "Click to add points · drag to pan · scroll to zoom"
            : "Drag to pan · scroll to zoom · click an icon to reveal"}
        </div>
      </div>

      {storyMode && (
        <StoryMode
          eggs={data.eggs}
          onClose={() => setStoryMode(false)}
          escapeDisabled={reveal !== null}
          onImageClick={(title, images, startIndex) =>
            setReveal({ title, images, startIndex })
          }
        />
      )}

      <RevealModal content={reveal} onClose={() => setReveal(null)} />
    </div>
  );
}
