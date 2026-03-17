import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ProductType = 'base' | 'freelancer' | 'ai_hub';

const AI_HUB_WHITELIST = [
  'ferramentasdigitais1000@gmail.com',
  'felip@gmailcom',
  'acess@nuvei.com'
];

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
      const hasAiHubAccess = AI_HUB_WHITELIST.some(
        email => email.toLowerCase() === userEmail
      );

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

    window.addEventListener('educly:product-access-refresh', handleRefresh);

    return () => {
      window.removeEventListener('educly:product-access-refresh', handleRefresh);
    };
  }, [checkAccess]);

  const hasAccess = (productType: ProductType): boolean => {
    return access[productType];
  };

  return { ...access, hasAccess };
};
