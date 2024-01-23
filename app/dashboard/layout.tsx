'use client';
import { Clients, User } from "@/types";
import { verifyUsersStatus } from '@/utils/firebase/realtimeFunctions'

import { onAuthStateChanged } from "firebase/auth";
import {auth} from '@/libs/firebase'
import { useRouter } from 'next/navigation';
import { UserContext } from "./contexts/userContext";
import {ClientsContext} from './contexts/clientsContext'

import React, { useEffect, useState } from "react";

import { searchCostumer } from "@/utils/stripe";
import verifyAdmin from "@/utils/firebase/verifyAdmin";
import { selectUser } from "@/utils/firebase/userManager";
import { selectClients } from "@/utils/firebase/clientsManager";
import Image from "next/image";

import Spin from '@/public/spin.gif'

import Header from './components/Header'
import Heading from './components/Heading'

import { useIdleTimer } from 'react-idle-timer'

function verifyPlanName(id: string): string {
  if(id == 'price_1MX5uXBC8E6EzctJ1TMCPSoE') {
    return 'Empresarial - Mensal'
  } else if (id == 'price_1MX5uXBC8E6EzctJ1qaXp8ho') {
    return 'Empresarial - Anual'
  } else if (id == 'price_1MX5u3BC8E6EzctJlS8NCOJF') {
    return 'Profissional - Mensal'
  } else if (id == 'price_1MX5u3BC8E6EzctJLblqdVuF') {
    return 'Profissional - Anual'
  } else if (id == 'price_1MX5tXBC8E6EzctJCEiUGV4h') {
    return 'Inicial - Mensal'
  } else {
    return 'Inicial - Anual'
  }
}

function getDateToExpirationPlan(date: number) {
  const minusTime = new Date(date * 1000).getTime() - new Date().getTime()
  return Math.ceil(minusTime / (1000 * 60 * 60 * 24))
}

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    const router = useRouter()
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<null | User>(null)
    const [clients, setClients] = useState<null | Clients[]>(null)

    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {

        if(!user) {
          return router.replace('/login')
        }

        // Get data about the user
        const {data} = await verifyAdmin(user.uid)

        const dataSearchCostumer = await searchCostumer({
          id_company: auth.currentUser?.displayName || ''
        })

        console.log(dataSearchCostumer)

        const {resUser, resCompany} = await selectUser({
          id_company: user.displayName ? user.displayName : '', 
          id: user.uid
        })

        // Validations necessaries
        if(data !== 3) {
          return router.replace('/')
        }

        if(!user.emailVerified) {
          return router.replace('/verificar')
        }
        
        // if(dataSearchCostumer[0]?.subscriptions?.data[0]?.status !== 'active' && dataSearchCostumer[0]?.subscriptions?.data[0]?.status !== 'trialing' && dataSearchCostumer[0]) {
        //   return router.replace('/planos')
        // }
        let plan = ''
        let expiration: number | string = ''

        if(!dataSearchCostumer[0]) {
          plan = 'Gratuito'
          expiration = 'Ilimitado'
        } else if (dataSearchCostumer[0] && dataSearchCostumer[0]?.subscriptions?.data[0]?.status == undefined) {
          plan = 'Gratuito'
          expiration = 'Ilimitado'
        } else if (dataSearchCostumer[0]?.subscriptions?.data[0]?.status == 'active' || dataSearchCostumer[0]?.subscriptions?.data[0]?.status == 'trialing') {
          plan = verifyPlanName(dataSearchCostumer[0]?.subscriptions?.data[0]?.plan.id)
          expiration = getDateToExpirationPlan(dataSearchCostumer[0]?.subscriptions?.data[0]?.current_period_end)
        } else {
          plan = 'Gratuito'
          expiration = 'Ilimitado'
        }

        const userData = {
          id: user.uid,
          name: resUser.docs[0].data().name ? resUser.docs[0].data().name : undefined,
          photo: resUser.docs[0].data().photo_url,
          email: user.email ? user.email : '',
          telefone: resUser.docs[0].data().telefone ? resUser.docs[0].data().telefone : undefined,
          id_company: user.displayName ? user.displayName : '',
          name_company: resUser.docs[0].data().name_company ? resUser.docs[0].data().name_company : undefined,
          tickets: resUser.docs[0].data().tickets ? resUser.docs[0].data().tickets : undefined,
          plan: plan,
          usage: resCompany.docs[0].data().size,
          expiration_plan_days: expiration,
          domain: resCompany.docs[0].data().domain,
          hadDiscont: resCompany.docs[0].data().hadDiscont
        }

        setUser(userData)

        const clientsData = await selectClients({
          id_company: user.displayName ? user.displayName : ''
        })

        setClients(clientsData)

        // All validations were passed
        setLoad(true)

        verifyUsersStatus(user.uid)

      })
  }, [router])

    useIdleTimer({
      onIdle: () => verifyUsersStatus(user?.id!, 'idle'),
      onActive: () => verifyUsersStatus(user?.id!),
      timeout: 300000,
      crossTab: true
    })
  
    if(load) {
      return (
        <ClientsContext.Provider value={{clients, setClients}}>
          <UserContext.Provider value={{user, setUser}}>
            <section>
              {user?.name ? <Header company_name={user.name_company}/> : ''}
              {user?.name ? <Heading /> : ''}
              {children}
            </section>
          </UserContext.Provider>
        </ClientsContext.Provider>
      );
    }

    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image src={Spin} alt='Loading' width={110}></Image>
      </div>
    );
  }