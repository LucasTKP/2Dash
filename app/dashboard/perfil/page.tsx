'use client';

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import Image from "next/image";

import Refresh from '@/public/Dashboard/refresh.svg'
import Trash from '@/public/Dashboard/trash.svg'
import User from '@/public/Dashboard/user.svg'
import Email from '@/public/Dashboard/email.svg'
import Company from '@/public/Dashboard/business.svg'

import { updateUser, updatePhoto } from "@/utils/firebase/userManager";
import verifyBusinessName from '@/utils/firebase/verifyCompany'
import { updateCompany } from '@/utils/firebase/companyManager'

import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const {user, setUser} = useContext(UserContext)
  const [changePhoto, setChangePhoto] = useState(user?.photo!)
  const [name, setName] = useState(user?.name)
  const [empresa, setEmpresa] = useState(user?.name_company!)
  const [telefone, setTelefone] = useState(user?.telefone ? user?.telefone : '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function save(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    setLoading(true)

    if(name && name?.length < 4) {
      setError('Nome curto demais.')
      return setLoading(false)
    }

    if(empresa != user?.name_company!) {
      const hasBusinessWithSameName = await verifyBusinessName({businessName: empresa})

      if(hasBusinessWithSameName.docs[0]) {
        setError('Empresa já existente.')
        return setLoading(false)
      }
    }

    await updateCompany({id: user?.id_company!, data: {name: empresa}})

    await updateUser({
      id_company: user?.id_company!,
      id: user?.id!,
      data: {
        name,
        name_company: empresa,
        telefone,
        photo_url: user?.photo
      }
    })

    setLoading(false)
    
    toast.success('Perfil editado com sucesso!', {
      duration: 2000,
      style: {
        border: '1px solid #10b981',
        padding: '16px',
        color: '#10b981',
        background: '#262626'
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#262626',
      },
    })
  }

  useEffect(() => {
    let mockUser = user
    mockUser!.photo = changePhoto

    setUser(mockUser)
  }, [changePhoto])

  return (
    <main className="flex mx-auto gap-10 max-w-[1000px] px-10 justify-center">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <form className="mt-10 lg:flex gap-20 mx-2">
          <div className="bg-gradient-to-b from-neutral-200 p-[2px] rounded-lg w-[300px] max-lg:mx-auto max-lg:mb-10">
            <div className="py-5 w-full h-full bg-neutral-800 rounded-lg px-8">
              <p className="font-medium mb-8 text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-emerald-500 font-poiret border-b-2 border-emerald-400/50 rounded-sm">Seu card</p>
              <div className="flex justify-center text-center">
                <div className="inline-flex relative">
                  <Image src={changePhoto} width={80} height={80} alt="preview" className='w-[130px] h-[130px] rounded-full'/> 
                  <div className="flex items-center bg-neutral-800 rounded-full border-2 border-neutral-500 absolute bottom-3 right-[-20px]">
                    <label className='cursor-pointer hover:bg-emerald-700/40 px-[10px] py-[4px] hover:rounded-l-full duration-100'>
                      <input  type="file" className='hidden' accept='.png, .jpg, .jpeg' onChange={async (e) => {
                        if(e.target.files) {
                          const url = await updatePhoto({
                            id_company: user?.id_company!,
                            file: e.target.files[0]
                          })
                          toast.success('Foto alterada com sucesso! Não esqueça de salvar.', {
                            duration: 2000,
                            style: {
                              border: '1px solid #10b981',
                              padding: '16px',
                              color: '#10b981',
                              background: '#262626'
                            },
                            iconTheme: {
                              primary: '#10b981',
                              secondary: '#262626',
                            },
                          })

                          setChangePhoto(url)
                        }
                      }}/>
                      <Image src={Refresh} width={20} height={20} alt="preview" className='w-[18px] h-[18px]'/> 
                    </label>
                    <p className="bg-neutral-500 w-[2px] h-[15px]"></p>
                    <button disabled={changePhoto == 'https://ui-avatars.com/api/?name=' + name + '&background=10b981&color=262626&format=svg' ? true : false} className={`cursor-pointer px-[10px] py-[4px] hover:rounded-r-full duration-100 ${changePhoto == 'https://ui-avatars.com/api/?name=' + name + '&background=10b981&color=262626&format=svg' ? 'cursor-not-allowed' : 'hover:bg-emerald-700/40'}`} onClick={(e) => {
                      e.preventDefault()
                      setChangePhoto(`https://ui-avatars.com/api/?name=${name}&background=10b981&color=262626&format=svg`)
                    }}>
                      <Image src={Trash} width={20} height={20} alt="preview" className='w-[18px] h-[18px]'/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                <p className="font-medium text-[18px] text-neutral-400 flex gap-2 items-center"><Image src={User} alt='user' width={18} height={18} className='brightness-75'></Image> {name}</p>
                <p className="font-medium text-[18px] text-neutral-400 flex gap-2 items-center truncate"><Image src={Email} alt='email' width={18} height={18} className='brightness-75'></Image> {user?.email}</p>
                <p className="font-medium text-[18px] text-neutral-400 flex gap-2 items-center"><Image src={Company} alt='company' width={18} height={18} className='brightness-75'></Image> {empresa}</p>
              </div>
              <p className="text-center mt-8 bg-neutral-700/40 rounded-full py-2 border-2 border-neutral-600 font-semibold text-emerald-500">{user?.plan}</p>
            </div>
          </div>
          <div>
            <div className="flex gap-10 max-sm:flex-col max-sm:gap-5 w-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-neutral-400 font-medium">“Seu nome“ </label>
                <input 
                  type="text" 
                  name="nome" 
                  id="nome" 
                  className="bg-neutral-700/60 rounded-md border-none px-4 py-3 text-neutral-200" 
                  value={name} 
                  maxLength={20} 
                  placeholder='Seu nome' 
                  autoComplete="off" 
                  onChange={(e) => setName(e.target.value)} 
                  onFocus={() => setError('')}
                  onBlur={() => setError('')}
                />
                {error != '' && error == 'Nome curto demais.'? <p className="text-[14px] text-red-500/70 mt-[-8px]">{error}</p> : ''}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="empresa" className="text-neutral-400 font-medium">“Nome da empresa“ </label>
                <input 
                  type="text" 
                  name="empresa" 
                  id="empresa" 
                  className="bg-neutral-700/60 rounded-md border-none px-4 py-3 text-neutral-200" 
                  value={empresa} 
                  maxLength={20} 
                  placeholder='Sua empresa' 
                  autoComplete="off" 
                  onChange={(e) => setEmpresa(e.target.value)} 
                  onFocus={() => setError('')}
                  onBlur={() => setError('')}
                />
                {error != '' && error != 'Nome curto demais.' ? <p className="text-[14px] text-red-500/70 mt-[-8px]">{error}</p> : ''}
              </div>
            </div>     
            <div className="flex gap-10 max-sm:flex-col max-sm:gap-5 w-full mt-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-neutral-400 font-medium">“Seu email“ </label>
                <input type="text" name="email" id="email" className="bg-neutral-700/60 rounded-md border-none px-4 py-3 text-neutral-200" value={user?.email} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="telefone" className="text-neutral-400 font-medium">“Seu telefone“ </label>
                <input type="text" name="telefone" id="telefone" className="bg-neutral-700/60 rounded-md border-none px-4 py-3 text-neutral-200" value={telefone} placeholder='Seu telefone/celular' autoComplete="off" onChange={(e) => setTelefone(e.target.value)}/>
              </div>
            </div> 
            <button type="submit" className="mt-10 w-full bg-emerald-500 py-2 rounded-lg hover:bg-emerald-600 duration-100 flex justify-center" onClick={(event) => save(event)}>
              {loading ? 
                <svg className="h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : 
              'Salvar'}
            </button>
            <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
              <div className="bg-neutral-800 rounded-md h-full">
                <div className="flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
                  <h3 className="font-medium text-[20px]">Seus ultimos tickets</h3>
                </div>
                <div className="pr-6 py-2">
                  <div className="overflow-y-scroll h-[100px]">
                    {user?.tickets && user?.tickets[0] ? 
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <th className="px-6 py-2">Id</th>
                        <th className="px-6 py-2">Mensagem</th>
                        <th className="px-6 py-2">Data</th>
                      </thead>
                      <tbody>
                        {
                          user.tickets.map((ticket) => {
                            return (
                              <tr key={ticket.id}>
                                <td className="px-6">{ticket.id}</td>
                                <td className="px-6">{ticket.msg.substring(0,35)}</td>
                                <td className="px-6">{`${new Date(ticket.date).getDate()} ${new Date(ticket.date).getMonth() + 1 < 10 ? `0${new Date(ticket.date).getMonth() + 1}` : new Date(ticket.date).getMonth() + 1} ${new Date(ticket.date).getFullYear()}`}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    : <p className="font-medium text-emerald-400/60 max-w-[400px] pl-4 pt-2">🎟️ Nenhum ticket enviado no momento... Fique a vontade para nos enviar!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    </main>
  )
}