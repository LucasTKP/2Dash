'use client'
import React from 'react'

function Trailer() {
    const videoId = 't_isln2sfgc'; // Substitua pelo ID do seu vídeo
    const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&`;

    return (
        <section className='bg-gradient-to-b from-[#EBEBEB] to-emerald-500/10 mt-[50px] pb-[80px]'>
            <div className='flex flex-col items-center container'>
                <h2 className="text-[#005532] font-jost text-dynamic_sections mb-6 max-w-[1000px]">Veja o sistema na prática</h2>

                <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    title="2Docs"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className='mt-[40px] aspect-video max-w-[1000px] self-center rounded-[20px] max-lg:rounded-[10px]'
                    allowFullScreen
                />
            </div>
        </section>
    )
}

export default Trailer
