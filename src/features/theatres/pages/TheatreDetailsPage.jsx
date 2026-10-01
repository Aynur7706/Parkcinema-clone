import { t, useLanguage } from '../../../shared/i18n/language.js';
import ContentState from '../../../shared/ui/ContentState.jsx';
import { useParams } from 'react-router'
import ScreeningSchedule from "../../catalog/components/ScreeningSchedule.jsx"
import {theatres} from "../data/theatres.js"
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

function TheatreDetailsPage() {
  useLanguage();
  const {id} = useParams()
  const item = theatres.find(item => item.id == id)
  if (!item) return <ContentState page title={t("Kinoteatr tapılmadı")} to="/theatres" linkLabel={t("Kinoteatrlara qayıt")} />;
  
  return (
    <div className=''>
      <div className='relative h-100 bg-no-repeat flex items-end ju w-full bg-center bg-cover bg-[url("https://new.parkcinema.az/_next/image?url=%2Fimages%2Fcinema2.png&w=640&q=75")]'>
          <div className='absolute w-full h-full bg-[rgba(0,0,0,.6)]'></div>
          <div className='relative z-10 py-4 w-full mx-auto md:w-[90%] px-3 md:px-0 flex flex-col gap-3 text-[#D9DADB]'>
              <h2 className=' text-[32px]'>{item.displayName || item.name}</h2>
              <div className='flex flex-col md:flex-row items-start  md:items-center gap-5'>
                <div className='flex items-center gap-2'>
                  <FaClock />
                  <span>{item.hours}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaLocationDot />
                    <span className='line-clamp-1'>{item.address}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaPhoneAlt />
                    <span>{item.phone}</span>
                </div>
              </div>
              <p className='text-[18px] line-clamp-3'>
                  {item.description}
              </p>
          </div>
      </div>
      <div className='w-full mx-auto  md:w-[90%]'>
        <ScreeningSchedule theatreTitle={t(item.name)} />
      </div>
    </div>
  )
}

export default TheatreDetailsPage

