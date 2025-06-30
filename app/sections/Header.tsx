import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { Link as RemixLink } from '@remix-run/react'

const Header = () => {
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileNavActive, setMobileNavActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('load', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleScroll)
    }
  }, [])

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive)
  }

  const menuItems = [
    ['hero', 'Home'],
    ['features', 'Nosotros'],
    ['testimonials', 'Directiva'],
    ['partners', 'Alianzas'],
    ['news', 'Noticias'],
    ['contact', 'Contacto']
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex items-center transition-all duration-500 z-[997] w-full
        ${headerScrolled ? 'bg-black/70 h-[70px]' : 'bg-transparent h-[80px]'}`}
    >
      <div className="container mx-auto px-4 flex justify-around items-center">
        <div className={`logo ${headerScrolled ? 'absolute left-1/2 transform -translate-x-1/2' : ''}`}>
          <h1 className="text-white text-2xl font-extrabold flex items-center">
            <img src="/assets/img/logo.png" alt="Logo" className="mr-2 h-10" />
            <a href="/" className="hover:text-white">
              <span>Chasqui II</span>
            </a>
          </h1>
        </div>
        <nav className={`
          ${mobileNavActive ? 'block' : 'hidden'} 
          md:block 
          transition-opacity duration-300 ease-in-out
          ${headerScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'}
        `}>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {menuItems.map(([to, name]) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth={true}
                  duration={500}
                  className="text-gray-300 hover:text-white text-sm font-semibold transition duration-300 ease-in-out cursor-pointer"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Auth Links */}
        <div className={`
          ${mobileNavActive ? 'block' : 'hidden'} 
          md:flex md:items-center md:space-x-4
          transition-opacity duration-300 ease-in-out
          ${headerScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'}
        `}>
          <RemixLink
            to="/login"
            className="text-gray-300 hover:text-white text-sm font-semibold transition duration-300 ease-in-out"
          >
            Iniciar Sesión
          </RemixLink>
          <RemixLink
            to="/register"
            className="bg-[#db013a] hover:bg-[#6f001c] text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out"
          >
            Registrarse
          </RemixLink>
        </div>
        <button
          className={`md:hidden text-white focus:outline-none 
            transition-opacity duration-300 ease-in-out
            ${headerScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'}
          `}
          onClick={toggleMobileNav}
        >
          {mobileNavActive
            ? (
            <XMarkIcon className="h-6 w-6" />
              )
            : (
            <Bars3Icon className="h-6 w-6" />
              )}
        </button>
      </div>
    </header>
  )
}

export { Header }
