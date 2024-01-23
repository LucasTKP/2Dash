'use client';

import Image from "next/image";
import Logo from '@/public/logo.svg'
import ConfettiGenerator from 'confetti-js'
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCustomer } from "@/utils/stripe";
import { googleTracker } from "@/utils/gAnalytics/fireGAEvent";

import * as pixel from '@/libs/fbpixel'

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const stats = searchParams?.get('stats')
    const id_user = searchParams?.get('id_user')
    const trial = searchParams?.get('trial')
    const price = searchParams?.get('price')

    useEffect(() => {
        async function update() {
            await updateCustomer({
                id_custumer: id_user!,
                data: {
                    metadata: {
                        hadTrial: true
                    }
                }
            })
        }

        if (stats == 'success') {
            if(trial && id_user) {
                update()
                
                googleTracker({eventName: "start_trial", eventParameters: {
                    value: "0.0",
                    currency: "BRL",
                    predicted_ltv: "179"
                }})
                pixel.event('StartTrial', {value: '0.00', currency: 'BRL', predicted_ltv: '179.00'})
            } else {
                pixel.event('Purchase', {value: price, currency: 'BRL'})
            }

            const confettiSettings = { target: 'my-canvas' };
            const confetti = ConfettiGenerator(confettiSettings);
            confetti.render();

            return () => confetti.clear();
        } else {
            router.replace('/login')
        }
        
      }, [router, stats]) // add the var dependencies or not

    if (stats == 'success') {
        return (
            <section className="flex justify-center items-center flex-col h-screen w-screen">
                <div className="text-center z-10 border-2 border-neutral-600/50 rounded-lg py-12 px-14 mx-5 shadow-modal bg-neutral-800">
                    <Image src={Logo} alt='logo' className='mx-auto'></Image>
                    <h1 className="text-[24px] font-semibold my-10">Obrigado pela compra!</h1>
                    <button className="bg-emerald-500 py-2 px-5 rounded-lg hover:bg-emerald-600"><a href="/dashboard" className="font-semibold">Ir para o Dashboard</a></button>
                </div>
                <canvas id="my-canvas" className="absolute"></canvas>
            </section>
        )
      }
}
                                                                                                                                                                