import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { aiMasteryTrailsBySlug } from "@/lib/aiMasteryTrails";
import { useTranslation } from "react-i18next";
import { getAiTrailLocalizedMeta, getAiTrailUiCopy } from "@/lib/aiTrailI18n";

const AIToolTrailPage = () => {
  const navigate = useNavigate();
  const { toolSlug } = useParams();
  const { toast } = useToast();
  const { i18n } = useTranslation();

  const trail = useMemo(() => (toolSlug ? aiMasteryTrailsBySlug[toolSlug] : null), [toolSlug]);
  const aiTrailUi = getAiTrailUiCopy(i18n.resolvedLanguage || i18n.language);
  const trailMeta = getAiTrailLocalizedMeta(toolSlug || "", i18n.resolvedLanguage || i18n.language);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    toast({
      title: aiTrailUi.toastTitle,
      description: aiTrailUi.toastDescription,
    });
  }, [aiTrailUi.toastDescription, aiTrailUi.toastTitle, toast, toolSlug]);

  return (
    <main className="min-h-screen bg-[#090f1d] text-white">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.14),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.10),_transparent_24%),linear-gradient(180deg,_#0f172a_0%,_#090f1d_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto flex min-h-screen max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {aiTrailUi.backToDashboard}
            </Button>

            <div className="space-y-5">
              <Badge className="border-0 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-orange-200 hover:bg-white/10">
                {aiTrailUi.comingSoon}
              </Badge>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5">
                  {trail?.logo ? (
                    <img src={trail.logo} alt={trail.name} className="h-9 w-9 object-contain" />
                  ) : (
                    <Lock className="h-7 w-7 text-slate-300" />
                  )}
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                    {trailMeta.category || aiTrailUi.pageCategoryFallback}
                  </p>
                  <h1 className="mt-1 text-3xl font-black sm:text-4xl">
                    {trail ? trail.name : aiTrailUi.pageCategoryFallback}
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300">
                {aiTrailUi.pageDescription}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-orange-300" />
                    <p className="text-sm font-semibold text-white">{aiTrailUi.pageBuildTitle}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {aiTrailUi.pageBuildDesc}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-violet-300" />
                    <p className="text-sm font-semibold text-white">{aiTrailUi.pageLockedTitle}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {aiTrailUi.pageLockedDesc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button className="h-12 rounded-xl px-6" onClick={() => navigate("/dashboard")}>
                  {aiTrailUi.pageUnderstand}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AIToolTrailPage;
