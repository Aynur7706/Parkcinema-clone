const listeners = new Set();
let pending = 0;

export const subscribeLoading = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getPendingRequests = () => pending;

export function beginLoadingRequest() {
  let finished = false;
  pending += 1;
  listeners.forEach(listener => listener());
  return () => {
    if (finished) return;
    finished = true;
    pending -= 1;
    listeners.forEach(listener => listener());
  };
}
