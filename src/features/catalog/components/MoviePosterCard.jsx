import { t, useLanguage } from '../../../shared/i18n/language.js';
import { displayMovieDate, displayAgeLimit } from "../utils/moviePresentation.js";
import { Link } from "react-router";

const MoviePosterCard = ({item, upcoming = false}) => {
  useLanguage();
  return (
    <Link to={`/detail/${item.id}`}
      className={`cursor-pointer rounded-xl overflow-hidden bg-zinc-800 shadow-lg relative group block focus-visible:outline-2 focus-visible:outline-white ${upcoming ? "cinema-upcoming-card" : ""}`}
    >
      <div className="w-full h-full overflow-hidden">
        <img
          src={`https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.image}&w=640&q=75`}
          alt={t(item.name)}
          loading="lazy"
          className="object-cover w-full h-full duration-300 group-hover:scale-110"
        />
      </div>

      {upcoming && item.preSale === true && <span className="cinema-presale-ribbon">{t("Öncədən satış")}</span>}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0) 100%)' }}
      />
      <div className="cinema-poster-info p-4 absolute bottom-0 w-full z-10 text-white">
        <h3 className="mb-3 text-white text-[22px] leading-[33px] font-semibold" style={{ fontFamily: "'Fira Sans', sans-serif" }}>{t(item.name)}</h3>
        <p className="text-sm text-zinc-200">{displayMovieDate(item.firstScreeningDate) || item.year}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-md py-1  rounded-md">{displayAgeLimit(item.ageLimit)}</span>
          <div className="flex items-center gap-3">
            {
                item.languages?.map((item,index) => <img
                key={index}
                src={`https://flagcdn.com/w40/${item == "EN" ? 'gb': item.toLowerCase()}.png`}
                alt= {item} 
                className="w-5 h-5 rounded-full"
            />)
            }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviePosterCard;

