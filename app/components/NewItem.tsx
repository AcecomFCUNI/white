import React from 'react'

// Definimos las propiedades que el componente espera recibir
interface NewItemProps {
  title: string;
  description: string;
  img: string;
  href: string;
}

const NewItem: React.FC<NewItemProps> = ({ title, description, img, href }) => {
  return (
    <div className="bg-[#ced3dd21] bg-opacity-13 rounded-3xl p-5 text-white transition duration-300 hover:bg-[#ced3dd47]">
      <img src={`/assets/img/news/${img}.png`} alt={title} className="w-full h-auto rounded-2xl mb-3" />
      <h5 className="text-lg font-semibold mb-2">{title}</h5>
      <p className="mb-3 text-sm">{description}</p>
      <a href={href} className="text-brand font-semibold hover:underline text-sm">
        Leer Más →
      </a>
    </div>
  )
}

export { NewItem }
