import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingSelection } from '../state/bookingSlice.js';
import { demoSeatLayout } from '../data/demoSeatLayout.js';
import { addSeat, removeSeat } from '../utils/seatSelection.js';
import { toast } from 'react-toastify';

export default function SeatMap({ screeningId, ticketOptions, hallTitle }) {
  useLanguage();
  const dispatch = useDispatch();
  const booking = useSelector(store => store.booking);
  const [seats, setSeats] = useState(() => booking.screeningId === screeningId ? booking.selectedSeats : []);
  const [activeSeat, setActiveSeat] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    dispatch(setBookingSelection({ screeningId, selectedSeats: seats }));
  }, [dispatch, screeningId, seats]);

  const selectSeat = (rowIndex, seatIndex, option) => {
    if (seats.filter(seat => seat.ticketType === option.type).length >= option.max) {
      toast.info(`${t(option.label)} tarifi ilə ən çox ${option.max} yer seçə bilərsiniz.`);
      return;
    }
    setSeats(previous => addSeat(previous, {
      sira: demoSeatLayout.length - rowIndex, yer: seatIndex + 1,
      available: [1, 4].includes(demoSeatLayout[rowIndex][seatIndex]),
    }, option));
    setActiveSeat(null);
  };
  const handleSeatClick = (rowIndex, seatIndex) => {
    const row = demoSeatLayout.length - rowIndex;
    const number = seatIndex + 1;
    if (seats.some(seat => seat.sira === row && seat.yer === number)) {
      setSeats(previous => removeSeat(previous, row, number));
      setActiveSeat(null);
    } else if (ticketOptions.length === 1) {
      selectSeat(rowIndex, seatIndex, ticketOptions[0]);
    } else {
      setActiveSeat({ rowIndex, seatIndex });
    }
  };
  return (
    <div className="cinema-seat-hall">
      <div className="cinema-seat-zoom">
        <button aria-label={t("Zalı böyüt")} disabled={zoom >= 1.6} onClick={() => setZoom(value => Math.min(1.6, +(value + 0.2).toFixed(1)))} className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center bg-[#D9DADB] disabled:opacity-40"><FaPlus className="text-black" /></button>
        <button aria-label={t("Zalı kiçilt")} disabled={zoom <= 0.6} onClick={() => setZoom(value => Math.max(0.6, +(value - 0.2).toFixed(1)))} className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center bg-[#D9DADB] disabled:opacity-40"><FaMinus className="text-black" /></button>
      </div>
      <h2 className="cinema-hall-title">{t("Zal: ")}{hallTitle || '—'}</h2>
      <div className="cinema-seat-scroll" tabIndex={0} role="region" aria-label={t("Oturacaq xəritəsi")}>
        <div className="cinema-seat-rows" style={{ zoom }}>
          {demoSeatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="cinema-seat-row">
              <span className="cinema-row-label">{t("SIRA ")}{demoSeatLayout.length - rowIndex}</span>
              <div className="cinema-row-seats">
              {row.map((status, seatIndex) => {
                if (status === null) return <div key={seatIndex} className="w-8 h-8" />;
                const selected = seats.some(seat => seat.sira === demoSeatLayout.length - rowIndex && seat.yer === seatIndex + 1);
                const available = [1, 4].includes(status);
                return (
                  <div key={seatIndex} className="relative">
                    <button aria-label={`Sıra ${demoSeatLayout.length - rowIndex}, Yer ${seatIndex + 1}`} aria-pressed={selected} disabled={!available || !ticketOptions.length} onClick={() => handleSeatClick(rowIndex, seatIndex)} className={`cinema-seat-button ${selected ? 'bg-red-600' : available ? 'bg-gray-300 text-black' : 'bg-black cursor-not-allowed'}`}>{seatIndex + 1}</button>                    {activeSeat?.rowIndex === rowIndex && activeSeat?.seatIndex === seatIndex && (
                      <div role="group" aria-label="Bilet tarifi" onKeyDown={event => { if (event.key === 'Escape') setActiveSeat(null); }} className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 rounded-xl bg-white text-black shadow-lg overflow-hidden w-[170px]">
                        {ticketOptions.map(option => <button key={option.type} onClick={() => selectSeat(rowIndex, seatIndex, option)} className="block w-full px-3 py-3 hover:bg-red-600 hover:text-white focus-visible:bg-red-600 focus-visible:text-white">{t(option.label)}</button>)}
                        <button onClick={() => setActiveSeat(null)} className="block w-full py-2 text-sm bg-gray-100">{t("Bağla")}</button>
                      </div>
                    )}
                  </div>
                );
              })}
              </div>
              <span className="cinema-row-label" aria-hidden="true">{t("SIRA ")}{demoSeatLayout.length - rowIndex}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cinema-hall-screen"><span>{t("Ekran")}</span><svg viewBox="0 0 1000 80" fill="none" aria-hidden="true"><path d="M10 20 Q500 80 990 20" stroke="#D9E7E9" strokeWidth="5" /></svg></div>
    </div>
  );
}




