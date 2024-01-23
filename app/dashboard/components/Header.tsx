import Image from "next/image"
import Logo from '@/public/2Docs.svg'
import Ring from '@/public/Dashboard/ring.svg'
import Link from 'next/link';
import User from '@/public/Dashboard/user.svg'
import Sair from '@/public/Dashboard/sair.svg'
import Correct from '@/public/Dashboard/correct.svg'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

import * as Popover from '@radix-ui/react-popover';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { usePathname } from 'next/navigation';

import { getAuth, signOut } from "firebase/auth";
import { updateUser } from "@/utils/firebase/userManager";

type Props = {
  company_name: string | undefined;
}

type hoverType = {
  left: undefined | number
  width: undefined | number
}

export default function Header({company_name}: Props) {
  const pathname = usePathname()
  const [hover, setHover] = useState<hoverType>({left:0, width:0})
  const {user, setUser} = useContext(UserContext)

  const Ref1 = useRef<HTMLAnchorElement>(null)
  const Ref2 = useRef<HTMLAnchorElement>(null)
  const Ref3 = useRef<HTMLAnchorElement>(null)
  const Ref4 = useRef<HTMLAnchorElement>(null)

  const [feed, setFeed] = useState('')
  const [emoji, setEmoji] = useState('')
  const [isFeedBackSend, setIsFeedBackSend] = useState(false)
  const [sendFeedbackLoading, setSendFeedbackLoading] = useState(false)

  const toggleGroupItemClasses =
  'hover:bg-neutral-700 color-neutral-800 data-[state=on]:bg-emerald-500/40 flex h-[35px] w-[35px] items-center justify-center bg-neutral-500/30 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

  function ChangeBackgroundHover(button: string){
    var width, left

    if(button === 'button1'){
      width = Ref1.current?.offsetWidth
      left = 0
    }

    if(button === 'button2'){
      width = Ref2.current?.offsetWidth
      left = Number(Ref1.current?.offsetWidth)
    }

    if(button === 'button3'){
      left = Number(Ref1.current?.offsetWidth) + Number(Ref2.current?.offsetWidth)
      width = Ref3.current?.offsetWidth
    }

    if(button === 'button4'){
      left = Number(Ref1.current?.offsetWidth) + Number(Ref2.current?.offsetWidth) + Number(Ref3.current?.offsetWidth)
      width = Ref4.current?.offsetWidth
    }

    setHover({left:left, width:width})
  }

  async function sendFeed() {
    setSendFeedbackLoading(true)

    const data = {
      name: user?.name,
      email: user?.email,
      feed,
      emoji
    }

    try{
      const result = await axios.post(`/api/sendEmail/feedback`, data)
      if(result.status === 200){
        await updateUser({
          id_company: user?.id_company!,
          id: user?.id!,
          data: {
            tickets: user?.tickets ? [
              ...user?.tickets,
              {
                id: uuidv4().substring(0, 5),
                msg: data.feed,
                date: new Date().toUTCString()
              }
            ] : [
              {
                id: uuidv4().substring(0, 5),
                msg: data.feed,
                date: new Date().toUTCString()
              }
            ]
          }
        })

        setUser(() => {
          if(user) {
            return {
              ...user,
              tickets: user?.tickets ? [
                ...user?.tickets,
                {
                  id: uuidv4().substring(0, 5),
                  msg: data.feed,
                  date: new Date().toUTCString()
                }
              ] : [
                {
                  id: uuidv4().substring(0, 5),
                  msg: data.feed,
                  date: new Date().toUTCString()
                }
              ]
            }
          } else {
            return null
          }
        })

        setSendFeedbackLoading(false)
        setIsFeedBackSend(true)
      }
    }catch(e){
        throw Error
    }
  }

  return (
    <>
      <header className="flex justify-between container py-4">
        <div className="flex gap-3 items-center">
          <Image src={Logo} width={50} alt='Logo' className="max-xs:w-[30px]"></Image>
          <p className="max-xs:hidden before:w-[3px] before:h-[20px] before:bg-neutral-500 before:inline-block before:mr-3 before:rounded-full before:align-sub">{company_name}</p>
        </div>

        <div className="flex items-center">
        <Popover.Root>
            <Popover.Trigger asChild>
              <button className="max-xs:text-[10px] border-2 border-neutral-500 rounded-lg xs:px-4 max-xs:px-2 xs:h-[35px] max-xs:h-[25px] text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/80 duration-100">Feedback</button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={`z-40 rounded p-5 ${isFeedBackSend ? 'bg-emerald-500/30' : 'bg-neutral-500/30'} mt-1 backdrop-blur-lg shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade`}
                sideOffset={5}
              >
                {isFeedBackSend ? 
                  <div className="flex items-center flex-col">
                    <Image src={Correct} alt='correct' width={40} height={40}></Image>
                    <h3 className="text-[20px] font-semibold my-3 max-w-[300px]"><span className="text-emerald-500">Obrigado</span>, seu feedback foi enviado.</h3>
                    <p className="max-w-[300px]">🎁 Fique de olho no seu email, talvez mandaremos um presente de agradecimento!</p>
                  </div> 
                  :
                  <div className="flex flex-col">
                    <textarea name="ticket" id="ticket" value={feed} cols={22} rows={3} className='text-neutral-200 bg-neutral-600/60 p-2 text-[14px]' placeholder="Escreva aqui o seu ticket" onChange={(e) => setFeed(e.target.value)}></textarea>
                    <div className="flex justify-between mt-4 items-center">
                      <div className="flex gap-2 bg-neutral-700 rounded-md px-2 py-1">
                      <ToggleGroup.Root
                        className="flex rounded"
                        type="single"
                        defaultValue="center"
                        aria-label="Text alignment"
                        onValueChange={(option) => setEmoji(option)}
                      >
                        <ToggleGroup.Item className={toggleGroupItemClasses} value="😀" aria-label="Left aligned">
                          😀
                        </ToggleGroup.Item>
                        <ToggleGroup.Item className={toggleGroupItemClasses} value="🥹" aria-label="Center aligned">
                          🥹
                        </ToggleGroup.Item>
                        <ToggleGroup.Item className={toggleGroupItemClasses} value="😎" aria-label="Center aligned">
                          😎
                        </ToggleGroup.Item>
                        <ToggleGroup.Item className={toggleGroupItemClasses} value="😢" aria-label="Right aligned">
                          😢
                        </ToggleGroup.Item>
                      </ToggleGroup.Root>
                      </div>
                      <button className="bg-neutral-600 px-4 py-2 rounded-md border border-neutral-400 text-[14px] font-medium hover:opacity-70 duration-100 flex justify-center text-center" onClick={() => {
                        if(feed != '') {
                          sendFeed()
                        }
                      }}>{sendFeedbackLoading ? 
                          <svg className="h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg> 
                      : 'Enviar'}</button>
                    </div>
                  </div>
                }
                <Popover.Arrow className="fill-neutral-600" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Image src={user?.photo ? user?.photo : ''} alt="Randon Image" className="rounded-full mr-3 ml-8 max-xs:ml-4 cursor-pointer w-[40px] h-[40px]" width={40} height={40}></Image>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-40 rounded p-5 bg-neutral-500/30 backdrop-blur-lg shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <div className="flex flex-col gap-1">
                  <Link className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5 text-neutral-200 flex gap-4 hover:bg-neutral-600/50 duration-100 rounded-md p-2" href={'/dashboard/perfil'}><Image src={User} alt='user' width={15}></Image> Editar perfil</Link>
                  <p className="text-mauve12 text-[15px] leading-[19px] font-semibold mb-2.5 text-red-600 cursor-pointer flex gap-4 hover:bg-neutral-600/50 duration-100 rounded-md p-2" 
                    onClick={() => {
                      const auth = getAuth();
                      signOut(auth)
                    }}
                  ><Image src={Sair} alt='user' width={15}></Image> Sair</p>
                </div>
                <Popover.Arrow className="fill-neutral-600" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
             <Image src={Ring} alt='notification' className="cursor-pointer hover:opacity-70 duration-100 max-xs:w-[15px]"></Image>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-40 rounded p-5  backdrop-blur-lg mt-3 h-[300px] w-[250px] bg-emerald-500/20  shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <div className="flex flex-col gap-2.5">
                  <p className="font-semibold border-b-2 border-neutral-200 pb-1 text-neutral-200">Notificações</p>
                </div>
                <Popover.Arrow className="fill-emerald-600" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </header>

      <nav className="border-b-2 border-neutral-500 mt-2 py-2 w-full justify-center flex">
        <ul className="flex relative group">
          <li className={`${pathname == '/dashboard' ? 'border-b-2 border-neutral-300 mb-[-10px]' : ''} z-20`}>
              <Link 
                ref={Ref1}
                onMouseEnter={() => ChangeBackgroundHover('button1')}
                href="/dashboard" 
                className={`max-xs:text-[14px] cursor-pointer  py-2 rounded-md xs:px-8 max-xs:px-4 duration-150  ${pathname == '/dashboard' ? 'text-neutral-200 font-medium' : 'text-neutral-500 font-light'} mb-[-2px]`}>
                Início
              </Link>
          </li>
          
          <li className={`${pathname == '/dashboard/admins' ? 'border-b-2 border-neutral-300 mb-[-10px]' : ''} z-20`}>
            <Link 
              onMouseEnter={() => ChangeBackgroundHover('button2')}
              ref={Ref2}
              href="/dashboard/admins" 
              className={`max-xs:text-[14px] cursor-pointer py-2 rounded-md xs:px-8 max-xs:px-4 duration-150 border-neutral-300 ${pathname == '/dashboard/admins' ? 'text-neutral-200 font-medium' : 'text-neutral-500 font-light'} mb-[-2px]`}>
              Admins
            </Link>
          </li>

          <li className={`${pathname == '/dashboard/assinatura' ? 'border-b-2 border-neutral-300 mb-[-10px]' : ''} z-20`}>
            <Link 
              onMouseEnter={() => ChangeBackgroundHover('button3')}
              ref={Ref3}
              href="/dashboard/assinatura" 
              className={`max-xs:text-[14px] cursor-pointer py-2 rounded-md xs:px-8 max-xs:px-4 duration-150 border-neutral-300 ${pathname == '/dashboard/assinatura' ? 'text-neutral-200 font-medium' : 'text-neutral-500 font-light'} mb-[-2px]`}>
              Assinatura
            </Link>
          </li>

          <li className={`${pathname == '/dashboard/logs' ? 'border-b-2 border-neutral-300 mb-[-10px]' : ''} z-20`}>
            <Link 
              onMouseEnter={() => ChangeBackgroundHover('button4')}
              ref={Ref4}
              href="/dashboard/logs" 
              className={`max-xs:text-[14px] cursor-pointer py-2 rounded-md xs:px-8 max-xs:px-4 duration-150 border-neutral-300 ${pathname == '/dashboard/logs' ? 'text-neutral-200 font-medium' : 'text-neutral-500 font-light'} mb-[-2px]`}>
              Logs
            </Link>
          </li>
          <div className={`hidden group-hover:block absolute bg-neutral-700/70 h-[40px] duration-200 rounded-md mt-[-10px]`} style={{width:`${hover.width}px`, marginLeft:`${hover.left}px`}}/>
        </ul>
      </nav>
    </>
  )
}
