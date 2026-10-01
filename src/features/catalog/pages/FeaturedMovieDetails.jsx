import { t, useLanguage } from '../../../shared/i18n/language.js';
import { Link } from 'react-router';
import details from '../data/featuredMovieDetails.json';
import { displayAgeLimit, displayDuration, displayMovieDate, youtubeEmbedUrl } from '../utils/moviePresentation.js';
import ContentState from '../../../shared/ui/ContentState.jsx';

const flags = { EN: 'gb', TR: 'tr', RU: 'ru', AZ: 'az' };
function Languages({ values = [] }) {
  useLanguage();
  return <div className="flex gap-3 mt-2">{values.map(value => <img key={value} src={`https://flagcdn.com/w40/${flags[value] || value.toLowerCase()}.png`} alt={value} title={value} className="w-7 h-7 rounded-full object-cover" />)}</div>;
}
export default function FeaturedMovieDetails({ featured }) {
  useLanguage();
  const movie = details[featured.id];
  const trailer = youtubeEmbedUrl(movie?.youtubeUrl);
  const poster = movie?.image ? `https://new.parkcinema.az/_next/image?url=${encodeURIComponent('https://new.parkcinema.az/api/file/getFile/' + movie.image)}&w=640&q=75` : featured.src;
  return <main className="cinema-featured-detail mt-32 mx-auto w-[93%] pb-16 text-[#D9DADB]">
    <div className="cinema-featured-detail-grid">
      <img src={poster} alt={t(movie?.name || featured.title)} className="cinema-featured-poster" />
      <div className="min-w-0 space-y-4">
        <h1 className="text-2xl font-semibold">{t(movie?.name || featured.title)}</h1>
        {movie ? <>
          <p>{movie.genres?.map(genre => t(genre.title)).join(', ')}</p>
          <div><strong>{t("Dil")}</strong><Languages values={movie.languages} /></div>
          <div><strong>{t("Altyazı")}</strong><Languages values={movie.subtitles} /></div>
          <div className="space-y-3 leading-relaxed">
            <p><strong>{t("Müddət:")}</strong> {movie.duration > 0 ? displayDuration(movie.duration) : t("Məlumat yoxdur")}</p>
            <p><strong>{t("İl:")}</strong> {movie.year}</p>
            <p><strong>{t("Ölkə:")}</strong> {t(movie.country)}</p>
            <p><strong>{t("Rejissor:")}</strong> {movie.director}</p>
            <p><strong>{t("Aktyorlar:")}</strong> {movie.actors?.join(', ')}</p>
            <p><strong>{t("Yaş həddi:")}</strong> {displayAgeLimit(movie.ageLimit)}</p>
            <p><strong>{t("Nümayiş tarixi:")}</strong> {displayMovieDate(movie.firstScreeningDate)}</p>
          </div>
        </> : <p>{t("Bu film haqqında ətraflı məlumat hələ təqdim edilməyib.")}</p>}
      </div>
      <div>{trailer ? <iframe src={trailer} title={`${t(movie.name)} — treyler`} className="w-full aspect-video rounded-3xl border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <ContentState title={t("Treyler mövcud deyil")} />}</div>
      {movie?.description && <p className="cinema-featured-description text-lg leading-relaxed">{t(movie.description)}</p>}
    </div>
    <ContentState title={t("Seans məlumatı mövcud deyil")} message={t("Bu film üçün layihənin API-sində seans təqdim edilməyib.")} />
    <Link to="/" className="inline-block underline py-3">{t("Filmlərə qayıt")}</Link>
  </main>;
}
