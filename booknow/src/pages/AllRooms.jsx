import React from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const AllRooms = () => {
  const navigate= useNavigate()
  
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 
    md:pt-35 px-4 md:px-16 lg:px-24 xl:pt-32'>
      {/* {left side} */}
        <div>
          <div className='flex flex-col items-start text-left'>
            <h1 className='font-playfair text-4xl md:text-[40px]'>HOTEL ROOMS</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
              these are the rooms in our website which are well organized
               and mentained with variety of facilities and price ranges
            </p>
          </div>
          {roomsDummyData.map((room)=>(
            <div className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0' key={room._id}>
              <img className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
              onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
              src={room.images[0]} alt="hptel-img" title='view room details'/>
              <div className='md:w-1/2 flex flex-col gap-2 '>
                <p className='text-gray-500'>{room.hotel.city}</p>
                <p onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} className='text-gray-800 text-3xl font-playflair cursor-pointer'>{room.hotel.name}</p>
                <div className='flex items-center'>
                  <starRating/>
                  <p className='ml-2'> 200+ reviews</p>
                </div>
                <div className='felx items-center gap-1 text-gray-500 mt-2 text-sm'>
                  <img src={assets.locationIcon} alt="locationIcon" />
                  <span>{room.hotel.address}</span>
                </div>
                {/* room Amenities */}
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                  {room.amenities.map((item,index)=>(
                    <div key={index} className='felx items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                      <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                      <p className='text-xs'>{item}</p>
                    </div>
                  ))}
                </div>
                {/* room price per night */}
                <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AllRooms