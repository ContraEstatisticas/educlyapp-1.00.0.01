import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useMemo, useRef } from "react";
import { ProductGuard } from "@/components/ProductGuard";
import { ArrowLeft, CheckCircle2, ExternalLink, Trophy, Loader2, MoreVertical, X } from "lucide-react";
import { FreelancerTutorial } from "@/components/onboarding";
import { useFreelancerContent } from "@/hooks/useFreelancerContent";
import { useFreelancerMedals } from "@/hooks/useFreelancerMedals";
import { FreelancerCandyCrushPath } from "@/components/FreelancerCandyCrushPath";
import { MedalHolder } from "@/components/freelancer/MedalHolder";
import { FreelancerStepsBar } from "@/components/lesson/FreelancerStepsBar";
import type { StepProgress } from "@/components/lesson/FreelancerStepsBar";
import { MobileNav } from "@/components/MobileNav";
import { tUi } from "@/lib/supplementalUiTranslations";
import {
  generateOrFetchFreelancerCertificateId,
  getExistingFreelancerCertificateId,
} from "@/lib/freelancerCertificate";

const FREELANCER_URL = "https://www.freelancer.com/";

type TutorialLocale = "pt" | "en" | "es" | "fr";

type FreelancerTutorialSlide = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageNumber: 1 | 2 | 3 | 4;
  calloutTitle?: string;
  calloutText?: string;
  checklistTitle?: string;
  checklistIntro?: string;
  checklistItems?: string[];
  completionTitle?: string;
  completionBadge?: string;
};

type FreelancerTutorialContent = {
  badge: string;
  title: string;
  description: string;
  previousLabel: string;
  nextLabel: string;
  openSiteLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  slides: FreelancerTutorialSlide[];
};

