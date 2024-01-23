'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/libs/firebase'
import { useEffect, useState } from 'react';

const Hamburguer = () => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true)
      }
    })
  }, [])
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='font-[500] text-[#555555] hover:text-[#000] duration-100'>Menu</NavigationMenu.Trigger>
          <NavigationMenu.Content className='absolute right-0 bg-[#EBEBEB] px-6 rounded-lg border-2 border-neutral-500 mt-2'>
            <ul className="font-medium">
              <li className="relative text-[#555555] hover:text-[#000] cursor-pointer my-4 before:w-10 before:h-[2px] before:absolute before:bg-emerald-500 before:bottom-0 pb-1"><a href="#funcionalidades">Funcionalidades</a></li>
              <li className="relative text-[#555555] hover:text-[#000] cursor-pointer my-4 before:w-10 before:h-[2px] before:absolute before:bg-emerald-500 before:bottom-0 pb-1"><a href="#price">Preços</a></li>
              <li className="relative text-[#555555] hover:text-[#000] cursor-pointer my-4 before:w-10 before:h-[2px] before:absolute before:bg-emerald-500 before:bottom-0 pb-1"><a href="#equipe">Equipe</a></li>
              {user ?
                <li className="hover:text-emerald-600 cursor-pointer my-4 text-emerald-500"><a href="/dashboard">Dashboard</a></li>
                :
                <li className="hover:text-emerald-600 cursor-pointer my-4 text-emerald-500"><a href="/login">Login</a></li>
              }
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className='z-10 top-[100%] flex items-end justify-center h-2 overflow-hidden'>
          <div className="top-1 relative bg-neutral-500 w-2 h-2 rotate-45" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export { Hamburguer };