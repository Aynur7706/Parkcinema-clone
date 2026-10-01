import { addDemoScreenings } from './demoScreenings.js';

const CINEMA_API_URL = 'https://parkcinema-data-eta.vercel.app';

async function requestCinemaData(endpoint) {
  const response = await fetch(CINEMA_API_URL + '/' + endpoint, { signal: AbortSignal.timeout(15000) });
  if (response.ok === false) throw new Error(`Cinema API: ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Cinema API returned an invalid list');
  return data;
}

export function fetchMovies() {
  return requestCinemaData('landing');
}

export function fetchScreenings() {
  return requestCinemaData('detail');
}

export async function fetchSchedule() {
  const [movies, screenings] = await Promise.all([fetchMovies(), fetchScreenings()]);
  return addDemoScreenings(movies, screenings);
}

export async function fetchMovieLanguages() {
  const movies = await fetchMovies();
  return new Set(movies.flatMap(movie => movie.languages));
}

export async function fetchTheatreNames() {
  const screenings = await fetchScreenings();
  return [...new Set(screenings.map(screening => screening.theatreTitle))];
}

//yoxlama HTTP cavabı, məlumatın formatı və sorğunun vaxt limiti burada yoxlanılır
export async function fetchScreening(id) {
  const [movies, screenings] = await Promise.all([fetchMovies(), fetchScreenings()]);
  const existing = screenings.find(item => String(item.id) === id);
  if (existing) return existing;
  const match = /^demo-(.+)-(\d{4}-\d{2}-\d{2})-(1500|2100)$/.exec(id);
  if (!match) return null;
  const movie = movies.find(item => String(item.id) === match[1]);
  const date = new Date(`${match[2]}T12:00:00`);
  if (!movie || !Number.isFinite(date.getTime())) return null;
  return addDemoScreenings([movie], [], date).find(item => item.id === id) || null;
}

