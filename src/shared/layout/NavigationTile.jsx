import React from 'react'
import { useNavigate } from 'react-router'

function NavigationTile({values}) {
  const navigator = useNavigate()
  const handler = () => {
    navigator(values.url)
  }
  return (
    <div onClick={handler} className={`bg-white cursor-pointer flex items-center gap-2 py-3 px-2.5 rounded-[12px] ${values.style}`}>
        <div className={`${values.title ? "w-11" : "w-full"} h-11`}>
            <img className='w-full h-full object-contain' src={values.src} alt="" />
        </div>
        <span >{values.title}</span>
    </div>
  )
}

export default NavigationTile