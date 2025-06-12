import React from 'react'
import { MerchItem } from '~/components'

const SupportUs: React.FC = () => {
  return (
    <section id="ayudanos" className="py-16">
      <div className="container mx-auto" data-aos="fade-up">
        <div className="mb-10">
          <p className="text-3xl font-bold uppercase text-gray-800">AYÚDANOS</p>
        </div>
        <div className="space-y-6">
          <p className="text-gray-700">
            Tu apoyo es fundamental para el éxito de Chasqui II. Puedes contribuir a nuestro proyecto a través de
            las siguientes opciones de donación:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Yape:</strong> 9XX XXX XXX
            </li>
            <li>
              <strong>Plin:</strong> 9XX XXX XXX
            </li>
            <li>
              <strong>Banco:</strong> XXXX XXXX XXXX XXXX
            </li>
          </ul>
          <p className="text-gray-700">Si deseas gestionar tu donación directamente, por favor contáctanos para más información.</p>
          <p className="text-gray-700">Celular: +51 940 186 040</p>

          <div className="mt-16">
            <div className="mb-10" data-aos="fade-up">
              <h3 className="text-2xl font-semibold text-[#db013a] uppercase">Merch</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MerchItem title="Tazas" price="12.00" img="15" />
              <MerchItem title="Llaveros" price="5.00" img="31" />
              <MerchItem title="Polos" price="50.00" img="22" />
            </div>
          </div>

          <div className="mt-16" data-aos="fade-up">
            <h3 className="text-2xl font-semibold text-[#db013a] uppercase mb-6">Cursos</h3>
            <p className="text-gray-700">
              ¡Próximamente ofreceremos cursos en diversas áreas! Mantente atento para más detalles y fechas de
              inscripción.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SupportUs }
