import { formatCalendarDate } from '../../../shared/utils/formatCalendarDate.js';

export function filterScreenings(screenings, filters = {}, scope = {}) {
  return screenings.filter(screening =>
    (!scope.movieId || String(screening.movie?.id) === String(scope.movieId)) &&
    (!(scope.theatreTitle || filters.selectedTheatre) || screening.theatreTitle === (scope.theatreTitle || filters.selectedTheatre)) &&
    (!filters.selectedLanguage || screening.language === filters.selectedLanguage) &&
    (!filters.selectedDate || screening.calendarDate?.split('T')[0] === filters.selectedDate)
  );
}

export function filterMovies(movies, screenings, filters = {}, upcoming = false, today = formatCalendarDate(new Date())) {
  const matchingIds = new Set(filterScreenings(screenings, filters).map(screening => String(screening.movie?.id)));
  return movies.filter(movie =>
    (!upcoming || movie.preSale === true || movie.firstScreeningDate?.split('T')[0] > today) &&
    (!filters.selectedLanguage || movie.languages?.includes(filters.selectedLanguage)) &&
    ((!filters.selectedTheatre && !filters.selectedDate) || matchingIds.has(String(movie.id)))
  );
}

