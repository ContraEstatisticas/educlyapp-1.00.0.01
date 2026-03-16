import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const CACHE_PATTERNS = [
  'cache', 'cache.html',
  'reset-cache', 'reset-cache.html',
  'resetcache', 'resetcache.html',
  'limpar-cache', 'limpar-cache.html',
  'clear-cache', 'clear-cache.html',
];

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
    
    // If user tried any cache-reset URL variant, hard-redirect to static page
    if (CACHE_PATTERNS.some(p => path === p || path.startsWith(p + '/'))) {
      // Use cache.html as canonical — it's a standalone static page
      window.location.replace('/cache.html?from=404');
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
