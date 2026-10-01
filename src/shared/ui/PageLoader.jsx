import { t, useLanguage } from '../i18n/language.js';
import { useEffect } from 'react';

function PageLoader() {
  useLanguage();
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return (
    <div role="status" aria-label={t("Məlumatlar yüklənir")} className='z-[9999] fixed inset-0 bg-black flex items-center justify-center text-white'>
       <img src={`${import.meta.env.BASE_URL}loading.gif`} alt="" className="w-[380px] max-w-full h-auto" />
       <span className="sr-only">{t("Məlumatlar yüklənir…")}</span>
    </div> 
  )
}

export default PageLoader
