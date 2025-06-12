import { UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface TestimonialProps {
  name: string;
  position: string;
  testimonial: string;
  img: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, position, testimonial, img }) => {
  return (
    <div className="flex flex-col items-center p-6 space-y-4 rounded-lg  h-full">
      <img src={`/assets/img/directiva/${img}.jpg`} className="w-24 h-24 rounded-full border-4 border-red-400" alt={name} />
      <div className="text-center">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-200">{position}</p>
      </div>
      <UserCircleIcon className="w-8 h-8 text-red-400" />
      <p className="text-center text-white italic">{testimonial}</p>
    </div>
  )
}

export { Testimonial }
