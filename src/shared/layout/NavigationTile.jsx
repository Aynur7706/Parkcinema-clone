import React from 'react'
import { Link } from 'react-router'

function NavigationTile({values}) {
  const Tile = values.url ? Link : 'div'
  return (
    <Tile to={values.url} className={`bg-white cursor-pointer flex items-center gap-2 py-3 px-2.5 rounded-[12px] ${values.style}`}>
        <div className={`${values.title ? "w-11" : "w-full"} h-11`}>
            <img className='w-full h-full object-contain' src={values.src} alt="" />
        </div>
        <span >{values.title}</span>
    </Tile>
  )
}

export default NavigationTile
