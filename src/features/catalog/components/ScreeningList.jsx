import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import { filterScreenings } from "../utils/catalogSelection.js";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const languageFlags = { EN: "gb", RU: "ru", AZ: "az", TR: "tr" };

const ScreeningList = ({ screenings = [], theatreTitle, filters, movieId }) => {
  useLanguage();
  const catalogFilters = useSelector(store => store.catalogFilters);
  const movies = filterScreenings(screenings, filters ?? catalogFilters, { theatreTitle, movieId })
    .sort((first, second) => (first.time || "").localeCompare(second.time || ""));

  if (!movies.length) {
    return <ContentState title={t("Uyğun seans yoxdur")} message={t("Başqa tarix seçin və ya dil və kinoteatr filtrlərini təmizləyin.")} />;
  }

  return (
    <div className="cinema-screening-list text-[16px] text-white">
      <table className="w-full min-w-[900px] table-fixed border-collapse text-center">
        <colgroup>
          <col className="w-[6%]" />
          <col className="w-[31%]" />
          <col className="w-[22%]" />
          <col className="w-[10%]" />
          <col className="w-[8%]" />
          <col className="w-[23%]" />
        </colgroup>
        <thead className="sr-only">
          <tr>{["Saat", "Film", t("Kinoteatr və zal"), t("Format və dil"), t("Altyazı"), "Bilet"].map(label => <th key={t(label)} scope="col">{t(label)}</th>)}</tr>
        </thead>
        <tbody>
          {movies.map(session => (
            <tr key={session.id} className="h-[73px] border-b border-[#d9dadb]">
              <td className="py-4">{session.time}</td>
              <td className="px-4 py-4">{t(session.movie?.name)}</td>
              <td className="px-3 py-4">
                {session.theatreTitle}{session.hallTitle ? ` | ${/^zal\s*:/i.test(session.hallTitle) ? session.hallTitle : `Zal: ${session.hallTitle}`}` : ""}
              </td>
              <td className="py-4">
                <div className="flex items-center justify-center gap-7">
                  <span>{session.type?.replaceAll("_", "")}</span>
                  <img src={`https://flagcdn.com/w40/${languageFlags[session.language] || session.language?.toLowerCase()}.png`} alt={session.language} className="size-[22px] shrink-0 rounded-full object-cover" />
                </div>
              </td>
              <td className="py-4">
                <span className="inline-flex min-h-10 min-w-[54px] flex-col items-center justify-center rounded-[10px] border border-[#d9dadb] px-4 text-[12px] leading-4">
                  {session.subtitle && session.subtitle !== "NONE" ? <><span>{session.subtitle === "AZ" ? "AZE" : session.subtitle}</span><span>{t("sub")}</span></> : <><span>{t("Altyazı")}</span><span>{t("yoxdur")}</span></>}
                </span>
              </td>
              <td className="py-4 pr-2 text-right">
                <Link to={`/seat-selection/${session.id}`} className="inline-flex h-9 w-40 items-center justify-center rounded-full bg-[#a52e25] font-semibold text-[#d9dadb] transition-colors hover:bg-[#d52b1e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none">{t(" Bilet Al ")}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreeningList;


