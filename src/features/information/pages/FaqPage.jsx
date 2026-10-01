import React from 'react'
import QuestionAccordion from "../../../shared/ui/QuestionAccordion.jsx"

function FaqPage() {
    const faqs = [
        {
            title: "Bilet neçəyədir?",
            question: "Biletin qiyməti həftənin günündən, vaxtından və formatından asılı olaraq dəyişə bilər. Bu səbəbdən ana səhifədəki cədvəldən istədiyiniz filmə keçid edərək aktual qiymətlərlə tanış ola bilərsiniz."
        },
        {
            title: "\"Love seats\" nədir?",
            question: "Bu, sevgililər üçün nəzərdə tutulmuş ikili oturacaqlardır. Bir \"love seats\"in qiymətinə iki yer əldə edirsiniz."
        },
        {
            title: "Mənim yaşım filmin yaş reytinqinə uyğun deyilsə, ona baxa bilərəm?",
            question: "Azərbaycan Respublikasının \"Kinematoqrafiya haqqında\" Qanunun 40.2.2-2-ci maddəsinə görə, yaş təsnifatı təmin edilmədən və müvafiq yaş kateqoriyasına uyğun işarələnmədən informasiya məhsullarının yayımına icazə qadağandır. Bu qanunvericilik aktlarına əsasən, kinoteatrlar filmlərin yaş məhdudiyyətlərinə riayət etməli və yaşı uyğun olmayan şəxslərin müvafiq filmlərə baxmasına icazə verməməlidirlər. Yalnız valideynin müşayiəti ilə bu mümkündür."
        },
        {
            title: "Özümüzlə yemək gətirə bilərik?",
            question: "Biz kinoteatrın əmlakına, o cümlədən oturacaqlara və xalçaya ləkə sala biləcək məhsullara, eləcə də onların keyfiyyətinə görə məsuliyyəti daşıya bilmədiyimiz üçün kinoteatrdan kənarda alınmış qida məhsulları ilə zala girişə icazə vermirik. Kinobarımızda satılan bütün məhsullar sertifikatlaşdırılıb və tam təhlükəsizdir."
        },
        {
            title: "Sizdə endirimlər varmı?",
            question: "Bəli, var. Bununla bağlı ətraflı məlumatı saytımızdakı \"Aksiya\" bölməsindən əldə edə bilərsiniz."
        }
    ];

  return (
    <div className='mt-32 px-3 pb-30 mx-auto w-full md:w-[90%]'>
        <h2 className='text-[32px] text-white font-bold'>
            FAQ
        </h2>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 '>
            {
                faqs?.map((item,index) => <QuestionAccordion key={index} question={item}/>)
            }
        </div>
    </div>
  )
}

export default FaqPage