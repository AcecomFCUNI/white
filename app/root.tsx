import { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import '~/assets/css/style.css'
import './tailwind.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

export const links: LinksFunction = () => {
  return [
    // Google Fonts
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i'
    },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
  ]
}

export function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/assets/img/logo.png" rel="icon" />
        <link href="/assets/img/logo.png" rel="apple-touch-icon" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {/* <a href=" " className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a> */}
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return (
    <>
      <Outlet />
    </>
  )
}
