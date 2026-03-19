import { supabase } from "@/integrations/supabase/client";

const getProgressStorageKey = (slug: string) => `educly-ai-trail-progress:${slug}`;

export const normalizeCompletedModules = (value: unknown): number[] => {
  if (!Array.isArray(value)) return [];

  return [...new Set(
    value
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item > 0),
  )].sort((a, b) => a - b);
};

const readLocalTrailProgress = (slug: string): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(getProgressStorageKey(slug));
    if (!raw) return [];

    const parsed = JSON.parse(raw) as { completedModules?: unknown };
    return normalizeCompletedModules(parsed.completedModules);
  } catch {
    return [];
  }
};

const writeLocalTrailProgress = (slug: string, completedModules: number[]) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getProgressStorageKey(slug),
    JSON.stringify({ completedModules: normalizeCompletedModules(completedModules) }),
  );
};

const getAuthenticatedUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
};

const fetchRemoteCompletedModules = async (userId: string, slug: string) => {
  const { data, error } = await supabase
    .from("ai_trail_module_progress")
    .select("module_number")
    .eq("user_id", userId)
    .eq("tool_slug", slug)
    .order("module_number", { ascending: true });

  if (error) {
    throw error;
  }

  return normalizeCompletedModules((data || []).map((row) => row.module_number));
};

const upsertRemoteCompletedModules = async (
  userId: string,
  slug: string,
  moduleNumbers: number[],
) => {
  if (!moduleNumbers.length) return;

  const timestamp = new Date().toISOString();
  const { error } = await supabase
    .from("ai_trail_module_progress")
    .upsert(
      moduleNumbers.map((moduleNumber) => ({
        user_id: userId,
        tool_slug: slug,
        module_number: moduleNumber,
        completed_at: timestamp,
        updated_at: timestamp,
      })),
      { onConflict: "user_id,tool_slug,module_number" },
    );

  if (error) {
    throw error;
  }
};

const syncLocalModulesToRemote = async (userId: string, slug: string, localModules: number[]) => {
  const remoteModules = await fetchRemoteCompletedModules(userId, slug);
  const missingModules = localModules.filter((moduleNumber) => !remoteModules.includes(moduleNumber));

  if (missingModules.length) {
    await upsertRemoteCompletedModules(userId, slug, missingModules);
  }

  return normalizeCompletedModules([...remoteModules, ...localModules]);
};

export const getAiTrailCompletedModules = async (slug: string) => {
  const localModules = readLocalTrailProgress(slug);

  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) return localModules;

    const mergedModules = await syncLocalModulesToRemote(userId, slug, localModules);
    writeLocalTrailProgress(slug, mergedModules);
    return mergedModules;
  } catch (error) {
    console.error("Failed to load AI trail progress:", error);
    return localModules;
  }
};

export const markAiTrailModuleCompleted = async (slug: string, moduleNumber: number) => {
  const localModules = normalizeCompletedModules([
    ...readLocalTrailProgress(slug),
    moduleNumber,
  ]);

  writeLocalTrailProgress(slug, localModules);

  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) return localModules;

    await upsertRemoteCompletedModules(userId, slug, [moduleNumber]);
    const remoteModules = await fetchRemoteCompletedModules(userId, slug);
    const mergedModules = normalizeCompletedModules([...remoteModules, ...localModules]);
    writeLocalTrailProgress(slug, mergedModules);
    return mergedModules;
  } catch (error) {
    console.error("Failed to persist AI trail progress:", error);
    return localModules;
  }
};

export const getAiTrailCurrentModuleNumber = (completedModules: number[], totalModules: number) => {
  for (let moduleNumber = 1; moduleNumber <= totalModules; moduleNumber += 1) {
    if (!completedModules.includes(moduleNumber)) {
      return moduleNumber;
    }
  }

  return Math.max(1, totalModules);
};

export const isAiTrailModuleUnlocked = (
  completedModules: number[],
  moduleNumber: number,
  totalModules: number,
) => {
  const currentModuleNumber = getAiTrailCurrentModuleNumber(completedModules, totalModules);

  return completedModules.includes(moduleNumber) || moduleNumber <= currentModuleNumber;
};