const freelancerTutorialContentByLocale: Record<TutorialLocale, FreelancerTutorialContent> = {
  pt: {
    badge: "Passo a passo",
    title: "Criando sua Conta no Freelancer.com",
    description:
      "O Freelancer.com e uma das maiores plataformas de trabalho freelancer do mundo. Nesta licao voce cria sua conta em minutos e fica pronto para buscar seus primeiros projetos.",
    previousLabel: "Anterior",
    nextLabel: "Proximo",
    openSiteLabel: "Abrir Freelancer.com",
    ctaEyebrow: "Primeiros passos",
    ctaTitle: "Crie seu perfil na Freelancer.com antes de entrar nos modulos",
    ctaDescription: "Se voce ainda nao abriu sua conta, deixei um tutorial rapido aqui para facilitar seu comeco.",
    ctaButtonLabel: "Quer criar sua conta na freelancer.com? veja aqui o tutorial",
    slides: [
      {
        id: "access-platform",
        eyebrow: "Passo 1",
        title: "Acessando a Plataforma",
        imageNumber: 1,
        paragraphs: [
          "Acesse freelancer.com e clique em Sign Up no canto superior direito.",
          "Voce vera a tela de cadastro com tres opcoes de entrada e ja podera iniciar sua conta.",
        ],
      },
      {
        id: "sign-up",
        eyebrow: "Tela 2",
        title: "Sign Up",
        imageNumber: 2,
        paragraphs: [
          "A primeira tela oferece tres formas de criar sua conta.",
          "A mais rapida e clicar em Continue with Google ou Continue with Facebook para preencher seus dados automaticamente.",
          "Se preferir criar manualmente, preencha First Name, Last Name, Email e Password.",
          "Antes de clicar em Join Freelancer, marque a caixinha confirmando que aceita o User Agreement e a Privacy Policy.",
        ],
      },
      {
        id: "username",
        eyebrow: "Tela 3",
        title: "Choose a Username",
        imageNumber: 3,
        paragraphs: [
          "Aqui voce escolhe seu nome de usuario e precisa pensar com calma, porque ele sera permanente.",
          "A plataforma vai sugerir opcoes automaticas baseadas no seu nome, geralmente com numeros aleatorios no final, mas ignore essas sugestoes.",
          "Digite algo que combine seu nome com sua area de atuacao, como joaocopy, anadesigner ou pedrocriativo.",
          "Quando estiver satisfeito, clique em Next.",
        ],
        calloutTitle: "Aviso importante",
        calloutText: '"Please note that a username cannot be changed once chosen."',
      },
      {
        id: "account-type",
        eyebrow: "Tela 4",
        title: "Select Account Type",
        imageNumber: 4,
        paragraphs: [
          "Escolha Earn money freelancing. Esse e o perfil de quem quer trabalhar em projetos e receber pelos servicos prestados.",
          "A outra opcao, Hire a freelancer, e para quem quer contratar. Essa escolha pode ser alterada depois.",
          "Clique em Earn money freelancing e sua conta estara criada.",
        ],
        checklistTitle: "Agora complete seu perfil",
        checklistIntro:
          "Clientes avaliam o perfil antes de aceitar qualquer proposta. Um perfil vazio raramente recebe resposta.",
        checklistItems: [
          "Adicione uma foto profissional.",
          "Escreva uma bio clara com sua especialidade.",
          "Selecione suas habilidades principais.",
          "Adicione exemplos de trabalho no portfolio.",
          "Defina uma taxa horaria compativel com seu nivel atual.",
        ],
        completionTitle: "Conta criada. Perfil completo. Pronto para o primeiro projeto.",
        completionBadge: "Licao concluida",
      },
    ],
  },
  en: {
    badge: "Step by step",
    title: "Creating Your Account on Freelancer.com",
    description:
      "Freelancer.com is one of the largest freelance platforms in the world, with clients from companies like Adobe, Facebook, IBM and Google. In this lesson you'll create your account in minutes and be ready to find your first projects.",
    previousLabel: "Previous",
    nextLabel: "Next",
    openSiteLabel: "Open Freelancer.com",
    ctaEyebrow: "First steps",
    ctaTitle: "Create your Freelancer.com profile before starting the modules",
    ctaDescription: "If you still haven't opened your account, I left a quick tutorial here to make your start easier.",
    ctaButtonLabel: "Want to create your Freelancer.com account? see the tutorial here",
    slides: [
      {
        id: "access-platform",
        eyebrow: "Step 1",
        title: "Accessing the Platform",
        imageNumber: 1,
        paragraphs: [
          "Go to freelancer.com and click Sign Up in the top right corner.",
          "You'll see the registration screen with three entry options.",
        ],
      },
      {
        id: "sign-up",
        eyebrow: "Screen 1",
        title: "Sign Up",
        imageNumber: 2,
        paragraphs: [
          "The first screen offers three ways to create your account.",
          "The fastest is to click Continue with Google or Continue with Facebook. Your details are filled in automatically and you move forward right away.",
          "If you prefer to create your account manually, fill in the First Name, Last Name, Email and Password fields.",
          "Before clicking Join Freelancer check the box confirming that you accept the platform's User Agreement and Privacy Policy.",
        ],
      },
      {
        id: "username",
        eyebrow: "Screen 2",
        title: "Choose a Username",
        imageNumber: 3,
        paragraphs: [
          "This is where you choose your username.",
          "Your username is permanent. The platform will suggest automatic options based on your name, usually with random numbers at the end, but ignore those suggestions. Random numbers look unprofessional.",
          "Type something in the Username field that combines your name with your area of work. Examples: johncopy, marydesigner, petercreative. Short, clean and professional. This name will appear on every proposal you send to clients.",
          "When you're happy with it click Next.",
        ],
        calloutTitle: "Important warning",
        calloutText: '"Please note that a username cannot be changed once chosen."',
      },
      {
        id: "account-type",
        eyebrow: "Screen 3",
        title: "Select Account Type",
        imageNumber: 4,
        paragraphs: [
          "The last screen asks you to choose how you'll use the platform.",
          "Earn money freelancing. Select this option. This is the profile for those who want to work on projects and get paid for the services they deliver.",
          "The other option, Hire a freelancer, is for those who want to hire. The screen lets you know this choice can be changed later, so don't worry. Click Earn money freelancing and your account will be created.",
        ],
        checklistTitle: "Now complete your profile",
        checklistIntro:
          "With your account active, don't skip the step of completing your profile. Clients evaluate your profile before accepting any proposal. An empty profile rarely gets a response.",
        checklistItems: [
          "Add a professional photo.",
          "Write a clear bio with your specialty.",
          "Select your main skills.",
          "Add work samples to your portfolio.",
          "Set an hourly rate that matches your current level.",
        ],
        completionTitle: "Account created. Profile complete. Ready for the first project.",
        completionBadge: "Lesson completed",
      },
    ],
  },
  es: {
    badge: "Paso a paso",
    title: "Creando tu Cuenta en Freelancer.com",
    description:
      "Freelancer.com es una de las plataformas de trabajo freelance mas grandes del mundo, con clientes de empresas como Adobe, Facebook, IBM y Google. En esta leccion vas a crear tu cuenta en minutos y estaras listo para encontrar tus primeros proyectos.",
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    openSiteLabel: "Abrir Freelancer.com",
    ctaEyebrow: "Primeros pasos",
    ctaTitle: "Crea tu perfil en Freelancer.com antes de entrar en los modulos",
    ctaDescription: "Si todavia no abriste tu cuenta, deje un tutorial rapido aqui para facilitar tu comienzo.",
    ctaButtonLabel: "Quieres crear tu cuenta en freelancer.com? mira aqui el tutorial",
    slides: [
      {
        id: "access-platform",
        eyebrow: "Paso 1",
        title: "Accediendo a la Plataforma",
        imageNumber: 1,
        paragraphs: [
          "Accede a freelancer.com y haz clic en Sign Up en la esquina superior derecha.",
          "Veras la pantalla de registro con tres opciones de entrada.",
        ],
      },
      {
        id: "sign-up",
        eyebrow: "Pantalla 1",
        title: "Sign Up",
        imageNumber: 2,
        paragraphs: [
          "La primera pantalla ofrece tres formas de crear tu cuenta.",
          "La mas rapida es hacer clic en Continue with Google o Continue with Facebook. Tus datos se completan automaticamente y avanzas de inmediato.",
          "Si prefieres crear la cuenta manualmente, completa los campos First Name, Last Name, Email y Password.",
          "Antes de hacer clic en Join Freelancer marca la casilla confirmando que aceptas el User Agreement y la Privacy Policy de la plataforma.",
        ],
      },
      {
        id: "username",
        eyebrow: "Pantalla 2",
        title: "Choose a Username",
        imageNumber: 3,
        paragraphs: [
          "Aqui eliges tu nombre de usuario.",
          "Tu username es permanente. La plataforma va a sugerir opciones automaticas basadas en tu nombre, generalmente con numeros aleatorios al final, pero ignora esas sugerencias. Los numeros aleatorios dan una imagen poco profesional.",
          "Escribe en el campo Username algo que combine tu nombre con tu area de trabajo. Ejemplos: juancopy, anadesigner, pedrocreativo. Corto, limpio y profesional. Ese nombre aparecera en todas las propuestas que envies a los clientes.",
          "Cuando estes satisfecho haz clic en Next.",
        ],
        calloutTitle: "Aviso importante",
        calloutText: '"Please note that a username cannot be changed once chosen."',
      },
      {
        id: "account-type",
        eyebrow: "Pantalla 3",
        title: "Select Account Type",
        imageNumber: 4,
        paragraphs: [
          "La ultima pantalla te pide que elijas como vas a usar la plataforma.",
          "Earn money freelancing. Selecciona esta opcion. Es el perfil de quien quiere trabajar en proyectos y recibir pagos por los servicios prestados.",
          "La otra opcion, Hire a freelancer, es para quien quiere contratar. La pantalla informa que esta eleccion puede cambiarse despues, asi que no te preocupes. Haz clic en Earn money freelancing y tu cuenta estara creada.",
        ],
        checklistTitle: "Ahora completa tu perfil",
        checklistIntro:
          "Con la cuenta activa, no omitas el paso de completar tu perfil. Los clientes evaluan el perfil antes de aceptar cualquier propuesta. Un perfil vacio raramente recibe respuesta.",
        checklistItems: [
          "Agrega una foto profesional.",
          "Escribe una bio clara con tu especialidad.",
          "Selecciona tus habilidades principales.",
          "Agrega ejemplos de trabajo en tu portafolio.",
          "Define una tarifa por hora compatible con tu nivel actual.",
        ],
        completionTitle: "Cuenta creada. Perfil completo. Listo para el primer proyecto.",
        completionBadge: "Leccion completada",
      },
    ],
  },
  fr: {
    badge: "Pas a pas",
    title: "Creer ton Compte sur Freelancer.com",
    description:
      "Freelancer.com est l une des plus grandes plateformes de travail freelance au monde, avec des clients d entreprises comme Adobe, Facebook, IBM et Google. Dans cette lecon tu vas creer ton compte en quelques minutes et tu seras pret a trouver tes premiers projets.",
    previousLabel: "Precedent",
    nextLabel: "Suivant",
    openSiteLabel: "Ouvrir Freelancer.com",
    ctaEyebrow: "Premiers pas",
    ctaTitle: "Cree ton profil sur Freelancer.com avant d entrer dans les modules",
    ctaDescription: "Si tu n as pas encore ouvert ton compte, j ai laisse ici un tutoriel rapide pour faciliter ton debut.",
    ctaButtonLabel: "Tu veux creer ton compte sur freelancer.com ? vois le tutoriel ici",
    slides: [
      {
        id: "access-platform",
        eyebrow: "Etape 1",
        title: "Acceder a la Plateforme",
        imageNumber: 1,
        paragraphs: [
          "Accede a freelancer.com et clique sur Sign Up dans le coin superieur droit.",
          "Tu verras l ecran d inscription avec trois options d acces.",
        ],
      },
      {
        id: "sign-up",
        eyebrow: "Ecran 1",
        title: "Sign Up",
        imageNumber: 2,
        paragraphs: [
          "Le premier ecran propose trois facons de creer ton compte.",
          "La plus rapide est de cliquer sur Continue with Google ou Continue with Facebook. Tes donnees sont remplies automatiquement et tu passes a l etape suivante immediatement.",
          "Si tu preferes creer ton compte manuellement, remplis les champs First Name, Last Name, Email et Password.",
          "Avant de cliquer sur Join Freelancer coche la case confirmant que tu acceptes le User Agreement et la Privacy Policy de la plateforme.",
        ],
      },
      {
        id: "username",
        eyebrow: "Ecran 2",
        title: "Choose a Username",
        imageNumber: 3,
        paragraphs: [
          "Ici tu choisis ton nom d utilisateur.",
          "Ton username est permanent. La plateforme va te suggerer des options automatiques basees sur ton nom, generalement avec des chiffres aleatoires a la fin, mais ignore ces suggestions. Les chiffres aleatoires donnent une image peu professionnelle.",
          "Ecris dans le champ Username quelque chose qui combine ton nom avec ton domaine d activite. Exemples : jeancopy, mariedesigner, pierrecreativ. Court, propre et professionnel. Ce nom apparaitra dans toutes les propositions que tu enverras aux clients.",
          "Quand tu es satisfait clique sur Next.",
        ],
        calloutTitle: "Avertissement important",
        calloutText: '"Please note that a username cannot be changed once chosen."',
      },
      {
        id: "account-type",
        eyebrow: "Ecran 3",
        title: "Select Account Type",
        imageNumber: 4,
        paragraphs: [
          "Le dernier ecran te demande de choisir comment tu vas utiliser la plateforme.",
          "Earn money freelancing. Selectionne cette option. C est le profil de celui qui veut travailler sur des projets et recevoir un paiement pour les services rendus.",
          "L autre option, Hire a freelancer, est pour ceux qui veulent recruter. L ecran indique que ce choix peut etre modifie ulterieurement, alors ne t inquiete pas. Clique sur Earn money freelancing et ton compte sera cree.",
        ],
        checklistTitle: "Complete Maintenant ton Profil",
        checklistIntro:
          "Avec le compte actif, ne saute pas l etape de completer ton profil. Les clients evaluent le profil avant d accepter toute proposition. Un profil vide recoit rarement une reponse.",
        checklistItems: [
          "Ajoute une photo professionnelle.",
          "Ecris une bio claire avec ta specialite.",
          "Selectionne tes competences principales.",
          "Ajoute des exemples de travail dans ton portfolio.",
          "Definis un tarif horaire compatible avec ton niveau actuel.",
        ],
        completionTitle: "Compte cree. Profil complet. Pret pour le premier projet.",
        completionBadge: "Lecon terminee",
      },
    ],
  },
};

