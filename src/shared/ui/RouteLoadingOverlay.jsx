import { useEffect, useState, useSyncExternalStore } from 'react';
import { getPendingRequests, subscribeLoading } from '../utils/loadingRequests.js';
import PageLoader from './PageLoader.jsx';

export default function RouteLoadingOverlay() {
  const pending = useSyncExternalStore(subscribeLoading, getPendingRequests);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (pending) {
      setSettled(false);
      return;
    }
    // Keep consecutive requests (movie, then its schedule) under one overlay.
    const timer = setTimeout(() => setSettled(true), 100);
    return () => clearTimeout(timer);
  }, [pending]);

  return pending || !settled ? <PageLoader /> : null;
}
