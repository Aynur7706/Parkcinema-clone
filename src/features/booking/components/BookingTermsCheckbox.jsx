import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useId, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import termsText from '../data/bookingTerms.txt?raw';

const paragraphs = termsText.trim().split(/\r?\n\s*\r?\n/);

export default function BookingTermsCheckbox({ checked, onChange }) {
  useLanguage();
  const [open, setOpen] = useState(false);
  const id = useId();
  return <>
    <div className="flex items-center text-start w-full gap-2 py-10 text-white">
      <input id={id} type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} className="w-5 h-5 shrink-0 accent-[#D02A1D] cursor-pointer" />
      <span className="text-[17px]">
        <label htmlFor={id} className="cursor-pointer">{t("Mən ")}</label>
        <button type="button" onClick={() => setOpen(true)} className="underline cursor-pointer" aria-haspopup="dialog">{t("Qaydaları və Şərtləri")}</button>
        <label htmlFor={id} className="cursor-pointer">{t(" oxudum və razıyam")}</label>
      </span>
    </div>
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth={false} aria-labelledby={`${id}-title`}
      slotProps={{ paper: { sx: { width: '90vw', maxWidth: '1728px', margin: { xs: '12px', sm: '32px' }, maxHeight: '85dvh', bgcolor: '#373735', color: '#d9dadb', borderRadius: '14px' } }, backdrop: { sx: { bgcolor: 'rgba(0,0,0,.6)' } } }}>
      <div className="cinema-terms-content">
        <button type="button" onClick={() => setOpen(false)} aria-label={t("Pəncərəni bağla")} className="cinema-terms-close">×</button>
        <h2 id={`${id}-title`} className="text-2xl md:text-4xl mb-10 pr-12">{t("Qaydalar və şərtlər")}</h2>
        {paragraphs.map((paragraph, index) => {
          const text = index === 0 ? paragraph.replace(/^Qaydalar və şərtlər\s*/, '') : paragraph;
          const heading = /^(?:[IІV]+\.|\d+\.\s+[A-ZƏÖÜĞÇŞİ]|Bilet alınması|İtirilmiş)/.test(text);
          return heading ? <h3 key={index} className="text-xl md:text-2xl font-semibold my-6">{text}</h3> : <p key={index} className="mb-5 whitespace-pre-line">{text}</p>;
        })}
        <img src="https://new.parkcinema.az/images/terms-az.png" alt={t("Kinoteatrda qaydalar və qadağalar")} loading="lazy" className="w-full md:w-[70%] h-auto mt-8" />
      </div>
    </Dialog>
  </>;
}
