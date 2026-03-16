import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Send, Loader2 } from "lucide-react";

export const ResendAccessLink = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setSending(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/resend-magic-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao reenviar");
      }

      toast({
        title: "✅ Link reenviado!",
        description: `Magic link enviado para ${trimmed}`,
      });
      setEmail("");
    } catch (e: any) {
      toast({
        title: "Erro ao reenviar",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
          <Send className="h-5 w-5 text-white" />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-foreground">Reenviar Acesso (Magic Link)</h3>
          <p className="text-xs text-muted-foreground">
            Reenvie o link de acesso para o e-mail do usuário
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Email do usuário</Label>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResend()}
            className="bg-muted text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleResend}
            disabled={sending || !email.trim()}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
