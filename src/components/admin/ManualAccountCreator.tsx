import { useState } from "react";
import { UserPlus, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ManualAccountCreator = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("es");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) {
        toast({ title: "Sessão expirada", variant: "destructive" });
        return;
      }

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const base = import.meta.env.VITE_SUPABASE_URL;

      // Step 1: Create account + process billing
      const createResp = await fetch(`${base}/functions/v1/auto-create-account`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email: email.trim(), buyer_name: name.trim() || "Aluno", language }),
      });
      const createData = await createResp.json();

      if (createData.error) {
        setResult({ success: false, message: createData.error });
        toast({ title: "Erro ao criar conta", description: createData.error, variant: "destructive" });
        return;
      }

      // Step 2: Send email (with password for new accounts, just link for existing)
      let linkData: any;
      if (createData.account_created && createData.generated_password) {
        const welcomeResp = await fetch(`${base}/functions/v1/send-welcome-email`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            email: email.trim(),
            userName: name.trim() || "Aluno",
            language,
            mode: "magic_link",
            access_token: createData.access_token,
            generated_password: createData.generated_password,
          }),
        });
        linkData = await welcomeResp.json();
      } else {
        const linkResp = await fetch(`${base}/functions/v1/resend-magic-link`, {
          method: "POST",
          headers,
          body: JSON.stringify({ email: email.trim() }),
        });
        linkData = await linkResp.json();
      }

      setResult({
        success: true,
        created: createData.created,
        alreadyExisted: createData.already_existed,
        linkSent: !linkData.error,
        linkError: linkData.error,
        token: createData.token,
      });

      toast({
        title: "✅ Concluído",
        description: `${createData.created ? "Conta criada" : "Conta já existia"} • ${linkData.error ? "Erro no link" : "Link enviado"}`,
      });
    } catch (err: any) {
      setResult({ success: false, message: err.message });
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
          <UserPlus className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Criar Conta Manual</h3>
          <p className="text-xs text-muted-foreground">Cria conta + processa billing + envia link</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs">Email do comprador *</Label>
          <Input
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Nome (opcional)</Label>
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Idioma</Label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
        <Button onClick={handleCreate} disabled={loading || !email.trim()} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
          {loading ? "Processando..." : "Criar e Enviar Acesso"}
        </Button>
      </div>

      {result && (
        <div className={`mt-4 p-3 rounded-lg border text-sm ${result.success ? "bg-emerald-500/10 border-emerald-500/20" : "bg-destructive/10 border-destructive/20"}`}>
          {result.success ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{result.created ? "Conta criada" : "Conta já existia"}</span>
              </div>
              <p className="text-muted-foreground">
                Link: {result.linkSent ? "✅ Enviado" : `❌ ${result.linkError}`}
              </p>
              {result.token && (
                <p className="text-xs text-muted-foreground break-all">Token: {result.token}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
