import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 md:py-10">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">About Chasqui II</h3>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="space-x-4">
              <a href="https://web.facebook.com/CHASQUI2UNI?_rdc=1&_rdr" target="_blank" rel="noreferrer" className="inline-block w-12 h-12 bg-gray-100 rounded-full relative transition-all duration-300 hover:bg-[#db013a] group">
                <FacebookIcon className="h-6 w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black group-hover:text-white" />
              </a>
              <a href="https://www.instagram.com/chasqui.ll.peru/" target="_blank" rel="noreferrer" className="inline-block w-12 h-12 bg-gray-100 rounded-full relative transition-all duration-300 hover:bg-[#db013a] group">
                <InstagramIcon className="h-6 w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/company/chasqui-2/" target="_blank" rel="noreferrer" className="inline-block w-12 h-12 bg-gray-100 rounded-full relative transition-all duration-300 hover:bg-[#db013a] group">
                <LinkedinIcon className="h-6 w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">&copy; Copyright Chasqui II.</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
