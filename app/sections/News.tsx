import React from 'react'
import { NewItem } from '~/components'

const News: React.FC = () => {
  return (
    <section id="news" className="bg-black py-16">
      <div className="container mx-auto">
        <div className="mb-10" data-aos="fade-up">
          <p className="text-3xl font-bold uppercase text-white">Noticias</p>
        </div>
        <div className="mb-10" data-aos="fade-up">
          <h2 className="text-[#db013a] text-sm font-medium uppercase tracking-wider mb-2">Próximamente</h2>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-7/12 px-4 mb-8 lg:mb-0">
            {/* Noticia destacada */}
            <div className="bg-[#ced3dd21] bg-opacity-13 rounded-3xl p-6 text-white hover:bg-[#ced3dd47]">
              <img
                src="/assets/img/news/6.png"
                alt="Noticia Principal"
                className="w-full h-auto rounded-2xl mb-4"
              />
              <h5 className="text-xl font-semibold mb-2">FLIT</h5>
              <p className="mb-4">
                Chasqui II presente en el FLIT Arequipa el 12 y 13 de julio. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
              </p>
              <a href=" " className="text-[#db013a] font-semibold hover:underline">
                Leer Más →
              </a>
            </div>
          </div>
          <div className="w-full lg:w-5/12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NewItem
                title="Academia"
                description="Conferencia presentada por la UNI - ONU."
                img="2"
                href="#"
              />
              <NewItem
                title="UNITEC"
                description="Chasqui II presente en UNITEC el 16 y 17 de noviembre."
                img="3"
                href="#"
              />
              <NewItem
                title="APSCO"
                description="Etapas en la competencia de APSCO, informe de Chasqui II."
                img="4"
                href="#"
              />
              <NewItem
                title="IAC"
                description="Presentación de 10 papers en el congreso de Milan - Italia."
                img="5"
                href="#"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { News }
