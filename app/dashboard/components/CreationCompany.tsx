'use client';

type User = {
  id: string;
  name?: string;
  email: string;
  id_company: string;
  plan: string;
  expiration_plan_days: number;
}

import { useState } from "react"

import Image from "next/image"
import User from '@/public/Dashboard/user.svg'
import Arrow from '@/public/Dashboard/arrow-left.svg'
import Business from '@/public/Dashboard/business.svg'
import Search from '@/public/Dashboard/search.svg'
import Finish from '@/public/Dashboard/finish.svg'
import Ticket from '@/public/Dashboard/ticket.svg'

import verifyBusinessName from '@/utils/firebase/verifyCompany'
import { updateCompany } from "@/utils/firebase/companyManager";
import { updateUser } from "@/utils/firebase/userManager";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { createCompanyUsageSize } from "@/utils/firebase/realtimeFunctions";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useRouter } from 'next/navigation'

export function CreationCompany() {
  const [step, setStep] = useState('name') 
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [typeBusiness, setTypeBusiness] = useState('')
  const [rangeDifficulty, setRangeDifficulty] = useState<number | number[]>(0)
  const [espectation, setEspectation] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {user} = useContext(UserContext)
  const router = useRouter()

  async function submitForm() {
    setLoading(true)

    if(user) {
      await updateCompany({
        id: user.id_company,
        data: {
          name: businessName, 
          type: typeBusiness, 
          difficulty: rangeDifficulty, 
          espectation,
          domain: 'dashboard.2docs.app'
        }
      })
  
      await updateUser({
        id_company: user.id_company,
        id: user.id,
        data: {
          name,
          name_company: businessName,
          photo_url: `https://ui-avatars.com/api/?name=${name}&background=10b981&color=262626&format=svg`,
          verifiedEmail: true
        }
      })

      createCompanyUsageSize(user.id_company)
    }
    
    setLoading(false)
    window.location.reload()
  }

  return (
    <main className="max-w-[1200px] mx-auto px-10">
      <header className="my-14">
        <h1 className="text-[26px] font-semibold">Bem vindo ao 2Docs 😊</h1>
        <h3 className="text-neutral-300 max-w-md">Siga esses simples 4 passos para completar a criação de sua conta no 2Docs.</h3>
      </header> 

      <section className="border-t border-emerald-500 md:flex justify-between">
        {/* Progressive sidebar */}
        <div className="pr-10 max-md:hidden">
          <ul className="mt-5 relative">
            <li className={`flex items-center mt-5 ${step !== 'name' ? 'after:animate-step' : 'after:bg-neutral-700 after:h-[70px]'} after:w-[3px] after:absolute after:right-5 after:top-[46px]`}>
              <div className="text-right w-[250px]">
                <h3 className="text-[18px] font-medium">Seu nome</h3>
                <p className="text-neutral-300 text-[14px]">Como devemos te chamar?</p>
              </div>
              <div className="bg-emerald-500 inline-flex rounded-full p-3 ml-5">
                <Image alt="user" src={User} className='w-[20px]'></Image>
              </div>
            </li>

            <li className={`flex items-center mt-16 ${step !== 'business' && step !== 'name'  ? 'after:animate-step' : 'after:bg-neutral-700 after:h-[70px]'} after:w-[3px] after:absolute after:right-5 after:top-[158px]`}>
              <div className="text-right w-[250px]">
                <h3 className="text-[18px] font-medium">Sua empresa</h3>
                <p className="text-neutral-300 text-[14px]">Com quem iremos trabalhar?</p>
              </div>
              <div className={`${step !== 'name' ? 'animate-back' : 'bg-neutral-700'} inline-flex rounded-full p-3 ml-5`}>
                <Image alt="user" src={Business} className='w-[20px]'></Image>
              </div>
            </li>

            <li className={`flex items-center mt-16 ${step !== 'business' && step !== 'name' && step !== 'search' ? 'after:animate-step' : 'after:bg-neutral-700 after:h-[70px]'} after:w-[3px] after:absolute after:right-5 after:top-[270px]`}>
              <div className="text-right w-[250px]">
                <h3 className="text-[18px] font-medium">Pesquisa</h3>
                <p className="text-neutral-300 text-[14px]">Um pouco mais sobre você.</p>
              </div>
              <div className={`${step == 'search' || step == 'complete' ? 'animate-back' : 'bg-neutral-700'} inline-flex rounded-full p-3 ml-5`}>
                <Image alt="user" src={Search} className='w-[20px]'></Image>
              </div>
            </li>

            <li className="flex items-center mt-16">
              <div className="text-right w-[250px]">
                <h3 className="text-[18px] font-medium">Concluído</h3>
                <p className="text-neutral-300 text-[14px]">Obrigado por escolher a gente!</p>
              </div>
              <div className={`${step == 'complete' ? 'animate-back' : 'bg-neutral-700'} inline-flex rounded-full p-3 ml-5`}>
                <Image alt="user" src={Finish} className='w-[20px]'></Image>
              </div>
            </li>
          </ul>
        </div>

        {/* Middle part */}
        <div className="flex-1">
          {step == 'name' ? 
          <div className="md:border-l border-emerald-500 md:p-5 max-md:py-5">
            <div className="border-b-2 border-neutral-500 mb-10 pb-5">
              <p className="text-[14px] text-emerald-600 font-semibold">Passo 1/4</p>
              <h2 className="mt-5 text-[24px] font-semibold mb-3">Vamos começar com seu nome</h2>
              <p className="text-[14px] text-neutral-300">O começo de uma amizade, sempre começa pelo nome... Por favor complete o campo abaixo para sabermos como podemos te chamar.</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="nome" className={`text-[14px] ${error !== '' ? 'text-red-500' : 'text-neutral-200'}`}>{error !== '' ? error : 'Coloque seu nome'}</label>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} id="nome" placeholder="Nome próprio" className={`bg-transparent border-2 ${error !== '' ? 'border-red-600' : 'border-emerald-500'} rounded-lg py-3 px-2 mt-2 focus:outline-none focus:ring focus:ring-emerald-600/40`} autoComplete="off"/>
              <button onClick={() => {
                if(name.length <= 3) {
                  setError('Nome curto demais.')
                } else {
                  setStep('business')
                }
              }} 
              onFocus={() => setError('')}
              onBlur={() => setError('')}
              className="self-end w-[180px] bg-emerald-500 py-4 rounded-full font-semibold hover:bg-emerald-600 duration-150 mt-10">Próximo passo</button>
            </div> 
          </div>
          : ''}

          {step == 'business' ? 
          <div className="md:border-l border-emerald-500 md:p-5 max-md:py-5">
            <div className="border-b-2 border-neutral-500 mb-10 pb-5">
              <div className="flex gap-3">
                <Image src={Arrow} alt='arrow' className="w-[15px] cursor-pointer hover:opacity-80" onClick={() => setStep('name')}></Image>
                <p className="text-[14px] text-emerald-600 font-semibold">Passo 2/4</p>
              </div>
              <h2 className="mt-5 text-[24px] font-semibold mb-3">Nos conte sobre sua empresa</h2>
              <p className="text-[14px] text-neutral-300">Prazer somos o 2Docs, especialistas em soluções digitais... Agora se desejar nos apresente a sua empresa, estamos ansiosos para a conhecer.</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="business" className={`text-[14px] ${error !== '' && error == 'Nome de empresa curto demais.' || error == 'Nome de empresa já em uso!' ? 'text-red-400' : 'text-neutral-200'}`}>{error !== '' && error == 'Nome de empresa curto demais.' || error == 'Nome de empresa já em uso!' ? error : 'Coloque o nome de sua empresa'}</label>
              <input type="text" id="business" placeholder="Nome da empresa" value={businessName} onChange={(event) => setBusinessName(event.target.value)} className={`bg-transparent border-2 ${error !== '' && error == 'Nome de empresa curto demais.' || error == 'Nome de empresa já em uso!' ? 'border-red-600' : 'border-emerald-500'} rounded-lg py-3 px-2 mt-2 focus:outline-none focus:ring focus:ring-emerald-600/40`} autoComplete="off"/>
              
              <label htmlFor="businessType" className={`text-[14px] ${error !== '' && error == 'Por favor não se esqueça das opções abaixo.' ? 'text-red-400' : 'text-neutral-200'} mt-5`}>{error !== '' && error == 'Por favor não se esqueça das opções abaixo.' ? 'Por favor não se esqueça das opções abaixo.' : 'O que sua empresa é especializada?'}</label>
              <select name="businessType" id="businessType" value={typeBusiness} onChange={(event) => setTypeBusiness(event.target.value)} className={`bg-transparent border-2 ${error !== '' && error == 'Por favor não se esqueça das opções abaixo.' ? 'border-red-600' : 'border-emerald-500'} rounded-lg py-3 px-2 mt-2 focus:outline-none focus:ring focus:ring-emerald-600/40`}>
                <option value="" className="text-black">Escolha uma das opções</option>
                <option value="contabilidade" className="text-black">Contabilidade</option>
                <option value="advocacia" className="text-black">Advocacia</option>
                <option value="engenharia" className="text-black">Engenharia</option>
                <option value="outro" className="text-black">Outro</option>
              </select>
              <button
              onClick={async () => {
                if(businessName.length < 4) {
                  setError('Nome de empresa curto demais.')
                } else if (typeBusiness == '') {
                  setError('Por favor não se esqueça das opções abaixo.')
                } else {
                  const hasBusinessWithSameName = await verifyBusinessName({businessName})
                  if (hasBusinessWithSameName.docs[0]) {
                    setError('Nome de empresa já em uso!')
                  } else {
                    setStep('search')
                  }
                }
              }} 
              onFocus={() => setError('')}
              onBlur={() => setError('')}
              className="self-end w-[180px] bg-emerald-500 py-4 rounded-full font-semibold hover:bg-emerald-600 duration-150 mt-10">Próximo passo</button>
            </div> 
          </div> : ''}

          {step == 'search' ? 
          <div className="md:border-l border-emerald-500 md:p-5 max-md:py-5">
            <div className="border-b-2 border-neutral-500 mb-10 pb-5">
              <div className="flex gap-3">
                <Image src={Arrow} alt='arrow' className="w-[15px] cursor-pointer hover:opacity-80" onClick={() => setStep('business')}></Image>
                <p className="text-[14px] text-emerald-600 font-semibold">Passo 3/4</p>
              </div>
              <h2 className="mt-5 text-[24px] font-semibold mb-3">Você pode nos ajudar a ficar ainda melhor!</h2>
              <p className="text-[14px] text-neutral-300">Nós do 2Docs prezamos muito a experiência de nossos usuários... Por isso pedimos para responder as questões abaixo, agradecemos muito.</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="difficulty" className="text-[14px] text-neutral-200">Qual foi a dificuldade de chegar até aqui com o 2Docs?</label>
              <div className="mt-4 w-[90%] mx-auto">
                <Slider 
                  min={0} 
                  defaultValue={0} 
                  marks={{ 0: 'Muito Fácil', 25: 'Fácil', 50: 'Mediana', 75: 'Difícil', 100: 'Muito difícil' }} 
                  step={null}
                  dotStyle={{ borderColor: '#10b981'}}
                  handleStyle={{ background: '#10b981', borderColor: '#059669'}}
                  trackStyle={{ background: '#10b981' }}
                  railStyle={{ background: '#a3a3a3'}}
                  activeDotStyle={{ borderColor: '#10b981' }}
                  onChange={(event) => setRangeDifficulty(event)}
                />
              </div>

              <label className={`text-[14px] ${error !== '' ? 'text-red-400' : 'text-neutral-200'} mt-14 mb-4`}>{error !== '' ? error : 'Qual a sua espectativa para o 2Docs?'}</label>
              <div className="flex gap-2 mb-2 items-center">
                <input type="radio" onClick={() => {
                  setEspectation('organize')
                  setError('')
                  }} className="w-4 h-4 appearance-none checked:bg-emerald-500 border-2 border-white rounded-full cursor-pointer" name="espectation" id="organize"/>
                <label htmlFor="organize" className="cursor-pointer hover:text-emerald-300 duration-150">Mais organização para minha empresa.</label>
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <input type="radio" className="w-4 h-4 appearance-none checked:bg-emerald-500 border-2 border-white rounded-full cursor-pointer" name="espectation" id="cost" />
                <label htmlFor="cost" onClick={() => {
                  setEspectation('cost')
                  setError('')
                  }} className="cursor-pointer hover:text-emerald-300 duration-150">Reduzir os meus custos e gastos.</label>
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <input type="radio" className="w-4 h-4 appearance-none checked:bg-emerald-500 border-2 border-white rounded-full cursor-pointer" name="espectation" id="relation" />
                <label htmlFor="relation" onClick={() => {
                  setEspectation('relation')
                  setError('')
                  }} className="cursor-pointer hover:text-emerald-300 duration-150">Melhorar meu relacionamento com os clientes.</label>
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <input type="radio" onSelect={() => {
                  setEspectation('none')
                  setError('')
                  }}
                  className="w-4 h-4 appearance-none checked:bg-emerald-500 border-2 border-white rounded-full cursor-pointer" name="espectation" id="none" />
                <label htmlFor="none" className="cursor-pointer hover:text-emerald-300 duration-150">Sem espectativas, somente testanto...</label>
              </div>

              <button onClick={() => {
                if(espectation == '') {
                  setError('Não se esquece de escolher a expectativa para o 2Docs.')
                } else {
                  setStep('complete')
                } 
              }} className="self-end w-[180px] bg-emerald-500 py-4 rounded-full font-semibold hover:bg-emerald-600 duration-150 mt-10">Próximo passo</button>
            </div> 
          </div> : ''}

          {step == 'complete' ? 
          <div className="md:border-l border-emerald-500 md:p-5 max-md:py-5">
            <div className="border-b-2 border-neutral-500 mb-10 pb-5">
              <div className="flex gap-3">
                <Image src={Arrow} alt='arrow' className="w-[15px] cursor-pointer hover:opacity-80" onClick={() => setStep('search')}></Image>
                <p className="text-[14px] text-emerald-600 font-semibold">Passo 4/4</p>
              </div>
              <h2 className="mt-5 text-[24px] font-semibold mb-3">Prontinho, sua conta está 100% criada! 🎉</h2>
              <p className="text-[14px] text-neutral-300">Muito obrigado por confiar e escolher o 2Docs para cuidar de algo tão valioso... seus documentos e clientes. Esperamos uma parceria de longa data!</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-5">
                <Image src={Ticket} alt='Ticket' className="w-[60px]"></Image>
                <p className="mt-2 text-neutral-300">Não esqueça que estamos sempre abertos para feedbacks, reportes de erros ou dúvidas. Qualquer coisa nos mande um email:</p>
              </div>
              <a className="text-center mt-5 text-[20px] text-emerald-500 font-medium underline cursor-pointer" href="mailto:contato@2core.com.br?subject=Ticket 2Docs">contato@2core.com.br</a>
              <button onClick={() => submitForm()} className="self-end w-[190px] bg-emerald-500 py-4 rounded-full font-semibold hover:bg-emerald-600 duration-150 mt-10 flex justify-center">{loading == true ? 
                <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                :  'Ir para o dashboard'}
              </button>
            </div> 
          </div> : ''}
        </div>
      </section>
    </main>
  )
}
