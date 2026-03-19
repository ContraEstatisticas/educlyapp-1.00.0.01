import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Shield, Clock, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Footer } from "@/components/landing/Footer";
import { CompanyInfo } from "@/components/landing/CompanyInfo";

const RefundPolicy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.back")}
        </button>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t("refundPolicy.title")}</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t("refundPolicy.subtitle")}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold">{t("refundPolicy.guarantee.title")}</h2>
                <p className="leading-relaxed text-muted-foreground">{t("refundPolicy.guarantee.description")}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <CheckCircle className="h-6 w-6 text-primary" />
              {t("refundPolicy.eligibility.title")}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <p className="text-muted-foreground">{t("refundPolicy.eligibility.item1")}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <p className="text-muted-foreground">{t("refundPolicy.eligibility.item2")}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <p className="text-muted-foreground">{t("refundPolicy.eligibility.item3")}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <XCircle className="h-6 w-6 text-destructive" />
              {t("refundPolicy.nonEligibility.title")}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <p className="text-muted-foreground">{t("refundPolicy.nonEligibility.item1")}</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <p className="text-muted-foreground">{t("refundPolicy.nonEligibility.item2")}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Mail className="h-6 w-6 text-primary" />
              {t("refundPolicy.howToRequest.title")}
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>{t("refundPolicy.howToRequest.intro")}</p>

              <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
                <p className="mb-2 font-bold text-foreground">{t("refundPolicy.howToRequest.emailSubject")}</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>{t("refundPolicy.howToRequest.include1")}</li>
                  <li>{t("refundPolicy.howToRequest.include2")}</li>
                  <li>{t("refundPolicy.howToRequest.include3")}</li>
                </ul>
              </div>

              <p>
                <span className="font-semibold text-foreground">{t("refundPolicy.howToRequest.emailLabel")}: </span>
                <a href="mailto:contact@educly.app" className="text-primary hover:underline">
                  contact@educly.app
                </a>
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <AlertCircle className="h-6 w-6 text-orange-500" />
              {t("refundPolicy.cancellation.title")}
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>{t("refundPolicy.cancellation.description")}</p>
              <p>{t("refundPolicy.cancellation.instructions")}</p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Clock className="h-6 w-6 text-primary" />
              {t("refundPolicy.processing.title")}
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-1 font-semibold text-foreground">{t("refundPolicy.processing.responseTime")}</p>
                <p className="text-sm text-muted-foreground">{t("refundPolicy.processing.responseValue")}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-1 font-semibold text-foreground">{t("refundPolicy.processing.refundTime")}</p>
                <p className="text-sm text-muted-foreground">{t("refundPolicy.processing.refundValue")}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-center text-sm">
              <span className="font-semibold">{t("refundPolicy.billingDescriptor.label")}: </span>
              <span className="rounded bg-primary/10 px-2 py-1 font-mono">EDUCLY.APP</span>
            </p>
          </section>

          <CompanyInfo variant="full" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
