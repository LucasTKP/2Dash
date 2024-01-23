'use client';

import { useContext, useState } from "react";
import { ClientsContext } from "../contexts/clientsContext";
import Image from "next/image";
import {Clients} from '@/types/index'
import { v4 as uuidv4 } from 'uuid';
import Trash from '@/public/Dashboard/trash.svg'
import Edit from '@/public/Dashboard/edit.svg'
import Check from '@/public/Home/check.svg'
import Email from '@/public/Dashboard/email.svg'
import toast, { Toaster } from 'react-hot-toast';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase"
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { updateUser } from "@/utils/firebase/userManager";
import { deleteClient } from "@/utils/firebase/clientsManager";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '@/libs/firebase'

export default function Page() {
  const {clients, setClients} = useContext(ClientsContext)
  const {user} = useContext(UserContext)
  const [newUsersCreation, setNewUsersCreation] = useState<Clients[]>([])
  const [loading, setLoading] = useState(false)

  const adminCrationsLimit = () => {
    const plan = user?.plan.split(' ')[0]
    if(plan == 'Empresarial') {
      return 5
    } else if (plan == 'Profissional') {
      return 3
    } else {
      return 1
    }
  }

  return (
    <main className="mx-auto gap-10 max-w-[1000px] px-10 justify-center mb-10">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="w-full sm:flex justify-between border-b border-neutral-300 py-1 mt-10 items-center">
        <h3 className="font-medium text-[20px]">Admins</h3>
        <p className="text-neutral-400 text-[14px]">“Crie e edite as permissões de seus administradores”</p>
      </div>
      <div className="max-w-full text-left my-2 border-spacing-y-2 border-separate">
        <div className="max-w-full grid lg:grid-cols-[60px_180px_220px_1fr_120px_20px] max-lg:grid-cols-[60px_minmax(1fr_180px)_minmax(1fr_220px)_1fr_120px_20px] gap-4 max-lg:auto-cols-auto max-lg:grid-flow-col max-xs:text-[14px] overflow-x-clip">
          <p className="font-normal text-neutral-300">Foto</p>
          <p className="font-normal text-neutral-300">Nome</p>
          <p className="font-normal text-neutral-300">Email</p>
          {/* <p className="font-normal text-neutral-300 lg:hidden">Dados</p> */}
          <p className="font-normal text-neutral-300">Permissões</p>
          <p className="font-normal text-neutral-300">Status</p>
        </div>
        <div className="max-lg:overflow-x-scroll pb-5">
          {
            clients ? clients.filter(client => client.permission > 0).map((client) => {
              return (
                <div className="w-full grid grid-cols-[60px_180px_220px_1fr_120px_20px] mt-4 items-center gap-4" key={client.id}>
                  <Image src={client.photo_url} alt='user image' width={40} height={40} className="rounded-full min-w-[40px] min-h-[40px]"></Image>
                  <p className="font-medium">{client.name}</p>
                  <p>{client.email}</p>
                  {/* <div className="lg:hidden">
                    <p className="font-medium">{client.name}</p>
                    <p>{client.email}</p>
                  </div> */}
                  <select name="businessType" value={client.permission} id="businessType" disabled={client.id == user?.id || client.verifiedEmail == false || client.verifiedEmail == undefined} onChange={async (e) => {
                    client.permission = Number(e.target.value) === 0 ? 1 : Number(e.target.value)
                    setClients([...clients])

                    async function alterPermission() {
                      await updateUser({
                        id: client.id,
                        id_company: user?.id_company!,
                        data: {
                          permission: Number(e.target.value) === 0 ? 1 : Number(e.target.value)
                        }
                      })

                      await axios.post('/api/users/admin', {
                        action: 'assign',
                        uid: client.id,
                        level: Number(e.target.value) === 0 ? 1 : Number(e.target.value)
                      })
                    }

                    toast.promise(
                      alterPermission(),
                        {
                          loading: 'Editando o administrador...',
                          success: <b>Permissão salva!</b>,
                          error: <b>Não foi possível alterar a permissão do admin.</b>,
                        }
                    );
                  }} className={`bg-neutral-600/60 border-2 border-neutral-500 rounded-md py-1 px-2 focus:outline-none focus:ring focus:ring-emerald-600 text-neutral-400 text-[16px]`}>
                    <option value="0" className="text-black">Nível de permissão</option>
                    <option value="1" className="text-black">Permissão de ver</option>
                    <option value="2" className="text-black">Permissão de criar e alterar</option>
                    <option value="3" className="text-black">Permissão de excluir</option>
                  </select>
                  <p className={`flex items-center justify-center bg-neutral-700 px-1 h-[30px] rounded-full text-[12px] text-neutral-400 border ${client.verifiedEmail ? 'border-emerald-500' : 'border-yellow-500'}`}>
                    <Image 
                      src={client.verifiedEmail ? Check : Email} 
                      alt="Em ativo" className="w-[15px] h-[15px] mr-2">
                    </Image>
                    {client.verifiedEmail ? 'Em ativo' : 'Email enviado'}
                  </p>
                  {
                    client.id == user?.id ? '' : 
                    <button className="bg-neutral-700 rounded-md flex justify-center items-center h-[30px] w-[30px] hover:bg-neutral-600 duration-100" onClick={() => {
                      toast((t) => (
                          <span>
                            <p style={{display: 'block'}}>Realmente desejar <b>deletar</b> este admin?</p>
                            <button onClick={() => {
                              async function deleteUser() {
                                await deleteClient({
                                  id_company: user?.id_company!,
                                  id_user: client.id
                                })
                                setClients([...clients!.filter(clientFilter => clientFilter.id != client.id)])
                                toast.dismiss(t.id)
                              }
                              toast.promise(
                                deleteUser(),
                                  {
                                    loading: 'Deletando o administrador...',
                                    success: <b>Admin deletado!</b>,
                                    error: <b>Não foi possível deletar o admin.</b>,
                                  }
                              ) 
                            }} style={{background: '#b91c1c', marginTop: '10px', padding: '5px', borderRadius: '4px', marginRight: '10px'}}>
                              Confirmar
                            </button>
                            <button onClick={() => toast.dismiss(t.id)} style={{background: '#484848', marginTop: '10px', padding: '5px', borderRadius: '4px'}}>
                              Cancelar
                            </button>
                          </span>
                        ),{
                          duration: 3000,
                          style: {
                            border: '1px solid #dc2626',
                            padding: '16px',
                            color: '#ffffff',
                            background: '#262626'
                          }
                        });
                      }}>
                      <Image src={Trash} alt="Delete User" className="w-[18px] h-[18px]"></Image>
                    </button>
                  }
                </div>
              )
            }) 
            : ''
          }
          {newUsersCreation[0] ?
            newUsersCreation.map((user, index) => {
              return (
                <div className="max-w-full grid grid-cols-[60px_180px_220px_1fr_120px_1fr] mt-4 items-center gap-4" key={user.id}>
                  <Image src={user.photo_url} alt='user image' width={40} height={40} className="rounded-full"></Image>  
                  <input type="text" value={user.name} className="bg-neutral-700/30 rounded-sm py-1 border-b border-neutral-500 px-1" placeholder='Nome do admin' onChange={(e) => {
                    newUsersCreation[index].name = e.target.value
                    newUsersCreation[index].photo_url = `https://ui-avatars.com/api/?name=${e.target.value}&background=10b981&color=262626&format=svg`
                    setNewUsersCreation([...newUsersCreation])
                  }}/>
                  <input type="email" value={user.email} className="bg-neutral-700/30 rounded-sm py-1 border-b border-neutral-500 px-1" placeholder='Email do admin' onChange={(e) => {
                    newUsersCreation[index].email = e.target.value
                    setNewUsersCreation([...newUsersCreation])
                  }}/>
                  <select name="businessType" id="businessType" onChange={(e) => {
                    newUsersCreation[index].permission = Number(e.target.value) === 0 ? 1 : Number(e.target.value)
                    setNewUsersCreation([...newUsersCreation])
                  }} className={`bg-neutral-600/60 border-2 border-neutral-500 rounded-md py-1 px-2 focus:outline-none focus:ring focus:ring-emerald-600 text-neutral-400 text-[16px]`}>
                    <option value='0' className="text-black">Nível de permissão</option>
                    <option value='1' className="text-black">Permissão de ver</option>
                    <option value='2' className="text-black">Permissão de criar e alterar</option>
                    <option value='3' className="text-black">Permissão de excluir</option>
                  </select>
                  <p className="flex items-center justify-center bg-neutral-700 px-1 h-[30px] rounded-full text-[12px] text-neutral-400 border border-neutral-500">
                    <Image 
                    src={Edit}
                    alt="Em criação" className="w-[15px] h-[15px] mr-2 grayscale">
                    </Image>
                    Em criação
                  </p>
                  <button className="bg-neutral-700 rounded-md flex justify-center items-center h-[30px] w-[30px] hover:bg-neutral-600 duration-100" onClick={() => {
                    newUsersCreation.splice(index, 1)
                    setNewUsersCreation([...newUsersCreation])
                  }}><Image src={Trash} alt="Delete User" className="w-[18px] h-[18px]"></Image></button>
                </div>
              )
            })
          :
          ''  
          }
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button 
          className="text-emerald-500 mt-2 hover:bg-neutral-600/30 hover:rounded-md px-2 py-1 duration-100" 
          onClick={() => {
            if(newUsersCreation.length < adminCrationsLimit() && clients?.filter(client => client.permission > 0).length! <= adminCrationsLimit()) {
              setNewUsersCreation((users) => [...users, {
                id: uuidv4(),
                name: '',
                senha: '',
                photo_url: `https://ui-avatars.com/api/?name=&background=10b981&color=262626&format=svg`,
                email: '',
                permission: 1,
                status: true
              }])
            } else {
              toast.error("Limite de criação de admin excedido.") 
            }
          }}
          >+ Adicionar admin</button>
          {newUsersCreation[0] ? 
            <button className="text-neutral-800 mt-2 bg-emerald-500 rounded-md px-4 py-1 duration-100 hover:bg-emerald-600" onClick={async () => {
              setLoading(true)
              for await (const userCreate of newUsersCreation) {

                await signInWithEmailAndPassword(auth, userCreate.email, 'WrongPasswordOnlyForTest')
                  .catch(async (error) => {
                    const errorCode = error.code;
                    if(errorCode == 'auth/invalid-email') {
                      toast.error('Email inválido')
                    } else if(errorCode !== 'auth/user-not-found') {
                      toast.error(`O email: ${userCreate.email} já está cadastrado.`)
                    } else {
                      if(userCreate.name !== '') {
                        await setDoc(doc(db, 'companies', user?.id_company!, 'clients', userCreate.id), {
                          id: userCreate.id,
                          name: userCreate.name,
                          email: userCreate.email,
                          photo_url: userCreate.photo_url,
                          id_company: user?.id_company!,
                          permission: userCreate.permission,
                          status: userCreate.status,
                          verifiedEmail: false
                        });
      
                        await axios.post('/api/sendEmail/confirmEmail', {
                          email: userCreate.email,
                          id_user: userCreate.id,
                          id_company: user?.id_company!,
                          nameCompany: user?.name_company
                        })
      
                        setClients([...clients!, userCreate])
                        setNewUsersCreation(newUsersCreation.filter(user => user.id !== userCreate.id))
      
                        toast.success('Admin criado! Um email de verificação foi enviado.')
                      } else {
                        toast.error("Algum campo necessário não foi corretamente preenchido.")
                      }
                    }
                })
              }
              setLoading(false)
            }}>
              {loading ? 
                <svg className="h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : 
              'Salvar'}
            </button>  
            :
            ''
          }
      </div>
    </main>
  )
}           