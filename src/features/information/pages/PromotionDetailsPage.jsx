import { useParams } from 'react-router';
import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import { promotions } from '../data/promotions.js';

export default function PromotionDetailsPage() {
  useLanguage();
  const { id } = useParams();
  const promotion = promotions.find(item => item.id === id);

  if (!promotion) {
    return <ContentState page code="404" title={t('Səhifə tapılmadı')} to="/actions" linkLabel={t('Aksiyalar')} />;
  }

  return (
    <main className="mx-auto min-h-[80vh] w-[93%] pt-32 pb-16 text-[#d9dadb] md:pt-40">
      <h1 className="mb-5 text-[30px] font-normal md:text-[36px]">{t(promotion.title)}</h1>
      <p className="text-lg leading-relaxed md:text-xl">{t(promotion.description)}</p>
    </main>
  );
}
