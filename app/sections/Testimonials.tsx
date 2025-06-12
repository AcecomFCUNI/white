import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Testimonial } from '~/components'

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 relative testimonials overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 1
            },
            1024: {
              slidesPerView: 1
            }
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Testimonial
              name="Raul Figueroa"
              position="Director"
              testimonial="Hay que darnos un espacio, para el espacio."
              img="usuario"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              name="Jairo Solano"
              position="Coordinador"
              testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              img="usuario"
            />
          </SwiperSlide>
          {/* Puedes añadir más SwiperSlides aquí según sea necesario */}
        </Swiper>
      </div>
    </section>
  )
}

export { Testimonials }
