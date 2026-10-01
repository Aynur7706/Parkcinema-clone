import TheatreCard from "../components/TheatreCard.jsx"

import { theatres } from "../data/theatres.js";

function TheatreListPage() {

  return (
    <div className="mt-32 px-3 md:px-0 pb-10 w-full md:w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {
                theatres.map((item,index) => <TheatreCard key={index} item = {item}/> )
            }
            
        </div>
    </div>
  )
}

export default TheatreListPage