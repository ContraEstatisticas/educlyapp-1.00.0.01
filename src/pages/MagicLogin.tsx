import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
      .then(async (data) => {
        if (data.access_token && data.refresh_token) {
          // Set session directly — no redirect chain, no OTP to be "burned"
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });

          if (sessionError) {
            console.error("[MagicLogin] setSession error:", sessionError);
            setError("session_failed");
            setLoading(false);
            return;
          }

          // Success — go to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          // Fallback: legacy action_link response (should not happen with new code)
          if (data.action_link) {
            window.location.href = data.action_link;
          } else {
            setError("no_link");
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.error("[MagicLogin] Error:", err);
        setError(err.message || "unknown");
        setLoading(false);
      });
  }, [searchParams, navigate]);

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
      <h1 className="text-xl font-bold">Link inválido</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Este link de acesso não é válido. Por favor, faça login com seu email e senha.
      </p>
      <Button onClick={() => navigate("/auth")} size="lg">
        Ir para o Login
      </Button>
    </div>
  );
};

export default MagicLogin;
