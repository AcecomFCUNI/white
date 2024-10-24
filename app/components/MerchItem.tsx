import React from 'react'

// Definimos las propiedades que el componente espera recibir
interface MerchItemProps {
  title: string;
  price: string;
  img: string;
}

const MerchItem: React.FC<MerchItemProps> = ({ title, price, img }) => {
  return (
    <div className="mb-8" data-aos="zoom-in" data-aos-delay="50">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <img src={`/assets/img/merch/${img}.png`} className="w-full h-auto p-5" alt={title} />
        <div className="p-6">
          <h5 className="text-xl font-bold mb-2">{title}</h5>
          <p className="text-gray-700">Precio: S/. {price}</p>
        </div>
      </div>
    </div>
  )
}

export { MerchItem }
