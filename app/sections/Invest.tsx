import React from 'react'

const Invest: React.FC = () => {
  return (
    <section id="invierte" className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/assets/img/space.jpg')" }}>
      <div className="container mx-auto" data-aos="fade-up">
        <div className="mb-10">
          <p className="text-3xl font-bold uppercase text-white">INVIERTE</p>
        </div>
        <div className="text-white">
          <p className="mb-4">
            Chasqui II busca patrocinadores que deseen apoyar nuestro crecimiento y desarrollo. Ofrecemos la
            oportunidad de asociar tu marca con nuestra comunidad siempre y cuando se cumplan ciertos requisitos:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Contenido respetuoso y apropiado</li>
            <li>Independencia de grupos políticos</li>
            <li>No pertenecer a entidades religiosas o sociales controvertidas</li>
          </ul>
          <p>
            Si estás interesado en patrocinar a Chasqui II y deseas obtener más información, por favor contacta
            directamente con el Director General.
          </p>
        </div>
      </div>
    </section>
  )
}

export { Invest }
