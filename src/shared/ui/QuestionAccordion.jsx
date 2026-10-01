import { t, useLanguage } from '../i18n/language.js';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";

function QuestionAccordion({question}) {
 useLanguage();
    const [isExpanded , setExpanded] = useState(false)
    const toggleExpanded = () =>{
        setExpanded(!isExpanded)
    }
    return (
        <div onClick={toggleExpanded} className='text-[#D9DADB] cursor-pointer border-b-1 py-3 border-white w-full '>
            <div className='flex items-center justify-between'>
                <div className='font-bold text-[18px]'>{t(question.title)}</div>
                <div className={`${isExpanded ? "rotate-45" : "rotate-0"} duration-300 transition-all`}>
                    <FaPlus />
                </div>
            </div>
            <p className={` text-[14px] font-semibold overflow-hidden  duration-500 ease-in-out transition-all ${!isExpanded ? 'max-h-0  opacity-0' : 'max-h-96 opacity-100'} `}>
                {t(question.question)}
            </p> 
        </div>
    )
}

export default QuestionAccordion