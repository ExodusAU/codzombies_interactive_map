"use client";

import { Fragment, type ReactNode, useState } from "react";
import Image from "next/image";
import type {
  EggStep,
  Floor,
  MapData,
  MapSummary,
  MarkerCategory,
} from "@/lib/maps/types";
import { PERK_CATEGORY_ID, toMapSummary } from "@/lib/maps/types";
import { stepColorFor } from "@/lib/maps/stepColors";
import { FormattedDescription } from "./RevealModal";
import MapSwitcher from "./MapSwitcher";
import StepStatusBadge from "./StepStatusBadge";

/** Heading for categories that don't name a `group`. */
const DEFAULT_FILTER_GROUP = "Map Markers";

interface MapSidebarProps {
  data: MapData;
  /** The maps players can switch to (hidden ones excluded). */
  maps: MapSummary[];
  visibleCategories: Set<string>;
  onToggleCategory: (id: string) => void;
  allOn: boolean;
  onToggleAll: () => void;
  showAreas: boolean;
  onToggleAreas: () => void;
  showZones: boolean;
  onToggleZones: () => void;
  showPerkNames: boolean;
  onTogglePerkNames: () => void;
  floors: Floor[];
  activeFloor: string;
  onSelectFloor: (id: string) => void;
  expandedStageId: string | null;
  onToggleStage: (id: string) => void;
  selectedStepId: string | null;
  onSelectStep: (step: EggStep) => void;
  onViewLocation: (stepId: string, locationIndex: number) => void;
  devCoords: boolean;
  onToggleDev: () => void;
}

type Section = "layers" | "legend" | "eggs";

function SectionHeader({
  id,
  label,
  open,
  setOpen,
}: {
  id: Section;
  label: string;
  open: Section;
  setOpen: (id: Section) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setOpen(id)}
      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide transition-colors ${
        open === id
          ? "bg-white/5 text-white"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {label}
      <span className="text-xs">{open === id ? "v" : ">"}</span>
    </button>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
        {title}
      </div>
      {children}
    </div>
  );
}

function FilterRow({
  label,
  active,
  color,
  marker,
  onToggle,
  suffix,
}: {
  label: string;
  active: boolean;
  color: string;
  marker: string;
  onToggle: () => void;
  suffix?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 hover:bg-white/5">
      <input
        type="checkbox"
        checked={active}
        onChange={onToggle}
        className="peer sr-only"
      />
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[10px] font-bold"
        style={{
          background: active ? color : "transparent",
          borderColor: color,
          color: active ? "#fff" : color,
        }}
      >
        {active ? marker : ""}
      </span>
      <span className={`text-sm ${active ? "text-white" : "text-zinc-500"}`}>
        {label}
      </span>
      {suffix && (
        <span className="ml-auto text-[10px] text-zinc-500">{suffix}</span>
      )}
    </label>
  );
}

function LegendItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div>
        <div className="font-medium text-zinc-100">{title}</div>
        <div className="text-xs text-zinc-500">{description}</div>
      </div>
    </div>
  );
}

function ImageLegendIcon({
  src,
  color,
}: {
  src: string;
  color: string;
}) {
  return (
    <span
      className="block h-6 w-6 bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${src})`,
        filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 1px 2px #000)`,
      }}
    />
  );
}

function stepSummary(text: string): string {
  return text
    .split(/\n/)
    .map((line) => line.trim())
    .find(Boolean) ?? "";
}

