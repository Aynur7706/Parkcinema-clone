import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterMovies, filterScreenings } from '../src/features/catalog/utils/catalogSelection.js';
import { youtubeEmbedUrl, displayAgeLimit, displayDuration } from '../src/features/catalog/utils/moviePresentation.js';
import { addSeat, removeSeat, getTicketOptions, validateSeatSelection } from '../src/features/booking/utils/seatSelection.js';
import booking, { setBookingSelection, clearBooking } from '../src/features/booking/state/bookingSlice.js';
import { fetchMovies } from '../src/shared/api/cinemaApi.js';

const screenings = [
  { id: 's1', movie: { id: 'm1' }, theatreTitle: 'Park Bulvar', language: 'AZ', calendarDate: '2026-09-21T00:00:00+04:00' },
  { id: 's2', movie: { id: 'm2' }, theatreTitle: 'Metro Park', language: 'RU', calendarDate: '2026-09-22T00:00:00+04:00' },
  { id: 's3', movie: { id: 'm1' }, theatreTitle: 'Metro Park', language: 'RU', calendarDate: '2026-09-21T00:00:00+04:00' },
];

test('movie detail lists only the selected movie, combined with all active filters', () => {
  assert.deepEqual(filterScreenings(screenings, {}, { movieId: 'm1' }).map(item => item.id), ['s1', 's3']);
  assert.deepEqual(filterScreenings(screenings, { selectedTheatre: 'Metro Park', selectedLanguage: 'RU', selectedDate: '2026-09-21' }, { movieId: 'm1' }).map(item => item.id), ['s3']);
  assert.deepEqual(filterScreenings(screenings, { selectedDate: '2026-09-22' }, { movieId: 'm1' }), []);
});

test('theatre detail cannot display screenings from a previously selected different theatre', () => {
  assert.deepEqual(filterScreenings(screenings, { selectedTheatre: 'Metro Park' }, { theatreTitle: 'Park Bulvar' }).map(item => item.id), ['s1']);
});

test('upcoming excludes released movies and respects language and theatre filters', () => {
  const movies = [
    { id: 'm1', firstScreeningDate: '2026-09-21T00:00:00+04:00', languages: ['AZ'] },
    { id: 'm2', firstScreeningDate: '2026-09-22T00:00:00+04:00', languages: ['RU'] },
  ];
  assert.deepEqual(filterMovies(movies, screenings, {}, true, '2026-09-21').map(movie => movie.id), ['m2']);
  assert.deepEqual(filterMovies(movies, screenings, { selectedLanguage: 'AZ' }, true, '2026-09-21'), []);
  assert.deepEqual(filterMovies(movies, screenings, { selectedTheatre: 'Park Bulvar' }, true, '2026-09-21'), []);
  assert.equal(filterMovies(movies, screenings).length, 2);
});

test('trailer URLs support watch, share and embed links and reject other hosts', () => {
  const expected = 'https://www.youtube.com/embed/ZpefcGA7-Zw';
  for (const url of ['https://www.youtube.com/watch?v=ZpefcGA7-Zw&t=30', 'https://youtu.be/ZpefcGA7-Zw?si=abc', expected]) assert.equal(youtubeEmbedUrl(url), expected);
  for (const url of ['', 'not-a-url', 'https://example.com/watch?v=ZpefcGA7-Zw', 'https://youtube.com/watch?v=invalid']) assert.equal(youtubeEmbedUrl(url), null);
  assert.equal(displayAgeLimit('TWELVE'), '12+');
  assert.equal(displayDuration(110), '01:50:00');
});

const options = getTicketOptions({ price: [{ price: 7, discounts: [
  { discountType: 'FAMILY', discountValue: 6, min: 3, max: 4 },
  { discountType: 'ADULT', discountValue: 7, min: 1, max: 10 },
] }] });
const family = options.find(option => option.type === 'FAMILY');
const adult = options.find(option => option.type === 'ADULT');

test('ticket prices and limits come from the screening API', () => {
  assert.deepEqual(family, { type: 'FAMILY', label: 'Ailə', price: 6, min: 3, max: 4 });
  assert.equal(adult.price, 7);
  assert.deepEqual(getTicketOptions({}), []);
  assert.equal(getTicketOptions({ price: [{ price: 12 }] })[0].price, 12);
});

