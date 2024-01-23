'use client';

import Image from 'next/image'
import GreenCheck from '@/public/Home/check.svg'
import BlueCheck from '@/public/Home/blue-check.svg'
import YellowCheck from '@/public/Home/yellow-check.svg'
import X from '@/public/Home/x.svg'

import { useContext } from 'react';
import { priceContext } from './PriceContext';
import Link from 'next/link';
// import ReactGA from 'react-ga4';
import { googleTracker } from '@/utils/gAnalytics/fireGAEvent';
import {auth} from '@/libs/firebase'
import { searchCostumer, createCostumer, createSession, updateSubscription} from '@/utils/stripe';
import { useRouter } from 'next/navigation';

import Inicial from '@/public/Plans/basic.svg'
import Prossional from '@/public/Plans/professional.svg'
import Business from '@/public/Plans/business.svg'

import * as pixel from '@/libs/fbpixel'

type props = {
    title: string;
    obs: string;
    anualPrice: number,
    mensalPrice: number,
    links?: {
        anual: string,
        mensal: string
    },
    ids?: {
        anual: string,
        mensal: string
    }, 
    includes: string[],
    excludes: string[],
}

function PricesCard({title, obs, anualPrice, mensalPrice, links, ids, includes, excludes}: props) {
    const {price} = useContext(priceContext)
    const router = useRouter()

    async function subscription() {
        
        const dataSearchCostumer = await searchCostumer({
            id_company: auth.currentUser?.displayName || ''
        })

        if(!ids) {
            return new Error()
        }
        
        if(dataSearchCostumer[0]) {
            if(dataSearchCostumer[0]?.subscriptions?.data[0]?.status !== 'active') {
                const stripeRedirectUrl = await createSession({
                    id_plan: price == 'anual' ? ids.anual : ids.mensal,
                    id: dataSearchCostumer[0].id,
                    hadTrial: dataSearchCostumer[0].metadata.hadTrial,
                    price: price == 'anual' ? anualPrice : mensalPrice
                })
                if(stripeRedirectUrl) {
                    // ReactGA.event('begin_checkout', {
                    //     currency: 'BRL',
                    //     recurrence: `${price}`,
                    //     value: `${price == 'anual' ? anualPrice : mensalPrice}`,
                    // })

                    googleTracker({eventName: 'begin_checkout', eventParameters: {
                        currency: 'BRL',
                        recurrence: `${price}`,
                        value: `${price == 'anual' ? anualPrice : mensalPrice}`
                    }});
                    pixel.event('InitiateCheckout');

                    return router.replace(stripeRedirectUrl);
                } else {
                    return router.replace('/')
                }
            }
            
            await updateSubscription({id_subscription: dataSearchCostumer[0]?.subscriptions?.data[0].id, id_previous_plan:dataSearchCostumer[0]?.subscriptions?.data[0]?.items.data[0].id, id_next_plan: price == 'anual' ? ids.anual : ids.mensal}) 
            return router.replace('https://2docs.app/sucesso?stats=success')
        } else {
            const idUser = await createCostumer({
                email: auth.currentUser?.email || '',
                id_company: auth.currentUser?.displayName || '',
            })
    
            const stripeRedirectUrl = await createSession({
                id_plan: price == 'anual' ? ids.anual : ids.mensal,
                id: idUser,
                price: price == 'anual' ? anualPrice : mensalPrice
            })
    
            if(stripeRedirectUrl) {
                // ReactGA.event('begin_checkout', {
                //     currency: 'BRL',
                //     recurrence: `${price}`,
                //     value: `${price == 'anual' ? anualPrice : mensalPrice}`,
                // })

                googleTracker({eventName: 'begin_checkout', eventParameters: {
                    currency: 'BRL',
                    recurrence: `${price}`,
                    value: `${price == 'anual' ? anualPrice : mensalPrice}`
                }})
                pixel.event('InitiateCheckout');

                return router.replace(stripeRedirectUrl);
            } else {
                return router.replace('/');
            }
        }
    }

    return (
        <div className={`bg-gradient-to-b rounded-xl ${title == 'Inicial' ? 'from-emerald-500/70 p-[1px]' : title == 'Profissional' ? 'from-sky-500 p-[2px]' : 'from-yellow-500/70 p-[1px]'} max-lg:mb-10`}>
            <div className={`bg-gradient-to-t to-neutral-800 rounded-xl ${title == 'Inicial' ? 'from-[#262F2B]' : title == 'Profissional' ? 'from-[#282C2E]' : 'from-[#2E2C26]'}`}>
                {title == 'Profissional' && 
                    <div className='bg-neutral-900/40 py-4 rounded-t-lg text-center border-b border-neutral-600'>
                        <p className='text-sky-500 text-[20px] font-medium'>Melhor Oferta</p>
                    </div>
                }
                
                <div className='p-6'>
                    <div className='flex justify-between items-center mb-5'>
                        <h3 className={`text-[20px] font-medium border inline-flex px-6 py-2 rounded-full ${title == 'Inicial' ? 'text-emerald-500/70 border-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'text-sky-500 border-sky-500 bg-sky-500/30' : 'text-yellow-500/70 border-yellow-500 bg-yellow-500/30'}`}>{title}</h3>
                        <Image src={title == 'Inicial' ? Inicial : title == 'Profissional' ? Prossional : Business} alt='Icone do plano'></Image>
                    </div>

                    {/* <div className='flex'>
                        <p 
                        className={`cursor-pointer px-3 py-1 text-[18px] rounded-tl-md rounded-bl-md border-r-2 border-emerald-500 ${price == 'anual' ? 'bg-emerald-800 font-medium' : ''}`} 
                        onClick={() => setPrice('anual')}>
                            Anual
                        </p>
                        <p 
                        className={`cursor-pointer px-3 py-1 text-[18px] rounded-tr-md rounded-br-md ${price == 'mensal' ? 'bg-emerald-800 font-medium' : ''}`} 
                        onClick={() => setPrice('mensal')}>
                            Mensal
                        </p>
                    </div> */}

                    {price == 'anual' 
                    ? <p className='text-neutral-300 text-[24px]'><span className="text-[54px] font-bold text-white">{anualPrice}</span> R$ por mês</p> 
                    : <p className='text-neutral-300 text-[24px]'><span className="text-[54px] font-bold text-white">{mensalPrice}</span> R$ por mês</p>}

                    <p className={`max-w-[400px] mb-10 text-[18px] text-neutral-300 font-light mt-2 border-b ${title == 'Inicial' ? 'border-emerald-500' : title == 'Profissional' ? 'border-sky-500' : 'border-yellow-500'} pb-5`}>{obs}</p>

                    <ul className='text-[20px] text-neutral-200 my-4'>

                        {includes.map((include) => {
                            return (
                                <li className='flex gap-3 mt-2' key={include}>
                                    <Image src={title == 'Inicial' ? GreenCheck : title == 'Profissional' ? BlueCheck : YellowCheck} alt='check'></Image>
                                    <p>{include}</p>
                                </li>
                            )
                        })}
                        {excludes.map((exclude) => {
                            return (
                                <li className='flex gap-3 mt-2' key={exclude}>
                                    <Image src={X} alt='check'></Image>
                                    <p className='text-neutral-400'>{exclude}</p>
                                </li>
                            )
                        })}
                        
                    </ul>

                    {links
                    ? 
                    <Link href={price == 'anual' ? links.anual : links.mensal}> <button className={`w-full mt-5 mb-3 border-[2px] duration-100 ${title == 'Inicial' ? 'border-emerald-500 hover:bg-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'border-sky-500 hover:bg-sky-500 bg-sky-500/30' : 'border-yellow-500 hover:bg-yellow-500 bg-yellow-500/30'} py-2 rounded-lg text-[20px] text-white font-medium`}>{title == 'Inicial' ? 'Testar 7 dias' : 'Assinar'}</button> </Link>
                    : <button onClick={subscription} className={`w-full mt-5 mb-3 border-[2px] duration-100 ${title == 'Inicial' ? 'border-emerald-500 hover:bg-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'border-sky-500 hover:bg-sky-500 bg-sky-500/30' : 'border-yellow-500 hover:bg-yellow-500 bg-yellow-500/30'} py-2 rounded-lg text-[20px] text-white font-medium`}>{title == 'Inicial' ? 'Testar 7 dias' : 'Assinar'}</button>}
                </div>
                
            </div> 
        </div>
    )
}

export default PricesCard