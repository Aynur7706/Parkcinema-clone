import { t, useLanguage } from '../../../shared/i18n/language.js';
import { setDateFilter, setLanguageFilter, setTheatreFilter } from '../state/catalogFiltersSlice.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import CatalogFilters from './CatalogFilters.jsx';
import MoviePosterCard from './MoviePosterCard.jsx';
import { fetchMovies, fetchSchedule } from '../../../shared/api/cinemaApi.js';
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import RequestError from '../../../shared/ui/RequestError.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { filterMovies } from '../utils/catalogSelection.js';

const fetchCatalog = () => Promise.all([fetchMovies(), fetchSchedule()]);

export default function MovieGrid({ upcoming = false }) {
  useLanguage();
  const dispatch = useDispatch();
  const clearFilters = () => { dispatch(setDateFilter('')); dispatch(setLanguageFilter('')); dispatch(setTheatreFilter('')); };
  const filters = useSelector(store => store.catalogFilters);
  const { data, loading, error, retry } = useAsyncData(fetchCatalog);
  const movies = data ? filterMovies(data[0], data[1], filters, upcoming) : [];
  return (
    <div>
      <div className="flex items-center flex-col md:flex-row p-5"><CatalogFilters list="all" /></div>
      {loading ? <LoadingSpinner /> : error ? <RequestError message={error} onRetry={retry} /> : movies.length ? (
        <div className={`cinema-movie-grid${upcoming ? " cinema-upcoming-grid" : ""}`}>
          {movies.map(movie => <MoviePosterCard key={movie.id} item={movie} upcoming={upcoming} />)}
        </div>
      ) : <ContentState title={upcoming ? t("Tezliklə nümayiş olunacaq film tapılmadı") : t("Film tapılmadı")} message={filters.selectedDate || filters.selectedLanguage || filters.selectedTheatre ? t("Filtrləri təmizləyin və ya başqa tarix seçin.") : t("Hazırda bu bölmədə film yoxdur.")} onAction={filters.selectedDate || filters.selectedLanguage || filters.selectedTheatre ? clearFilters : undefined} actionLabel={t("Filtrləri təmizlə")} />}
    </div>
  );
}



