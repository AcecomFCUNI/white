import { BoltIcon, BuildingOfficeIcon, CogIcon, ComputerDesktopIcon, CubeIcon, FireIcon, HomeIcon, RocketLaunchIcon, SignalIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { CountItem } from '~/components'

const Counts: React.FC = () => {
  return (
    <section id="counts" className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-[#db013a] text-sm font-medium uppercase tracking-wider mb-2">Subsistemas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-aos="fade-up">
          <CountItem
            icon={<CubeIcon className="w-6 h-6" />}
            title="Carga útil"
            description="Incluye los instrumentos y equipos necesarios para cumplir con la misión específica del satélite, como cámaras o sensores científicos."
          />
          <CountItem
            icon={<ComputerDesktopIcon className="w-6 h-6" />}
            title="Computadora a bordo"
            description="Controla las funciones del satélite, manejando la complejidad de la misión según criterios de costo, seguridad, autonomía e interacciones."
          />
          <CountItem
            icon={<SignalIcon className="w-6 h-6" />}
            title="Comunicaciones"
            description="Estudia y optimiza sistemas de transmisión y recepción de datos entre el satélite y la estación terrena, asegurando la eficacia y adaptación a la misión."
          />
          <CountItem
            icon={<FireIcon className="w-6 h-6" />}
            title="Control térmico"
            description="Gestiona la temperatura mediante el análisis de factores y materiales especiales que mantienen el satélite en un rango de temperatura adecuado."
          />
          <CountItem
            icon={<CogIcon className="w-6 h-6" />}
            title="Determinación y control de actitud"
            description="Mantiene la posición y orientación adecuada del satélite en órbita usando sensores, mecanismos y algoritmos para corregir desviaciones."
          />
          <CountItem
            icon={<HomeIcon className="w-6 h-6" />}
            title="Estación terrena"
            description="Utiliza componentes COTS y tecnología de radio amateur para establecer enlaces de comunicación, facilitando la transmisión de datos y el control desde la Tierra."
          />
          <CountItem
            icon={<CogIcon className="w-6 h-6" />}
            title="Estructura mecánica"
            description="Diseña y fabrica el marco del CubeSat, permitiendo modificaciones específicas para garantizar la conectividad de todos los sistemas y la precisión."
          />
          <CountItem
            icon={<BuildingOfficeIcon className="w-6 h-6" />}
            title="Manufactura espacial"
            description="Incluye los procesos y técnicas necesarios para la construcción de los componentes, garantizando la calidad, precisión y resistencia de los materiales."
          />
          <CountItem
            icon={<BoltIcon className="w-6 h-6" />}
            title="Potencia"
            description="Encargado de la generación, regulación y distribución de la energía, mediante paneles solares, baterías y reguladores. Garantiza el funcionamiento continuo."
          />
          <CountItem
            icon={<RocketLaunchIcon className="w-6 h-6" />}
            title="Propulsión"
            description="Controla el movimiento y la posición del CubeSat en el espacio. Incluye sistemas que ajustan la órbita del satélite manteniendo la trayectoria deseada."
          />
        </div>
      </div>
    </section>
  )
}

export { Counts }
