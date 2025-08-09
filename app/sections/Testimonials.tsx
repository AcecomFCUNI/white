import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Testimonial } from '~/components'
import getMembers from '~/database/queries/members'

const Testimonials: React.FC = () => {
  const members = getMembers() // Cuando se añada un backend, esto debe ir en un loader, aqui simplemente lo llamo como una funcion y luego lo renderizo directamente

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
          {members.map(member => (
            <SwiperSlide key={member.id}>
              <Testimonial
                name={member.displayname}
                position={member.position}
                testimonial={member.phrase}
                img={member.displayname}
              />
            </SwiperSlide>
          ))}
          {/* Puedes añadir más SwiperSlides aquí según sea necesario */}
        </Swiper>
      </div>
    </section>
  )
}

export { Testimonials }
