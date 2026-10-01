import { t, useLanguage } from '../i18n/language.js';
import { Link } from 'react-router';

export default function ContentState({ title, message, to, linkLabel = 'Filmlərə qayıt', onAction, actionLabel = 'Təmizlə', page = false, code }) {
 useLanguage();
  return <section role="status" className={`${page ? 'mt-32 min-h-[45vh]' : ''} px-4 py-12 text-center text-[#D9DADB]`}>
    {code && <p className="text-6xl font-bold text-[#D52B1E] mb-4">{code}</p>}
    <h2 className="text-2xl font-semibold text-white mb-3">{t(title)}</h2>
    {message && <p className="mx-auto max-w-lg leading-relaxed">{t(message)}</p>}
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {onAction && <button type="button" onClick={onAction} className="min-h-11 px-6 py-2 rounded-full bg-[#D52B1E] text-white cursor-pointer">{t(actionLabel)}</button>}
      {to && <Link to={to} className="min-h-11 px-6 py-2 rounded-full border border-[#aaa] text-white">{t(linkLabel)}</Link>}
    </div>
  </section>;
}
