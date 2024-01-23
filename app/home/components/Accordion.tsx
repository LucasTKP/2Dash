'use client'

import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import Image from 'next/image';
import Arrow from '@/public/Home/small-arrow.svg'

export function AccordionSection() {
    return (
        <section className='container justify-center flex flex-col mb-20 mt-[80px]'>
            <h2 className="font-jost text-dynamic_sections mb-16 max-w-[1000px] text-[#005532]">Dúvidas? Encontre a resposta abaixo.</h2>
            <Accordion.Root
            type="single"
            defaultValue="item-1"
            collapsible
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>Como o 2Docs protege meus documentos?</AccordionTrigger>
                    <AccordionContent>Todos os documentos do 2Docs são <span className='font-medium'>encriptografados</span> e somente desbloqueados se o usuário solicitar o download. Todos os dados e arquivos são hospedados em servidores localizados em Data Centers seguros e líderes da indústria da Google. Além de toda essa segurança, realizamos backups diários em todos os documentos de nossos clientes!</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>A algum perigo dos documentos serem perdidos?</AccordionTrigger>
                    <AccordionContent>
                        Você pode fazer alterações em seu plano a qualquer momento, observe que os valores em que já tiver pago, serão usados como bonus para próximas faturas. Para modificar seu plano, basta entrar na seção Assinatura e clicar em “Fazer upgrade”.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Quais são as formas de pagamento?</AccordionTrigger>
                    <AccordionContent>
                        Você pode adquirir o 2Docs com as principais bandeiras de cartão de crédito. Para assinaturas anuais, podemos enviar uma fatura para pagamento por transferência bancária ou cheque. Fale conosco para fazer uma compra com fatura. Compras mensais devem ser pagas com o cartão de crédito.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>Qual a política de reembolso?</AccordionTrigger>
                    <AccordionContent>
                        Não oferecemos reembolsos. Se cancelar o seu plano antes do ciclo de renovação seguinte, você manterá as funcionalidades pagas até ao fim do seu atual período de assinatura. Quando a assinatura acabar, você deixará de ter acesso às funcionalidades pagas e a todas as informações relacionadas.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger>Como cancelar minha assinatura ou meu período de teste?</AccordionTrigger>
                    <AccordionContent>
                        É fácil cancelar a sua assinatura. Para cancelar um plano pago, basta iniciar a sessão na conta que deseja cancelar, clicar na aba de assinaturas e em seguida clicar no botão Cancelar Assinatura. Para cancelar um período de avaliação, siga as mesmas etapas e clique em Cancelar Avaliação. É possível cancelá-la a qualquer momento durante o período de avaliação de 7 dias. Se cancelar ao fim do período de avaliação ou antes, não será feita nenhuma cobrança na sua conta.
                    </AccordionContent>
                </AccordionItem>
            </Accordion.Root>
        </section>
    )
}

const AccordionItem = ({children, ...props}: {children: React.ReactNode, value: string}) => (
    <Accordion.Item className='text-[#555555] mt-px overflow-hidden first:mt-0 border-b border-neutral-500 last:border-none' {...props}>
        {children}
    </Accordion.Item>
)

const AccordionContent = ({children}: {children: React.ReactNode}) => (
    <Accordion.Content className='text-[#404040] font-light data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[20px] max-sm:text-[18px]'>
        <div className='pb-10 pt-2'>
            {children}
        </div>
    </Accordion.Content>
)

const AccordionTrigger = ({children}: {children: React.ReactNode}) => (
    <Accordion.Header className='flex'>
        <Accordion.Trigger className='group flex h-[90px] flex-1 cursor-pointer items-center justify-between text-[24px] leading-none outline-none gap-4 text-start max-sm:text-[20px]'>
            {children}
            <Image src={Arrow} alt='Arrow trigger' className='ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180'></Image>
        </Accordion.Trigger> 
    </Accordion.Header>
)
