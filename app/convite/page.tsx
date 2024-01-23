'use client';

import Image from "next/image";
import { Clients } from "@/types";
import { DocumentData } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Correct from '@/public/Dashboard/correct.svg'
import Invite from '@/public/Dashboard/invite.svg'
import Logo from '@/public/logo.svg'
import OpenedEye from '@/public/Dashboard/eye-open.svg'
import ClosedEye from '@/public/Dashboard/eye-closed.svg'

import { selectUser } from "@/utils/firebase/userManager";
import { updateUser } from "@/utils/firebase/userManager";

import axios from "axios";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id_user = searchParams?.get('id_user')
    const id_company = searchParams?.get('id_company')

    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passView1, setPassView1] = useState(false)
    const [passView2, setPassView2] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<null | Clients | DocumentData>(null)

    useEffect(() => {
        if (!id_user && !id_company) {
            return router.replace('/')
        }  

        const verification = async () => {
            const {resUser} = await selectUser({
                id_company: id_company!,
                id: id_user!
            })
            
            if(!resUser.docs[0] || resUser.docs[0].data().emailVerified) {
                return router.replace('/')
            }
            
            setUser(resUser.docs[0].data())
            setLoad(true)
        }

        verification()
    }, [])

    async function createUser() {
        if(newPassword !== confirmPassword) {
            return setError('As senhas estão diferentes!')
        }

        setLoading(true)

        await axios.post('/api/users/create', {
            uid: user?.id,
            email: user?.email,
            senha: newPassword,
            id_company,
            verified: true
        })
    
        await axios.post('/api/users/admin', {
            action: 'assign',
            uid: id_user,
            level: user?.permission
        })

        await updateUser({
            id_company: id_company!,
            id: id_user!,
            data: {
                verifiedEmail: true
            }
        })

        setLoading(false)
        setModal(true)
    }

    if(load)
    return (
        <section className="flex h-screen w-screen justify-center items-center flex-col">
            {modal ?
                <div className='absolute w-full h-full bg-neutral-800/70 backdrop-blur-sm z-50'>
                    <Image src={Correct} alt='Correct' className='w-[100px] mx-auto mt-[200px]'></Image>
                    <p className='mx-auto text-center mt-5 text-[24px] font-medium max-w-[500px]'>Conta criada com sucesso! Se desejar, poderá fechar esta guia.</p>
                </div> 
            : ''}
            <div className='border-2 border-neutral-600/50 rounded-lg p-10 mx-5 shadow-modal'>
                <Image src={Invite} alt='forget pass' className='w-[70px]'></Image>
                <h3 className='text-[22px] font-semibold mt-5'>Você foi convidado a ingressar em uma empresa dentro do 2Docs 🥂</h3>
                <p className='max-w-[500px] mt-5'>Crie abaixo a sua nova senha de acesso, e utilize o email em que recebeu este link para realizar o login!</p>
                {error !== '' ? <p className='mt-3 mb-[-15px] duration-150 text-red-500 text-[14px]'>{error}</p> : ''}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createUser()
                    }}
                >
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
                            placeholder="Nova Senha"
                        />
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
                            placeholder="Confirmar nova senha" 
                        />

                        <Image onClick={() => setPassView2((view) => !view)} src={passView2 ? OpenedEye : ClosedEye} alt='eye' className="py-3 w-[22px] mx-3 invert cursor-pointer"></Image>
                    </div>
                    <button type='submit' className='flex justify-center items-center mt-10 bg-emerald-500 border-emerald-700 hover:bg-emerald-600 border-2 px-4 py-2 rounded-md font-medium duration-100'>{
                        loading == true ? 
                        <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        : 'Concluir cadastro'}
                    </button>
                </form>
                <Image src={Logo} alt='2core' className='absolute top-5 right-5 w-[40px]'></Image>
            </div>
        </section>
    )
}                                                                                                                                                          