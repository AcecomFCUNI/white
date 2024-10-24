import { BeakerIcon, CogIcon, MegaphoneIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Feature } from '~/components'

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">NUESTRO EQUIPO</h2>
          <p className="text-sm font-medium uppercase tracking-wider text-[#db013a]">Áreas</p>
        </div>

        <div className="flex flex-wrap justify-center -mx-4" data-aos="fade-up">
          <Feature
            title="Diseño y publicidad"
            description="Se encarga de la creación de conceptos visuales atractivos y estrategias de marketing efectivas para la identidad del proyecto."
            icon={<MegaphoneIcon className="h-16 w-16 text-[#db013a] mx-auto" />}
          />
          <Feature
            title="Gestión y logística"
            description="Asegura la operatividad del proyecto gestionando aspectos como la cadena de suministro, el cronograma de actividades y la asignación de responsabilidades."
            icon={<CogIcon className="h-16 w-16 text-[#db013a] mx-auto" />}
          />
          <Feature
            title="STEM"
            description="Fomenta la investigación y aplicación de conocimientos en ciencia, tecnología, ingeniería y matemáticas para el proyecto promoviendo la innovación."
            icon={<BeakerIcon className="h-16 w-16 text-[#db013a] mx-auto" />}
          />
        </div>
      </div>
    </section>
  )
}

export { Features }
