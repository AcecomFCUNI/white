import React from 'react'

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <video
        autoPlay
        muted
        loop
        id="hero-video"
        className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2"
      >
        <source src="/assets/img/EDIT2.mp4" type="video/mp4" />
      </video>
      <div className="relative z-20 container mx-auto px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="lg:w-7/12 pt-5 lg:pt-0 order-2 lg:order-1 flex items-center" data-aos="fade-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Lanzamiento del CubeSat 3U. <span className="border-b-4 border-[#db013a]">Próximamente...</span>
              </h1>
              <h2 className="text-xl text-white mb-10">Forma parte de esta aventura</h2>
              <div className="text-center lg:text-left">
                <a
                  href="#unete"
                  className="bg-[#db013a] hover:bg-[#6f001c] text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out inline-block hover:text-white"
                >
                  Apóyanos
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-5/12 order-1 lg:order-2 mb-10 lg:mb-0" data-aos="fade-left" data-aos-delay="200">
            <img src="/assets/img/chasqui-logo.png" className="w-full max-w-md mx-auto" alt="Chasqui Logo" />
          </div>
        </div>
      </div>
      <div className="wave-container absolute bottom-0 left-0 w-full overflow-hidden text-white">

      <svg
        className="waves"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" fill="#db013a" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="currentColor" fillOpacity="0.7" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="currentColor" fillOpacity="0.5" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="currentColor" fillOpacity="0.3" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="currentColor" />
        </g>
      </svg>
      </div>
    </section>
  )
}

export { Hero }
