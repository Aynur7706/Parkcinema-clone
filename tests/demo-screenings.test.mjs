import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addDemoScreenings } from '../src/shared/api/demoScreenings.js';
import { filterScreenings } from '../src/features/catalog/utils/catalogSelection.js';
import { getTicketOptions } from '../src/features/booking/utils/seatSelection.js';

test('missing movie gets dated, bookable demo sessions while backend sessions stay intact', () => {
  const movies = [{ id: 'a' }, { id: 'b', languages: ['RU'], subtitles: ['AZ'] }];
  const real = { id: 'real', movie: movies[0] };
  const today = new Date(2026, 11, 31, 12);
  const result = addDemoScreenings(movies, [real], today);
  assert.equal(result[0], real);
  assert.equal(result.length, 5);
  const matches = filterScreenings(result, { selectedDate: '2027-01-01', selectedLanguage: 'RU', selectedTheatre: 'CaspiMayr Hall' }, { movieId: 'b' });
  assert.equal(matches.length, 2);
  assert.ok(matches.every(item => item.isDemo));
  assert.deepEqual(getTicketOptions(matches[0]).map(option => option.type), ['FAMILY', 'ADULT', 'CHILD']);
  assert.deepEqual(addDemoScreenings(movies, [real], today), result);
  assert.equal(new Set(result.map(item => item.id)).size, 5);
  assert.deepEqual(addDemoScreenings([], [], today), []);
});

