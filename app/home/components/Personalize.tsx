import React from 'react'
import Image from 'next/image'

function Personalize() {
  const width = 'w-[500px] max-xl:w-[400px] max-lg:w-[300px] max-md:w-[250px] max-sm:w-[180px] max-xs:w-[150px]'
  return (
    <section className='container mb-[50px]'>
         <h2 className="font-jost text-dynamic_sections mb-16 max-w-[1000px]">Personalize <span className="text-transparent bg-clip-text bg-gradient-to-b from-white">o 2Docs e deixe-o com a cara de seu escritório</span></h2>
         <div className='flex relative'>
            <Image src={'/Home/personalize/2DocsWhite.png'} alt='2docs' width={1000} height={1000} quality={100} className={`${width} z-[1] hover:z-[10] duration-300`}/>
            <Image src={'/Home/personalize/2DocsBlack.png'} alt='2docs' width={1000} height={1000} quality={100} className={`${width} z-[2] absolute left-[15%] hover:z-[10]  duration-300`}/>
            <Image src={'/Home/personalize/2DocsBlue.png'} alt='2docs' width={1000} height={1000} quality={100} className={`${width} z-[3] absolute left-[30%] hover:z-[10]  duration-300`}/>
            <Image src={'/Home/personalize/2DocsRed.png'} alt='2docs' width={1000} height={1000} quality={100} className={`${width} z-[4] absolute left-[45%] hover:z-[10]  duration-300`}/>
            <Image src={'/Home/personalize/2DocsGreen.png'} alt='2docs' width={1000} height={1000} quality={100} className={`${width} z-[5] absolute left-[60%] hover:z-[10]  duration-300`}/>

         </div>
    </section>
  )
}

export default Personalize
