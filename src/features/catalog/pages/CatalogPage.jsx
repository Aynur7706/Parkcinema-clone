import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useState } from 'react'
import { Link } from 'react-router'
import FeaturedCarousel from "../components/FeaturedCarousel.jsx"
import MovieGrid from "../components/MovieGrid.jsx"
import ScreeningSchedule from "../components/ScreeningSchedule.jsx"

function CatalogPage() {
  useLanguage();
    const lists = ["Hamısı", "Tezliklə", "Cədvəl"]
    const [active, setActive] = useState(0)
    const handler = (index) => setActive(index)


    return (
        <div>
            <FeaturedCarousel />
            <div className={`mx-auto py-3 ${active === 2 ? "w-[93%]" : "w-full md:w-[90%]"}`}>
                <ul className='flex items-center gap-5 justify-between text-center my-8 mb-10'>
                    <li className='text-[#D9DADB] text-[30px] max-md:text-[26px] max-sm:text-[24px] font-bold w-full flex items-center justify-center [text-shadow:0px_0px_14px_#fff]'><Link to="/">{t("Siyahı")}</Link></li>
                    <li className='text-[#D9DADB] text-[30px] max-md:text-[26px] max-sm:text-[24px] font-bold w-full flex items-center justify-center '><Link to="/trailers">{t("Treylerlər")}</Link></li>
                </ul>
                <ul className="flex items-center gap-5 max-md:justify-center pb-3">
                    {lists.map((item, index) => <li key={index} onClick={() => handler(index)} className={`text-[20px]  cursor-pointer duration-300 text-[#D9DADB]  font-medium opacity-55 ${index == active ? "underline opacity-100 underline-offset-[6px] " : ""}`}>{t(item)}</li>)}
                </ul>
                <div>
                    {active == 0 ? <MovieGrid /> : active == 1 ? <MovieGrid upcoming /> : <ScreeningSchedule />}
                </div>
            </div>
        </div>
    )
}

export default CatalogPage
