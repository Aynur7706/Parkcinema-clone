import { formatCalendarDate } from '../utils/formatCalendarDate.js';

// Local examples.
export function addDemoScreenings(movies, screenings, today = new Date()) {
  const covered = new Set(screenings.map(item => String(item.movie?.id)));
  const demos = movies.filter(movie => !covered.has(String(movie.id))).flatMap(movie =>
    [0, 1].flatMap(offset => {
      const date = new Date(today);
      date.setDate(date.getDate() + offset);
      const day = formatCalendarDate(date);
      return ['15:00', '21:00'].map(time => ({
        id: `demo-${movie.id}-${day}-${time.replace(':', '')}`,
        isDemo: true, movie, calendarDate: `${day}T00:00:00+04:00`, time,
        theatreTitle: 'CaspiMayr Hall', hallTitle: 'CaspiMayr2', type: '_2D',
        language: movie.languages?.[0] || 'RU', subtitle: movie.subtitles?.[0] || 'NONE',
        price: [{ price: 7, discounts: [
          { discountType: 'ADULT', discountValue: 7, min: 1, max: 10 },
          { discountType: 'FAMILY', discountValue: 6, min: 3, max: 4 },
        ] }],
      }));
    })
  );
  return [...screenings, ...demos];
}
