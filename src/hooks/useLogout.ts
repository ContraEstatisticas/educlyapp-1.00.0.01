import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { clearAuthStorage } from "@/lib/authStorage";

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear remaining auth-related browser storage
      localStorage.removeItem("quizCompleted");
      localStorage.removeItem("quizAnswers");
      clearAuthStorage();

      toast({
        title: t('common.logout', 'Logout realizado'),
        description: t('auth.logoutSuccess', 'Você foi desconectado com sucesso'),
      });

      // Navigate to landing page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      // Force navigate even if there's an error
      navigate('/', { replace: true });
    }
  };

  return { logout };
};
