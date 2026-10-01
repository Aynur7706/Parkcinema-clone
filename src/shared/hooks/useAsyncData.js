import { useCallback, useEffect, useState } from 'react';
import { beginLoadingRequest } from '../utils/loadingRequests.js';

export function useAsyncData(request) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);

  useEffect(() => {
    let cancelled = false;
    const finishLoading = beginLoadingRequest();
    setLoading(true);
    setError('');
    Promise.resolve().then(request)
      .then(result => { if (!cancelled) setData(result); })
      .catch(() => { if (!cancelled) setError('Məlumatları yükləmək mümkün olmadı. Yenidən cəhd edin.'); })
      .finally(() => {
        if (!cancelled) setLoading(false);
        finishLoading();
      });
    return () => { cancelled = true; finishLoading(); };
  }, [request, attempt]);

  return { data, loading, error, retry };
}
