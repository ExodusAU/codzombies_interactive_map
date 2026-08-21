"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MapSummary } from "@/lib/maps/types";

interface MapSwitcherProps {
  /** The selectable maps, newest release first (see `registry.ts`). */
  maps: MapSummary[];
  /** The map currently on screen — which may be an unlisted one. */
  current: MapSummary;
}

/**
 * Dropdown under the sidebar wordmark for jumping between maps. Entries are
 * plain links to `/<slug>` so they prefetch, open in a new tab, and work
 * without JS; the panel is just the presentation.
 */
export default function MapSwitcher({ maps, current }: MapSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const latestId = maps[0]?.id;
  // A `visible: false` map is missing from `maps` but still renders at its own
  // URL, so say so rather than showing an unlabelled switcher.
  const unlisted = !maps.some((map) => map.id === current.id);

  // Dismiss on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-left transition-colors hover:bg-white/10"
        title="Switch map"
      >
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-zinc-300">
          #{current.number}
        </span>
        <span className="truncate text-sm font-medium text-white">
          {current.name}
        </span>
        {unlisted && (
          <span
            className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-300"
            title="Hidden from the map list until its `visible` flag is turned on"
          >
            Draft
          </span>
        )}
        <span
          className={`ml-auto text-[10px] text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-lg border border-white/15 bg-zinc-900 shadow-xl shadow-black/60"
        >
          {maps.map((map) => {
            const active = map.id === current.id;
            return (
              <Link
                key={map.id}
                href={`/${map.id}`}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-2.5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-cyan-500/15 text-white"
                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-zinc-400">
                  #{map.number}
                </span>
                <span className="truncate">{map.name}</span>
                {map.id === latestId && (
                  <span className="ml-auto shrink-0 rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cyan-300">
                    Latest
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
