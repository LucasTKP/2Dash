'use client';

import { onAuthStateChanged } from "firebase/auth";
import {auth} from '@/libs/firebase'
import { searchCostumer } from "@/utils/stripe";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlansLayout({
    children, // will be a page or nested layout
    }: {  
    children: React.ReactNode,
    }) {
    const [load, setLoad] = useState(false)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(!user) {
                return router.replace('/login')
            }
    
            if(!user.emailVerified) {
                return router.replace('/verificar')
            }
    
            setLoad(true)
        })
    }, [])

    if(load)
    return (
        <main>  
            {children}
        </main>
    );
    
}