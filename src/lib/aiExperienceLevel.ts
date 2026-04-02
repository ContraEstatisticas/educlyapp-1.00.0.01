export const aiExperienceLevels = ["none", "some", "intermediate", "advanced"] as const;

export type AiExperienceLevel = (typeof aiExperienceLevels)[number];

export const isAiExperienceLevel = (value: unknown): value is AiExperienceLevel =>
  typeof value === "string" &&
  aiExperienceLevels.includes(value as AiExperienceLevel);
