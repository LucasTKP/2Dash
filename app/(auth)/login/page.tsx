import Form from './component/Form'
import Image from 'next/image'
import Logo from '@/public/logo.svg'

export default function Page() {
  return (
    <section className="flex h-screen w-screen justify-center items-center flex-col">
      <div className='mx-4'>
        <Image src={Logo} alt='logo' className='mx-auto w-[40px] mb-2'></Image>
        <h3 className='text-[30px] font-semibold text-center font-jost mb-10'>Entrar no 2Docs</h3>
        <Form />
        <p className='mt-5 text-[14px]'>Não tem uma conta? <a href="/cadastro" className='text-emerald-500 hover:text-emerald-600'>Criar conta</a> </p>
      </div>
    </section>
  )
}
