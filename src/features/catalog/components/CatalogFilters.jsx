import { t, useLanguage } from '../../../shared/i18n/language.js';
import ScreeningDatePicker from "./ScreeningDatePicker.jsx";
import { fetchMovieLanguages } from "../../../shared/api/cinemaApi.js"
import CatalogDropdown from './CatalogDropdown.jsx';
import { useAsyncData } from '../../../shared/hooks/useAsyncData.js';
import RequestError from '../../../shared/ui/RequestError.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setDateFilter, setLanguageFilter, setTheatreFilter } from "../state/catalogFiltersSlice.js";


const theatreOptions = [
  { value: 'Park Bulvar', label: 'Park Bulvar' },
  { value: 'Metro Park', label: 'Metro Park' },
  { value: 'Flame Towers', label: 'Flame Towers' },
  { value: 'Sevinç Mall', label: 'Sevinc Mall' },
  { value: 'Şahdağ', label: 'Shahdag' },
  { value: 'CaspiMayr Hall', label: 'CaspiMayr Hall' },
];
const fetchFilterOptions = async () => ({ languages: [...await fetchMovieLanguages()] });
function CatalogFilters({list, hideTheatre = false}) {
  useLanguage();
    const {selectedLanguage , selectedTheatre, selectedDate} = useSelector(store => store.catalogFilters)
    const dispatch = useDispatch()
    const handler = () => {
        dispatch(setLanguageFilter(""))
        dispatch(setTheatreFilter(''))
        dispatch(setDateFilter(''))
    }
    const setLangValue = (e) => dispatch(setLanguageFilter(e))
    const setTheatresValue = (e) => dispatch(setTheatreFilter(e))

    const { data, error, retry } = useAsyncData(fetchFilterOptions);
    const languages = data?.languages || [];

  return (
    <>
    {error && <RequestError message={error} onRetry={retry} />}
    <div className={`w-full grid grid-cols-1 ${list == "table" ? "md:grid-cols-2" : "md:grid-cols-3"} items-end gap-6 p-5`}>
        <CatalogDropdown label={t("Dil")} value={selectedLanguage} onChange={setLangValue} options={languages} />
        {!hideTheatre && <CatalogDropdown label={t("Kinoteatr")} value={selectedTheatre} onChange={setTheatresValue} options={theatreOptions} />}
        {list !== "table" && <div className='w-full'><ScreeningDatePicker /></div>}
    
    </div>
    {
        selectedLanguage || selectedTheatre || selectedDate ? <button onClick={handler} className='text-[#BF4244] border-1 rounded-[4px] border-[#BF4244] cursor-pointer w-full md:w-[100px] duration-300 p-0 h-max py-3 hover:text-white hover:bg-[#BF4244]'>{t("Təmizlə")}</button>
        : ""
    }
    </>
  )
}

export default CatalogFilters
