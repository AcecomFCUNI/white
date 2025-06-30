import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Registrarse - Chasqui II' },
    { name: 'description', content: 'Crea tu cuenta en Chasqui II' }
  ]
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    
    // Handle registration logic here
    console.log('Registration attempt:', formData)
  }

  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic here
    console.log('Google sign-up attempt')
  }

  return (
    <div className="min-h-screen w-full relative" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/img/login-background.jpg"
          alt="Space Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        {/* Register Card */}
        <div className="w-full max-w-lg">
          <div 
            className="bg-white rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)] p-12"
            style={{ width: '552px', minHeight: '580px' }}
          >
            <div className="flex flex-col justify-between h-full">
              
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-[32px] font-semibold text-[#050505] leading-tight">
                  Crear cuenta
                </h2>
              </div>

              {/* Register Form */}
              <div className="flex-1 flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Create Inputs */}
                  <div className="space-y-3">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label 
                        htmlFor="email" 
                        className="block text-[16px] font-semibold text-[#050505] tracking-[0.5px]"
                      >
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[#CA093C] rounded-lg bg-white text-[16px] tracking-[0.5px] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#CA093C] focus:border-transparent transition duration-300"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label 
                        htmlFor="password" 
                        className="block text-[16px] font-semibold text-[#050505] tracking-[0.5px]"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[#CA093C] rounded-lg bg-white text-[16px] tracking-[0.5px] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#CA093C] focus:border-transparent transition duration-300"
                          placeholder="Ingresa tu contraseña"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label 
                        htmlFor="confirmPassword" 
                        className="block text-[16px] font-semibold text-[#050505] tracking-[0.5px]"
                      >
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-[#CA093C] rounded-lg bg-white text-[16px] tracking-[0.5px] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#CA093C] focus:border-transparent transition duration-300"
                          placeholder="Repite tu contraseña"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Create Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#CA093C] text-white font-semibold text-[20px] py-4 px-8 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#a0072f] transition duration-300 tracking-[0.5px]"
                  >
                    Crear cuenta
                  </button>

                  {/* Google Sign Up Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full bg-white border border-gray-200 text-[rgba(0,0,0,0.54)] font-semibold text-[20px] py-4 px-4 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-4"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <span>Crear con Google</span>
                  </button>
                </form>
              </div>

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[16px] text-[rgba(0,0,0,0.4)] tracking-[0.5px]">
                    ¿Ya tienes cuenta?
                  </span>
                  <Link
                    to="/login"
                    className="text-[16px] font-medium text-[#000000] tracking-[0.5px] hover:underline transition duration-300"
                  >
                    Ingresar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="absolute bottom-6 left-6 z-20">
        <Link
          to="/"
          className="text-white hover:text-gray-300 transition duration-300 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
} 