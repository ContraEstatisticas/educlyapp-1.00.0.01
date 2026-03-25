const GENERIC_PLACEHOLDER_NAMES = new Set([
  "aluno",
  "estudiante",
  "etudiant",
  "student",
  "user",
  "usuario",
]);

export const normalizeNameForComparison = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");

export const isGenericPlaceholderName = (value?: string | null) => {
  if (typeof value !== "string") return false;
  const normalized = normalizeNameForComparison(value);
  if (!normalized) return false;
  return GENERIC_PLACEHOLDER_NAMES.has(normalized);
};

export const shouldPromptForNameConfirmation = (value?: string | null, completed?: boolean | null) => {
  if (completed) return false;
  return isGenericPlaceholderName(value);
};
