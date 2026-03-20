import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSelector } from "@/components/LanguageSelector";
import { ModeToggle } from "@/components/ModeToggle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [showExpiredLink, setShowExpiredLink] = useState(false);
  const [expiredEmail, setExpiredEmail] = useState("");
  const [isResendingLink, setIsResendingLink] = useState(false);

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetSuccessDialogOpen, setIsResetSuccessDialogOpen] = useState(false);
  const [lastResetEmail, setLastResetEmail] = useState("");

  const [isLoginErrorDialogOpen, setIsLoginErrorDialogOpen] = useState(false);
  const [loginErrorType, setLoginErrorType] = useState<"invalid" | "noService" | "unconfirmed">("invalid");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/dashboard", { replace: true });
      }
    };

    void checkUser();

    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }

    if (searchParams.get("showReset") === "true" && emailParam) {
      setResetEmail(emailParam);
      setIsResetDialogOpen(true);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const hashParams = new URLSearchParams(hash.replace("#", ""));
    const error = hashParams.get("error");
    const errorCode = hashParams.get("error_code");
    const errorDesc = hashParams.get("error_description");

    if (
      error === "access_denied" ||
      errorCode === "otp_expired" ||
      (errorDesc && errorDesc.toLowerCase().includes("expired"))
    ) {
      setShowExpiredLink(true);

      const emailParam = searchParams.get("email") || "";
      if (emailParam) {
        setExpiredEmail(emailParam);
      }

      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [searchParams]);

  const handleResendMagicLink = async () => {
    if (!expiredEmail) {
      toast({
        title: t("common.error"),
        description: t("auth.emailRequired", "Por favor, digite seu email."),
        variant: "destructive",
      });
      return;
    }

    setIsResendingLink(true);

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/resend-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: expiredEmail.toLowerCase().trim() }),
      });
      const result = await response.json();

      if (response.status === 429) {
        toast({
          title: t("auth.rateLimited", "Aguarde um momento"),
          description: t(
            "auth.rateLimitedDesc",
            "Ja enviamos um link recentemente. Tente novamente em 1 minuto.",
          ),
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to resend magic link");
      }

      toast({
        title: t("auth.emailSent", "Email enviado!"),
        description: t("auth.magicLinkSent", "Verifique sua caixa de entrada para acessar sua conta."),
      });
      setShowExpiredLink(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : t("common.error");
      toast({
        title: t("common.error"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsResendingLink(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!resetEmail) {
      toast({
        title: t("common.error"),
        description: t("auth.emailRequired", "Por favor, digite seu email."),
        variant: "destructive",
      });
      return;
    }

    setIsResetLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-password-reset", {
        body: { email: resetEmail },
      });

      if (error) {
        throw error;
      }

      setLastResetEmail(resetEmail.trim().toLowerCase());
      setIsResetDialogOpen(false);
      setResetEmail("");
      setIsResetSuccessDialogOpen(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : t("common.error");
      toast({
        title: t("auth.error"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase().replace(/\.+$/, "");
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!rememberMe) {
        localStorage.setItem("clearSessionOnLogout", "true");
      } else {
        localStorage.removeItem("clearSessionOnLogout");
      }

      if (error) {
        const message = String(error.message || "").toLowerCase();
        const isUnconfirmed = message.includes("email not confirmed") || message.includes("not confirmed");
        setLoginErrorType(isUnconfirmed ? "unconfirmed" : "invalid");
        setIsLoginErrorDialogOpen(true);
        return;
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase.rpc("process_pending_billing_events", {
            p_user_id: user.id,
            p_email: normalizedEmail,
          });
        }
      } catch (reconciliationError) {
        console.error("Billing reconciliation on login error:", reconciliationError);
      }

      toast({
        title: t("auth.loginSuccess"),
        description: t("auth.description") + normalizedEmail,
      });
      navigate("/dashboard", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const supportEmail = "contact@educly.app";
  const loginErrorTitle =
    loginErrorType === "noService"
      ? t("auth.noActiveServiceTitle", "Sem servico ativo")
      : loginErrorType === "unconfirmed"
        ? t("auth.emailNotConfirmedTitle", "Conta criada, mas ainda nao ativada")
        : t("auth.invalidLoginTitle");

  const loginErrorDescription =
    loginErrorType === "noService"
      ? t(
          "auth.noActiveServiceDescription",
          "Nao ha servico ativo para este email. Verifique se a compra foi feita com o mesmo email cadastrado.",
        )
      : loginErrorType === "unconfirmed"
        ? t(
            "auth.emailNotConfirmedDescription",
            "Detectamos sua conta, mas o email ainda nao foi confirmado. Use o botao de redefinir senha para ativar e acessar.",
          )
        : t(
            "auth.accountNotFoundDescription",
            "Email ou senha incorretos. Verifique os dados ou redefina sua senha.",
          );

  const loginErrorLines =
    loginErrorType === "noService"
      ? loginErrorDescription
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : loginErrorType === "unconfirmed"
        ? [
            t("auth.emailNotConfirmedStep1", "A conta foi encontrada para este email."),
            t(
              "auth.emailNotConfirmedStep2",
              "Toque em 'Esqueceu a senha?' para ativar e definir uma nova senha.",
            ),
            t("auth.emailNotConfirmedStep3", `Se continuar com problema, fale com ${supportEmail}`),
          ]
        : [
            t("auth.accountNotFoundStep1"),
            t("auth.accountNotFoundStep2"),
            t("auth.accountNotFoundStep3"),
          ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background safe-area-inset">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 pt-safe flex items-center gap-2">
        <ModeToggle />
        <LanguageSelector />
      </div>

      {showExpiredLink && (
        <Card className="w-full max-w-md p-6 space-y-4 animate-fade-in-up mb-4">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {t("auth.linkExpired", "Seu link expirou")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t(
                "auth.linkExpiredDesc",
                "O link de acesso que voce clicou ja expirou. Digite seu email para receber um novo.",
              )}
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder={t("auth.emailPlaceholder", "seu@email.com")}
              value={expiredEmail}
              onChange={(event) => setExpiredEmail(event.target.value)}
            />
            <Button onClick={handleResendMagicLink} disabled={isResendingLink} className="w-full">
              {isResendingLink ? (
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              {t("auth.resendLink", "Enviar novo link")}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setShowExpiredLink(false)}>
              {t("auth.loginInstead", "Entrar com senha")}
            </Button>
          </div>
        </Card>
      )}

      <div className="w-full max-w-md space-y-4 sm:space-y-6 animate-fade-in-up">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("auth.title")}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {t("landing.title")} <span className="text-primary">{t("landing.subtitle")}</span>
          </h1>
          <p className="text-muted-foreground">{t("auth.description")}</p>
        </div>

        <Card className="p-6 shadow-card border border-border">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {t("auth.email")}
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  {t("auth.password")}
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 h-auto text-sm font-semibold text-primary hover:text-primary/80"
                  onClick={() => {
                    setResetEmail(email);
                    setIsResetDialogOpen(true);
                  }}
                  type="button"
                >
                  {t("auth.forgotPassword", "Esqueceu a senha?")}
                </Button>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder={t("auth.passwordPlaceholder")}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowLoginPassword((current) => !current)}
                >
                  {showLoginPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label
                htmlFor="remember-me"
                className="text-sm font-normal text-muted-foreground cursor-pointer"
              >
                {t("auth.rememberMe", "Mantenha conectado")}
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("auth.loginButton")}
            </Button>
          </form>
        </Card>
      </div>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("auth.resetPasswordTitle", "Recuperar Senha")}</DialogTitle>
            <DialogDescription>
              {t(
                "auth.resetPasswordDesc",
                "Digite seu email para receber um link de redefinicao de senha.",
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">{t("auth.email")}</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                value={resetEmail}
                onChange={(event) => setResetEmail(event.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                {t("common.cancel", "Cancelar")}
              </Button>
              <Button type="submit" disabled={isResetLoading}>
                {isResetLoading ? t("common.loading") : t("auth.sendResetLink", "Enviar Link")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginErrorDialogOpen} onOpenChange={setIsLoginErrorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div style={{ height: "15px", width: "100%" }} />
            <DialogTitle className="text-base font-semibold leading-snug">{loginErrorTitle}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              <ol className="mt-2 space-y-4">
                {loginErrorLines.map((line, index) => {
                  const isLast = index === loginErrorLines.length - 1;
                  const isBreak = index === loginErrorLines.length - 2;

                  return (
                    <li key={index} className="relative pl-8">
                      <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      {!isLast && (
                        <span
                          className={`absolute left-3 top-7 h-full w-px ${
                            isBreak
                              ? "border-l-2 border-dashed border-muted-foreground/40"
                              : "border-l-2 border-solid border-muted-foreground/25"
                          }`}
                        />
                      )}
                      {isBreak && (
                        <span className="absolute left-2.5 top-[2.25rem] h-2 w-2 rounded-full border border-muted-foreground/40 bg-background" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {line.includes(supportEmail) ? (
                          <>
                            {line.split(supportEmail)[0]}
                            <a
                              href={`mailto:${supportEmail}`}
                              className="text-primary underline underline-offset-4"
                            >
                              {supportEmail}
                            </a>
                            {line.split(supportEmail)[1] ?? ""}
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/5 font-semibold"
              onClick={() => {
                setResetEmail(email.trim());
                setIsLoginErrorDialogOpen(false);
                setIsResetDialogOpen(true);
              }}
            >
              {t("auth.forgotPassword", "Esqueceu a senha?")}
            </Button>
            <Button type="button" onClick={() => setIsLoginErrorDialogOpen(false)} className="w-full">
              {t("common.ok", "OK")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isResetSuccessDialogOpen} onOpenChange={setIsResetSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("auth.emailSent", "Email enviado!")}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed space-y-3">
              <p>
                {t("auth.checkEmailReset", "Verifique sua caixa de entrada para redefinir a senha.")}
              </p>
              <p>
                {t(
                  "auth.resetPasswordDeliveryWarning",
                  'Confira a caixa principal e o "Spam" e valide se este e-mail e o mesmo usado na compra.',
                )}
              </p>
              {lastResetEmail ? (
                <p className="text-foreground/80">
                  {t("auth.email", "Email")}: <strong>{lastResetEmail}</strong>
                </p>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => setIsResetSuccessDialogOpen(false)} className="w-full sm:w-auto">
              {t("common.ok", "OK")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
