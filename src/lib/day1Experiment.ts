export const DAY1_EXPERIMENT_VARIANTS = [
  "atual",
  "guilherme",
  "sidney_texto",
  "sidney_video_edi",
  "sidney_video_sidney",
] as const;

export type Day1ExperimentVariant = (typeof DAY1_EXPERIMENT_VARIANTS)[number];

export const DEFAULT_DAY1_EXPERIMENT_VARIANT: Day1ExperimentVariant = "atual";

export const isDay1ExperimentVariant = (value: string): value is Day1ExperimentVariant =>
  DAY1_EXPERIMENT_VARIANTS.includes(value as Day1ExperimentVariant);

export const normalizeDay1ExperimentVariant = (
  value?: string | null,
): Day1ExperimentVariant => {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (normalized === "sidney") {
    return "sidney_texto";
  }

  if (normalized === "sidney_video") {
    return "sidney_video_sidney";
  }

  return isDay1ExperimentVariant(normalized)
    ? normalized
    : DEFAULT_DAY1_EXPERIMENT_VARIANT;
};
