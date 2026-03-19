import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAiTrailCompletedModules,
  getAiTrailCurrentModuleNumber,
  isAiTrailModuleUnlocked,
  markAiTrailModuleCompleted,
} from "@/lib/aiTrailProgress";

export const useAiTrailProgress = (slug?: string, totalModules = 0) => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!slug) {
      setCompletedModules([]);
      setIsLoading(false);
      return [];
    }

    setIsLoading(true);
    const modules = await getAiTrailCompletedModules(slug);
    setCompletedModules(modules);
    setIsLoading(false);
    return modules;
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!slug) {
        if (!cancelled) {
          setCompletedModules([]);
          setIsLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setIsLoading(true);
      }

      const modules = await getAiTrailCompletedModules(slug);

      if (!cancelled) {
        setCompletedModules(modules);
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const completeModule = useCallback(async (moduleNumber: number) => {
    if (!slug) return completedModules;

    const modules = await markAiTrailModuleCompleted(slug, moduleNumber);
    setCompletedModules(modules);
    return modules;
  }, [completedModules, slug]);

  const currentModuleNumber = useMemo(
    () => getAiTrailCurrentModuleNumber(completedModules, totalModules),
    [completedModules, totalModules],
  );

  const isModuleUnlocked = useCallback(
    (moduleNumber: number) => isAiTrailModuleUnlocked(completedModules, moduleNumber, totalModules),
    [completedModules, totalModules],
  );

  return {
    completedModules,
    currentModuleNumber,
    isModuleUnlocked,
    completeModule,
    isLoading,
    refresh,
  };
};
