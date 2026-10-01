import { t, useLanguage } from '../../../shared/i18n/language.js';
import FeaturedMovieDetails from './FeaturedMovieDetails.jsx';
import { featuredMovies } from '../data/featuredMovies.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js'
import RequestError from '../../../shared/ui/RequestError.jsx'
import { youtubeEmbedUrl, displayDuration, displayAgeLimit, displayMovieDate } from '../utils/moviePresentation.js'
import { useParams } from 'react-router'
import { fetchMovies } from "../../../shared/api/cinemaApi.js"
import ScreeningSchedule from "../components/ScreeningSchedule.jsx"

function MovieDetailsPage() {
  useLanguage();
    const { id } = useParams();
    const featured = featuredMovies.find(movie => movie.id === id);
    if (featured) return <FeaturedMovieDetails featured={featured} />;
    return <CatalogMovieDetails />;
}

function CatalogMovieDetails() {
  useLanguage();
    const { id } = useParams()
    const { data: movies, loading, error, retry } = useAsyncData(fetchMovies);
    const movie = movies?.find(item => String(item.id) === id);
    if (loading) return <div className="mt-32 py-16"><LoadingSpinner /></div>;
    if (error) return <div className="mt-32"><RequestError message={error} onRetry={retry} /></div>;
    if (!movie) return <ContentState page title={t("Film tapılmadı")} message={t("Bu film artıq siyahıda yoxdur. Başqa film seçə bilərsiniz.")} to="/" />;
    const embedUrl = youtubeEmbedUrl(movie.youtubeUrl);

    return (
        <div className='mt-32 mx-auto w-full md:w-[90%]'>
            <div className='grid grid-cols-2 max-md:flex max-md:flex-col-reverse gap-5 my-10 h-full'>
                <div className=''>
                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-8'>
                        <div className='rounded-[30px] overflow-hidden  max-lg:hidden'>
                            <img className='w-full h-full object-cover' src={`https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movie.image}&w=640&q=75`} alt="" />
                        </div>
                        <div className=" text-white p-6 rounded-xl w-full max-w-md">
                                <h1 className="text-xl font-bold mb-2">{t(movie.name)}</h1>
                                <p className="text-sm text-gray-300 mb-4">
                                    {movie.genres?.map((item,index) => <span key={index}>{t(item.title)}</span>)}
                                </p>

                                <div className="mb-3">
                                    <p className="text-white font-semibold text-sm">{t("Dil")}</p>
                                    <div className='flex gap-2 items-center'>
                                        {
                                            movie.languages?.map((item,index) => <img key={index} 
                                            src={`https://flagcdn.com/w40/${item == "EN" ? 'us': item.toLowerCase()}.png`}
                                            alt={item} className="w-6 rounded-full h-6 mt-1" />)
                                        }
                                    </div>
                                    
                                </div>

                                <div className="mb-3">
                                    <p className="text-white font-semibold text-sm">{t("Altyazı")}</p>
                                    {
                                        movie.subtitles?.map((item,index) => 
                                        <div key={index}>
                                            {item == "NONE" ? <p className='text-red-700'>{t("Altyazı yoxdur")}</p> : 
                                             <img  
                                                src={`https://flagcdn.com/w40/${item == "EN" ? 'us': item.toLowerCase()}.png`}
                                                alt="Rus dili" className="w-6 rounded-full h-6 mt-1" />
                                            }
                                        </div>
                                        )
                                    }
                                </div>

                                <div className="space-y-2 text-sm text-white">
                                    <p><span className="font-semibold">{t("Müddət:")}</span> {displayDuration(movie.duration)}</p>
                                    <p><span className="font-semibold">{t("İl:")}</span> {movie.year}</p>
                                    <p><span className="font-semibold">{t("Ölkə:")}</span> {t(movie.country)}</p>
                                    <p><span className="font-semibold">{t("Rejissor:")}</span> {movie.director}</p>
                                    <p><span className="font-semibold">{t("Aktyorlar:")}</span> 
                                        {movie.actors?.map((item,index,arr) => <span key={index}> {item} {(index == arr?.length - 1)  ? " " : ","}</span>)}
                                    </p>
                                    <p><span className="font-semibold">{t("Yaş Həddi:")}</span> 
                                        {displayAgeLimit(movie.ageLimit)}
                                    </p>
                                    <p><span className="font-semibold">{t("Nümayiş Tarixi:")}</span> {
                                        displayMovieDate(movie.firstScreeningDate)
                                    }</p>
                                </div>
                                </div>

                    </div>
                    <div className='text-[#D9DADB] font-semibold  p-3'>
                        <p>{t(movie.description)}</p>
                    </div>
                </div>
                <div className='p-3'>
                        <div className='w-full rounded-3xl h-[200px] md:h-[350px] overflow-hidden'>
                        {embedUrl ? <iframe
                            className="w-full h-full object-cover"
                            src={embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe> : <p className="text-[#D9DADB] p-4">{t("Treyler mövcud deyil")}</p>}
                    </div>
                </div>
            </div>
             <ScreeningSchedule key={id} movieId={id} />
        </div>
    )
}

export default MovieDetailsPage



