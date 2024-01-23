'use client';

import Image from "next/image"
import Logo from '@/public/2DocsBlack.svg'
import { Hamburguer } from './Hamburguer'
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/libs/firebase'

function Header() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    function scrollHeader(this: Window) {
      const header: HTMLElement | null = document.getElementById('header')
      if (header) {
        if (this.scrollY >= 50) {
          header.classList.add('bg-[rgba(235,235,235,0.7)]')
          header.classList.add('backdrop-blur-md')
          header.classList.remove("bg-[#ebebeb]")
        } else {
          header.classList.add('bg-[#ebebeb]')
          header.classList.remove('bg-[rgba(235,235,235,0.7)]')
          header.classList.remove('backdrop-blur-md')
        }
      }
    }
    window.addEventListener('scroll', scrollHeader)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true)
      }
    })
  }, [])

  return (
    <header className="bg-[#ebebeb] py-4 fixed z-40 w-screen max-w-[1920px] duration-100 shadow-header" id='header'>
      <div className="container flex gap-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={Logo} width={60} alt='Logo 2Core'></Image>
          <div className="w-[3px] h-[25px] bg-[#ACACAC] rounded-fulla"></div>
          <a href="#" className="font-jost font-[300] text-[24px] text-black cursor-pointer">2Docs</a>
        </div>
        <nav className="flex items-center max-md:hidden">
          <ul className="flex gap-10 max-lg:gap-[20px] font-[500] ">
            <li className="text-[#555555] hover:text-[#000] cursor-pointer after:w-0 after:h-[3px] after:bg-emerald-500 after:block hover:after:w-full hover:after:duration-300 duration-100"><a href="#funcionalidades">Funcionalidades</a></li>
            <li className="text-[#555555] hover:text-[#000] cursor-pointer after:w-0 after:h-[3px] after:bg-emerald-500 after:block hover:after:w-full hover:after:duration-300 duration-100"><a href="#contato">Contato</a></li>
            <li className="text-[#555555] hover:text-[#000] cursor-pointer after:w-0 after:h-[3px] after:bg-emerald-500 after:block hover:after:w-full hover:after:duration-300 duration-100"><a href="#preços">Preços</a></li>
            <li className="text-[#555555] hover:text-[#000] cursor-pointer after:w-0 after:h-[3px] after:bg-emerald-500 after:block hover:after:w-full hover:after:duration-300 duration-100"><a href="#blog">Blog</a></li>
          </ul>
          {
            user ?
              <a href="/dashboard" className="text-[#555555] font-[500] border-2 border-emerald-500 px-6 py-2 rounded-md hover:bg-emerald-500/20 duration-200 ml-10">Dashboard</a>
            : 
              <a href="/login" className="text-[#555555] font-[500] border-2 border-emerald-500 px-6 py-2 rounded-md hover:bg-emerald-500/20 duration-200 ml-10">Login</a>
          }
        </nav>
        {/* Hamburguer menu */}
        <div className="md:hidden">
          <Hamburguer />
        </div>
      </div>
    </header>
  )
}

export default Header