import assert from 'node:assert/strict';
import { test } from 'node:test';
import { configureStore } from '@reduxjs/toolkit';
import catalogFilters, {
  setDateFilter,
  setLanguageFilter,
  setTheatreFilter,
} from '../src/features/catalog/state/catalogFiltersSlice.js';
import booking, {
  setBookingSeats,
  setBookingTotal,
} from '../src/features/booking/state/bookingSlice.js';
import {
  fetchMovies,
  fetchScreenings,
  fetchMovieLanguages,
  fetchTheatreNames,
} from '../src/shared/api/cinemaApi.js';
import { formatCalendarDate } from '../src/shared/utils/formatCalendarDate.js';
import { loginSchema } from '../src/features/auth/validation/loginSchema.js';
import { registerSchema } from '../src/features/auth/validation/registerSchema.js';

test('catalog filters change independently and can all be cleared', () => {
  const store = configureStore({ reducer: { catalogFilters, booking } });
  store.dispatch(setLanguageFilter('AZ'));
  store.dispatch(setTheatreFilter('Park Bulvar'));
  store.dispatch(setDateFilter('2026-09-21'));
  assert.deepEqual(store.getState().catalogFilters, {
    selectedLanguage: 'AZ', selectedTheatre: 'Park Bulvar', selectedDate: '2026-09-21',
  });
  store.dispatch(setLanguageFilter(''));
  assert.equal(store.getState().catalogFilters.selectedTheatre, 'Park Bulvar');
  store.dispatch(setTheatreFilter(''));
  store.dispatch(setDateFilter(''));
  assert.deepEqual(store.getState().catalogFilters, {
    selectedLanguage: '', selectedTheatre: '', selectedDate: '',
  });
});

test('checkout receives seats and total while catalog changes preserve the booking', () => {
  const store = configureStore({ reducer: { catalogFilters, booking } });
  const seats = [{ sira: 10, yer: 2 }, { sira: 9, yer: 1 }];
  store.dispatch(setBookingSeats(seats));
  store.dispatch(setBookingTotal(9));
  store.dispatch(setLanguageFilter('RU'));
  assert.deepEqual(store.getState().booking, { screeningId: null, selectedSeats: seats, totalPrice: 9 });
  store.dispatch(setBookingSeats([seats[1]]));
  store.dispatch(setBookingTotal(4));
  assert.deepEqual(store.getState().booking, { screeningId: null, selectedSeats: [seats[1]], totalPrice: 4 });
  store.dispatch(setBookingSeats([]));
  store.dispatch(setBookingTotal(0));
  assert.deepEqual(store.getState().booking, { screeningId: null, selectedSeats: [], totalPrice: 0 });
});

test('API preserves backend URLs, payloads and unique filter choices', async context => {
  const movies = [{ id: 'film-1', languages: ['RU', 'AZ'] }, { id: 'film-2', languages: ['AZ', 'EN'] }];
  const screenings = [{ theatreTitle: 'Park Bulvar' }, { theatreTitle: 'Metro Park' }, { theatreTitle: 'Park Bulvar' }];
  const urls = [];
  context.mock.method(globalThis, 'fetch', async url => {
    urls.push(url);
    return { json: async () => url.endsWith('/landing') ? movies : screenings };
  });
  assert.deepEqual(await fetchMovies(), movies);
  assert.deepEqual(await fetchScreenings(), screenings);
  assert.deepEqual(await fetchMovieLanguages(), new Set(['RU', 'AZ', 'EN']));
  assert.deepEqual(await fetchTheatreNames(), ['Park Bulvar', 'Metro Park']);
  assert.deepEqual(urls, ['landing', 'detail', 'landing', 'detail'].map(endpoint =>
    `https://parkcinema-data-eta.vercel.app/${endpoint}`));
});

test('empty backend lists remain valid filter choices', async context => {
  context.mock.method(globalThis, 'fetch', async () => ({ json: async () => [] }));
  assert.deepEqual(await fetchMovieLanguages(), new Set());
  assert.deepEqual(await fetchTheatreNames(), []);
});

test('calendar uses local date fields and supports clearing', () => {
  assert.equal(formatCalendarDate(new Date(2026, 0, 5, 0, 15)), '2026-01-05');
  assert.equal(formatCalendarDate(new Date(2026, 11, 31, 23, 45)), '2026-12-31');
  assert.equal(formatCalendarDate(null), '');
});

test('login still validates email and required password', async () => {
  assert.equal(await loginSchema.isValid({ email: 'test@example.com', password: 'demo' }), true);
  assert.equal(await loginSchema.isValid({ email: 'invalid', password: 'demo' }), false);
  assert.equal(await loginSchema.isValid({ email: 'test@example.com', password: '' }), false);
});

test('registration still requires user details and matching passwords', async () => {
  const form = {
    name: 'Test', surname: 'User', email: 'test@example.com', tel: '501234567',
    date: '2000-01-01', password: 'demo-password', resetpassword: 'demo-password',
  };
  assert.equal(await registerSchema.isValid(form), true);
  assert.equal(await registerSchema.isValid({ ...form, resetpassword: 'different' }), false);
  for (const field of ['name', 'surname', 'email', 'tel', 'date', 'password', 'resetpassword']) {
    assert.equal(await registerSchema.isValid({ ...form, [field]: '' }), false, field);
  }
});
