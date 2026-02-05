/**
 * StoryContact - Acto 7: Contacto + Footer
 * Contact information and footer combined
 */

import { FadeInView } from '~/components/animations/FadeInView'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Badge, Footer } from '~/components/ui'
import { CONTACT } from '~/lib/constants'

export function StoryContact () {
  const { t } = useTranslation()
  return (
    <section id="contacto" className="relative w-full overflow-hidden bg-black">
      {/* Background - Layered nebulas for parallax depth */}
      <div className="absolute inset-0">
        <StarField starCount={30} parallaxEnabled />
        {/* Capa 1 - Fondo profundo */}
        <NebulaOrb
          color="rgba(219, 1, 58, 0.1)"
          size={700}
          position={{ x: '70%', y: '30%' }}
          blur={140}
        />
        {/* Capa 2 - Media */}
        <NebulaOrb
          color="rgba(59, 130, 246, 0.08)"
          size={400}
          position={{ x: '20%', y: '50%' }}
          blur={100}
        />
        {/* Capa 3 - Cercana */}
        <NebulaOrb
          color="rgba(139, 92, 246, 0.08)"
          size={300}
          position={{ x: '60%', y: '70%' }}
          blur={70}
        />
      </div>

      {/* Gradient overlays for smooth transitions */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Contact section */}
      <div className="relative z-10 py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact info */}
            <div>
              <div className="text-center md:text-left">
                <FadeInView direction="up">
                  <Badge className="mb-4">{t('contact.badge')}</Badge>
                </FadeInView>
                <FadeInView direction="up" delay={0.1}>
                  <h2 className="mb-8 font-montserrat text-3xl font-bold text-white md:text-4xl">
                    {t('contact.title')}
                    <br />
                    <span className="text-brand">{t('contact.titleHighlight')}</span>
                  </h2>
                </FadeInView>
              </div>

              <div className="space-y-6">
                <FadeInView direction="up" delay={0.2}>
                  <ContactItem
                    icon={MapPinIcon}
                    title={t('contact.address')}
                    content="Av. Túpac Amaru 210, Rímac, Lima, Perú"
                    href="https://maps.google.com/?q=Universidad+Nacional+de+Ingenieria+Peru"
                  />
                </FadeInView>

                <FadeInView direction="up" delay={0.3}>
                  <ContactItem
                    icon={EnvelopeIcon}
                    title={t('contact.email')}
                    content={CONTACT.email}
                    href={`mailto:${CONTACT.email}`}
                  />
                </FadeInView>

                <FadeInView direction="up" delay={0.4}>
                  <ContactItem
                    icon={PhoneIcon}
                    title={t('contact.phone')}
                    content={CONTACT.phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4')}
                    href={`tel:${CONTACT.phone}`}
                  />
                </FadeInView>
              </div>
            </div>

            {/* Map */}
            <FadeInView direction="up" delay={0.3}>
              <div className="h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.8234567890123!2d-77.0504!3d-12.0231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452f4a!2sUniversidad%20Nacional%20de%20Ingenier%C3%ADa!5e0!3m2!1ses!2spe!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación UNI"
                  className="grayscale"
                />
              </div>
            </FadeInView>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer className="relative z-10" />
    </section>
  )
}

interface ContactItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  href: string;
}

function ContactItem ({ icon: Icon, title, content, href }: ContactItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl transition-colors group-hover:bg-brand group-hover:border-brand">
        <Icon className="h-5 w-5 text-gray-300 transition-colors group-hover:text-white" />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-300">{title}</h3>
        <p className="text-white transition-colors group-hover:text-brand">
          {content}
        </p>
      </div>
    </a>
  )
}

