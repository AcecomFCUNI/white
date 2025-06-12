import React from 'react'

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="w-full md:w-1/3 px-4 mb-8">
      <div
        className="bg-white rounded-3xl p-6 transition duration-300 ease-in-out hover:bg-gray-100"
        data-aos="zoom-in"
        data-aos-delay="50"
      >
        <div className="text-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{title}</h3>
        <p className="text-sm text-gray-600 font-montserrat text-center">{description}</p>
      </div>
    </div>
  )
}

export { Feature }