export default function MapSidebar(props: MapSidebarProps) {
  const {
    data,
    maps,
    visibleCategories,
    onToggleCategory,
    allOn,
    onToggleAll,
    showAreas,
    onToggleAreas,
    showZones,
    onToggleZones,
    showPerkNames,
    onTogglePerkNames,
    floors,
    activeFloor,
    onSelectFloor,
    expandedStageId,
    onToggleStage,
    selectedStepId,
    onSelectStep,
    onViewLocation,
    devCoords,
    onToggleDev,
  } = props;

  const [open, setOpen] = useState<Section>("eggs");
  const markerByCategory: Record<string, string> = {
    perk: "P",
    utility: "PaP",
    box: "?",
    wallbuy: "W",
    spawn: "S",
    ee: "EE",
  };

  const renderCategoryFilter = (cat: MarkerCategory) => (
    <FilterRow
      key={cat.id}
      label={cat.label}
      active={visibleCategories.has(cat.id)}
      color={cat.color}
      marker={markerByCategory[cat.id] ?? cat.label.slice(0, 1)}
      onToggle={() => onToggleCategory(cat.id)}
    />
  );

  // Filter groups come from the map's own categories (declaration order, first
  // mention of a group wins its position), so a new map only has to tag its
  // categories with a `group` to get the same panel.
  const filterGroups: { title: string; categories: MarkerCategory[] }[] = [];
  for (const cat of data.categories) {
    const title = cat.group ?? DEFAULT_FILTER_GROUP;
    const group = filterGroups.find((g) => g.title === title);
    if (group) group.categories.push(cat);
    else filterGroups.push({ title, categories: [cat] });
  }

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-r border-white/10 bg-zinc-950 text-zinc-200">
      <div className="border-b border-white/10 px-4 py-4">
        {data.logo ? (
          <Image
            src={data.logo.src}
            alt={data.name}
            width={data.logo.width}
            height={data.logo.height}
            preload
            className="h-auto w-48 max-w-full"
          />
        ) : (
          <h1 className="text-xl font-bold text-white">{data.name}</h1>
        )}
        <p className="text-xs text-zinc-500">
          {data.tagline ?? "Interactive Zombies Map"}
        </p>

        <MapSwitcher maps={maps} current={toMapSummary(data)} />

        <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-600">
          {data.eggs.reduce((count, egg) => count + egg.stages.length, 0)} quest
          sections /{" "}
          {data.eggs.reduce(
            (count, egg) =>
              count +
              egg.stages.reduce(
                (stageCount, stage) => stageCount + stage.steps.length,
                0,
              ),
            0,
          )}{" "}
          steps
        </p>
      </div>

      {floors.length > 0 && (
        <div className="border-b border-white/10 px-4 py-3">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Floor
          </div>
          <div className="flex gap-1 rounded-lg bg-white/5 p-1">
            {[{ id: "all", label: "All" }, ...floors].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onSelectFloor(f.id)}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                  activeFloor === f.id
                    ? "bg-cyan-500 text-black"
                    : "text-zinc-300 hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <SectionHeader id="layers" label="Filters" open={open} setOpen={setOpen} />
        {open === "layers" && (
          <div className="space-y-3 px-3 pb-3">
            <button
              type="button"
              onClick={onToggleAll}
              className="mb-1 flex w-full items-center justify-between rounded-md border border-white/10 px-2 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/5"
            >
              <span>{allOn ? "Hide all" : "Show all"}</span>
              <span className="text-[10px] text-zinc-500">
                {allOn ? "everything on" : "toggle"}
              </span>
            </button>

            <FilterGroup title="Map">
              <FilterRow
                label="Area Names"
                active={showAreas}
                color="#64748b"
                marker="A"
                onToggle={onToggleAreas}
              />
              <FilterRow
                label="Area Zones"
                active={showZones}
                color="#64748b"
                marker="Z"
                onToggle={onToggleZones}
              />
            </FilterGroup>

            {filterGroups.map((group) => (
              <FilterGroup key={group.title} title={group.title}>
                {group.categories.map((cat) => (
                  <Fragment key={cat.id}>
                    {renderCategoryFilter(cat)}
                    {/* Perks carry a companion always-show-labels toggle. */}
                    {cat.id === PERK_CATEGORY_ID && (
                      <FilterRow
                        label="Perk Names"
                        active={showPerkNames}
                        color={cat.color}
                        marker="T"
                        onToggle={onTogglePerkNames}
                        suffix={showPerkNames ? "always" : "hover"}
                      />
                    )}
                  </Fragment>
                ))}
              </FilterGroup>
            ))}
          </div>
        )}

        <div className="border-t border-white/10" />
        <SectionHeader id="legend" label="Legend" open={open} setOpen={setOpen} />
        {open === "legend" && (
          <div className="space-y-3 px-4 pb-4 pt-1 text-sm">
            <LegendItem
              icon={
                <ImageLegendIcon
                  src="/images/perks/icons/juggernog.webp"
                  color="#22d3ee"
                />
              }
              title="Perk machine icon"
              description="Perk logos mark vending machines. Click one to view its screenshot."
            />
            <LegendItem
              icon={
                <ImageLegendIcon
                  src="/images/perks/icons/packapunch.png"
                  color="#f59e0b"
                />
              }
              title="Pack-a-Punch icon"
              description="Marks the Pack-a-Punch machine. Click it to view its screenshot."
            />
            <LegendItem
              icon={
                <svg width="26" height="20" className="shrink-0">
                  <line
                    x1="1"
                    y1="10"
                    x2="25"
                    y2="10"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Quest route"
              description="Dotted paths show the selected or expanded Easter-egg step route."
            />
            <LegendItem
              icon={
                <ImageLegendIcon
                  src="/images/easteregg/star.svg"
                  color="#ec4899"
                />
              }
              title="Step icon"
              description="Custom objective icons mark step destinations or interactable points."
            />
            <LegendItem
              icon={
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{
                    border: "3px solid #ec4899",
                    background: "rgba(9,9,11,0.78)",
                    boxShadow: "0 0 8px #ec4899",
                  }}
                >
                  1
                </span>
              }
              title="Required objective"
              description="Solid numbered circles are fixed step locations. Click for details."
            />
            <LegendItem
              icon={
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{
                    border: "3px dashed #ec4899",
                    background: "rgba(9,9,11,0.78)",
                    boxShadow: "0 0 8px #ec4899",
                  }}
                >
                  1
                </span>
              }
              title="Possible objective"
              description="Dashed numbered circles are possible or random objective locations."
            />
            <LegendItem
              icon={
                <span className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  Area
                </span>
              }
              title="Area name"
              description="Room and region labels controlled by the Area Names filter."
            />
            <LegendItem
              icon={
                <span className="block h-5 w-6 rounded-sm border-2 border-cyan-300 bg-cyan-300/15" />
              }
              title="Area zone"
              description="Colored outlines show area boundaries when Area Zones is enabled."
            />
          </div>
        )}

        <div className="border-t border-white/10" />
        <SectionHeader id="eggs" label="Easter Eggs" open={open} setOpen={setOpen} />
        {open === "eggs" && (
          <div className="space-y-3 px-3 pb-4 pt-1">
            {data.eggs.map((egg) => (
              <div key={egg.id}>
                <div className="mb-1 flex items-center gap-2 px-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: egg.color }}
                  />
                  <span className="text-sm font-semibold text-white">
                    {egg.name}
                  </span>
                  <span className="ml-auto text-[10px] font-medium uppercase text-zinc-600">
                    {egg.stages.length} stages /{" "}
                    {egg.stages.reduce(
                      (count, stage) => count + stage.steps.length,
                      0,
                    )}{" "}
                    steps
                  </span>
                </div>

                <div className="space-y-1">
                  {egg.stages.map((stage, si) => {
                    const expanded = expandedStageId === stage.id;
                    return (
                      <div key={stage.id}>
                        <button
                          type="button"
                          onClick={() => onToggleStage(stage.id)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                            expanded
                              ? "bg-white/10 text-white"
                              : "text-zinc-300 hover:bg-white/5"
                          }`}
                        >
                          <span className="text-xs text-zinc-500">
                            {expanded ? "v" : ">"}
                          </span>
                          <span className="font-medium">
                            Stage {si + 1}: {stage.title}
                          </span>
                          <span className="ml-auto shrink-0 text-[10px] text-zinc-500">
                            {stage.steps.length}
                          </span>
                        </button>

                        {expanded && (
                          <ol className="mt-1 space-y-1 pl-3">
                            <li className="px-2 pb-0.5 text-[11px] text-zinc-500">
                              {selectedStepId
                                ? "Showing one step - click the stage to show all."
                                : "Showing all steps. Click a step to isolate it."}
                            </li>
                            {stage.steps.map((step, idx) => {
                              const active = selectedStepId === step.id;
                              const stepColor = stepColorFor(step, idx);
                              return (
                                <li key={step.id}>
                                  <button
                                    type="button"
                                    onClick={() => onSelectStep(step)}
                                    className={`flex w-full items-start gap-3 rounded-md p-2 text-left transition-colors ${
                                      active ? "ring-1" : "hover:bg-white/5"
                                    }`}
                                    style={
                                      active
                                        ? {
                                            background: `${stepColor}26`,
                                            // ring color (Tailwind reads this var)
                                            ["--tw-ring-color" as string]: `${stepColor}66`,
                                          }
                                        : undefined
                                    }
                                  >
                                    <span
                                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
                                      style={{ background: stepColor }}
                                    >
                                      {idx + 1}
                                    </span>
                                    <span className="min-w-0">
                                      <span className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-zinc-100">
                                        {step.title}
                                        <StepStatusBadge
                                          status={step.status}
                                          compact
                                        />
                                      </span>
                                      <span className="block text-xs leading-snug text-zinc-400">
                                        {stepSummary(step.instruction)}
                                      </span>
                                      {active && (
                                        <span
                                          className="mt-1 block text-[11px] font-medium"
                                          style={{ color: stepColor }}
                                        >
                                          {step.path
                                            ? "Route shown - click the map icon for details ->"
                                            : step.locations?.length
                                              ? "Locations shown - click a numbered circle for details ->"
                                              : step.icon
                                                ? "Marked on the map - click the icon for details ->"
                                                : "Not plotted yet."}
                                        </span>
                                      )}
                                    </span>
                                  </button>

                                  {active && (
                                    <div className="mb-2 mt-1 rounded-md border border-white/10 bg-black/25 px-3 py-2">
                                      <FormattedDescription
                                        text={step.revealCaption ?? step.instruction}
                                      />
                                    </div>
                                  )}

                                  {active &&
                                    step.locations?.some((l) => l.text) && (
                                      <ul className="mb-1 mt-1 space-y-1.5 pl-9 pr-2">
                                        {step.locations.map((loc, li) =>
                                          loc.text ? (
                                            <li
                                              key={li}
                                              className="flex items-start gap-2 text-xs text-zinc-400"
                                            >
                                              <span className="mt-0.5 shrink-0 font-semibold text-zinc-300">
                                                {loc.label ?? li + 1}.
                                              </span>
                                              <span className="flex-1 leading-snug">
                                                {loc.text}{" "}
                                                {(loc.revealImage ||
                                                  loc.revealImages?.length) && (
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      onViewLocation(step.id, li)
                                                    }
                                                    className="font-medium hover:underline"
                                                    style={{ color: stepColor }}
                                                  >
                                                    View {"->"}
                                                  </button>
                                                )}
                                                {!loc.position &&
                                                  !loc.positions?.length &&
                                                  !loc.path && (
                                                    <span className="ml-1 text-[10px] text-zinc-600">
                                                      (not on map)
                                                    </span>
                                                  )}
                                              </span>
                                            </li>
                                          ) : null,
                                        )}
                                      </ul>
                                    )}
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <label className="flex cursor-pointer items-center justify-between text-xs text-zinc-500">
          <span>Dev: show cursor coords</span>
          <input
            type="checkbox"
            checked={devCoords}
            onChange={onToggleDev}
            className="accent-emerald-500"
          />
        </label>
      </div>
    </aside>
  );
}
