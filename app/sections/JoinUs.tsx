import React from 'react'

const JoinUs: React.FC = () => {
  return (
    <section id="unete" className="bg-black py-[70px]">
      <div className="container mx-auto" data-aos="fade-up">
        <div className="mb-10">
          <p className="text-3xl font-bold uppercase text-white">Únete</p>
        </div>
        <div className="row">
          <div className="w-full lg:w-full">
            <p className="text-white mb-5">
              ¿Quieres estar al tanto de las últimas noticias y novedades de Chasqui II? ¡Únete a nuestra
              comunidad en WhatsApp y sé parte de este emocionante proyecto! Aquí podrás interactuar con otros
              miembros, recibir actualizaciones exclusivas y participar en discusiones sobre nuestras actividades:
            </p>
            <div className="flex justify-center pt-5">
              <a
                href="https://whatsapp.com/channel/0029VajUp5xIiRorqexgbr1h"
                target="_blank"
                className="inline-block px-8 py-3 text-white bg-[#db013a] rounded-md transition duration-500 hover:bg-[#6f001c] font-medium text-base"
                rel="noreferrer"
              >
                Únete a la comunidad de Chasqui II
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { JoinUs }
