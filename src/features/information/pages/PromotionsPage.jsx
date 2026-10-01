import { t, useLanguage } from '../../../shared/i18n/language.js';
import { Link } from 'react-router';
import { promotions } from '../data/promotions.js';

function PromotionsPage() {
  useLanguage();

  return (
    <div className='mt-32 pb-10 px-3 mx-auto w-full md:w-[90%]'>
        <h2 className='text-white text-[32px] font-semibold'>{t("Aksiyalar")}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-4'>
            {
              promotions.map((item) => 
              <Link to={`/campaigns/${item.id}`} key={item.id} className='block bg-[#4D4D4D] p-4 rounded-2xl transition-colors hover:bg-[#575757] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'>
                <div className='h-[250px] rounded-2xl overflow-hidden'>
                    {item.img ? <img className='w-full h-full object-cover' src={item.img} alt="" /> : <div className="flex h-full items-center justify-center bg-[#7e2729] text-[#d9dadb] text-3xl font-semibold">{t(item.title)}</div>}
                </div>
                <div className='font-semibold text-white py-2'>
                  {t(item.title)}
                </div>
            </Link>)
            }
        </div>
    </div>
  )
}

export default PromotionsPage