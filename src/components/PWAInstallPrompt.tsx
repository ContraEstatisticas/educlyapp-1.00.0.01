import { useEffect, useMemo, useState } from 'react';
import { Download, X, Share, Plus, MoreVertical, Copy, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const HIDDEN_ROUTES = ['/obrigado', '/auth', '/update-password', '/magic-login'];

export const PWAInstallPrompt = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isInstallable, isInstalled, isIOS, isAndroid, isMobileOrTablet, promptInstall } = usePWAInstall();
  const location = useLocation();

  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const installLink = useMemo(() => `${window.location.origin}/`, []);
  const dismissKey = useMemo(
    () => (userId ? `pwa-install-dismissed-${userId}` : 'pwa-install-dismissed'),
    [userId]
  );

  useEffect(() => {
    let mounted = true;

    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted) {
        setUserId(user?.id ?? null);
      }
    };

    syncUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUserId(session?.user?.id ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setDismissed(false);
    setShowPrompt(false);

    if (!userId) {
      return;
    }

    if (HIDDEN_ROUTES.includes(location.pathname)) {
      return;
    }

    const wasDismissed = localStorage.getItem(dismissKey);
    if (wasDismissed) {
      const dismissedDate = new Date(wasDismissed);
      const now = new Date();
      const daysSinceDismiss = now.getTime() - dismissedDate.getTime();

      if (daysSinceDismiss > 7 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(dismissKey);
      } else {
        setDismissed(true);
      }
    }

    const timer = setTimeout(() => {
      if (isMobileOrTablet && (isInstallable || isIOS || isAndroid) && !isInstalled && !dismissed) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isIOS, isAndroid, isMobileOrTablet, dismissed, location.pathname, dismissKey, userId]);

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      setShowPrompt(false);
      if (userId) {
        localStorage.setItem(dismissKey, new Date().toISOString());
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    if (userId) {
      localStorage.setItem(dismissKey, new Date().toISOString());
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(installLink);
      toast({
        title: t('pwa.linkCopiedTitle', { defaultValue: 'Link copied' }),
        description: t('pwa.linkCopiedDesc', { defaultValue: 'Installation link copied to clipboard.' }),
      });
    } catch {
      toast({
        title: t('common.error', { defaultValue: 'Error' }),
        description: t('pwa.linkCopiedError', { defaultValue: 'Could not copy the install link.' }),
        variant: 'destructive',
      });
    }
  };

  if (!showPrompt || isInstalled || !isMobileOrTablet || !userId) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[10000] animate-fade-in md:left-auto md:right-4 md:w-96">
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t('common.close', { defaultValue: 'Close' })}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
            <Download className="w-7 h-7 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-foreground text-lg">
              {t('pwa.title', { defaultValue: 'Install Educly' })}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('pwa.description', { defaultValue: 'Use the tutorial below and install the app on your home screen.' })}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <LinkIcon className="w-4 h-4 text-primary" />
            {t('pwa.installLinkLabel', { defaultValue: 'Installation link' })}
          </div>
          <a
            href={installLink}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-xs text-primary underline underline-offset-2"
          >
            {installLink}
          </a>
          <div className="mt-2 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-8 px-3 text-xs"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              {t('pwa.copyLink', { defaultValue: 'Copy link' })}
            </Button>
            <a
              href={installLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('pwa.openLink', { defaultValue: 'Open link' })}
            </a>
          </div>
        </div>

        {isIOS ? (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Share className="w-4 h-4 text-primary" />
              </div>
              <span>{t('pwa.ios.step1', { defaultValue: '1. Tap the share button in the browser' })}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <span>{t('pwa.ios.step2', { defaultValue: '2. Tap "Add to Home Screen"' })}</span>
            </div>
          </div>
        ) : isAndroid ? (
          <div className="mt-4 space-y-3">
            {isInstallable ? (
              <Button
                onClick={handleInstall}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('pwa.install', { defaultValue: 'Install now' })}
              </Button>
            ) : (
              <>
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-primary" />
                  </div>
                  <span>{t('pwa.android.step1', { defaultValue: '1. Open the browser menu (three dots)' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Download className="w-4 h-4 text-primary" />
                  </div>
                  <span>{t('pwa.android.step2', { defaultValue: '2. Tap "Install app"' })}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-4">
            {isInstallable ? (
              <Button
                onClick={handleInstall}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('pwa.install', { defaultValue: 'Install now' })}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                {t('pwa.desktop', { defaultValue: 'Use your browser menu to install the app.' })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
