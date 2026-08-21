"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { EasterEgg, EggLocation, EggStep } from "@/lib/maps/types";
import { stepColorFor } from "@/lib/maps/stepColors";
import { FormattedDescription } from "./RevealModal";
import StepStatusBadge from "./StepStatusBadge";

interface StoryModeProps {
  eggs: EasterEgg[];
  onClose: () => void;
  /**
   * Open an image gallery (in the reveal lightbox, which renders above this
   * overlay) at a given image.
   */
  onImageClick: (title: string, images: string[], startIndex: number) => void;
  /** Suppress the Escape-to-close shortcut (e.g. while the lightbox is open). */
  escapeDisabled?: boolean;
}

function stepImages(step: EggStep): string[] {
  return step.revealImages ?? (step.revealImage ? [step.revealImage] : []);
}

function locationImages(loc: EggLocation): string[] {
  return loc.revealImages ?? (loc.revealImage ? [loc.revealImage] : []);
}

/**
 * Full-screen, scrollable "instruction sheet": every stage and step of a
 * quest in reading order, with descriptions and screenshots inline, so the
 * whole Easter egg can be followed top-to-bottom without touching the map.
 */
export default function StoryMode({
  eggs,
  onClose,
  onImageClick,
  escapeDisabled = false,
}: StoryModeProps) {
  const [activeEggId, setActiveEggId] = useState(eggs[0]?.id ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  const egg = eggs.find((e) => e.id === activeEggId) ?? eggs[0];

  useEffect(() => {
    if (escapeDisabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, escapeDisabled]);

  const selectEgg = (id: string) => {
    setActiveEggId(id);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const jumpToStage = (stageId: string) => {
    scrollRef.current
      ?.querySelector(`[data-stage="${stageId}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!egg) return null;

  return (
    <div className="fixed inset-0 z-[45] flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header: quest tabs + close */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-zinc-900 px-4 py-3">
        <span className="text-lg">📖</span>
        <h2 className="font-semibold text-white">Story Mode</h2>
        <div className="ml-2 flex min-w-0 gap-1 overflow-x-auto">
          {eggs.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => selectEgg(e.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-sm transition-colors ${
                e.id === egg.id
                  ? "border-transparent font-semibold text-black"
                  : "border-white/15 text-zinc-300 hover:bg-white/10"
              }`}
              style={e.id === egg.id ? { background: e.color } : undefined}
            >
              {e.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close story mode"
          title="Close (Esc)"
        >
          ✕
        </button>
      </div>

      {/* Stage quick-nav */}
      {egg.stages.length > 1 && (
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 bg-zinc-900/70 px-4 py-2">
          {egg.stages.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => jumpToStage(stage.id)}
              className="shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              {i + 1}. {stage.title}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable sheet */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
          <header className="mb-12 border-b border-white/10 pb-5">
            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: egg.color }}
            >
              {egg.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              {egg.stages.length} stages /{" "}
              {egg.stages.reduce((n, st) => n + st.steps.length, 0)} steps —
              follow top to bottom.
            </p>
            {/* Status key: only shown when the quest actually has shaky steps. */}
            {egg.stages.some((st) =>
              st.steps.some((x) => x.status && x.status !== "confirmed"),
            ) && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-zinc-400">
                <span className="font-semibold uppercase tracking-wide text-zinc-500">
                  Status key
                </span>
                <span className="flex items-center gap-1.5">
                  <StepStatusBadge status="partial" />
                  some conditions still open
                </span>
                <span className="flex items-center gap-1.5">
                  <StepStatusBadge status="unconfirmed" />
                  a lead only — not proven
                </span>
                <span className="text-zinc-500">
                  Unbadged steps are confirmed.
                </span>
              </div>
            )}
          </header>

          {egg.stages.map((stage, stageIndex) => (
            <section
              key={stage.id}
              data-stage={stage.id}
              className="mb-14 scroll-mt-4"
            >
              <h2 className="sticky top-0 z-10 -mx-4 mb-6 flex items-baseline gap-3 border-b border-white/10 bg-zinc-950/95 px-4 py-3 text-2xl font-bold text-white backdrop-blur sm:-mx-6 sm:px-6">
                <span
                  className="shrink-0 rounded px-2 py-0.5 text-base font-semibold text-black"
                  style={{ background: egg.color }}
                >
                  Stage {stageIndex + 1}
                </span>
                <span className="min-w-0">{stage.title}</span>
              </h2>

              {stage.steps.map((step, stepIndex) => {
                const color = stepColorFor(step, stepIndex);
                const images = stepImages(step);
                return (
                  <article
                    key={step.id}
                    className="mb-10 rounded-lg border border-l-4 border-white/10 bg-zinc-900/60 p-5 sm:p-6"
                    style={{ borderLeftColor: color }}
                  >
                    <h3 className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-lg font-semibold text-white sm:text-xl">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
                        style={{ background: color }}
                      >
                        {stepIndex + 1}
                      </span>
                      <span className="min-w-0">{step.title}</span>
                      <StepStatusBadge status={step.status} />
                    </h3>

                    <FormattedDescription text={step.instruction} size="md" />

                    {step.revealCaption &&
                      step.revealCaption !== step.instruction && (
                        <div className="mt-3 border-l-2 pl-3" style={{ borderColor: color }}>
                          <FormattedDescription text={step.revealCaption} />
                        </div>
                      )}

                    {images.length > 0 && (
                      <ImageGrid
                        title={step.title}
                        images={images}
                        onImageClick={onImageClick}
                      />
                    )}

                    {(step.locations ?? []).map((loc, locIndex) => {
                      const locImages = locationImages(loc);
                      const label = loc.label ?? String(locIndex + 1);
                      // Skip nav-only entries with nothing to show.
                      if (!loc.text && !loc.revealCaption && !locImages.length)
                        return null;
                      return (
                        <div
                          key={locIndex}
                          className="mt-4 rounded border border-white/10 bg-black/30 p-4"
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
                              style={{
                                borderColor: loc.color ?? color,
                                color: loc.color ?? color,
                                borderStyle:
                                  (loc.solid ?? step.solidMarkers)
                                    ? "solid"
                                    : "dashed",
                              }}
                            >
                              {label}
                            </span>
                            <div className="min-w-0 flex-1">
                              {(loc.text || loc.revealCaption) && (
                                <FormattedDescription
                                  text={loc.revealCaption ?? loc.text ?? ""}
                                />
                              )}
                              {locImages.length > 0 && (
                                <ImageGrid
                                  title={`${step.title} — ${label}`}
                                  images={locImages}
                                  onImageClick={onImageClick}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </article>
                );
              })}
            </section>
          ))}

          <p className="pb-8 text-center text-sm text-zinc-500">
            — End of {egg.name} —
          </p>
        </div>
      </div>
    </div>
  );
}

function ImageGrid({
  title,
  images,
  onImageClick,
}: {
  title: string;
  images: string[];
  onImageClick: (title: string, images: string[], startIndex: number) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {images.map((src, i) => (
        <button
          key={`${src}-${i}`}
          type="button"
          onClick={() => onImageClick(title, images, i)}
          className="group relative aspect-video overflow-hidden rounded border border-white/10 transition hover:border-cyan-300/70"
          title="Click to enlarge"
        >
          {/* Optimized thumbnail — the source screenshots are multi-MB, so
              they must NOT be loaded full-size in a 200-image sheet. */}
          <Image
            src={src}
            alt={`${title} — screenshot ${i + 1}`}
            fill
            sizes="(min-width: 640px) 240px, 45vw"
            quality={55}
            className="object-cover transition-transform duration-150 group-hover:scale-105"
            draggable={false}
          />
          {images.length > 1 && (
            <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {i + 1}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
