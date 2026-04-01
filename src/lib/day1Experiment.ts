export const DAY1_EXPERIMENT_VARIANTS = ["atual", "guilherme", "sidney"] as const;

export type Day1ExperimentVariant = (typeof DAY1_EXPERIMENT_VARIANTS)[number];

export const DEFAULT_DAY1_EXPERIMENT_VARIANT: Day1ExperimentVariant = "atual";

export const isDay1ExperimentVariant = (value: string): value is Day1ExperimentVariant =>
  DAY1_EXPERIMENT_VARIANTS.includes(value as Day1ExperimentVariant);

export const normalizeDay1ExperimentVariant = (
  value?: string | null,
): Day1ExperimentVariant => {
  const normalized = String(value ?? "").trim().toLowerCase();

  return isDay1ExperimentVariant(normalized)
    ? normalized
    : DEFAULT_DAY1_EXPERIMENT_VARIANT;
};
