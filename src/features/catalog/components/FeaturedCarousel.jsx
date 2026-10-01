import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useRef, useState } from 'react';

import { Link } from 'react-router';
import { featuredMovies as banners } from '../data/featuredMovies.js';

export default function FeaturedCarousel() {
  useLanguage();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const touchStart = useRef(null);
  const suppressClick = useRef(false);
  const changeBanner = direction => setActiveBannerIndex(index => direction < 0 ? Math.max(0, index - 1) : (index + 1) % banners.length);
  return (
    <section className="cinema-hero" aria-label={t("Film afişaları")} aria-roledescription="karusel"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          changeBanner(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
      onTouchStart={event => { suppressClick.current = false; touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={event => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { suppressClick.current = true; changeBanner(dx < 0 ? 1 : -1); }
        touchStart.current = null;
      }}>
      <Link className="block w-full h-full focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-4px]" to={`/detail/${banners[activeBannerIndex].id}`} aria-label={`${banners[activeBannerIndex].title} — film haqqında`} onClick={event => { if (suppressClick.current) { event.preventDefault(); suppressClick.current = false; } }}>
      <img key={activeBannerIndex} id="cinema-featured-image" className="cinema-banner cinema-hero-image" src={banners[activeBannerIndex].src} alt={banners[activeBannerIndex].title} fetchPriority="high" />
      </Link>
      <div className="cinema-hero-shade" aria-hidden="true" />
      <button aria-label={t("Növbəti afişa")} onClick={() => changeBanner(1)} className="cinema-hero-arrow cinema-carousel-next"><svg className="cinema-hero-chevron" width="32" height="56" viewBox="0 0 32 56" fill="none" aria-hidden="true"><path d="M4 4L28 28L4 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      <p className="sr-only" aria-live="polite">{activeBannerIndex + 1} / {banners.length}: {banners[activeBannerIndex].title}</p>
    </section>
  );
}




