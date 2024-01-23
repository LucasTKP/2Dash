'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { updateCompany } from '@/utils/firebase/companyManager';

import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';

import Edit from '@/public/Dashboard/edit.svg'

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

export default function Heading() {
  const pathname = usePathname()
  const {user, setUser} = useContext(UserContext)

  const [domainName, setDomainName] = useState(user?.domain)
  const [subDomainName, setSubDomainName] = useState(user?.domain?.split('.')[0])
  const [isEditingOwnDomain, setIsEditinOwnDomain] = useState(false)
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  let title = ''
  let obs = ''
  const oldDomain = user?.domain
  const defaultDomain = 'dashboard.2docs.app'
  
  if(pathname == '/dashboard') {
    title = 'Bem-vindo ao 2Dash 👋'
    obs = '“O menu início contém seus admin onlines, quantos gigas ainda restam em seu plano e quantos clientes sua empresa possuí.”'
  } else if(pathname == '/dashboard/admins') {
    title = 'Gerenciamento de Admins 🛡️'
    obs = '“No menu admins você pode adicionar, editar e excluir os funcionários administrativos de sua empresa.”'
  } else if(pathname == '/dashboard/assinatura') {
    title = 'Sua assinatura 💳'
    obs = '“No menu assinatura você pode gerenciar seus métodos de pagamento, aumentar de nível seu plano e infelizmente... cancelar sua assinatura.”'
  } else if(pathname == '/dashboard/logs') {
    title = 'Suas logs 🗄️'
    obs = '“O menu logs contém o histórico de todas as ações recentes de seus clientes e administradores, com data, horários e tipo de ação.”'
  } else if(pathname == '/dashboard/perfil') {
    title = 'Editar perfil ✏️'
    obs = '“Deixe o seu e o perfil de sua empresa do jeito que você preferir.”'
  }
  
  return (
    <div className='py-10 border-b-2 border-neutral-500'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='container sm:flex justify-between items-center'>
        <div>
          <h3 className='mb-3 text-[26px] font-semibold'>{title}</h3>
          <p className='max-w-[700px] text-neutral-300'>{obs}</p>
        </div>
        <div className='bg-neutral-400 w-[2px] h-[110px] rotate-12 mx-5 max-sm:hidden'></div>
        <div className='max-sm:mt-5'>
          <p className='text-neutral-300 font-light mb-2'>“Seu link personalizado para o 2Docs”</p>
          {user?.plan == 'Gratuito' ? 
            <h3 className='flex gap-3 text-[24px] underline cursor-pointer hover:opacity-70'>{domainName}</h3> :
          <Dialog.Root open={open} onOpenChange={() => {
            setIsEditinOwnDomain(false)
            setDomainName(user?.domain)
            setOpen((state) => !state)
            setError('')
          }}>
            <Dialog.Trigger asChild>
              <h3 className='flex gap-3 text-[24px] underline cursor-pointer hover:opacity-70'>{domainName}<Image src={Edit} alt='edit'></Image></h3>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-neutral-900/60 data-[state=open]:animate-overlayShow fixed inset-0 z-20"/>
              <Dialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                
                <Dialog.Title className="m-0 text-[20px] font-medium">
                  <p className='items-center flex gap-2'>Editar domínio <span className='text-[12px] text-emerald-500 bg-emerald-500/30 px-2 py-1 rounded-md border border-emerald-500'>beta</span></p>
                </Dialog.Title>

                <Dialog.Description className="text-neutral-500 mt-[10px] mb-5 text-[16px] leading-normal">
                  {`Personalize o ${user?.plan.split(' ')[0] == 'Inicial' ? 'subdomínio' : 'endereço'} do 2Docs para a sua empresa! ${user?.plan.split(' ')[0] == 'Inicial' ? 'No plano Profissional e Empresarial é possível colocar o seu próprio domínio!' : ''}`}
                </Dialog.Description>

                {user?.plan.split(' ')[0] == 'Inicial' ?
                  ''
                :
                <div className="flex items-center mb-5" style={{ display: 'flex', alignItems: 'center' }}>
                  <label className="text-white text-[15px] leading-none pr-[15px]" htmlFor="airplane-mode">
                    Utilizar domínio próprio:
                  </label>
                  <Switch.Root
                    onCheckedChange={() => {
                      setError('')
                      setIsEditinOwnDomain((isEditing) => !isEditing)
                    }}
                    className="w-[42px] h-[24px] bg-neutral-800 rounded-full relative border border-neutral-300/60 focus:shadow-[0_0_0_2px] focus:shadow-emerald-500 data-[state=checked]:bg-emerald-500/40 outline-none cursor-default"
                    id="airplane-mode"
                    style={{ 'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)' }}
                  >
                    <Switch.Thumb className="block w-[18px] h-[18px] bg-emerald-500 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                </div>
                }
                
                {
                  user?.plan.split(' ')[0] == 'Inicial' || !isEditingOwnDomain ? 
                    <fieldset className="mb-[15px]">
                      <p className='mb-2 text-[14px] text-red-500/70'>{error}</p>
                      <div className='flex items-center gap-5'>
                        <input
                          className="shadow-neutral-400 focus:shadow-emerald-500 bg-transparent inline-flex h-[35px] duration-100 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[16px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          id="username"
                          onChange={(e) => setSubDomainName(e.target.value)}
                          placeholder='Dica: Nome de sua empresa'
                          autoComplete='off'
                          onBlur={() => setError('')}
                          onFocus={() => setError('')}
                          value={subDomainName}
                        />
                        <label className="text-violet11 w-[90px] text-right text-[16px] mr-2" htmlFor="username">
                          .2docs.app
                        </label>
                      </div>        
                    </fieldset>
                  :
                  <fieldset className="mb-[15px] gap-5">
                    <p className='mb-2 text-[14px] text-red-500/70'>{error}</p>
                    <input
                      className="shadow-neutral-400 focus:shadow-emerald-500 bg-transparent inline-flex h-[35px] duration-100 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[16px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id="username"
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder='Dica: Seu domínio próprio'
                      autoComplete='off'
                      onBlur={() => setError('')}
                      onFocus={() => setError('')}
                      value={domainName}
                    />
                  </fieldset>
                }
                
                <Dialog.Description className="text-emerald-500/60 mt-[10px] mb-5 text-[14px] leading-normal">
                  {user?.plan.split(' ')[0] == 'Inicial' || !isEditingOwnDomain ? 'Seu subdomínio não pode conter números e nem conter mais que 60 caracteres' : 'Adicione este endereço DNS em seu domínio: Tipo: A, Nome: @, Valor: 76.76.21.21'}
                </Dialog.Description>

                <div className="mt-[25px] flex justify-end">
                  <button 
                    className="bg-emerald-500 hover:bg-emerald-600 focus:shadow-emerald-500/60 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[30px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    onClick={async () => {
                      const domainRegex = new RegExp("^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,}\.?((xn--)?([a-z0-9\-.]{1,61}|[a-z0-9-]{1,30})\.?[a-z]{2,})$")
                      const subdomainRegex = new RegExp("[a-zA-Z0-9]+")

                      setLoading(true)

                      if(isEditingOwnDomain) {
                        if(domainName == '' || !domainName?.match(domainRegex)) {
                          setError('Nome de domínio inválido')
                          return setLoading(false)
                        }

                        user!.domain = domainName!

                      } else {
                        if(subDomainName == '' || !subDomainName?.match(subdomainRegex)) {
                          setError('Nome de subdomínio inválido')
                          return setLoading(false)
                        }

                        user!.domain = `${subDomainName}.2docs.app`
                      }

                      try {
                        if(oldDomain !== defaultDomain) {
                          await axios.delete(`https://api.vercel.com/v9/projects/${process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID}/domains/${oldDomain}`,
                          {
                            headers: {
                              'Authorization': process.env.NEXT_PUBLIC_VERCEL_PROJECT_SECRET_KEY
                            }
                          })
                        }
                      } catch (e)  {
                      } finally {
                        try {
                          await axios.post(`https://api.vercel.com/v10/projects/${process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID}/domains`, {
                            name: user?.domain
                          }, 
                          {
                            headers: {
                              'Authorization': process.env.NEXT_PUBLIC_VERCEL_PROJECT_SECRET_KEY
                            }
                          })
  
                          setUser({...user!})
  
                          await updateCompany({
                            id: user?.id_company!,
                            data: {
                              domain: user?.domain
                            }
                          })
  
                          toast.success('Domínio atualizado com sucesso!', {
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
                        } catch (e) {
                          console.log(e)
                        } finally {
                          setLoading(false)
                        }
                      }
                    }}
                  >
                    {
                      loading ? 
                      <svg className="h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      : 'Salvar'
                    }
                  </button>
                </div>

                <Dialog.Close asChild>
                  <button
                    className="text-emerald-500 hover:bg-emerald-600/40 focus:shadow-emerald-500/40 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    x
                  </button>
                </Dialog.Close>

                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          }
        </div>
      </div>
    </div>
  )
}
