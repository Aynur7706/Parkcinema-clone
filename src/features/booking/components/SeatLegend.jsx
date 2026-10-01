import { t, useLanguage } from '../../../shared/i18n/language.js';

const SeatLegend = ({ ticketOptions = [] }) => {
  useLanguage();
  return (
    <div className="w-full text-white flex flex-col md:flex-row justify-between items-center px-4 py-2 text-sm font-medium">
      <div className="flex space-x-6">
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />
          <span>{t("Mövcuddur")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-black inline-block" />
          <span>{t("Tutulmuş")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
          <span>{t("Seçilmiş")}</span>
        </div>
      </div>
      <div className="flex space-x-4">
        {ticketOptions.map(option => <span key={option.type}>{t(option.label)} <strong>{option.price} AZN</strong>{option.type === 'FAMILY' && <span className="block text-xs text-gray-300">{option.min}–{option.max}{t(" yer")}</span>}</span>)}
      </div>
    </div>
  );
};

export default SeatLegend;

