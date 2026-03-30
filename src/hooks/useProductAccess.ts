import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { hasWhitelistedAiHubAccess } from '@/lib/aiHubConfig';
import { PRODUCT_ACCESS_REFRESH_EVENT } from '@/lib/productAccessEvents';

export type ProductType = 'base' | 'freelancer' | 'ai_hub';

interface ProductAccessState {
  base: boolean;
  freelancer: boolean;
  ai_hub: boolean;
  isLoading: boolean;
}

export const useProductAccess = () => {
  const [access, setAccess] = useState<ProductAccessState>({
    base: false,
    freelancer: false,
    ai_hub: false,
    isLoading: true
  });

  const checkAccess = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setAccess({
          base: false,
          freelancer: false,
          ai_hub: false,
          isLoading: false
        });
        return;
      }

      const userEmail = user.email?.toLowerCase() || '';
      const hasAiHubAccess = hasWhitelistedAiHubAccess(userEmail);

      const { data, error } = await supabase.rpc('get_user_products');

      if (error) {
        console.error('Error checking product access:', error);
        setAccess(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const products = data || [];
      const hasAiHubFromProducts = products.some((p: { product_type: string }) => p.product_type === 'ai_hub');

      setAccess({
        base: products.some((p: { product_type: string }) => p.product_type === 'base'),
        freelancer: products.some((p: { product_type: string }) => p.product_type === 'freelancer'),
        ai_hub: hasAiHubAccess || hasAiHubFromProducts,
        isLoading: false
      });
    } catch (error) {
      console.error('Error in useProductAccess:', error);
      setAccess(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    void checkAccess();

    const handleRefresh = () => {
      setAccess(prev => ({ ...prev, isLoading: true }));
      void checkAccess();
    };

    window.addEventListener(PRODUCT_ACCESS_REFRESH_EVENT, handleRefresh);

    return () => {
      window.removeEventListener(PRODUCT_ACCESS_REFRESH_EVENT, handleRefresh);
    };
  }, [checkAccess]);

  const hasAccess = (productType: ProductType): boolean => {
    return access[productType];
  };

  return { ...access, hasAccess };
};
