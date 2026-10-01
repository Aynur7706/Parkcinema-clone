import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import CatalogDropdown from './CatalogDropdown.jsx';
import ScreeningDateStrip from './ScreeningDateStrip.jsx';
import { useState } from 'react';
import ScreeningList from './ScreeningList.jsx';
import ScreeningListSkeleton from './ScreeningListSkeleton.jsx';
import RequestError from '../../../shared/ui/RequestError.jsx';
import { fetchSchedule } from '../../../shared/api/cinemaApi.js';
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js';
import { filterScreenings } from '../utils/catalogSelection.js';
import { formatCalendarDate } from '../../../shared/utils/formatCalendarDate.js';

export default function ScreeningSchedule({ movieId, theatreTitle }) {
  useLanguage();
  return <ScopedSchedule key={movieId || theatreTitle || 'all'} movieId={movieId} theatreTitle={theatreTitle} />;
}

function ScopedSchedule({ movieId, theatreTitle }) {
  useLanguage();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { data, loading, error, retry } = useAsyncData(fetchSchedule);
  const screenings = filterScreenings(data || [], {}, { movieId, theatreTitle });
  const dates = [...new Set(screenings.map(item => item.calendarDate?.split('T')[0]).filter(Boolean))].sort();
  const filters = { selectedDate: selectedDate || dates[0] || formatCalendarDate(new Date()), selectedTheatre, selectedLanguage };
  const theatres = [...new Set(['Park Bulvar', 'Metro Park', 'Flame Towers', 'Sevinç Mall', 'Şahdağ', 'CaspiMayr Hall', ...screenings.map(item => item.theatreTitle)])];
  const languages = [...new Set(['AZ', 'RU', 'EN', 'TR', ...screenings.map(item => item.language)])];
  return (
    <section className="pb-10 pt-7" aria-label="Seanslar">
      <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-3">
        <div className="w-full shrink-0 xl:w-[416px]"><ScreeningDateStrip availableDates={dates} selectedDate={filters.selectedDate} onDateChange={setSelectedDate} /></div>
        <div className="flex w-full min-w-0 flex-col items-center gap-6 md:flex-row md:gap-8">
          {!theatreTitle && <CatalogDropdown fontSize={16} label={t("Kinoteatr")} value={selectedTheatre} onChange={setSelectedTheatre} options={theatres.map(value => ({ value, label: ({ 'Şahdağ': 'Shahdag', 'Sevinç Mall': 'Sevinc Mall' })[value] || value }))} />}
          <CatalogDropdown fontSize={16} label={t("Dil")} value={selectedLanguage} onChange={setSelectedLanguage} options={languages} />
          {(selectedTheatre || selectedLanguage) && <button className="text-[#BF4244]" onClick={() => { setSelectedTheatre(''); setSelectedLanguage(''); }}>{t("Təmizlə")}</button>}
        </div>
      </div>
      <div className="mt-10 min-h-[180px] xl:mt-16">
        {loading ? <ScreeningListSkeleton /> : error ? <RequestError message={error} onRetry={retry} /> : !screenings.length ? <ContentState title="Seans yoxdur" message={t("Hazırda bu seçim üçün seans məlumatı mövcud deyil.")} to="/" /> : <ScreeningList screenings={screenings} theatreTitle={theatreTitle} filters={filters} movieId={movieId} />}
      </div>
    </section>
  );
}



