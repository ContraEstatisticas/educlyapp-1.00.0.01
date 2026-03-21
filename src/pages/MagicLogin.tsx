import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MagicLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("invalid_token");
      setLoading(false);
      return;
    }

    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const url = `https://${projectId}.supabase.co/functions/v1/magic-login`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "request_failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data.action_link) {
          // Redirect to Supabase's fresh magic link
          window.location.href = data.action_link;
        } else {
          setError("no_link");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("[MagicLogin] Error:", err);
        setError(err.message || "unknown");
        setLoading(false);
      });
  }, [searchParams]);

  const [isResending, setIsResending] = useState(false);
  const [resendEmail, setResendEmail] = useState("");

  const handleResend = async () => {
    if (!resendEmail) return;
    setIsResending(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const resp = await fetch(`https://${projectId}.supabase.co/functions/v1/resend-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail.trim().toLowerCase() }),
      });
      if (!resp.ok) throw new Error("failed");
      alert("Novo link enviado! Verifique seu e-mail.");
      setError(null);
    } catch (err) {
      alert("Erro ao enviar novo link. Tente novamente mais tarde.");
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">
          Preparando seu acesso...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6 px-4">
      <AlertCircle className="w-12 h-12 text-destructive" />
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold">
          {error === "token_expired" ? "Link expirado" : "Link inválido"}
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          {error === "token_expired" 
            ? "Este link de acesso expirou (limite de 72h). Digite seu e-mail para receber um novo."
            : "Este link de acesso não é válido. Se você acabou de comprar, aguarde 30 segundos e verifique seu e-mail."}
        </p>
      </div>

      {error === "token_expired" && (
        <div className="w-full max-w-xs space-y-3">
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full px-4 py-2 rounded-md border border-input bg-background"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
          />
          <Button onClick={handleResend} disabled={isResending || !resendEmail} className="w-full">
            {isResending ? "Enviando..." : "Receber novo link"}
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Button onClick={() => navigate("/auth")} variant="outline" className="w-full">
          Ir para o Login
        </Button>
      </div>
    </div>
  );
};

export default MagicLogin;
