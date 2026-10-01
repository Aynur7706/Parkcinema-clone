import { t, useLanguage } from '../../../shared/i18n/language.js';
import { toast } from 'react-toastify';
import ContentState from '../../../shared/ui/ContentState.jsx';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.jsx';
import { useCallback, useState } from 'react'
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js'
import RequestError from '../../../shared/ui/RequestError.jsx'
import { Navigate, useParams, useLocation } from 'react-router'
import { fetchScreening } from "../../../shared/api/cinemaApi.js"
import AzerbaijanPhoneInput from "../../../shared/ui/AzerbaijanPhoneInput.jsx"
import BookingTermsCheckbox from "../components/BookingTermsCheckbox.jsx"
import { useSelector } from 'react-redux'
import ReservationCountdown from "../components/ReservationCountdown.jsx"

function CheckoutPage() {
  useLanguage();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const {totalPrice, selectedSeats, screeningId} = useSelector(store => store.booking)

  const {id} = useParams()
  const { state } = useLocation();
  const snapshot = state?.screening;
  const loadScreening = useCallback(() => String(snapshot?.id) === id ? Promise.resolve(snapshot) : fetchScreening(id), [id, snapshot]);
  const { data: screening, loading, error, retry } = useAsyncData(loadScreening);

  const handleSubmit = event => {
    event.preventDefault();
    const options = { position: 'bottom-right' };
    if (!termsAccepted) return toast.error(t("Davam etmək üçün şərtlərlə razılaşın."), options);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return toast.error(t("Düzgün e-poçt ünvanı daxil edin."), options);
    }
    const digits = phone.replace(/\D/g, '');
    if (!/^(?:994)?\d{9}$/.test(digits)) {
      return toast.error(t("Telefon nömrəsini tam daxil edin: +994 və 9 rəqəm."), options);
    }
    try {
      sessionStorage.setItem('cinema-checkout-draft', JSON.stringify({
        screeningId: id, selectedSeats, totalPrice,
        email: email.trim(), phone: digits.length === 9 ? '994' + digits : digits,
        termsAccepted: true, status: 'unpaid',
      }));
      toast.success(t("Ödənişiniz uğurla həyata keçdi"), options);
    } catch {
      toast.error(t("Məlumatları yadda saxlamaq mümkün olmadı. Yenidən cəhd edin."), options);
    }
  };

  if (screeningId !== id || !selectedSeats.length) return <Navigate to={'/seat-selection/' + id} replace />;
  if (loading) return <div className="mt-32 py-16"><LoadingSpinner /></div>;
  if (error) return <div className="mt-32"><RequestError message={error} onRetry={retry} /></div>;
  if (!screening) return <ContentState page title={t("Seans tapılmadı")} message={t("Bu seans mövcud deyil. Filmlər siyahısından başqa seans seçin.")} to="/" />;

  return (
    <div className='cinema-checkout mt-32 px-3 pb-10 w-full mx-auto md:w-[90%]'>
        <div>
          <h1 className='text-white font-semibold text-[32px] tracking-[1px]'>{t("Ödəniş")}</h1>
          <ReservationCountdown />
        </div>
        <div className=' flex flex-col md:flex-row gap-5 items-center justify-between pt-5'>
          <form noValidate onSubmit={handleSubmit} className='flex flex-col w-full md:w-max items-end'>
            <input value={email} onChange={event => setEmail(event.target.value)} aria-label={t("Email")} autoComplete="email" type="email" placeholder={t("Email")} className=' p-3 text-[#9CA3AF] text-[17px] outline-0 w-full md:w-[400px] border-b-1 border-white' />
            <AzerbaijanPhoneInput value={phone} onChange={setPhone} />
            <BookingTermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />
            <button type='submit' disabled={!termsAccepted} className='py-3 px-5 duration-300 rounded-4xl w-max text-white bg-[#D02A1D] enabled:cursor-pointer enabled:hover:bg-[#A81A1A] disabled:cursor-not-allowed disabled:text-[#aaa] disabled:bg-[#62302D] disabled:opacity-60'>{t("Ödənişə Keç")}</button>
          </form>
          <div className='w-full order-[-1] md:order-1 md:w-[400px] p-5 rounded-xl h-max bg-[#4D4D4D]'>
              <div className='text-[#D9DADB] flex flex-col gap-5'>
                <div className="flex flex-col pb-15 font-semibold gap-2">
                    <h2 className="text-xl font-medium">{t(screening?.movie?.name)}</h2>
                    <p>{screening.theatreTitle}</p>
                    <p className="flex gap-4">
                      <span>{screening.calendarDate?.split("T")[0]} {screening.time}</span>
                      <span>{screening.hallTitle}</span>
                    </p>
                    <p className="flex gap-6 flex-col">
                      {
                        selectedSeats?.map((item,index) => <span key={index}>{t("Sıra ")}{item.sira}{t(", Yer ")}{item.yer} ({item.ticketType === 'FAMILY' ? t("Ailə") : item.ticketType === 'CHILD' ? t("Uşaq") : t("Böyük")}) </span>)
                      }
                    </p>
                </div>
                <div><span className='font-semibold'>{t("Ümumi:")}</span> {totalPrice} AZN</div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default CheckoutPage






