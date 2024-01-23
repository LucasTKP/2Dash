'use client';

import { onAuthStateChanged } from "firebase/auth";
import {auth} from '@/libs/firebase'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function AuthLayout({
    children, // will be a page or nested layout
  }: {  
    children: React.ReactNode,
  }) {
    const [load, setLoad] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
 
    const plan = searchParams?.get('plan')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user && !user.emailVerified && plan == null) {
              return router.replace('/verificar')
            } else if (user && !user.emailVerified && plan !== null) {
              return router.replace(`/verificar?plan=${plan}`)
            } else if (user && user.emailVerified) {
              return router.replace('/dashboard')
            } else {
              setLoad(true)
            }
        })
    }, [router])

    if(load) {
        return (
            <main>  
              {children}
            </main>
        );
    }
}