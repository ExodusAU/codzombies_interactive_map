import type { StepStatus } from "@/lib/maps/types";

/**
 * Per-status presentation. Confirmed steps deliberately have no badge — the
 * point is to make the *shaky* ones stand out, not to decorate every step.
 */
const STATUS_STYLES: Record<
  Exclude<StepStatus, "confirmed">,
  { label: string; short: string; title: string; className: string }
> = {
  partial: {
    label: "Partly confirmed",
    short: "Partial",
    title:
      "This step works, but some exact conditions are still being worked out.",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-200",
  },
  unconfirmed: {
    label: "Unconfirmed",
    short: "Unconfirmed",
    title: "A current lead only — not proven. Don't burn a long run on it.",
    className: "border-rose-400/40 bg-rose-400/15 text-rose-200",
  },
};

/**
 * Small pill marking how well-verified a step is. Renders nothing for
 * confirmed steps (the default), so it can be dropped in unconditionally.
 */
export default function StepStatusBadge({
  status,
  compact = false,
}: {
  status?: StepStatus;
  /** Sidebar variant: shorter text, tighter padding. */
  compact?: boolean;
}) {
  if (!status || status === "confirmed") return null;
  const style = STATUS_STYLES[status];

  return (
    <span
      title={style.title}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border font-semibold uppercase tracking-wide ${
        compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]"
      } ${style.className}`}
    >
      {status === "unconfirmed" ? "?" : "!"}
      {compact ? style.short : style.label}
    </span>
  );
}
