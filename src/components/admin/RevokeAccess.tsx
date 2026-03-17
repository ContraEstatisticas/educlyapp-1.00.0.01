import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, ShieldOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductInfo {
  product_type: string;
  product_id: string;
  is_active: boolean;
  granted_at: string;
}

export const RevokeAccess = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleSearch = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setProducts([]);
    setSelected([]);
    setUserInfo(null);

    try {
      const { data, error } = await supabase.rpc("admin_lookup_email", {
        p_email: email.trim(),
      });
      if (error) throw error;
      const result = data as any;

      if (!result?.has_account) {
        toast({ title: "Usuário não encontrado", variant: "destructive" });
        return;
      }

      setUserInfo(result);
      const activeProducts = (result.products || []).filter(
        (p: ProductInfo) => p.is_active
      );
      setProducts(activeProducts);

      if (activeProducts.length === 0) {
        toast({ title: "Nenhum produto ativo encontrado" });
      }
    } catch {
      toast({ title: "Erro ao buscar", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (selected.length === 0) {
      toast({ title: "Selecione produtos para revogar", variant: "destructive" });
      return;
    }
    setRevoking(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        toast({ title: "Sessão expirada", variant: "destructive" });
        return;
      }

      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-revoke-access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: email.trim(), products: selected }),
        }
      );

      const result = await resp.json();

      if (result.error) {
        toast({ title: "Erro", description: result.error, variant: "destructive" });
      } else {
        toast({
          title: "Acesso revogado",
          description: `${result.revoked_count || 0} produto(s) revogado(s)`,
        });
        // Refresh
        handleSearch();
      }
    } catch {
      toast({ title: "Erro ao revogar", variant: "destructive" });
    } finally {
      setRevoking(false);
    }
  };

  const toggleProduct = (productType: string) => {
    setSelected((prev) =>
      prev.includes(productType)
        ? prev.filter((p) => p !== productType)
        : [...prev, productType]
    );
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-1">🚫 Revogar Acesso</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Busque por email e revogue produtos específicos
      </p>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Email do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading} variant="outline">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {userInfo && (
        <div className="text-sm mb-4 p-3 bg-muted/50 rounded-lg space-y-1">
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Premium:</strong> {userInfo.is_premium ? "Sim ✅" : "Não ❌"}</p>
          <p><strong>Plano:</strong> {userInfo.plan_type}</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Produtos ativos:</p>
          {products.map((p) => (
            <label
              key={p.product_type + p.product_id}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30"
            >
              <Checkbox
                checked={selected.includes(p.product_type)}
                onCheckedChange={() => toggleProduct(p.product_type)}
              />
              <div>
                <span className="font-medium capitalize">{p.product_type}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({p.product_id})
                </span>
              </div>
            </label>
          ))}

          <Button
            onClick={handleRevoke}
            disabled={revoking || selected.length === 0}
            variant="destructive"
            className="w-full mt-2"
          >
            {revoking ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ShieldOff className="h-4 w-4 mr-2" />
            )}
            Revogar {selected.length} produto(s)
          </Button>
        </div>
      )}
    </Card>
  );
};
