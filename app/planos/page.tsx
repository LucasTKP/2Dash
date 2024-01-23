import Image from "next/image";
import Logo from '@/public/logo.svg'
import Prices from '@/components/Prices'

export default function Page() {
    return (
        <section className="flex justify-center items-center flex-col">
            <Image src={Logo} alt='logo' className='mt-10'></Image>
            {/* @ts-expect-error Server Component */}
            <Prices screen="planos"/>
        </section>
    )
}
                                                                                                                                                                