const normalizeTutorialLocale = (language: string): TutorialLocale => {
  const baseLanguage = language.toLowerCase().split("-")[0];

  if (baseLanguage === "pt" || baseLanguage === "en" || baseLanguage === "es" || baseLanguage === "fr") {
    return baseLanguage;
  }

  return "en";
};

const tutorialImageAssets: Record<
  TutorialLocale,
  Record<FreelancerTutorialSlide["imageNumber"], string>
> = {
  pt: {
    1: new URL("../assets/tutorialImages/PT_images/Imagem_1.png", import.meta.url).href,
    2: new URL("../assets/tutorialImages/PT_images/Imagem_2.png", import.meta.url).href,
    3: new URL("../assets/tutorialImages/PT_images/Imagem_3.png", import.meta.url).href,
    4: new URL("../assets/tutorialImages/PT_images/Imagem_4.png", import.meta.url).href,
  },
  en: {
    1: new URL("../assets/tutorialImages/EN_images/Imagem_1.png", import.meta.url).href,
    2: new URL("../assets/tutorialImages/EN_images/Imagem_2.png", import.meta.url).href,
    3: new URL("../assets/tutorialImages/EN_images/Imagem_3.png", import.meta.url).href,
    4: new URL("../assets/tutorialImages/EN_images/Imagem_4.png", import.meta.url).href,
  },
  es: {
    1: new URL("../assets/tutorialImages/ES_images/Imagem_1.png", import.meta.url).href,
    2: new URL("../assets/tutorialImages/ES_images/Imagem_2.png", import.meta.url).href,
    3: new URL("../assets/tutorialImages/ES_images/Imagem_3.png", import.meta.url).href,
    4: new URL("../assets/tutorialImages/ES_images/Imagem_4.png", import.meta.url).href,
  },
  fr: {
    1: new URL("../assets/tutorialImages/FR_images/Imagem_1.png", import.meta.url).href,
    2: new URL("../assets/tutorialImages/FR_images/Imagem_2.png", import.meta.url).href,
    3: new URL("../assets/tutorialImages/FR_images/Imagem_3.png", import.meta.url).href,
    4: new URL("../assets/tutorialImages/FR_images/Imagem_4.png", import.meta.url).href,
  },
};

