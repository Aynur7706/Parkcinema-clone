import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import { Link } from 'react-router';
import { fetchMovies } from '../../../shared/api/cinemaApi.js';
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import RequestError from '../../../shared/ui/RequestError.jsx';
import { youtubeEmbedUrl } from '../utils/moviePresentation.js';

export default function TrailersPage() {
  useLanguage();
  const { data, loading, error, retry } = useAsyncData(fetchMovies);
  const movies = (data || []).filter(movie => youtubeEmbedUrl(movie.youtubeUrl));
  return (
    <main className="mt-32 pb-12 w-full text-[#D9DADB] bg-[linear-gradient(to_bottom,#666_0%,#373737_900px)]">
      <nav className="grid grid-cols-2 text-center text-[26px] md:text-[36px] font-semibold py-7 bg-white/10" aria-label={t("Film görünüşü")}>
        <Link to="/">{t("Siyahı")}</Link>
        <Link to="/trailers" aria-current="page" className="[text-shadow:0px_0px_14px_#fff]">{t("Treylerlər")}</Link>
      </nav>
      {loading ? <LoadingSpinner /> : error ? <RequestError message={error} onRetry={retry} /> : (
        <div className="flex flex-col gap-16 w-[calc(100%-32px)] md:w-[80%] max-w-[1134px] mx-auto pt-10 md:pt-24">
          {movies.map(movie => (
            <article key={movie.id} className="overflow-hidden rounded-2xl bg-[#2D2D2D]">
              <iframe src={youtubeEmbedUrl(movie.youtubeUrl)} title={`${t(movie.name)} — treyler`} className="block w-full aspect-video border-0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <div className="px-4 pt-3 pb-4 text-lg">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium">{t(movie.name)}</h2>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-1">
                      <p className="text-white font-medium">{movie.genres?.map(genre => t(genre.title)).join(', ')}</p>
                      <div className="flex items-center gap-2">
                        {movie.languages?.map(language => <img key={language} src={`https://flagcdn.com/w40/${({ EN: 'gb', AZ: 'az', RU: 'ru', TR: 'tr' })[language] || language.toLowerCase()}.png`} alt={language} title={language} className="w-[26px] h-[26px] rounded-full object-cover" />)}
                      </div>
                    </div>
                  </div>
                  <Link to={`/detail/${movie.id}`} className="inline-flex items-center justify-center shrink-0 rounded-full bg-[#A82D23] hover:bg-[#D52B1E] transition-colors font-semibold w-full sm:w-[212px] h-11">{t("Bilet Al")}</Link>
                </div>
                <details className="mt-5 group">
                  <summary className="cursor-pointer list-none flex items-center gap-4 text-white font-medium [&::-webkit-details-marker]:hidden">{t("Qısa məlumat ")}<span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">→</span></summary>
                  <p className="mt-3 leading-relaxed">{t(movie.description)}</p>
                </details>
              </div>
            </article>
          ))}
          {!movies.length && <ContentState title={t("Treyler tapılmadı")} message={t("Hazırda göstəriləcək treyler yoxdur.")} to="/" />}
        </div>
      )}
    </main>
  );
}

