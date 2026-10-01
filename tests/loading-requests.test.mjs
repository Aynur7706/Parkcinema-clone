import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beginLoadingRequest, getPendingRequests, subscribeLoading } from '../src/shared/utils/loadingRequests.js';

test('loading waits for every request and cleanup cannot finish a request twice', () => {
  const counts = [];
  const unsubscribe = subscribeLoading(() => counts.push(getPendingRequests()));
  const finishMovie = beginLoadingRequest();
  const finishSchedule = beginLoadingRequest();
  finishMovie();
  assert.equal(getPendingRequests(), 1);
  // Navigation cleanup can run before the abandoned request settles.
  finishMovie();
  assert.equal(getPendingRequests(), 1);
  finishSchedule();
  assert.equal(getPendingRequests(), 0);
  assert.deepEqual(counts, [1, 2, 1, 0]);
  unsubscribe();
  beginLoadingRequest()();
  assert.deepEqual(counts, [1, 2, 1, 0]);
});
