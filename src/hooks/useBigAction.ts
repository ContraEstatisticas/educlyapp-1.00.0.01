import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  BIG_ACTION_QUERY_KEY,
  type BigActionState,
  completeBigAction as completeBigActionRequest,
  ensureBigActionAvailability,
  generateActiveBigAction,
  updateProfessionalArea,
} from "@/lib/bigAction";

const setBigActionCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  nextState: BigActionState | null,
) => {
  queryClient.setQueryData(BIG_ACTION_QUERY_KEY, nextState);
};

export const useBigAction = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  const query = useQuery({
    queryKey: BIG_ACTION_QUERY_KEY,
    queryFn: () => ensureBigActionAvailability(),
    staleTime: 15000,
  });

  const refresh = async () => {
    const nextState = await ensureBigActionAvailability();
    setBigActionCache(queryClient, nextState);
    return nextState;
  };

  const saveProfessionalAreaMutation = useMutation({
    mutationFn: async (value: string) => {
      const currentState = (queryClient.getQueryData(BIG_ACTION_QUERY_KEY) as BigActionState | null) || (await ensureBigActionAvailability());

      if (!currentState?.userId) {
        throw new Error("Unable to identify the current user.");
      }

      await updateProfessionalArea(currentState.userId, value);
      return ensureBigActionAvailability(currentState.userId);
    },
    onSuccess: (nextState) => {
      setBigActionCache(queryClient, nextState);
    },
  });

  const generateBigActionMutation = useMutation({
    mutationFn: async (force = false) => {
      await generateActiveBigAction({
        force,
        language: i18n.resolvedLanguage || i18n.language,
      });

      return ensureBigActionAvailability();
    },
    onSuccess: (nextState) => {
      setBigActionCache(queryClient, nextState);
    },
    onError: async () => {
      const nextState = await ensureBigActionAvailability();
      setBigActionCache(queryClient, nextState);
    },
  });

  const completeBigActionMutation = useMutation({
    mutationFn: async (actionId?: string) => {
      const currentState = (queryClient.getQueryData(BIG_ACTION_QUERY_KEY) as BigActionState | null) || (await ensureBigActionAvailability());
      const resolvedActionId = actionId || currentState?.activeBigAction?.id;

      if (!resolvedActionId) {
        throw new Error("No active Big Action was found.");
      }

      await completeBigActionRequest(resolvedActionId);
      return ensureBigActionAvailability(currentState?.userId);
    },
    onSuccess: (nextState) => {
      setBigActionCache(queryClient, nextState);
    },
  });

  return {
    ...query,
    data: query.data ?? null,
    activeBigAction: query.data?.activeBigAction ?? null,
    isSavingArea: saveProfessionalAreaMutation.isPending,
    isGenerating: generateBigActionMutation.isPending,
    isCompleting: completeBigActionMutation.isPending,
    saveProfessionalArea: saveProfessionalAreaMutation.mutateAsync,
    generateBigAction: generateBigActionMutation.mutateAsync,
    completeBigAction: completeBigActionMutation.mutateAsync,
    refresh,
  };
};
