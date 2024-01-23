import Image from "next/image"
import Link from "next/link"
import Logo2CoreBlack from '@/public/logo2CoreBlack.svg'

function Footer() {
  return (
    <footer className="py-10 text-[#555555] border-t border-neutral-200/40">
        <div className="container flex justify-between flex-wrap max-md:gap-5 gap-3">
            <Image className="w-[60px] h-full max-md:hidden mr-[20px]" src={Logo2CoreBlack} alt="Logo 2Core" />
            <div>
                <h3 className="font-bold text-[20px]">Menu</h3>
                <ul className="text-lighting mt-[10px]">
                    <li><a href="#" className="hover:brightness-75">Home</a></li>
                    <li><a href="#funcionalidades" className="hover:brightness-75">Funcionalidades</a></li>
                    <li><a href="#price" className="hover:brightness-75">Preços</a></li>
                    <li><a href="#equipe" className="hover:brightness-75">Equipe</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-[20px]">Redes Sociais</h3>
                <ul className="text-lighting mt-[10px]">
                    <li><Link href="https://twitter.com/2core_company" target="_blank" className="hover:brightness-75">Twitter</Link></li>
                    <li><Link href="https://www.facebook.com/profile.php?id=100087412010604" target="_blank" className="hover:brightness-75">Facebook</Link></li>
                    <li><Link href="https://www.instagram.com/2core.company/" target="_blank" className="hover:brightness-75">Instagram</Link></li>
                    <li><Link href="https://www.2core.com.br/#contato" target='_blank' className="hover:brightness-75">Linked-in</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-[20px]">Contratos</h3>
                <ul className="text-lighting mt-[10px]">
                    <li><Link href="https://www.2core.com.br/termos" target='_blank' className="hover:brightness-75">Termos e Condições</Link></li>
                    <li><Link href="https://www.2core.com.br/#diffs" target='_blank' className="hover:brightness-75">Prestação de serviço</Link></li>
                </ul>
                <p>{`2Core © ${new Date().getFullYear()} - Alguns direitos reservados.`}</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer