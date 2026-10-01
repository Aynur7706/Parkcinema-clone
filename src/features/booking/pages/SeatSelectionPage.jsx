import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import { useCallback } from 'react'
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js'
import RequestError from '../../../shared/ui/RequestError.jsx'
import { getTicketOptions, validateSeatSelection } from '../utils/seatSelection.js'
import { displayMovieDate, displayDuration } from '../../catalog/utils/moviePresentation.js'
import { useNavigate, useParams } from 'react-router'
import { fetchScreening } from "../../../shared/api/cinemaApi.js"
import { IoCalendar } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import SeatMap from "../components/SeatMap.jsx";
import SeatLegend from "../components/SeatLegend.jsx";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function SeatSelectionPage() {
  useLanguage(); 
  const navigator = useNavigate()
  const {id} = useParams()
  const {totalPrice, selectedSeats, screeningId} = useSelector(store => store.booking)

  const loadScreening = useCallback(() => fetchScreening(id), [id]);
  const { data: movie, loading, error, retry } = useAsyncData(loadScreening);

  const ticketOptions = getTicketOptions(movie);
  const navigate = () => {
    const error = validateSeatSelection(screeningId === id ? selectedSeats : [], ticketOptions);
    if (error) toast.error(error, { position: 'bottom-right', theme: 'dark' });
    else navigator('/buy-ticket/' + id, { state: { screening: movie } });
  };
  if (loading) return <div className="mt-32 py-16"><LoadingSpinner /></div>;
  if (error) return <div className="mt-32"><RequestError message={error} onRetry={retry} /></div>;
  if (!movie) return <ContentState page title={t("Seans tapılmadı")} message={t("Bu seans mövcud deyil. Filmlər siyahısından başqa seans seçin.")} to="/" />;

  return (
    <div className='cinema-seat-page mt-32 p-3 md:p-0 mb-15  mx-auto w-full md:w-[90%]'>
        <div>
            <h2 className='text-white font-semibold text-3xl mb-3'>{t("Oturacaq Seçimi")}</h2>
            <div className='bg-[url("https://new.parkcinema.az/images/movie-herobg.svg")] flex items-center gap-3 p-3 overflow-hidden relative bg-cover bg-center h-[300px] rounded-2xl'>
                <div className='absolute w-full h-full top-0 left-0 right-0 bg-[rgba(0,0,0,.7)] '></div>
                <div className='text-white relative w-[200px] rounded-2xl overflow-hidden z-10 h-full'>
                    <img className='w-full h-full object-cover' src={`https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movie?.movie?.image}&w=640&q=75`} alt="" />
                </div>
                <div className='text-white relative z-10 flex flex-col h-full justify-center gap-3 max-md:w-[300px]'>
                    <div className='flex flex-col max-md:gap-2 md:gap-3 max-sm:text-[15px]'>
                        <h1 className="text-nowrap truncate">{movie.movie?.name}</h1>
                        <div className="flex items-center gap-3">
                            <div className="text-[18px] mt-[1px] font-semibold">
                                <div>{movie.type?.replace("_","")}</div>
                            </div>
                        </div>
                        <p className="flex items-center gap-2">
                            <IoCalendar />
                            {displayMovieDate(movie.calendarDate)}
                        </p>
                        <p className="flex items-center gap-2">
                            <GoClockFill />
                            {movie.time}
                        </p>
                    </div>
                    <div className='flex flex-col max-md:gap-1 md:gap-2  max-sm:text-[13px]'>
                        <p className="text-[#D9DADB] !text-[16px] font-normal undefined">
                            <span className="!text-[16px]  font-semibold undefined">{t("Dil: ")}</span> 
                            {movie.language}
                        </p>
                        <p className="text-[#D9DADB] !text-[16px] font-normal undefined">
                            <span className="!text-[16px] font-semibold undefined">{t("Kinoteatr: ")}</span>
                            {movie.theatreTitle}
                        </p>
                        <p className="text-[#D9DADB] !text-[16px] font-normal undefined">
                            <span className="!text-[16px] font-semibold undefined">{t("Zal: ")}</span> {movie.hallTitle}<br />
                            <span className="!text-[16px] font-semibold">{t("Müddət: ")}</span> {displayDuration(movie.movie?.duration)}<br />
                            <span className="!text-[16px] font-semibold undefined">{t("Janr: ")}</span> 
                            {movie.movie?.genres?.map((item,index) => <span key={index}>
                                {t(item.title)}
                            </span>)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between py-3'>
            <SeatLegend ticketOptions={ticketOptions} />
        </div>
        <SeatMap key={id} screeningId={id} ticketOptions={ticketOptions} hallTitle={movie.hallTitle} />
        <div className="cinema-booking-summary">
            <div className="cinema-booking-summary-details" aria-live="polite">
                {screeningId === id && selectedSeats.length > 0 ? (
                    <ul className="cinema-selected-seats">
                        {selectedSeats.map(seat => <li key={`${seat.sira}-${seat.yer}`}>{t("Sıra ")}{seat.sira}{t(", Yer ")}{seat.yer} ({seat.ticketType === 'FAMILY' ? t("Ailə") : seat.ticketType === 'CHILD' ? t("Uşaq") : t("Böyük")})</li>)}
                    </ul>
                ) : <p className="text-[#D9DADB]">{t("Bilet almaq üçün oturacaq seçin.")}</p>}
                <p className="cinema-booking-total">{t("Ümumi: ")}{screeningId === id ? totalPrice : 0} AZN</p>
            </div>
            <button onClick={navigate} disabled={screeningId !== id || !selectedSeats.length} className="cinema-buy-ticket">{t("Bilet Al")}</button>
        </div>
    </div>
  )
}

export default SeatSelectionPage









