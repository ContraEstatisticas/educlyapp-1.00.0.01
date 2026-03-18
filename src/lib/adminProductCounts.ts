import { supabase } from "@/integrations/supabase/client";

const ADMIN_PRODUCT_COUNTS_PAGE_SIZE = 1000;

export const getAdminProductCounts = async () => {
  const baseUserIds = new Set<string>();
  const freelancerUserIds = new Set<string>();
  const aiHubUserIds = new Set<string>();

  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("user_product_access")
      .select("id, user_id, product_type")
      .order("id", { ascending: true })
      .range(from, from + ADMIN_PRODUCT_COUNTS_PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    data?.forEach((row) => {
      if (!row.user_id) return;

      if (row.product_type === "base") {
        baseUserIds.add(row.user_id);
      } else if (row.product_type === "freelancer") {
        freelancerUserIds.add(row.user_id);
      } else if (row.product_type === "ai_hub") {
        aiHubUserIds.add(row.user_id);
      }
    });

    if (!data || data.length < ADMIN_PRODUCT_COUNTS_PAGE_SIZE) {
      break;
    }

    from += ADMIN_PRODUCT_COUNTS_PAGE_SIZE;
  }

  return {
    baseUsers: baseUserIds.size,
    freelancerUsers: freelancerUserIds.size,
    aiHubUsers: aiHubUserIds.size,
  };
};