const getTutorialImagePath = (language: string, imageNumber: FreelancerTutorialSlide["imageNumber"]) => {
  const locale = normalizeTutorialLocale(language);

  return tutorialImageAssets[locale][imageNumber];
};

const FreelancerAccountTutorialButton = ({ language }: { language: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const locale = useMemo(() => normalizeTutorialLocale(language), [language]);
  const tutorial = freelancerTutorialContentByLocale[locale];
  const isLastSlide = currentSlide === tutorial.slides.length - 1;

  useEffect(() => {
    if (!carouselApi) return;

    const updateSlideState = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSlideState();
    carouselApi.on("select", updateSlideState);
    carouselApi.on("reInit", updateSlideState);

    return () => {
      carouselApi.off("select", updateSlideState);
      carouselApi.off("reInit", updateSlideState);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!isOpen || !carouselApi) return;
    carouselApi.scrollTo(0);
  }, [isOpen, carouselApi]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto w-full whitespace-normal rounded-2xl px-5 py-4 text-left text-sm font-semibold leading-relaxed lg:w-auto lg:max-w-sm">
          {tutorial.ctaButtonLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="top-[calc(env(safe-area-inset-top,0px)+0.5rem)] w-[calc(100vw-1rem)] translate-y-0 overflow-hidden rounded-2xl border-border bg-card p-0 sm:top-[50%] sm:w-[95vw] sm:max-w-5xl sm:translate-y-[-50%] sm:rounded-3xl [&>button:last-child]:hidden">
        <div className="flex max-h-[calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-1rem)] flex-col sm:max-h-[90dvh]">
          <div className="relative border-b border-border bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-background px-4 pb-4 pt-[calc(env(safe-area-inset-top,0px)+1rem)] sm:px-6 sm:py-6">
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-[calc(env(safe-area-inset-top,0px)+0.75rem)] h-11 w-11 rounded-full border border-border bg-background/90 shadow-sm hover:bg-background sm:right-4 sm:top-4"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
            <DialogHeader className="space-y-2 text-left">
              <div className="inline-flex w-fit items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700 dark:bg-orange-900/30 dark:text-orange-200">
                {tutorial.badge}
              </div>
              <DialogTitle className="text-lg sm:text-2xl font-bold leading-tight text-foreground">
                {tutorial.title}
              </DialogTitle>
              <DialogDescription className="max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {tutorial.description}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
            <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: false }} className="w-full min-w-0">
              <CarouselContent className="min-w-0">
                {tutorial.slides.map((slide, index) => (
                  <CarouselItem key={slide.id}>
                    <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
                      <div className="min-w-0 space-y-3 sm:space-y-4">
                        <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 max-w-full">
                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-orange-600 dark:text-orange-300">
                              {slide.eyebrow}
                            </p>
                            <h3 className="mt-1 sm:mt-2 break-words text-lg font-bold leading-tight text-foreground sm:text-2xl">
                              {slide.title}
                            </h3>
                          </div>
                          <div className="rounded-full border border-border bg-muted/60 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-muted-foreground whitespace-nowrap">
                            {index + 1} / {tutorial.slides.length}
                          </div>
                        </div>

                        <div className="min-w-0 space-y-2 sm:space-y-3">
                          {slide.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="max-w-full break-words whitespace-normal text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {slide.calloutTitle && slide.calloutText ? (
                          <div className="min-w-0 rounded-xl border border-orange-200/70 bg-orange-50/80 p-3 sm:rounded-2xl sm:p-4 dark:border-orange-900/60 dark:bg-orange-950/20">
                            <p className="text-xs sm:text-sm font-semibold text-foreground">{slide.calloutTitle}</p>
                            <p className="mt-1 max-w-full break-words whitespace-normal text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {slide.calloutText}
                            </p>
                          </div>
                        ) : null}

                        {slide.checklistTitle ? (
                          <div className="min-w-0 rounded-xl border border-border bg-muted/40 p-3 sm:rounded-2xl sm:p-4">
                            <p className="text-xs sm:text-sm font-semibold text-foreground">{slide.checklistTitle}</p>
                            {slide.checklistIntro ? (
                              <p className="mt-2 max-w-full break-words whitespace-normal text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                {slide.checklistIntro}
                              </p>
                            ) : null}
                            {slide.checklistItems?.length ? (
                              <ul className="mt-3 space-y-2">
                                {slide.checklistItems.map((item) => (
                                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 text-orange-500" />
                                    <span className="break-words">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ) : null}

                        {slide.completionTitle && slide.completionBadge ? (
                          <div className="min-w-0 rounded-xl border border-emerald-200/70 bg-emerald-50/80 p-3 sm:rounded-2xl sm:p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
                            <p className="max-w-full break-words text-xs font-semibold text-foreground sm:text-sm">{slide.completionTitle}</p>
                            <p className="mt-2 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                              {slide.completionBadge} {"\u2713"}
                            </p>
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <div className="flex min-h-[160px] sm:min-h-[260px] items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-muted/40 p-2 sm:p-3 shadow-sm">
                          <img
                            src={getTutorialImagePath(language, slide.imageNumber)}
                            alt={`${slide.title} - Freelancer tutorial`}
                            className="max-h-[240px] sm:max-h-[520px] w-full rounded-xl sm:rounded-2xl object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation arrows - hidden on mobile, swipe is used instead */}
              <CarouselPrevious
                variant="secondary"
                size="icon"
                className="hidden sm:flex left-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-border bg-background/90 shadow-lg backdrop-blur hover:bg-background"
              />
              <CarouselNext
                variant="secondary"
                size="icon"
                className="hidden sm:flex right-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-border bg-background/90 shadow-lg backdrop-blur hover:bg-background"
              />
            </Carousel>
          </div>

          <div className="border-t border-border px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 sm:px-6 sm:py-4">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {tutorial.slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentSlide ? "w-8 bg-orange-500" : "w-2.5 bg-border hover:bg-orange-300"
                    }`}
                    aria-label={`${slide.title} ${index + 1}`}
                  />
                ))}
              </div>

              {isLastSlide ? (
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => window.open(FREELANCER_URL, "_blank", "noopener,noreferrer")}
                >
                  {tutorial.openSiteLabel}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente separado para o conteúdo da barra lateral (Card + Medalhas)
const SidebarContent = ({
  allCompleted,
  completedCount,
  totalModules,
  progressPercentage,
  certificateId,
  isGeneratingCertificate,
  onCertificateClick,
  t,
  language
}: {
  allCompleted: boolean;
  completedCount: number;
  totalModules: number;
  progressPercentage: number;
  certificateId: string | null;
  isGeneratingCertificate: boolean;
  onCertificateClick: () => void;
  t: any;
  language: string;
}) => (
  <div className="flex flex-col gap-6">
    {/* Card de Conquista com suporte a Dark Mode */}
    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-6 relative">
        <Trophy className="w-12 h-12 text-orange-500" />
        <div className="absolute top-0 right-0 text-orange-400 text-xl">✨</div>
      </div>

      <div className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
        {tUi(t, language, "certificate.eliteCertificate")}
      </div>

      <h2 className="text-2xl font-black text-foreground mb-2">
        {allCompleted
          ? tUi(t, language, "certificate.conquered")
          : tUi(t, language, "freelancer.inProgress")}
      </h2>
      <p className="text-muted-foreground mb-6 font-medium">{t("freelancer.title", "Freelancer Pro")}</p>

      {/* Barra de Progresso interna */}
      <div className="w-full bg-secondary h-3 rounded-full overflow-hidden mb-3">
        <div
          className="bg-orange-500 h-full rounded-full transition-all duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground font-semibold">
        {tUi(t, language, "freelancer.modulesCompleted", {
          completed: completedCount,
          total: totalModules,
          percent: progressPercentage,
        })}
      </p>

      {allCompleted ? (
        <Button
          onClick={onCertificateClick}
          disabled={isGeneratingCertificate}
          className="mt-6 w-full gap-2 rounded-2xl bg-orange-500 font-bold text-white hover:bg-orange-600"
        >
          {isGeneratingCertificate ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ExternalLink className="h-4 w-4" />
          )}
          {isGeneratingCertificate
            ? tUi(t, language, "challenge.generatingCertificate")
            : certificateId
              ? t("certificate.viewCertificate", "View Certificate")
              : tUi(t, language, "challenge.generateCertificate")}
        </Button>
      ) : null}
    </div>

    {/* Container de Medalhas com suporte a Dark Mode */}
    <div className="bg-card rounded-3xl p-6 shadow-sm border border-border">
      <MedalHolder />
    </div>
  </div>
);

const FreelancerContent = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { getAllModules, isLoading } = useFreelancerContent();
  const { checkAndAwardMedals, isLoading: medalsLoading, earnedCount } = useFreelancerMedals();
  const [moduleProgress, setModuleProgress] = useState<Record<number, { stepIndex: number; completed: boolean }>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  const medalCheckKeyRef = useRef<string | null>(null);

  const modules = getAllModules();

  const { data: streakData, isLoading: streakLoading } = useQuery({
    queryKey: ["user-streak"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return { current_streak: 0, longest_streak: 0 };
      }

      const { data, error } = await supabase
        .from("user_streaks")
        .select("current_streak, longest_streak")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data || { current_streak: 0, longest_streak: 0 };
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: progress } = await supabase
        .from("freelancer_module_progress")
        .select("module_number, step_index, completed")
        .eq("user_id", user.id);

      if (progress) {
        const progressMap = progress.reduce(
          (acc, p) => {
            acc[p.module_number] = { stepIndex: p.step_index, completed: p.completed };
            return acc;
          },
          {} as Record<number, { stepIndex: number; completed: boolean }>,
        );
        setModuleProgress(progressMap);
      }
    };
    checkAuth();
  }, [navigate]);

  const isModuleUnlocked = (moduleNumber: number): boolean => {
    if (moduleNumber === 1) return true;
    const previousModule = moduleProgress[moduleNumber - 1];
    return previousModule?.completed === true;
  };

  const isModuleCompleted = (moduleNumber: number): boolean => {
    return moduleProgress[moduleNumber]?.completed === true;
  };

  const handleModuleClick = (moduleNumber: number, hasContent: boolean) => {
    if (!isModuleUnlocked(moduleNumber)) {
      toast({
        title: tUi(t, i18n.language, "freelancer.moduleLocked"),
        description: tUi(t, i18n.language, "freelancer.completePreview"),
        variant: "destructive",
      });
      return;
    }
    if (hasContent) {
      navigate(`/freelancer/${moduleNumber}`);
    } else {
      toast({
        title: tUi(t, i18n.language, "freelancer.comingSoon"),
        description: tUi(t, i18n.language, "freelancer.moduleInDevelopment"),
      });
    }
  };

  const completedCount = useMemo(
    () => modules.filter((m) => isModuleCompleted(m.moduleNumber)).length,
    [modules, moduleProgress]
  );

  const currentModuleNumber = useMemo(() => {
    const current = modules.find(
      (m) => isModuleUnlocked(m.moduleNumber) && !isModuleCompleted(m.moduleNumber)
    );
    if (current) return current.moduleNumber;

    // Se tudo estiver completo, mantém o foco no último módulo para evitar
    // reposicionamento estranho da barra de progresso.
    return modules.length > 0 ? modules[modules.length - 1].moduleNumber : 1;
  }, [modules, moduleProgress]);

  const tutorialLocale = useMemo(() => normalizeTutorialLocale(i18n.language), [i18n.language]);
  const tutorialContent = useMemo(
    () => freelancerTutorialContentByLocale[tutorialLocale],
    [tutorialLocale]
  );

  const totalModules = modules.length;
  const allCompleted = totalModules > 0 && completedCount === totalModules;
  const progressPercentage = Math.round((completedCount / totalModules) * 100) || 0;
  const currentStreak = streakData?.current_streak || 0;

  useEffect(() => {
    if (totalModules === 0 || medalsLoading || streakLoading) return;

    const checkKey = `${completedCount}:${currentStreak}:${earnedCount}`;
    if (medalCheckKeyRef.current === checkKey) return;
    medalCheckKeyRef.current = checkKey;

    void checkAndAwardMedals({
      completedModules: completedCount,
      currentStreak,
    }).catch((error) => {
      console.error("Error checking freelancer medals:", error);
    });
  }, [
    checkAndAwardMedals,
    completedCount,
    currentStreak,
    earnedCount,
    medalsLoading,
    streakLoading,
    totalModules,
  ]);

  useEffect(() => {
    let isMounted = true;

    const loadExistingCertificate = async () => {
      if (!allCompleted) {
        if (isMounted) setCertificateId(null);
        return;
      }

      try {
        const existingId = await getExistingFreelancerCertificateId();
        if (isMounted) {
          setCertificateId(existingId);
        }
      } catch (error) {
        console.error("Error loading freelancer certificate:", error);
      }
    };

    void loadExistingCertificate();

    return () => {
      isMounted = false;
    };
  }, [allCompleted]);

  const handleCertificateClick = async () => {
    if (!allCompleted) return;

    if (certificateId) {
      navigate(`/certificado/${certificateId}`);
      return;
    }

    setIsGeneratingCertificate(true);

    try {
      const generatedId = await generateOrFetchFreelancerCertificateId();

      if (generatedId) {
        setCertificateId(generatedId);
        navigate(`/certificado/${generatedId}`);
      } else {
        toast({
          title: tUi(t, i18n.language, "challenge.certificateError"),
          description: tUi(t, i18n.language, "challenge.completeToCertificate"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating freelancer certificate:", error);
      toast({
        title: tUi(t, i18n.language, "challenge.certificateError"),
        description: error instanceof Error ? error.message : t("common.error", "Error"),
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const stepsForBar: StepProgress[] = useMemo(
    () =>
      modules.map((m) => ({
        stepNumber: m.moduleNumber,
        status: isModuleCompleted(m.moduleNumber)
          ? "completed" as const
          : m.moduleNumber === currentModuleNumber
            ? "current" as const
            : "locked" as const,
      })),
    [modules, moduleProgress, currentModuleNumber]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t("common.loading", "Loading...")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FreelancerTutorial />

      {/* === MENU MOBILE OVERLAY (Drawer) === */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Fundo escuro (Backdrop) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Conteúdo da Gaveta com cores dinâmicas */}
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[350px] bg-background shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col h-full border-l border-border">

            {/* Cabeçalho da Gaveta */}
            <div
              className="px-4 pb-4 flex justify-end border-b border-border bg-card"
              style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.25rem)" }}
            >
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>

            {/* Corpo da Gaveta */}
            <div className="p-6 overflow-y-auto flex-1 bg-background">
              <SidebarContent
                allCompleted={allCompleted}
                completedCount={completedCount}
                totalModules={totalModules}
                progressPercentage={progressPercentage}
                certificateId={certificateId}
                isGeneratingCertificate={isGeneratingCertificate}
                onCertificateClick={handleCertificateClick}
                t={t}
                language={i18n.language}
              />
            </div>
          </div>
        </div>
      )}

      {/* Container Principal adaptado para Dark Mode (bg-background) */}
      <div className="min-h-screen bg-background font-sans safe-area-inset relative pb-mobile-nav md:pb-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-8 py-4 md:py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 relative z-20 pt-2 md:pt-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-accent rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t("freelancer.title")}</h1>
                <p className="text-sm text-muted-foreground">
                  {completedCount}/{totalModules} {tUi(t, i18n.language, "freelancer.modulesCount")}
                </p>
              </div>
            </div>

            {/* === BOTÃO 3 PONTINHOS (Só mobile) === */}
            <div className="lg:hidden relative">
              <Button
                variant="outline"
                size="icon"
                // Ajustado para usar bg-card e bordas que funcionam no dark mode
                className="bg-card text-orange-500 border-orange-200 dark:border-orange-800 shadow-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 relative overflow-visible active:scale-95 transition-transform"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <MoreVertical className="w-6 h-6" />

                {/* NOTIFICAÇÃO */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-background dark:border-card"></span>
                </span>
              </Button>
            </div>
          </div>

          {/* GRID LAYOUT PRINCIPAL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">

            {/* COLUNA ESQUERDA (Desktop apenas) */}
            <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-8">
              <SidebarContent
                allCompleted={allCompleted}
                completedCount={completedCount}
                totalModules={totalModules}
                progressPercentage={progressPercentage}
                certificateId={certificateId}
                isGeneratingCertificate={isGeneratingCertificate}
                onCertificateClick={handleCertificateClick}
                t={t}
                language={i18n.language}
              />
            </div>

            {/* COLUNA CENTRAL (Conteúdo da Trilha) */}
            <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">

              <div className="rounded-3xl border border-orange-200/70 bg-gradient-to-r from-orange-50 via-amber-50 to-background p-5 shadow-sm dark:border-orange-900/60 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-background">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600 dark:text-orange-300">
                      {tutorialContent.ctaEyebrow}
                    </p>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        {tutorialContent.ctaTitle}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tutorialContent.ctaDescription}
                      </p>
                    </div>
                  </div>

                  <FreelancerAccountTutorialButton language={i18n.language} />
                </div>
              </div>

              {/* Barra Horizontal (Módulos) */}
              <div className="bg-card rounded-2xl p-2 sm:p-4 shadow-sm border border-border relative z-20">
                <FreelancerStepsBar
                  steps={stepsForBar}
                  currentStep={currentModuleNumber}
                  onStepClick={(step) => {
                    const mod = modules.find((m) => m.moduleNumber === step);
                    if (mod) handleModuleClick(mod.moduleNumber, mod.hasContent);
                  }}
                />
              </div>

              {/* Trilha Vertical (Candy Crush) */}
              <div id="freelancer-modules" className="bg-card rounded-3xl p-6 shadow-sm border border-border min-h-[500px] z-10">
                <FreelancerCandyCrushPath
                  modules={modules}
                  moduleProgress={moduleProgress}
                  onModuleClick={handleModuleClick}
                />
              </div>

            </div>

          </div>
        </div>
      </div>

      <MobileNav />
    </>
  );
};

const Freelancer = () => {
  return (
    <ProductGuard productType="freelancer" mode="overlay">
      <FreelancerContent />
    </ProductGuard>
  );
};

export default Freelancer;
