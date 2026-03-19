import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { useTranslation } from "react-i18next";
import logoEducy from "@/assets/logo-educy.png";
import { getPrivacyPolicyContent } from "@/lib/privacyPolicyContent";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const content = getPrivacyPolicyContent(i18n.language);
  const contactEmail = "contact@educly.app";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoEducy} alt="Educy" className="h-10" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl overflow-y-auto px-4 py-12">
        <h1 className="mb-2 text-4xl font-bold text-foreground">{content.title}</h1>
        <p className="mb-4 text-muted-foreground">{content.lastUpdated}</p>
        <p className="mb-8 leading-relaxed text-muted-foreground">{content.intro}</p>

        <div className="prose prose-gray max-w-none space-y-8 break-words">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.collection.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.collection.intro}</p>

            <h3 className="mb-2 mt-6 text-xl font-medium text-foreground">
              {content.sections.collection.directData.title}
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.collection.directData.items.map((item, index) => (
                <li key={`collection-direct-${index}`}>{item}</li>
              ))}
            </ul>

            <h3 className="mb-2 mt-6 text-xl font-medium text-foreground">
              {content.sections.collection.paymentData.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{content.sections.collection.paymentData.content1}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{content.sections.collection.paymentData.content2}</p>

            <h3 className="mb-2 mt-6 text-xl font-medium text-foreground">
              {content.sections.collection.autoData.title}
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.collection.autoData.items.map((item, index) => (
                <li key={`collection-auto-${index}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.usage.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.usage.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.usage.items.map((item, index) => (
                <li key={`usage-${index}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.legalBasis.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.legalBasis.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.legalBasis.items.map((item, index) => (
                <li key={`legal-basis-${index}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.sharing.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.sharing.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.sharing.items.map((item, index) => (
                <li key={`sharing-${index}`}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.sharing.disclaimer}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.security.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.security.content1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.security.content2}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.rights.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.rights.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.rights.items.map((item, index) => (
                <li key={`rights-${index}`}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.rights.howTo}</p>
            <p className="mt-2 font-medium leading-relaxed text-muted-foreground">
              <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-foreground">
                {contactEmail}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.communications.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.communications.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.communications.items.map((item, index) => (
                <li key={`communications-${index}`}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.communications.optOut}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.cookies.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.cookies.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              {content.sections.cookies.items.map((item, index) => (
                <li key={`cookies-${index}`}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.cookies.disclaimer}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.changes.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.changes.content1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.changes.content2}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{content.sections.changes.content3}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{content.sections.contact.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{content.sections.contact.intro}</p>
            <p className="mt-4 font-medium leading-relaxed text-muted-foreground">
              <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-foreground">
                {contactEmail}
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
