import React from 'react'

interface CountItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CountItem: React.FC<CountItemProps> = ({ icon, title, description }) => {
  return (
    <div className=" rounded-lg p-6 text-center transition-all duration-300 hover:bg-[rgba(206,211,221,0.28)]">
      <div className="relative mb-8">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[rgba(219,1,58,0.62)] rounded-full p-3">
          {icon}
        </div>
      </div>
      <h3 className="text-white text-lg font-bold mb-4">{title}</h3>
      <p className="text-white text-sm">{description}</p>
    </div>
  )
}

export { CountItem }
