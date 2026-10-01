import { t, useLanguage } from '../i18n/language.js';
import { Link } from 'react-router';
export default function RequestError({ message, onRetry }) {
  useLanguage();
  return (
    <div role="alert" className="text-center text-[#D9DADB] py-10 px-3">
      <h2 className="text-xl font-semibold mb-3">{t("Məlumat yüklənmədi")}</h2><p>{message}</p>
      <Link to="/" className="inline-block underline mr-4 mt-4">{t("Ana səhifə")}</Link>
      {onRetry && <button onClick={onRetry} className="mt-4 rounded-full bg-[#D52B1E] px-5 py-2 text-white cursor-pointer">{t("Yenidən cəhd et")}</button>}
    </div>
  );
}

