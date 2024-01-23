import Header from './home/components/Header'
import Hero from './home/components/Hero'
import Features from './home/components/Features'
import PricesLP from '@/components/PricesLP'
import Footer from './home/components/Footer'
import About from './home/components/About'
import { AccordionSection } from './home/components/Accordion'

import Grow from '@/public/Home/grow.svg'
import Image from 'next/image'
import Trailer from './home/components/Trailer'
import Personalize from './home/components/Personalize'
import OurNumbers from './home/components/OurNumbers'
import ShowMobileAndDesktop from './home/components/ShowMobileAndDesktop'
import Link from 'next/link'
import Form from '@/app/home/components/Form'

export default function Home() {
  return (
    <main id="home" className='flex justify-center'>
      <div className='bg-[#EBEBEB] max-w-[1920px]'>
        <div className="bg-[url('../public/Home/shadow1.svg')] bg-no-repeat">
          <Header />
          <Hero />
        </div>
        <Features />
        <OurNumbers />
        <ShowMobileAndDesktop />
        <Trailer />
        <Form />
        <div id="preços">
          {/* @ts-expect-error Server Component */}
          <PricesLP />
        </div>
        <AccordionSection />
        <Footer />
        <Link className="bg-[#EBEBEB] rounded-full fixed right-[10px] bottom-[10px]" target='__blank' href={"https://wa.me/5516994391314?text=Quero+mais+informa%C3%A7%C3%B5es+sobre+o+2Docs%21"}>
          <Image src={"/Home/whatsappLogo.svg"} alt="WhatsApp" width={70} height={70} className='max-lg:w-[50px] max-lg:h-[50px]' />
        </Link>
      </div>
    </main>
  )
}
