import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiMasteryTrails } from "@/lib/aiMasteryTrails";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";

const AIToolTrailsHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);

  const showComingSoonToast = () => {
    toast({
      title: aiTrailUi.toastTitle,
      description: aiTrailUi.toastDescription,
    });
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.14),_transparent_28%),linear-gradient(180deg,_#0f172a_0%,_#0b1020_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6 text-white hover:bg-white/10 hover:text-white" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {aiTrailUi.backToDashboard}
          </Button>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <Badge className="border-0 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-orange-200 hover:bg-white/10">
                {aiTrailUi.hubBadge}
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {aiTrailUi.hubTitle}
              </h1>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.hubTotalLabel}</p>
                  <p className="mt-1 text-2xl font-bold">{aiTrailUi.hubTotalValue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.hubFormatLabel}</p>
                  <p className="mt-1 text-2xl font-bold">{aiTrailUi.hubFormatValue}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.hubAtlasLabel}</p>
                  <h2 className="mt-2 text-2xl font-bold">{aiTrailUi.hubChooseTitle}</h2>
                </div>
                <div className="rounded-2xl bg-orange-500/15 p-4 text-orange-200">
                  <Layers3 className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {aiMasteryTrails.slice(0, 6).map((trail) => {
                  const trailMeta = getAiTrailLocalizedMeta(trail.slug, i18n.resolvedLanguage || i18n.language);
                  return (
                    <div
                      key={trail.slug}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-3"
                      style={{ boxShadow: `inset 0 1px 0 ${trail.accent}40` }}
                    >
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10"
                        style={{ backgroundColor: `${trail.accent}22` }}
                      >
                        {trail.logo ? <img src={trail.logo} alt={trail.name} className="h-6 w-6 object-contain" /> : null}
                      </div>
                      <p className="mt-3 text-sm font-semibold">{trail.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{trailMeta.category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{aiTrailUi.hubCatalogLabel}</p>
            <h2 className="mt-2 text-3xl font-black">{aiTrailUi.hubCatalogTitle}</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiMasteryTrails.map((trail) => {
            const trailMeta = getAiTrailLocalizedMeta(trail.slug, i18n.resolvedLanguage || i18n.language);
            return (
              <button
                key={trail.slug}
                onClick={showComingSoonToast}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${trail.accent}, ${trail.accent}55)` }} />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl" style={{ backgroundColor: `${trail.accent}22` }} />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10"
                      style={{ backgroundColor: `${trail.accent}22` }}
                    >
                      {trail.logo ? <img src={trail.logo} alt={trail.name} className="h-8 w-8 object-contain" /> : null}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{trailMeta.category}</p>
                      <h3 className="mt-1 text-xl font-bold">{trail.name}</h3>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-orange-200">
                    {aiTrailUi.comingSoon}
                  </Badge>
                </div>

                <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{aiTrailUi.modulesLabel}</p>
                    <p className="mt-1 text-lg font-bold">{trail.modules.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{aiTrailUi.lessonsLabel}</p>
                    <p className="mt-1 text-lg font-bold">{trail.lessonCount}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between">
                  <p className="max-w-[75%] text-sm font-medium text-slate-200">{trailMeta.signature}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: trail.accent }}>
                    {aiTrailUi.seeLater}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AIToolTrailsHub;
