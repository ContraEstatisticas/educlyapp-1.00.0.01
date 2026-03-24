import { supabase } from "@/integrations/supabase/client";

export const getAdminProductCounts = async () => {
  const { data, error } = await supabase.rpc("get_admin_product_counts");

  if (error) {
    throw error;
  }

  const row = Array.isArray(data) ? data[0] : null;

  return {
    baseUsers: Number(row?.base_users ?? 0),
    freelancerUsers: Number(row?.freelancer_users ?? 0),
    aiHubUsers: Number(row?.ai_hub_users ?? 0),
  };
};
