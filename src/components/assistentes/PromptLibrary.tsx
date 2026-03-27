import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  Building2,
  ChevronRight,
  Copy,
  HeartPulse,
  Landmark,
  Scale,
  Search,
  Send,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  getPromptCategoryOptions,
  getPromptLibraryContent,
  getPromptLibraryUiCopy,
  type PromptCategoryId,
} from "@/components/assistentes/promptLibraryData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PromptLibraryProps {
  onUsePrompt: (prompt: string, title: string) => void;
  onCopyPrompt: (prompt: string, title: string) => void;
}

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const CATEGORY_META: Record<
  PromptCategoryId,
  {
    icon: LucideIcon;
    badgeClassName: string;
  }
> = {
  all: {
    icon: BookOpenText,
    badgeClassName: "border-orange-200 bg-orange-50 text-orange-700",
  },
  financeiro: {
    icon: Landmark,
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  juridico: {
    icon: Scale,
    badgeClassName: "border-slate-200 bg-slate-100 text-slate-700",
  },
  pessoas: {
    icon: Users,
    badgeClassName: "border-sky-200 bg-sky-50 text-sky-700",
  },
  saude: {
    icon: HeartPulse,
    badgeClassName: "border-rose-200 bg-rose-50 text-rose-700",
  },
  negocios: {
    icon: Building2,
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700",
  },
  conteudo: {
    icon: BookOpenText,
    badgeClassName: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  },
};

export const PromptLibrary = ({ onUsePrompt, onCopyPrompt }: PromptLibraryProps) => {
  const { i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<PromptCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const libraryLanguage = i18n.resolvedLanguage || i18n.language;
  const uiCopy = useMemo(() => getPromptLibraryUiCopy(libraryLanguage), [libraryLanguage]);
  const categoryOptions = useMemo(
    () => getPromptCategoryOptions(libraryLanguage),
    [libraryLanguage],
  );
  const prompts = useMemo(() => getPromptLibraryContent(libraryLanguage), [libraryLanguage]);
  const [selectedPromptId, setSelectedPromptId] = useState(prompts[0].id);

  const categoryCounts = useMemo(
    () =>
      prompts.reduce<Record<Exclude<PromptCategoryId, "all">, number>>(
        (accumulator, prompt) => {
          accumulator[prompt.category] += 1;
          return accumulator;
        },
        {
          financeiro: 0,
          juridico: 0,
          pessoas: 0,
          saude: 0,
          negocios: 0,
          conteudo: 0,
        },
      ),
    [prompts],
  );

  const visiblePrompts = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery.trim());

    return prompts.filter((prompt) => {
      const matchesCategory =
        selectedCategory === "all" || prompt.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const searchableText = normalizeText(
        [
          prompt.title,
          prompt.summary,
          prompt.objective,
          prompt.persona,
          prompt.context,
          prompt.originalCategory,
          ...prompt.rules,
          ...prompt.responseStructure,
          ...prompt.keywords,
          ...prompt.variables.map((variable) => `${variable.key} ${variable.description}`),
        ].join(" "),
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [prompts, searchQuery, selectedCategory]);

  useEffect(() => {
    if (visiblePrompts.length === 0) return;

    if (!visiblePrompts.some((prompt) => prompt.id === selectedPromptId)) {
      setSelectedPromptId(visiblePrompts[0].id);
    }
  }, [selectedPromptId, visiblePrompts]);

  useEffect(() => {
    if (!prompts.some((prompt) => prompt.id === selectedPromptId)) {
      setSelectedPromptId(prompts[0].id);
    }
  }, [prompts, selectedPromptId]);

  const activePrompt =
    visiblePrompts.find((prompt) => prompt.id === selectedPromptId) ??
    prompts.find((prompt) => prompt.id === selectedPromptId) ??
    prompts[0];
  const hasVisiblePrompts = visiblePrompts.length > 0;

  const selectedCategoryOption =
    categoryOptions.find((category) => category.id === selectedCategory) ??
    categoryOptions[0];

  const activeCategoryMeta = CATEGORY_META[activePrompt.category];
  const ActivePromptIcon = activeCategoryMeta.icon;
  const hasStructuredDetails =
    Boolean(activePrompt.objective) ||
    Boolean(activePrompt.persona) ||
    Boolean(activePrompt.context) ||
    activePrompt.rules.length > 0 ||
    activePrompt.responseStructure.length > 0 ||
    activePrompt.variables.length > 0;

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-orange-200 bg-gradient-to-br from-[#fff6ed] via-white to-[#fff9f2] px-4 py-5 text-slate-900 shadow-[0_30px_80px_-45px_rgba(249,115,22,0.45)] sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-200/35 blur-3xl" />
      </div>

      <div className="relative space-y-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit border-orange-200 bg-white text-orange-700">
              {uiCopy.badge}
            </Badge>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {uiCopy.title}
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-600">
                {uiCopy.description}
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-orange-200 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                {uiCopy.statsPrompts}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">{prompts.length}</p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                {uiCopy.statsTracks}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {categoryOptions.length - 1}
              </p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                {uiCopy.statsFlow}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">{uiCopy.statsFlowValue}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-orange-200 bg-white/85 p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-950">{selectedCategoryOption.label}</p>
              <p className="text-sm text-slate-600">{selectedCategoryOption.description}</p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={uiCopy.searchPlaceholder}
                className="h-11 rounded-2xl border-orange-200 bg-white pl-10 text-sm shadow-none focus-visible:ring-orange-300"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categoryOptions.map((category) => {
              const isActive = category.id === selectedCategory;
              const count = category.id === "all" ? prompts.length : categoryCounts[category.id];

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all",
                    isActive
                      ? "border-orange-300 bg-orange-500 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-700",
                  )}
                >
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px]",
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-3">
            {visiblePrompts.length === 0 ? (
              <div className="rounded-[26px] border border-dashed border-orange-200 bg-white/75 p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{uiCopy.emptyTitle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {uiCopy.emptyDescription}
                </p>
              </div>
            ) : (
              visiblePrompts.map((prompt) => {
                const isActive = prompt.id === activePrompt.id;
                const categoryMeta = CATEGORY_META[prompt.category];
                const Icon = categoryMeta.icon;

                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => setSelectedPromptId(prompt.id)}
                    className={cn(
                      "w-full rounded-[26px] border p-4 text-left transition-all",
                      isActive
                        ? "border-orange-300 bg-white shadow-[0_22px_50px_-32px_rgba(249,115,22,0.45)]"
                        : "border-orange-100 bg-white/80 hover:border-orange-200 hover:bg-white",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                            categoryMeta.badgeClassName,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="border-orange-200 bg-orange-50 text-orange-700">
                              {uiCopy.promptLabel} {prompt.number}
                            </Badge>
                            <Badge className={categoryMeta.badgeClassName}>
                              {
                                categoryOptions.find(
                                  (category) => category.id === prompt.category,
                                )?.label
                              }
                            </Badge>
                          </div>
                          <p className="text-sm font-semibold leading-5 text-slate-950">
                            {prompt.title}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">{prompt.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {prompt.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="rounded-[28px] border border-orange-200 bg-white/90 p-5 shadow-[0_25px_70px_-42px_rgba(15,23,42,0.35)]">
            {!hasVisiblePrompts ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-dashed border-orange-200 bg-orange-50/70 px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                  <Search className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-semibold text-slate-950">
                  {uiCopy.emptyPanelTitle}
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  {uiCopy.emptyPanelDescription}
                </p>
              </div>
            ) : (
              <>
            <div className="flex flex-col gap-4 border-b border-orange-100 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-orange-200 bg-orange-50 text-orange-700">
                  {uiCopy.promptLabel} {activePrompt.number}
                </Badge>
                <Badge className={activeCategoryMeta.badgeClassName}>
                  {
                    categoryOptions.find((category) => category.id === activePrompt.category)
                      ?.label
                  }
                </Badge>
                <Badge className="border-slate-200 bg-slate-100 text-slate-600">
                  {activePrompt.originalCategory}
                </Badge>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                      activeCategoryMeta.badgeClassName,
                    )}
                  >
                    <ActivePromptIcon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                      {activePrompt.title}
                    </h3>
                    <p className="max-w-3xl text-sm leading-6 text-slate-600">
                      {activePrompt.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => onUsePrompt(activePrompt.fullPrompt, activePrompt.title)}
                    className="gap-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    <Send className="h-4 w-4" />
                    {uiCopy.useInChat}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onCopyPrompt(activePrompt.fullPrompt, activePrompt.title)}
                    className="gap-2 rounded-full border-orange-200 bg-white text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                  >
                    <Copy className="h-4 w-4" />
                    {uiCopy.copyPrompt}
                  </Button>
                </div>
              </div>
            </div>

            {hasStructuredDetails ? (
              <>
                <div className="mt-5 grid gap-4 xl:grid-cols-2">
                  {activePrompt.objective && (
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Objetivo
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{activePrompt.objective}</p>
                    </div>
                  )}

                  {activePrompt.context && (
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Contexto de uso
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{activePrompt.context}</p>
                    </div>
                  )}
                </div>

                {activePrompt.persona && (
                  <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Persona da IA
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{activePrompt.persona}</p>
                  </div>
                )}

                {(activePrompt.rules.length > 0 || activePrompt.responseStructure.length > 0) && (
                  <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    {activePrompt.rules.length > 0 && (
                      <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Regras de comportamento
                        </p>
                        <div className="mt-3 space-y-2">
                          {activePrompt.rules.map((rule) => (
                            <div key={rule} className="flex gap-2 text-sm leading-6 text-slate-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activePrompt.responseStructure.length > 0 && (
                      <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Estrutura de resposta
                        </p>
                        <div className="mt-3 space-y-2">
                          {activePrompt.responseStructure.map((item) => (
                            <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activePrompt.variables.length > 0 && (
                  <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Variáveis personalizáveis
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {activePrompt.variables.map((variable) => (
                        <div
                          key={variable.key}
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <p className="text-xs font-semibold text-slate-950">{variable.key}</p>
                          <p className="mt-1 text-sm text-slate-600">{variable.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {uiCopy.overviewLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{uiCopy.overviewDescription}</p>
              </div>
            )}

            <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {uiCopy.fullPromptLabel}
                </p>
                <span className="text-xs text-slate-400">
                  {uiCopy.localizedPromptHint}
                </span>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-slate-100">
                  {activePrompt.fullPrompt}
                </pre>
              </div>
            </div>

            <div className="mt-4 rounded-[24px] border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                {uiCopy.activationExampleLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {activePrompt.activationExample}
              </p>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
