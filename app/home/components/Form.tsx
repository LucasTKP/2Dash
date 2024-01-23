'use client'
import React, { use, useEffect, useState } from 'react'
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import axios from 'axios';
import { PhoneMask } from '@/utils/masks/phone';
import Image from 'next/image';
import ArrowRight from '@/public/Home/arrowRight.svg'
import { googleTracker } from '@/utils/gAnalytics/fireGAEvent';

import * as pixel from '@/libs/fbpixel'

function Form() {
  const [checkbox, setCheckbox] = useState({ isNotClient: false, isClient: true })
  const [data, setData] = useState({ states: [], cities: [] })
  const [dataSelected, setDataSelected] = useState<{ state: { id: string, name: string }, city: string | null }>()
  const [numberPhone, setNumberPhone] = useState("")

  useEffect(() => {
    async function GetStates() {
      const { data: states } = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      setData({ ...data, states: states })
    }
    GetStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (dataSelected?.state) {
      GetCities()
    }

    async function GetCities() {
      const { data: cities } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dataSelected?.state.id}/municipios`)
      setData({ ...data, cities: cities })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelected])

  function HandleOnChangeState(e: string) {
    const result = e.split('--')
    setDataSelected({ state: { id: result[0], name: result[1] }, city: null })
  }

  function HandleOnChangeCity(e: string) {
    if (e && dataSelected) {
      setDataSelected({ ...dataSelected, city: e })
    }
  }

  async function SendEmail(e: any){
    e.preventDefault()
    const [name, state, city, email, numberPhone] = e.target
    const data = {
      name: name.value, 
      state: dataSelected?.state.name,
      city: city.value,
      email: email.value,
      numberPhone:numberPhone.value
    }

    await axios.post(`/api/sendEmail/formLandingPage`, data)
    setNumberPhone("")
    setDataSelected({state:{id:"", name:"",}, city:null})
    setData((data) =>{
      return {...data, cities:[]}
    })

    googleTracker({eventName: "form_sent"})
    pixel.event('Contact')

    name.value = ""
    state.value = ""
    email.value = ""
  }


  return (
    <section id="contato" className='container my-[40px]'>
      <h2 className="text-[#005532] font-jost text-dynamic_sections mb-6 max-w-[1000px]">Ficou com alguma dúvida e deseja nos perguntar?</h2>
      <p className='text-[#555555] text-[32px] max-2xl:text-[28px] max-xl:text-[24px] max-lg:text-[22px] max-md:text-[20px] max-sm:text-[18px] max-xs:text-[16px] font-light'>Ao preencher os dados e enviar, entraremos em contato o mais rápido possível</p>
      <form onSubmit={SendEmail} className='flex flex-col items-start w-full text-[#404040] text-[20px] max-lg:text-[18px] max-sm:text-[16px]'>
        <div className='text-[#404040] mt-[30px] w-full gap-x-[50px] gap-y-[20px] flex items-center flex-wrap'>
          <label>
            <p className='text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Nome:</p>
            <input type='text' required placeholder='Seu nome' className='w-[300px] bg-transparent text-[#4040407a] px-[8px] py-[4px] border-[2px] border-[#5F5F5F] rounded-[8px]' />
          </label>

          <label>
            <p className='text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Estado:</p>
            <select required onChange={(e) => HandleOnChangeState(e.target.value)} className='selected:bg-black w-[250px] max-lg:w-[300px] text-[#4040407a] px-[8px] py-[6px] border-[2px] border-[#5F5F5F] rounded-[8px] bg-[#EBEBEB]'>
              <option value="" disabled selected className='checked:bg-[#d1d1d1]'>Escolha um estado</option>
              {data?.states?.map((state: { id: string, nome: string }, index) => {
                return (
                  <option key={index} value={`${state.id}--${state.nome}`} className='checked:bg-[#d1d1d1]'>{state.nome}</option>
                )
              })}
            </select>
          </label>

          <label>
            <p className='text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Cidade:</p>
            <select required disabled={data.cities.length > 0 ? false : true} onChange={(e) => HandleOnChangeCity(e.target.value)} className='selected:bg-black w-[250px] max-lg:w-[300px] text-[#4040407a] px-[8px] py-[6px] border-[2px] border-[#5F5F5F] rounded-[8px] bg-[#EBEBEB]'>
              <option value="" disabled selected className='checked:bg-[#d1d1d1]'>Escolha uma cidade</option>
              {data?.cities?.map((city: { nome: string }, index) => {
                return (
                  <option key={index} value={city.nome} className='checked:bg-[#d1d1d1]'>{city.nome}</option>
                )
              })}

            </select>
          </label>


        </div>

        <div className='flex gap-x-[50px] items-center text-[#404040] mt-[20px] gap-y-[20px] w-full flex-wrap'>
          <label>
            <p className='text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Email:</p>
            <input type='email' required placeholder='Seu email' className='w-[300px] bg-transparent text-[#4040407a] px-[8px] py-[4px] border-[2px] border-[#5F5F5F] rounded-[8px]' />
          </label>

          <label>
            <p className='text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Celular:</p>
            <input type='text' placeholder='(99) 99999-9999' required minLength={15} maxLength={15} value={numberPhone} onChange={(e) => setNumberPhone(PhoneMask(e.target.value))} className='w-[250px] max-lg:w-[300px] bg-transparent text-[#4040407a] px-[8px] py-[4px] border-[2px] border-[#5F5F5F] rounded-[8px]' />
          </label>

          <div>
            <p className='whitespace-nowrap text-[22px] max-lg:text-[20px] max-sm:text-[18px]'>Já é nosso cliente?</p>

            <div className='flex items-center gap-x-[25px] '>
              <Checkbox.Root onClick={() => setCheckbox({ isNotClient: false, isClient: true })}>
                <div className='flex items-center'>
                  <div className='p-[2px] w-[15px] h-[15px] border-[#005532] border rounded-full'>
                    <div className={checkbox.isClient ? "bg-[#005532] w-full h-full rounded-full" : ""} />
                  </div>
                  <p className='text-[#000000] ml-[7px]'>Sim</p>
                </div>
              </Checkbox.Root>

              <Checkbox.Root onClick={() => setCheckbox({ isNotClient: true, isClient: false })}>
                <div className='flex items-center'>
                  <div className='p-[2px] w-[15px] h-[15px] border-[#005532] border rounded-full'>
                    <div className={checkbox.isNotClient ? "bg-[#005532] w-full h-full rounded-full" : ""} />
                  </div>
                  <p className='text-[#000000]  ml-[7px]'>Não</p>
                </div>
              </Checkbox.Root>
            </div>

          </div>
        </div>
        <button type='submit' className={`font-medium text-[20px] max-lg:text-[16px] whitespace-nowrap text-white mt-[30px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
          Entrar em contato
        </button>
      </form>
    </section>
  )
}

export default Form