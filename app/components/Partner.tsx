import React from 'react'

interface PartnerProps {
  img: string;
  alt: string;
  delay: number;
}

const Partner: React.FC<PartnerProps> = ({ img, alt, delay }) => {
  return (
    <div
      className="lg:w-1/4 md:w-5/12 text-center"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="p-5 m-5 rounded-lg transition-all duration-300 ease-in-out hover:transform hover:scale-110">
        <img src={img} alt={alt} className="max-w-[200px] mx-auto mb-2.5" />
      </div>
    </div>
  )
}

export { Partner }
