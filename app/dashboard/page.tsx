'use client';

import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import { ClientsContext } from "./contexts/clientsContext";
import { CreationCompany } from "./components/CreationCompany";
import Image from "next/image";

import { Clients } from "@/types";

import GreenArrow from '@/public/Dashboard/green-arrow.svg'
import RedArrow from '@/public/Dashboard/red-arrow.svg'

import { ref, onValue } from 'firebase/database'
import { realtime } from '@/libs/firebase';
import Link from "next/link";

type usageProps = {
  id_company: string;
  limit: number
}

type clientsAndStatusProps = {
  clients: Clients[] | null
}

// Principal component
export default function Page() {
  const {user} = useContext(UserContext)
  const {clients} = useContext(ClientsContext)

  if (!user?.name) {
    return <CreationCompany />
  }

  let storageLimit = 0

  if(user.plan.split(' ')[0] == 'Empresarial') {
    storageLimit = 20
  } else if(user.plan.split(' ')[0] == 'Profissional') {
    storageLimit = 10
  } else if (user.plan.split(' ')[0] == 'Inicial') {
    storageLimit = 5
  } else {
    storageLimit = 0.150
  }

  return (
    <main className="lg:flex mx-auto gap-10 max-w-[1000px] max-lg:max-w-[600px] max-lg:mb-10 justify-beetwen px-10">
      <div className="flex flex-col gap-10 w-full">
        <Usage id_company={user.id_company} limit={storageLimit}/>
        <Clients clients={clients}/>
      </div>
      <Status clients={clients}/>
    </main>
  )
}

// Usage component
function Usage({id_company, limit}: usageProps) {

  type usersUsage = {
    size: number
  }

  const [usersUsages, setUsersUsages] = useState<usersUsage>({size: 0})
  

  useEffect(() => {
    onValue(ref(realtime, '/usage/' + id_company), (snapshot) => {
      if(snapshot.exists()) {
        setUsersUsages(snapshot.val())
      }
    })  
  }, [])

  const usage = usersUsages.size

  return (
    <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
      <div className="bg-neutral-800 rounded-md">
        <div className="xs:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
          <h3 className="font-medium text-[20px]">Uso</h3>
          <p className="text-neutral-400 text-[14px]">“Quanto ainda lhe resta de armazenamento”</p>
        </div>
        <div className="flex justify-between px-8 mt-5 items-center py-2 max-xs:justify-center max-xs:flex-col max-xs:text-center">
          <div className="w-[140px] h-[140px] max-xs:w-[100px] max-xs:h-[100px] rounded-full flex justify-center items-center ring-offset-[6px] ring-0 ring-offset-neutral-600 relative before:absolute before:h-[120px] before:w-[120px] max-xs:before:h-[100px] max-xs:before:w-[100px] before:rounded-full before:bg-neutral-800" 
          style={{background: `conic-gradient(#10b981 ${Math.round((Number((usage / 1073741824).toFixed(2)) / limit) * 100) * 3.6}deg, #262626 0deg)`}}>
            <p className="font-semibold text-[20px] z-20">GB</p>
          </div>
          <div>
            <p className="text-[24px] max-xs:text-[18px] font-semibold max-xs:mt-5"><span className="text-emerald-500">{usage == 0 ? 0 : (usage / 1073741824).toFixed(2)}Gb</span> / {limit}Gb</p>
            {/* <a href="/planos"><button className="mt-4 border border-neutral-500 px-4 py-2 rounded-full text-emerald-500 font-medium bg-neutral-700/40 hover:bg-neutral-800 duration-150 hover:border-emerald-500">Upgrade 🎉</button></a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function Clients({clients} : clientsAndStatusProps) {
  return (
    <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
      <div className="bg-neutral-800 rounded-md h-full">
        <div className="xs:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
          <h3 className="font-medium text-[20px]">Clientes</h3>
          <p className="text-neutral-400 text-[14px]">“Estatísticas de seus clientes”</p>
        </div>
        <div className="flex justify-between px-8 mt-5 items-center py-2 max-xs:flex-col max-xs:gap-5">
          <div>
            <p className="text-neutral-400 font-medium">Ativos</p>
            <div className="flex gap-6 items-center">
              <h3 className="text-[30px] font-semibold">{clients?.filter(client => client.status == true || client.status == undefined && client.permission == 0).length}</h3>
              <div className="flex gap-2 bg-emerald-500/30 border-2 border-emerald-500 px-2 py-1 rounded-full">
                <Image src={GreenArrow} alt='Green Arrow'></Image>
                <p className="text-[18px] font-semibold text-emerald-500">{clients ? ((clients?.filter(client => client.status == true || client.status == undefined && client.permission == 0).length / clients?.length) * 100).toFixed(1) : ''}%</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-neutral-400 font-medium">Inativos</p>
            <div className="flex gap-4 items-center">
              <h3 className="text-[30px] font-semibold">{clients?.filter(client => client.status == false).length}</h3>
              <div className="flex gap-2 bg-red-600/30 border-2 border-red-600 px-2 py-1 rounded-full">
                <Image src={RedArrow} alt='Green Arrow'></Image>
                <p className="text-[18px] font-semibold text-red-600">{clients ? ((clients?.filter(client => client.status == false).length / clients?.length) * 100).toFixed(1) : ''}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Status({clients} : clientsAndStatusProps) {
  type usersStats = {
    state: string
    last_changed: number
  }

  type usersProps = {
    [key: string] : usersStats
  }

  const [usersOnlineStatus, setUsersOnlineStatus] = useState<usersProps>({})
  

  useEffect(() => {
    onValue(ref(realtime, '/status/'), (snapshot) => {
      if(snapshot.exists()) {
        setUsersOnlineStatus(snapshot.val())
      }
    })  
  }, [])

  return (
    <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
      <div className="bg-neutral-800 rounded-md h-full">
        <div className="xs:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
          <h3 className="font-medium text-[20px]">Status</h3>
          <p className="text-neutral-400 text-[14px]">“Quem da sua empresa está online”</p>
        </div>
        <div className="px-8 mt-5 py-2">
          {clients?.filter(client => client.permission > 0).map(client => {
            const id = client.id

            return (
              <div className="flex justify-between items-center mb-8 max-xs:justify-center" key={id}>
                <div className="flex gap-5">
                  <div className={`relative inline-flex ${usersOnlineStatus[id] && usersOnlineStatus[id].state == 'Online' ? 'before:bg-emerald-500  before:border-emerald-600' : usersOnlineStatus[id] && usersOnlineStatus[id].state == 'Offline' ? 'before:bg-red-500 before:border-red-600' : 'before:bg-yellow-500 before:border-yellow-600'} before:w-[15px] before:h-[15px] before:rounded-full before:absolute before:bottom-0 before:right-0 before:border-2`}>
                    <Image src={client.photo_url} alt='photo url' width={50} height={50} className='rounded-full max-xs:w-[40px] max-xs:h-[40px] max-xs:mt-2'></Image>
                  </div>
                  <div>
                    <p className="font-medium text-[18px]">{client.name}</p>
                    <p className="text-neutral-400">{usersOnlineStatus[id] ? `${usersOnlineStatus[id].state}` : ''}</p>
                  </div>
                </div>
                <Link href="/dashboard/admins" className="max-xs:hidden bg-neutral-600 p-2 rounded-md hover:bg-neutral-700 duration-100"><Image src={GreenArrow} alt='arrow' className="saturate-0"></Image></Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}