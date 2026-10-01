import { useSyncExternalStore } from 'react';
import translations from './translations.json';
const supported = ['AZE', 'EN', 'RU'];
let language = 'AZE';
try { const saved = localStorage.getItem('cinema-language'); if (supported.includes(saved)) language = saved; } catch { /* Storage may be unavailable. */ }
const listeners = new Set();
export function setLanguage(value) {
  if (!supported.includes(value)) return;
  language = value;
  document.documentElement.lang = { AZE: 'az', EN: 'en', RU: 'ru' }[value];
  try { localStorage.setItem('cinema-language', value); } catch { /* Language still works for this visit. */ }
  listeners.forEach(listener => listener());
}
const subscribe = listener => { listeners.add(listener); return () => listeners.delete(listener); };
export function useLanguage() { return useSyncExternalStore(subscribe, () => language, () => 'AZE'); }
export function t(text) {
  if (typeof text !== 'string' || language === 'AZE') return text;
  const key = text.trim();
  const translated = translations[key]?.[language];
  return translated ? text.replace(key, translated) : text;
}
if (typeof document !== 'undefined') document.documentElement.lang = { AZE: 'az', EN: 'en', RU: 'ru' }[language];
