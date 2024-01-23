'use client';

import verifyEmail from '@/utils/firebase/sendVerificationEmail'
import {auth} from '@/libs/firebase'
import Image from "next/image";
import Email from '@/public/Dashboard/email-verify.svg'
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function Page() {
  const [timeCount, setTimeCount] = useState(120)
  const router = useRouter()

  useEffect(() => { 
      if(localStorage.getItem('verificationEmailSendedTimes') == undefined && auth.currentUser) {
        verifyEmail(auth.currentUser) 
        localStorage.setItem('verificationEmailSendedTimes', JSON.stringify(Date.now()))
      }

      setSendEmailInterval()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setSendEmailInterval() {
      const dataInLocalStorage = JSON.parse(localStorage.getItem('verificationEmailSendedTimes') || '')

      const diffBetweenNowAndEmailLastTimeSended = new Date().getTime() - new Date(dataInLocalStorage).getTime()
      let diffBetweenTimeout = 120 - Math.ceil(diffBetweenNowAndEmailLastTimeSended / 1000)

      setTimeCount(diffBetweenTimeout > 0 ? diffBetweenTimeout : 0)

      const myInterval = setInterval(() => {
        if(diffBetweenTimeout > 0 && diffBetweenTimeout <= 120) {
          --diffBetweenTimeout
          setStateTime(diffBetweenTimeout)
        } else {
          setTimeCount(0)
          clearInterval(myInterval);
        }
      }, 1000) 
  }

  function setStateTime (diffBetweenTimeout: number) {
    setTimeCount(diffBetweenTimeout)
  }


  return (
    <section className="flex h-screen w-screen justify-center items-center flex-col">
      <div className='border-2 border-neutral-600/50 rounded-lg p-10 mx-5 shadow-modal'>
        <Image src={Email} alt='email' className='w-[50px]'></Image>
        <p className="text-[20px] mt-5">Um email de confirmação foi enviado para:</p>
        <p className="text-emerald-500 mb-5">{auth.currentUser?.email}</p>
        <p className="mb-5">Por favor confirme para poder fazer login! <br /> Não recebeu? Espere: <a className="text-emerald-500 font-semibold cursor-pointer" 
          onClick={() => {
            if(auth.currentUser && timeCount == 0) {
              verifyEmail(auth.currentUser)
              localStorage.setItem('verificationEmailSendedTimes', JSON.stringify(Date.now()))
              setTimeCount(120)
              setSendEmailInterval()
            }
          }}>{timeCount == 0 ? 'Reenviar' : timeCount}</a> </p>
          <div className="lg:border-t-2 max-lg:border-b-2 border-neutral-500 py-5">
          <p className="text-[20px]">Já confirmou seu email?</p>
            <p className="text-emerald-500 font-semibold hover:text-emerald-600 text-[16px] cursor-pointer" onClick={() => window.location.reload()}>Ir para o dashboard</p>
        </div>
      </div>
    </section>
  )
}
                                                                                                                                                                