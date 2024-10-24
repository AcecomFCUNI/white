import React from 'react'
import { Partner } from '~/components'

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="mb-10" data-aos="fade-up">
          <h2 className="text-3xl font-bold uppercase text-gray-800">Alianzas</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          <Partner
            img="/assets/img/partners/ctic-logo.jpg"
            alt="CTIC UNI - Laboratorio"
            delay={100}
          />
          <Partner
            img="/assets/img/partners/aess-logo.png"
            alt="IEEE AESS UNI"
            delay={200}
          />
          <Partner
            img="/assets/img/partners/ACECOM.png"
            alt="ACCECOM"
            delay={300}
          />
          <Partner
            img="/assets/img/partners/01%20GRAVIIT%20Space%20-%20Logo%20Negro.png"
            alt="GRAVIT SPACE"
            delay={400}
          />
        </div>
      </div>
    </section>
  )
}

export { Partners }
