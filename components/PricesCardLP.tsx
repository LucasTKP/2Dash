'use client';

import Image from 'next/image'
import BlackCheck from '@/public/Home/blackCheck.svg'
import GreenCheck from '@/public/Home/check.svg'
import BlueCheck from '@/public/Home/blue-check.svg'
import YellowCheck from '@/public/Home/yellow-check.svg'
import X from '@/public/Home/x.svg'
import XLP from '@/public/Home/XLP.svg'

import { useContext } from 'react';
// import ReactGA from 'react-ga4';
import { priceContext } from './PriceContext';
import Link from 'next/link';
import { auth } from '@/libs/firebase'
import { searchCostumer, createCostumer, createSession, updateSubscription } from '@/utils/stripe';
import { useRouter } from 'next/navigation';

import Inicial from '@/public/Plans/basic.svg'
import Prossional from '@/public/Plans/professional.svg'
import Business from '@/public/Plans/business.svg'
import Free from '@/public/Plans/free.svg'

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

function PricesCard({title, obs, anualPrice, mensalPrice, links, ids, includes, excludes }: props) {
    const { price } = useContext(priceContext);
    const router = useRouter();

    async function subscription() {

        const dataSearchCostumer = await searchCostumer({
            id_company: auth.currentUser?.displayName || ''
        })

        if (!ids) {
            return new Error();
        }

        if (dataSearchCostumer[0]) {
            if (dataSearchCostumer[0]?.subscriptions?.data[0]?.status !== 'active') {
                const stripeRedirectUrl = await createSession({
                    id_plan: price == 'anual' ? ids.anual : ids.mensal,
                    id: dataSearchCostumer[0].id,
                    hadTrial: dataSearchCostumer[0].metadata.hadTrial
                })

                if(stripeRedirectUrl) {
                    // ReactGA.event('begin_checkout', {
                    //     currency: 'BRL',
                    //     recurrence: `${price}`,
                    //     value: `${price == 'anual' ? anualPrice : mensalPrice}`,
                    // })
                    return router.replace(stripeRedirectUrl);
                } else {
                    return router.replace('/');
                }
            }

            await updateSubscription({ id_subscription: dataSearchCostumer[0]?.subscriptions?.data[0].id, id_previous_plan: dataSearchCostumer[0]?.subscriptions?.data[0]?.items.data[0].id, id_next_plan: price == 'anual' ? ids.anual : ids.mensal })
            return router.replace('https://2docs.app/sucesso?stats=success')
        } else {
            const idUser = await createCostumer({
                email: auth.currentUser?.email || '',
                id_company: auth.currentUser?.displayName || '',
            });

            const stripeRedirectUrl = await createSession({
                id_plan: price == 'anual' ? ids.anual : ids.mensal,
                id: idUser
            });

            if(stripeRedirectUrl) {
                // ReactGA.event('begin_checkout', {
                //     currency: 'BRL',
                //     recurrence: `${price}`,
                //     value: `${price == 'anual' ? anualPrice : mensalPrice}`,
                // })

                return router.replace(stripeRedirectUrl);
            } else {
                return router.replace('/');
            }
        }
    }

    return (
        <div className={`bg-gradient-to-bl rounded-xl ${title == 'Grátis' ? 'from-[#8B8B8B] to-[rgba(139,139,139,0.25)] p-[1px]' : title == 'Inicial' ? 'from-emerald-500 to-emerald-500/25 p-[1px]' : title == 'Profissional' ? 'from-sky-500 to-sky-500/25 p-[2px]' : 'from-yellow-500 to-yellow-500/25 p-[1px]'} max-xl:mb-10`}>
            <div className={`rounded-xl bg-[#EBEBEB]`}>
                {title == 'Profissional' &&
                    <div className={`py-4 rounded-t-lg text-center bg-[#1899F0] text-white`}>
                        <p className='text-[20px] font-medium'>Melhor Oferta</p>
                    </div>
                }

                <div className='p-6'>
                    <div className='flex justify-between items-center mb-5'>
                        <h3 className={`text-[20px] font-medium border inline-flex px-6 py-2 rounded-full ${title === "Grátis" ? 'text-[#8B8B8B] border-[#8B8B8B] bg-[#aaaaaa27]' : title == 'Inicial' ? 'text-emerald-500/70 border-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'text-sky-500 border-sky-500 bg-sky-500/30' : 'text-yellow-500/70 border-yellow-500 bg-yellow-500/30'}`}>{title}</h3>
                        <Image src={title === "Grátis" ? Free : title == 'Inicial' ? Inicial : title == 'Profissional' ? Prossional : Business} alt='Icone do plano'></Image>
                    </div>

                    {title === "Grátis" ?
                        <p className={`text-[24px] text-[#5959597f]`}><span className={`text-[54px] font-bold text-[#595959]`}>{anualPrice}</span> <span className={`text-[28px] font-[600] text-[#595959]`}>R$</span> grátis para sempre</p>
                        :
                        title != "Grátis" && price == 'anual' ?
                            <p className={`text-[24px] text-[#5959597f]`}><span className={`text-[54px] font-bold text-[#595959]`}>{anualPrice}</span> <span className={`text-[28px] font-[600] text-[#595959]`}>R$</span> por mês</p>
                            :
                            <p className={`text-[24px] text-[#5959597f]`}><span className={`text-[54px] font-bold text-[#595959]`}>{mensalPrice}</span> <span className={`text-[28px] font-[600] text-[#595959]`}>R$</span> por mês</p>
                    }


                    <p className={`max-w-[400px] mb-10 text-[18px] text-[#595959cb] font-light mt-2 border-b ${title == 'Grátis' ? 'border-[#8b8b8bcb]' : title == 'Inicial' ? 'border-emerald-500' : title == 'Profissional' ? 'border-sky-500' : 'border-yellow-500'} pb-5`}>{obs}</p>

                    <ul className='text-[20px] my-4'>

                        {includes.map((include) => {
                            return (
                                <li className='flex gap-3 mt-2' key={include}>
                                    <Image src={title == 'Grátis' ? BlackCheck : title == 'Inicial' ? GreenCheck : title == 'Profissional' ? BlueCheck : YellowCheck} alt='check'></Image>
                                    <p className={"text-[#555555]"}>{include}</p>
                                </li>
                            )
                        })}
                        {excludes.map((exclude) => {
                            return (
                                <li className='flex gap-3 mt-2' key={exclude}>
                                    <Image src={XLP} alt='check'></Image>
                                    <p className={"text-[#5d5d5d66]"} >{exclude}</p>
                                </li>
                            )
                        })}

                    </ul>

                    {links
                        ?
                        <Link href={price == 'anual' ? links.anual : links.mensal}>
                            <button className={`w-full mt-5 mb-3 border-[2px] duration-100 ${title == 'Grátis' ? 'border-[#8B8B8B] hover:bg-[rgba(170,170,170,0.5)] bg-[rgba(170,170,170,0.1)]' : title == 'Inicial' ? 'border-emerald-500 hover:bg-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'border-sky-500 hover:bg-sky-500 bg-sky-500/30' : 'border-yellow-500 hover:bg-yellow-500 bg-yellow-500/30'} py-2 rounded-lg text-[20px] text-[#555555] font-medium`}>{title == 'Grátis' ? 'Começar' : 'Assinar'}</button>
                        </Link>
                        : 
                        <button onClick={subscription} className={`w-full mt-5 mb-3 border-[2px] duration-100 ${title == 'Inicial' ? 'border-emerald-500 hover:bg-emerald-500 bg-emerald-500/30' : title == 'Profissional' ? 'border-sky-500 hover:bg-sky-500 bg-sky-500/30' : 'border-yellow-500 hover:bg-yellow-500 bg-yellow-500/30'} py-2 rounded-lg text-[20px] text-white font-medium`}>{title == 'Grátis' ? 'começar' : 'Assinar'}</button>}
                </div>

            </div>
        </div>
    )
}

export default PricesCard