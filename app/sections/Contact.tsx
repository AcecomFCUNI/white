import React from 'react'

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="mb-10" data-aos="fade-up">
          <p className="text-3xl font-bold uppercase text-gray-800">Contáctanos</p>
        </div>
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full lg:w-2/3 px-4" data-aos="fade-right" data-aos-delay="100">
            <div className="bg-white">
              <div className="mb-10">
                <div className="flex items-center">
                  <div className="bg-gray-100 w-11 h-11 rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:bg-[#db013a] hover:text-white">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">Dirección:</h4>
                    <p className="text-gray-600">Av. Túpac Amaru 210. Rímac, Lima, Perú</p>
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <div className="bg-gray-100 w-11 h-11 rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:bg-[#db013a] hover:text-white">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">E-mail:</h4>
                    <p className="text-gray-600">chasquiII@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <div className="bg-gray-100 w-11 h-11 rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:bg-[#db013a] hover:text-white">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">Celular:</h4>
                    <p className="text-gray-600">+51 9XX XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4" data-aos="fade-right" data-aos-delay="200">
            <div className="relative w-full h-0 pb-[75%]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.2776404530614!2d-77.04977309025199!3d-12.024397188161501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf237c9e3933%3A0x3b4741cbd0de0e20!2sAv.%20T%C3%BApac%20Amaru%20210%2C%20R%C3%ADmac%2015333!5e0!3m2!1ses-419!2spe!4v1711348212464!5m2!1ses-419!2spe"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Contact }
