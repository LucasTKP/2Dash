'use client';

import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '@/libs/firebase'
import Image from "next/image";
import axios from "axios";

import Email from '@/public/Dashboard/email.svg'
import Pass from '@/public/Dashboard/pass.svg'
import OpenedEye from '@/public/Dashboard/eye-open.svg'
import ClosedEye from '@/public/Dashboard/eye-closed.svg'
import ArrowLeft from '@/public/Dashboard/arrow-left.svg'

import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('wrong')

  const [focus, setFocus] = useState(false)
  const [step, setStep] = useState('email')
  const [error, setError] = useState('')
  const [passView, setPassView] = useState(false)
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, senha).then(() => {
      setLoading(false)
    })
    .catch((error) => {
      const errorCode = error.code;

      setLoading(false)
      if(errorCode == 'auth/invalid-email') {
        setError('Email inválido')
      } else if (senha !== 'wrong') {
        setError('Email ou senha inválidos')
      } else {
        setSenha('')
        setStep('senha')
      }
    })
  }

 return (
    <form className='mt-5' onSubmit={(e) => e.preventDefault()}>
      {
        step == 'senha'
        ? <p className="mb-5 text-emerald-500 text-[14px] inline-flex cursor-pointer hover:text-emerald-600 duration-100 font-medium" 
            onClick={() => {
              setError('')
              setSenha('wrong')
              setStep('email')
            }}
          ><Image src={ArrowLeft} alt='arrow' className="inline mr-1 w-[12px] fill-emerald-500"></Image>Voltar</p>
        : ''
      }
      <div className={`flex ${focus ? 'border-2' : 'border'} border-neutral-500 max-w-[350px] rounded-md ${error !== '' ? 'mb-8' : 'mb-5'} relative duration-100`}>
        {
          step == 'email' 
          ? <Image src={Email} alt='email' className="py-3 w-[20px] mx-3"></Image>
          : <Image src={Pass} alt='email' className="py-3 w-[20px] mx-3"></Image>
        }
        {
          step == 'email'
          ? <input 
              type="text" 
              name="email" 
              id="email" 
              autoComplete="off" 
              value={email} 
              className="w-full bg-transparent outline-none" 
              onFocus={() => {
                setFocus(true)
                setError('')
              }} 
              onBlur={() => setFocus(false)} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Seu email" />
          : <input 
              type={passView ? 'text' : 'password'} 
              name="senha" 
              id="senha" 
              value={senha} 
              className="w-full bg-transparent outline-none" 
              onFocus={() => {
                setFocus(true)
                setError('')
              }} 
              onBlur={() => setFocus(false)} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Senha" /> 
        }
        {
          step == 'senha'
          ? <Image onClick={() => setPassView((view) => !view)} src={passView ? OpenedEye : ClosedEye} alt='eye' className="py-3 w-[20px] right-3 invert cursor-pointer absolute"></Image>
          : ''
        }
        <label className="text-[12px] font-medium text-red-400 absolute bottom-[-22px]">{error}</label>
      </div>
      <button type="submit" onClick={() => login()} className="bg-emerald-500 max-w-[350px] flex justify-center w-full  py-2 rounded-md font-semibold hover:bg-emerald-600 duration-150">
        {loading == true ? 
          <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        : step == 'email' ? 'Continuar' : 'Logar'}</button>

      <p className='py-5 text-[14px] border-b border-neutral-400'>Esqueceu sua senha? <button  className='text-emerald-500 hover:text-emerald-600' onClick={async () => {
        if(email == '' || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setError('Digite um email válido primeiro.')
        } else {
          await axios.post('/api/sendEmail/resetPasswordEmail', {
            email: email
          })
          setError('Email de recuperação enviado')
        }
      }}>Recuperar</button> </p>
    </form>
  )
}
