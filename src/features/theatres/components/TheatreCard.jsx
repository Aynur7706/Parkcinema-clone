import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

function TheatreCard({item}) {
    const navigator = useNavigate()
    const handler = () => {
        navigator(`/theatres-detail/${item.id}`)
    }
  return (
    <div onClick={handler} className=' rounded-2xl p-5 bg-[#4D4D4D] flex flex-col items-start'>
        <div className='w-full h-[300px] '>
            <img className='w-full h-full object-cover rounded-t-2xl' src={item.image} alt="" />
        </div>
        <div className='py-4 flex flex-col gap-3 text-[#D9DADB]'>
            <h2 className=' text-lg'>{item.displayName || item.name}</h2>
            <div className='flex items-center gap-2'>
                <FaClock />
                <span>{item.hours}</span>
            </div>
            <div className='flex items-center gap-2'>
                <FaLocationDot />
                <span>{item.address}</span>
            </div>
            <div className='flex items-center gap-2'>
                <FaPhoneAlt />
                <span>{item.phone}</span>
            </div>
            <p className='text-[18px] line-clamp-3'>
                {item.description}
            </p>
        </div>
    </div>
  )
}

export default TheatreCard
