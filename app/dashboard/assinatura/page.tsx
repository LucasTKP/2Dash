'use client';

import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { createClientPortal } from '@/utils/stripe'
import { updateCompany } from "@/utils/firebase/companyManager";

import Grow from '@/public/Dashboard/grow.svg'
import Free from '@/public/Plans/free.svg'
import Basic from '@/public/Plans/basic.svg'
import Professional from '@/public/Plans/professional.svg'
import Business from '@/public/Plans/business.svg'
import Custom from '@/public/Plans/custom.svg'
import Calendar from '@/public/Dashboard/calendar.svg'
import Config from '@/public/Dashboard/config.svg'
import Check from '@/public/Home/check.svg'
import Sale from '@/public/Dashboard/sale.svg'
import Coffee from '@/public/Dashboard/coffee.svg'
import Ajuste from '@/public/Dashboard/ajuste.svg'

import { cancelSubscription, searchCostumer, applyCoupon } from '@/utils/stripe/index'
import toast, { Toaster } from 'react-hot-toast';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { User } from "@/types";

type planInfos = {
  icon: string,
  color: string,
  nextIcon: string,
  nextName: string,
  nextPros: string[],
  nextColor: string
}

export default function Page() {
  const {user} = useContext(UserContext)
  const router = useRouter()
  const currentPlan = user!.plan.split(' ')[0]
  const [currentPart, setCurrentPart] = useState(1)
  const [reasons, setReasons] = useState([])
  const [obs, setObs] = useState('')
  const [open, setOpen] = useState(false)

  const obsParts = {
    1: 'Que pena que nossos serviços não foram capazes de suprir suas necessidades ou expectativas... Poderia nos contar o por quê?',
    2: 'Entendemos o seu motivo, e sentimos muito! Algumas das alternativas a baixo o ajudaria a continuar com a gente?',
    3: 'Realmente usamos todos os nossos meios para você continuar conosco. Mesmo sendo triste, saiba que estamos de braços abertos para seu retorno...'
  }

  function planInfo(): planInfos {
    switch (currentPlan) {
      case 'Inicial':
        return {
          icon: Basic,
          color: '#00B268',
          nextIcon: Professional,
          nextName: 'Profissional',
          nextPros: ['+5gb de armazenamento', '+2 admins', 'Suporte personalizado'],
          nextColor: '#005694'
        }
        break;
      
      case 'Profissional':
        return {
          icon: Professional,
          color: '#005694',
          nextIcon: Business,
          nextName: 'Empresarial',
          nextPros: ['+10gb de armazenamento', 'Admins ilimitados', 'Suporte personalizado', 'Logs de eventos'],
          nextColor: '#BB8702'
        }
        break;
        
      case 'Empresarial':
        return {
          icon: Business,
          color: '#BB8702',
          nextIcon: Custom,
          nextName: 'Customizável',
          nextPros: ['Armazenamento ilimitado', 'Integração com plataformas', 'Suporte personalizado', 'Total controle'],
          nextColor: '#7A62DB'
        }
        break;
      
      default:
        return {
          icon: Free,
          color: '#8B8B8B',
          nextIcon: Basic,
          nextName: 'Inicial',
          nextPros: ['+5gb de armazenamento', 'Suporte personalizado', 'Experiência completa do 2Docs'],
          nextColor: '#00B268'
        }
    }
  }

  return (
    <main className="mx-auto gap-10 max-w-[1000px] px-10 mb-10">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
        <div className="bg-neutral-800 rounded-md">
          <div className="sm:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
            <h3 className="font-medium text-[20px]">Traga sua empresa para outro nível</h3>
            <p className="text-neutral-400 text-[14px]">“Dispensa explicações”</p>
          </div>
          <div className="flex px-8 mt-5 items-center py-6">
            <Image src={Grow} alt="Alavanque sua empresa" className="max-md:hidden"></Image>
            <div className="w-full ml-14 max-md:ml-0">
              <div className="sm:flex justify-between w-import toast, { Toaster } from 'react-hot-toast';full mb-5">
                <div className="flex items-center gap-4">
                  <Image src={planInfo().nextIcon} alt="Plan Icon" className="w-[40px]"></Image>
                  <h3 className={`text-[24px] max-xs:text-[20px] font-medium bg-gradient-to-r ${planInfo().nextColor == '#00B268' ? 'from-[#00B268]' : planInfo().nextColor == '#005694' ? 'from-[#005694]' : planInfo().nextColor == '#BB8702' ? 'from-[#BB8702]' : 'from-[#7A62DB]'} rounded-l-lg pl-2 bg-[length:60%] bg-no-repeat`}>{planInfo().nextName}</h3>
                </div>
                <button className={`border-2 max-sm:mt-5 max-sm:w-full ${planInfo().nextColor == '#00B268' ? 'border-[#00B268]' : planInfo().nextColor == '#005694' ? 'border-[#005694]' : planInfo().nextColor == '#BB8702' ? 'border-[#BB8702]' : 'border-[#7A62DB]'} px-4 py-2 rounded-lg font-medium bg-neutral-800 ${user?.plan == 'Gratuito' ? 'cursor-pointer' : 'cursor-default'} hover:bg-neutral-700 duration-100`}>
                  {
                    user?.plan == 'Gratuito' ? <a href="https://2docs.app/planos">Eleve seu plano 🚀</a> : 'Eleve seu plano 🚀'
                  }
                </button>
              </div>
              <ul className="xs:grid grid-cols-2 list-disc ml-5">
                {planInfo().nextPros.map((text) => <li key={text} className="text-[18px] text-neutral-300 mx-1">{text}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex gap-10">
        <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
          <div className="bg-neutral-800 rounded-md h-full">
            <div className="md:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
              <h3 className="font-medium text-[20px]">Planos</h3>
              <p className="text-neutral-400 text-[14px]">“Qual o seu plano ativo no momento”</p>
            </div>
            <div className="px-8 mt-5 items-center">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src={planInfo().icon} alt="Icone do plano atual" className="w-[35px]"></Image>
                  <h4 className={`bg-gradient-to-r ${planInfo().color== '#00B268' ? 'from-[#00B268]' : planInfo().color== '#005694' ? 'from-[#005694]' : planInfo().color == '#BB8702' ? 'from-[#BB8702]' : 'from-[#8B8B8B]'} rounded-l-md pl-2 bg-[length:60%] bg-no-repeat`}>{currentPlan}</h4>
                </div>
                <p className="bg-emerald-500/40 border-2 border-emerald-500 py-[2px] px-2 rounded-lg text-emerald-500 font-medium max-xs:hidden">{user?.plan == 'Gratuito' ? 'Padrão' : 'Ativo'}</p>
              </div>
              <div className="flex gap-5 ml-1 mt-5">
                <Image src={Calendar} alt="Calendário"></Image>
                <p>{`Faturamento ${user?.plan == 'Gratuito' ? 'não presente' : user?.plan.split(' ')[2]}`}</p>
              </div>
              {/* <Dialog.Root open={open} onOpenChange={() => {
                setCurrentPart(1)
                setOpen((state) => !state)
                setObs('')
                setReasons([])
              }}>
                <Dialog.Trigger>
                  <button className="my-5 bg-neutral-700 py-2 px-3 border-2 border-red-700/80 rounded-lg text-neutral-400 hover:bg-neutral-800 duration-100">Cancelar Assinatura</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-neutral-900/60 data-[state=open]:animate-overlayShow fixed inset-0 z-20" />
                  <Dialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-800 px-[25px] pt-[30px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="m-0 text-[20px] font-medium">
                      <p className='items-center flex gap-4'>Cancelar Assinatura 🥀<span className='text-[14px] text-red-500 bg-red-500/30 px-2 py-1 rounded-md border border-red-500'>Certeza?</span></p>
                    </Dialog.Title>
                    <Dialog.Description className="text-neutral-400 mt-[20px] mb-5 text-[16px] leading-normal">
                      {obsParts[1]}
                    </Dialog.Description>
                    
                    {
                      currentPart == 1 ? <PartOneCancelProcess obs={obs} setObs={setObs} changeCurrentPart={setCurrentPart} reasons={reasons} setReasons={setReasons}/> :
                      currentPart == 2 ? <PartTwoCancelProcess changeCurrentPart={setCurrentPart} user={user!} changeModalState={setOpen}/> :
                      <PartThreeCancelProcess changeCurrentPart={setCurrentPart} user={user!} reasons={reasons} obs={obs}/>
                    }
                    
                    <Dialog.Close asChild>
                      <button
                        className="font-semibold text-[18px] text-neutral-500 hover:bg-neutral-600/40 focus:shadow-neutral-500/40 absolute top-[10px] right-[10px] flex h-[26px] w-[26px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                      >x</button>
                    </Dialog.Close>
                <Dialog.Close />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root> */}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-neutral-200 w-full p-[1px] rounded-md mt-10">
          <div className="bg-neutral-800 rounded-md h-full">
            <div className="md:flex justify-between px-4 items-center border-b-[1px] border-neutral-300 py-2">
              <h3 className="font-medium text-[20px]">Detalhes</h3>
              <p className="text-neutral-400 text-[14px]">“Faturas e dados de pagamento”</p>
            </div>
            <div className="px-8 mt-6">
              {user?.plan == 'Gratuito' ? <button className="flex gap-4 items-center bg-neutral-700/40 py-3 px-6 rounded-full w-full justify-center hover:border hover:border-emerald-500 hover:opacity-80" onClick={() => {
                toast.error('Funcionalidade não habilitada para seu plano')
              }}><Image src={Config} alt="Configs" className="invert"></Image> Ir para o painel</button> :
              <button className="flex gap-4 items-center bg-neutral-700/40 py-3 px-6 rounded-full w-full justify-center hover:border hover:border-emerald-500 hover:opacity-80" onClick={() => {
                async function getPortalLink() {
                  const dataSearchCostumer = await searchCostumer({
                    id_company: user!.id_company
                  })
                  
                  const url = await createClientPortal({
                    id_user: dataSearchCostumer[0].id
                  })
  
                  return router.replace(url)
                }

                toast.promise(
                  getPortalLink(),
                    {
                      loading: 'Gerando link do portal...',
                      success: <b>Redirecionamento sendo feito...</b>,
                      error: <b>Não foi possível criar o link para o portal.</b>,
                    }
                ) 
                
              }}><Image src={Config} alt="Configs" className="invert"></Image> Ir para o painel</button>}
              <p className="mt-5">Acesse nosso portal para <span className="text-red-600 font-medium">cancelar</span> ou <span className="text-emerald-500 font-medium">aumentar</span> seu plano!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// function PartOneCancelProcess({obs, setObs, changeCurrentPart, reasons, setReasons}: {obs: string; setObs: any; changeCurrentPart: any, reasons: Array<string>; setReasons: any}) {
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex items-center border border-neutral-700 rounded-md px-2 py-2">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c1"
//           onCheckedChange={(e) => e ? setReasons([...reasons, 'Bugs']) : setReasons(reasons.filter(reason => reason !== 'Bugs'))}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[15px] leading-none text-white cursor-pointer hover:text-neutral-100/80 w-full" htmlFor="c1">
//           Muitos bugs e problemas técnicos.
//         </label>
//       </div>

//       <div className="flex items-center border border-neutral-700 rounded-md px-2 py-2">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c2"
//           onCheckedChange={(e) => e ? setReasons([...reasons, 'Funcionalidades']) : setReasons(reasons.filter(reason => reason !== 'Funcionalidades'))}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[15px] text-white cursor-pointer hover:text-neutral-100/80 w-full" htmlFor="c2">
//           Não resolveu 100% dos meus problemas... falta funcionalidades.
//         </label>
//       </div>

//       <div className="flex items-center border border-neutral-700 rounded-md px-2 py-2">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c3"
//           onCheckedChange={(e) => e ? setReasons([...reasons, 'Preço']) : setReasons(reasons.filter(reason => reason !== 'Preço'))}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[15px] leading-none text-white cursor-pointer hover:text-neutral-100/80 w-full" htmlFor="c3">
//           O preço é muito alto para minha empresa.
//         </label>
//       </div>

//       <div className="flex items-center border border-neutral-700 rounded-md px-2 py-2">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c4"
//           onCheckedChange={(e) => e ? setReasons([...reasons, 'Integração']) : setReasons(reasons.filter(reason => reason !== 'Integração'))}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[15px] leading-none text-white cursor-pointer hover:text-neutral-100/80 w-full" htmlFor="c4">
//           Falta de integração com outras plataformas.
//         </label>
//       </div>

//       <div className="flex items-center border border-neutral-700 rounded-md px-2 py-2">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c5"
//           onCheckedChange={(e) => e ? setReasons([...reasons, 'Tempo']) : setReasons(reasons.filter(reason => reason !== 'Tempo'))}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[15px] text-white cursor-pointer hover:text-neutral-100/80 w-full" htmlFor="c5">
//           Temporariamente não estarei necessitando mais de seus serviços.
//         </label>
//       </div>

//       <label htmlFor="obs" className="inline-block mt-4 text-[16px] text-neutral-300">Alguma observação em especial?</label>
//       <textarea name="obs" id="obs" value={obs} onChange={(e) => setObs(e.target.value)} className="rounded-md bg-transparent border-2 border-neutral-700 w-full h-[100px] px-2 py-1 text-[14px] text-neutral-200" placeholder="Nos conte o motivo da escolha a cima, por exemplo."></textarea>
    
//       <button className="self-end mt-5 border-neutral-600 bg-neutral-600/40 border px-4 py-1.5 rounded-md hover:bg-neutral-600 duration-100" onClick={() => {
//         if(reasons[0]) {
//           return changeCurrentPart(2)
//         } 

//         toast.error("Por favor, selecione ao menos um motivo.")
//       }}>Prosseguir 😓</button>
//     </div>
//   )
// }

// function PartTwoCancelProcess({changeCurrentPart, user, changeModalState}: {changeCurrentPart: any, user: User, changeModalState: any}) {
//   const [gift, setGift] = useState('')

//   const toggleGroupItemClasses =
//   'enabled:hover:bg-emerald-500/30 color-emerald-500 disabled:opacity-25 data-[state=on]:bg-emerald-500/60 text-start gap-6 flex w-full py-10 px-6 items-center justify-center bg-transparent text-base leading-4 first:border-b last:border-t border-neutral-500 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

//   async function giveCoupon() {
//     const dataSearchCostumer = await searchCostumer({
//       id_company: user.id_company
//     })

//     if(dataSearchCostumer[0]) {
//       await applyCoupon({id_subscription: dataSearchCostumer[0]?.subscriptions?.data[0].id})
//     }

//     await updateCompany({
//       id: user.id_company,
//       data: {
//         hadDiscont: true
//       }
//     })

//     changeModalState(false)
//   }

//   return (
//     <div>
//       <ToggleGroup.Root
//         className="bg-neutral-700/30 rounded shadow-[0_2px_10px] shadow-neutral-700 space-x-px"
//         type="single"
//         defaultValue="center"
//         aria-label="Text alignment"
//         onValueChange={(e) => setGift(e)}
//       >
//         <ToggleGroup.Item className={toggleGroupItemClasses} value="Sale" disabled={user.hadDiscont == undefined || !user.hadDiscont ? false : true}>
//           <Image src={Sale} alt="Promotion Code" width={70} className="invert"></Image>
//           <div className="flex flex-col">
//             <h3 className="text-[20px] font-medium">Um cupom de desconto.</h3>
//             <p className="text-neutral-500 font-bold text-[14px] mb-2 mt-1">*Válido somente para planos mensais*</p>
//             <p className="text-neutral-300">Que tal um desconto de 20% nos próximos 3 meses de seu plano favorito?</p>
//           </div>
//         </ToggleGroup.Item>
//         <ToggleGroup.Item className={toggleGroupItemClasses} value="Meet">
//           <Image src={Coffee} alt="Promotion Code" width={70} className="invert"></Image>
//           <div className="flex flex-col gap-4">
//             <h3 className="text-[20px] font-medium">Um café virtual.</h3>
//             <p className="text-neutral-300">Quer nos perguntar algo especifico? Ou sanar alguma dúvida? Marcamos uma videoconferência.</p>
//           </div>
//         </ToggleGroup.Item>
//         <ToggleGroup.Item className={toggleGroupItemClasses} value="Message">
//           <Image src={Ajuste} alt="Promotion Code" width={70} className="invert"></Image>
//           <div className="flex flex-col gap-4">
//             <h3 className="text-[20px] font-medium">Alguma alteração no plano.</h3>
//             <p className="text-neutral-300">Precisa de um plano totalmente personalizado? Nos mande o que acha que devemos alterar.</p>
//           </div>
//         </ToggleGroup.Item>
//       </ToggleGroup.Root>

//       <button disabled={gift == '' ? true : false} className="w-full text-center bg-emerald-500/30 py-2 mt-5 rounded-md border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white duration-100" onClick={() => {
//         if(gift == 'Sale') {
//           toast.promise(
//             giveCoupon(),
//               {
//                 loading: 'Gerando o seu presente...',
//                 success: <b>Muito obrigado por continuar conosco! O seu desconto já foi aplicado as próximas mensalidades 🤝</b>,
//                 error: <b>Não foi possível aplicar o cupom neste momento. Entre em contato conosco, por favor.</b>
//               }
//           )
//         } else {
//           changeModalState(false)

//           toast((t) => (
//             <div style={{}}>
//               <p style={{display: 'block', marginBottom: '20px'}}>Obrigado por nos dar mais uma chance. Nos chame no WhatsApp para conversarmos melhor!</p>
//               <a target="__blank" href="https://wa.me/5516994391314" onClick={() => toast.dismiss(t.id)} style={{background: '#1c815f', padding: '10px', borderRadius: '8px'}}>
//                 Iniciar Conversa
//               </a>
//             </div>
//           ), {
//             duration: 10000,
//             style: {
//               border: '1px solid #1c815f',
//               padding: '16px',
//               color: '#ffffff',
//               background: '#262626'
//             }
//           });
//         }
//       }}>Escolher Presente</button>
      
//       <button className="mt-10 border-neutral-600 bg-neutral-600/40 border px-4 py-1.5 rounded-md hover:bg-neutral-600 duration-100 flex ml-auto" onClick={() => changeCurrentPart(3)}>Nenhum, cancelar! 😞</button>
//     </div>
//   )
// }

// function PartThreeCancelProcess({changeCurrentPart, user, reasons, obs}: {changeCurrentPart: any, user: User, reasons: Array<string>, obs: string}) {
//   const [confirm, setConfirm] = useState<Checkbox.CheckedState | boolean>(false)

//   function handleCancelingSubscription() {
//     async function cancel() {
//       await updateCompany({
//         id: user.id_company,
//         data: {
//           cancelSubscriptionReasons: [
//             ...reasons,
//             obs
//           ]
//         }
//       })

//       const dataSearchCostumer = await searchCostumer({
//         id_company: user!.id_company
//       })
  
//       await cancelSubscription({
//         id_subscription: dataSearchCostumer[0]?.subscriptions?.data[0].id
//       })
  
//       window.location.reload()
//     }

//     toast.promise(
//       cancel(),
//         {
//           loading: 'Cancelando a assinatura...',
//           success: <b>Assinatura cancelada!</b>,
//           error: <b>Não foi possível cancelar a assinatura.</b>,
//         }
//     ) 
//   }

//   return (
//     <div>
//       <div className="flex border border-neutral-700 px-4 py-4 rounded-md">
//         <Checkbox.Root
//           className="hover:bg-neutral-600/20 border border-neutral-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-transparent outline-none focus:shadow-[0_0_0_2px_black] cursor-pointer"
//           id="c2"
//           onCheckedChange={(e) => setConfirm(e)}
//         >
//           <Checkbox.Indicator>
//             <Image src={Check} alt="Check option" width={10}></Image>
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="pl-[15px] text-[14px] text-white cursor-pointer hover:text-neutral-100/80 w-full font-light" htmlFor="c2">
//           Concordo e estou ciente de que ao cancelar meu plano, ele perdurará até a próxima fatura. Além disso entendo que meus documentos estarão protegidos e guardados por até 3 meses após o cancelamento, sendo possível recupera-los somente com o plano ativo novamente.
//         </label>
//       </div>
      
//       <button disabled={!confirm} className="w-full text-center bg-red-500/30 py-2 mt-5 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-100" onClick={() => handleCancelingSubscription()}>Confirmar Cancelamento</button>

//       <button className="mt-5 border border-neutral-500 px-4 py-1.5 rounded-md bg-neutral-400/30 hover:bg-neutral-500" onClick={() => changeCurrentPart(2)}>Voltar</button>
//     </div>
//   )
// }