'use client';

import {applyActionCode, confirmPasswordReset} from 'firebase/auth'
import {auth} from '@/libs/firebase'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { googleTracker } from '@/utils/gAnalytics/fireGAEvent';
import Image from "next/image";
import Lock from '@/public/Dashboard/lock.svg'
import ErrorLock from '@/public/Dashboard/error-lock.svg'
import Logo from '@/public/logo.svg'
import OpenedEye from '@/public/Dashboard/eye-open.svg'
import ClosedEye from '@/public/Dashboard/eye-closed.svg'
import ForgetPass from '@/public/Dashboard/forget-pass.svg'
import Correct from '@/public/Dashboard/correct.svg'

import * as pixel from '@/libs/fbpixel'

import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams();
  
  const oobCode = searchParams?.get('oobCode')
  const mode = searchParams?.get('mode')

  const [error, setError] = useState('')
  const [load, setLoad] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passView1, setPassView1] = useState(false)
  const [passView2, setPassView2] = useState(false)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (oobCode) {
      if(mode == 'verifyEmail') {
        applyActionCode(auth, oobCode).then(() => {
          googleTracker({eventName: "sign_up"});
          pixel.event('CompleteRegistration')
          setLoad(true)})
        .catch((e) => {
          console.log(e)
          setLoad(true)
          setError('Link de verificação inválido ou já utilizado 😞')
        })
      }
    } else {
      router.replace('/')
    }
  }, [mode, oobCode, router])

  async function resetPassword() {
    if(newPassword !== confirmPassword) {
      return setError('As senhas estão diferentes!')
    }

    if (oobCode) {
      googleTracker({eventName: "password_reset"})
      setLoading(true)
      confirmPasswordReset(auth, oobCode, newPassword).then(() => {
        setLoading(false)
        setModal(true)
      })
      .catch(() => {
        setLoading(false)
        setError('Senha fraca demais ou algum erro inesperado.')
      })
    }
  }

  if(load && mode == 'verifyEmail') {
      return (
        <section className="flex h-screen w-screen justify-center items-center flex-col">
          <div className='border-2 border-neutral-600/50 rounded-lg p-10 mx-5 shadow-modal'>
            <Image src={error !== '' ? ErrorLock : Lock} alt='lock correct' className='w-[40px]'></Image>
            <h3 className='text-[22px] font-semibold mt-5'>{error !== '' ? error : 'Obrigado por confirmar seu email 😊'}</h3>
            <p className='max-w-[500px] mt-5'>Se você acredita que alguém acessou a conta sem permissão, tome medidas para proteger seus dados imediatamente.</p>
            <button className={`mt-10 ${error !== '' ? 'bg-red-800 border-red-600 hover:bg-red-900' : 'bg-emerald-500 border-emerald-700 hover:bg-emerald-600'} border-2 px-4 py-2 rounded-md font-medium duration-100`}> <a href='/login'>Fazer login</a> </button>
            <Image src={Logo} alt='2core' className='absolute top-5 right-5 w-[40px]'></Image>
          </div>
        </section>
      )
    }

    if(mode == 'resetPassword') {
      return (
        <section className="flex h-screen w-screen justify-center items-center flex-col">
          {modal ?
            <div className='absolute w-full h-full bg-neutral-800/70 backdrop-blur-sm z-50'>
              <Image src={Correct} alt='Correct' className='w-[100px] mx-auto mt-[200px]'></Image>
              <p className='mx-auto text-center mt-5 text-[24px] font-medium max-w-[500px]'>Senha alterada com sucesso. Se desejar, poderá fechar esta guia.</p>
            </div> 
          : ''}
          <div className='border-2 border-neutral-600/50 rounded-lg p-10 mx-5 shadow-modal'>
            <Image src={ForgetPass} alt='forget pass' className='w-[70px]'></Image>
            <h3 className='text-[22px] font-semibold mt-5'>Esqueci a senha 😕</h3>
            <p className='max-w-[500px] mt-5'>Fique tranquilo... Escolha uma nova senha para sua conta, que seja mais simples  ou mais familiar, porém nunca repita esta mesma senha em outras plataformas.</p>
            {error !== '' ? <p className='mt-3 mb-[-15px] duration-150 text-red-500 text-[14px]'>{error}</p> : ''}
            <form onSubmit={(e) => {
              e.preventDefault()
              resetPassword()
              }}>
              <div className='flex border-b border-emerald-500 mt-5'>
                <input 
                type={passView1 ? 'text' : 'password'} 
                name="senha" 
                id="senha" 
                value={newPassword} 
                onFocus={() => {
                  setError('')
                }} 
                className="w-full bg-transparent outline-none" 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Nova Senha" />

                <Image onClick={() => setPassView1((view) => !view)} src={passView1 ? OpenedEye : ClosedEye} alt='eye' className="py-3 w-[22px] mx-3 invert cursor-pointer"></Image>
              </div>

              <div className='flex border-b border-emerald-500 mt-5'>
                <input 
                type={passView2 ? 'text' : 'password'} 
                name="senha" 
                id="senha" 
                value={confirmPassword} 
                onFocus={() => {
                  setError('')
                }} 
                className="w-full bg-transparent outline-none" 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirmar nova senha" />

                <Image onClick={() => setPassView2((view) => !view)} src={passView2 ? OpenedEye : ClosedEye} alt='eye' className="py-3 w-[22px] mx-3 invert cursor-pointer"></Image>
              </div>
              <button type='submit' className='mt-10 bg-emerald-500 border-emerald-700 hover:bg-emerald-600 border-2 px-4 py-2 rounded-md font-medium duration-100'>{
                loading == true ? 
                  <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                : 'Trocar Senha'}</button>
            </form>
            <Image src={Logo} alt='2core' className='absolute top-5 right-5 w-[40px]'></Image>
          </div>
        </section>
      )
    }
}
                                                                                                                                                                
