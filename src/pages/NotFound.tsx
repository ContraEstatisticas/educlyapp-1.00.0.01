import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const CACHE_PATTERNS = ['cache', 'reset-cache', 'resetcache', 'limpar-cache', 'clear-cache'];

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Auto-recover: if user tried to access a cache-reset URL variant, redirect to static page
    const path = location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
    if (CACHE_PATTERNS.some(p => path === p || path.startsWith(p))) {
      window.location.replace('/reset-cache.html?from=404');
      return;
    }

    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('notFound.title')}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t('notFound.message')}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t('notFound.button')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
