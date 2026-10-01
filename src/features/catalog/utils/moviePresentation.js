export function youtubeEmbedUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    let id;
    if (host === 'youtu.be') id = url.pathname.slice(1);
    else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
    }
    return /^[\w-]{11}$/.test(id || '') ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function displayMovieDate(value) {
  return value?.split('T')[0].split('-').reverse().join('.') || '';
}

export function displayAgeLimit(value) {
  const ages = { ZERO: 0, SIX: 6, TWELVE: 12, SIXTEEN: 16, EIGHTEEN: 18 };
  return value in ages ? `${ages[value]}+` : /^\d+\+?$/.test(String(value)) ? `${parseInt(value, 10)}+` : '—';
}

export function displayDuration(minutes) {
  if (!Number.isFinite(Number(minutes)) || Number(minutes) <= 0) return '—';
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:00`;
}
