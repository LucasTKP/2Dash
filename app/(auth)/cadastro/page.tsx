import Form from "./components/Form"
import Image from "next/image"
import Logo from '@/public/logo.svg'
import Link from "next/link"
import ToLink from '@/public/Dashboard/link.svg'

export default function Page() {
  return (
    <section className="lg:grid max-lg:flex max-lg:flex-col-reverse grid-cols-2 lg:h-screen container">
      <div className="flex flex-col lg:border-r-2 border-neutral-400 sm:px-16 justify-center">
        <div className="flex items-center gap-5 max-lg:hidden">
          <Image src={Logo} className='w-[50px]' alt='Logo 2Core'></Image>
          <Link href="/" className="font-jost font-light text-[24px] cursor-pointer">2Docs</Link>
        </div>
        <ul className="lg:my-10">
          <li className="lg:my-10 max-lg:mb-10 max-lg:mt-5">
            <h3 className="text-[28px] max-md:text-[22px] flex items-center gap-4 font-semibold before:w-[25px] before:h-[5px] before:bg-emerald-500 before:block before:rounded-md">Suporte 24h p/ dia</h3>
            <p className="text-[18px]">Um suporte unico no mercado, e um sistema de ticket para melhor auxiliar sua empresa.</p>
          </li>
          <li className="my-10">
            <h3 className="text-[28px] max-md:text-[22px] flex items-center gap-4 font-semibold before:w-[25px] before:h-[5px] before:bg-emerald-500 before:block before:rounded-md">Testado e Comprovado</h3>
            <p className="text-[18px]">Nossos clientes ao redor do mundo nos ajudou a construir o 2Docs da melhor maneira para sua empresa.</p>
          </li>
          <li className="my-10">
            <h3 className="text-[28px] max-md:text-[22px] flex items-center gap-4 font-semibold before:w-[25px] before:h-[5px] before:bg-emerald-500 before:block before:rounded-md">Pensado para os dois lados</h3>
            <p className="text-[18px]">Não importa qual tipo de cliente sua empresa é focada, nós pensamos em tudo e em todos.</p>
          </li>
        </ul>
        <div className="border-t-2 border-neutral-500 py-5">
          <p className="text-[20px] mb-3">Quer um plano ou funcionalidades personalizado para sua empresa?</p>
          <Link href="" className="text-emerald-500 text-[18px] font-semibold cursor-pointer after:w-0 after:h-[3px] after:bg-emerald-500 after:block hover:after:w-full hover:after:duration-500">Entre em contato</Link>
        </div>
      </div>

      <div className="sm:px-16 flex flex-col justify-center max-lg:mt-10">
        <h2 className="text-[34px] font-bold">Faça parte do melhor sistema de arquivos!</h2>
          <Form />
          <div className="text-[14px] mt-10 mb-5">
            <p>Ao clicar em continuar, você concorda com o nosso</p>
            <Link href="https://www.2core.com.br/termos" className="flex gap-1 text-emerald-500 font-semibold hover:text-emerald-600">
              termo de serviço
              <Image src={ToLink} alt='link'className="w-[14px]" ></Image>
              </Link>
          </div>        
        <div className="lg:border-t-2 max-lg:border-b-2 border-neutral-500 py-5">
          <p className="text-[20px]">Já tem uma conta?</p>
          <Link href='/login' className="text-emerald-500 font-semibold hover:text-emerald-600 text-[18px]">Login</Link>
        </div>
      </div>
    </section>
  )
}