test('seat choices reject duplicates, unavailable seats, and excessive family tickets', () => {
  let seats = [];
  for (let number = 1; number <= 5; number++) seats = addSeat(seats, { sira: 1, yer: number, available: true }, family);
  assert.equal(seats.length, 4);
  assert.equal(addSeat(seats, { sira: 1, yer: 1, available: true }, adult).length, 4);
  assert.equal(addSeat(seats, { sira: 2, yer: 1, available: false }, adult).length, 4);
  seats = addSeat(seats, { sira: 2, yer: 1, available: true }, adult);
  seats = removeSeat(seats, 2, 1);
  assert.equal(seats.filter(seat => seat.ticketType === 'FAMILY').length, 4);
  assert.equal(validateSeatSelection(seats, options), '');
  assert.notEqual(validateSeatSelection(seats.slice(0, 2), options), '');
  assert.notEqual(validateSeatSelection([], options), '');
});

test('booking switches screenings without reusing old seats or prices', () => {
  const selectedSeats = [
    { sira: 1, yer: 1, ticketType: 'ADULT', price: 7 },
    { sira: 1, yer: 2, ticketType: 'ADULT', price: 7 },
  ];
  let state = booking(undefined, setBookingSelection({ screeningId: 's1', selectedSeats }));
  assert.equal(state.totalPrice, 14);
  assert.equal(state.screeningId, 's1');
  state = booking(state, setBookingSelection({ screeningId: 's2', selectedSeats: [] }));
  assert.deepEqual(state, { screeningId: 's2', selectedSeats: [], totalPrice: 0 });
  assert.deepEqual(booking(state, clearBooking()), { screeningId: null, selectedSeats: [], totalPrice: 0 });
});

test('HTTP errors and invalid payloads fail clearly instead of becoming movie data', async context => {
  const fetchMock = context.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 503 }));
  await assert.rejects(fetchMovies, /503/);
  fetchMock.mock.mockImplementation(async () => ({ ok: true, json: async () => ({ error: 'Unavailable' }) }));
  await assert.rejects(fetchMovies, /invalid list/);
});

test('upcoming includes backend presale films even when stored release dates are old', () => {
  const movies = [
    { id: 'presale', firstScreeningDate: '2025-05-01', preSale: true, languages: ['RU'] },
    { id: 'released', firstScreeningDate: '2025-05-01', preSale: false, languages: ['RU'] },
  ];
  assert.deepEqual(filterMovies(movies, [], {}, true, '2026-09-29').map(movie => movie.id), ['presale']);
  assert.deepEqual(filterMovies(movies, [], { selectedLanguage: 'AZ' }, true, '2026-09-29'), []);
});

test('a local screening still resolves after its generation date has passed', async context => {
  const { fetchScreening } = await import('../src/shared/api/cinemaApi.js');
  context.mock.method(globalThis, 'fetch', async url => ({
    ok: true,
    json: async () => url.endsWith('/landing') ? [{ id: 'm1', name: 'Film', languages: ['AZ'] }] : [],
  }));
  const screening = await fetchScreening('demo-m1-2026-09-29-1500');
  assert.equal(screening.id, 'demo-m1-2026-09-29-1500');
  assert.equal(screening.calendarDate, '2026-09-29T00:00:00+04:00');
  assert.equal(await fetchScreening('demo-missing-2026-09-29-1500'), null);
});

test('child tickets use the supplied child price or fall back to standard pricing', () => {
  const child = getTicketOptions({ price: [{ price: 7, discounts: [{ discountType: 'CHILD', discountValue: 4, min: 1, max: 5 }] }] }).find(option => option.type === 'CHILD');
  assert.deepEqual(child, { type: 'CHILD', label: 'Uşaq', price: 4, min: 1, max: 5 });
  const fallback = getTicketOptions({ price: [{ price: 7 }] }).find(option => option.type === 'CHILD');
  assert.equal(fallback.price, 7);
  const seats = addSeat([], { sira: 1, yer: 2, available: true }, child);
  assert.equal(seats[0].ticketType, 'CHILD');
  assert.equal(booking(undefined, setBookingSelection({ screeningId: 's1', selectedSeats: seats })).totalPrice, 4);
});
