import type { MetaFunction } from '@remix-run/node'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Contact, Counts, Features, Footer, Header, Hero, Invest, JoinUs, News, Partners, SupportUs, Testimonials } from '~/sections'

export const meta: MetaFunction = () => {
  return [
    { title: 'Chasqui II' },
    { name: 'Chasqui II', content: 'Chasqui II' }
  ]
}

export default function Index () {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])
  return (
   <>
    <Header />
    <Hero />
    <main id="main">
      <Features />
      <Counts />
      <Testimonials />
      <Partners />
      <JoinUs />
      <SupportUs />
      <Invest />
      <News />
      <Contact />
    </main>
    <Footer />

   </>
  )
}
