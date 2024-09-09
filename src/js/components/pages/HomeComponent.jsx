import { CardsCarrusel } from '../bodys/CardsCarrusel.jsx'
import { ComingCards } from '../bodys/ComingCards.jsx'
import { FooterNavBar } from '../footers/PrincipalFooter.jsx'
import { NavBar } from '../headers/NavBar.jsx'
// hooks
import { useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper/modules';


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

export async function moviesLoader() {
    let data = await fetch('http://localhost:3001/movies', { cache: "force-cache" }).then(res => res.json())

    let prox = data.data.filter(mov => mov.estado == 'proximamente')
    data = data.data.filter(mov => mov.estado == 'en cartelera' || mov.estado == 'estreno')
    return { proximamente: prox, data: data }
}

export const HomeComponent = () => {

    const fullData = useLoaderData();
    const { proximamente } = fullData
    const { data } = fullData;
    const [activeModal, setActiveModal] = useState(false)
    const inputRef = useRef(null)

    const [movie, setMovie] = useState({ title: "puss in boots the last...", gender: "Adventure" })





    const goToBrowse = () => {
        inputRef.current.focus()
        setActiveModal(true)
    }

    return (
        <>
            <NavBar ref={inputRef} estado={activeModal} setEstado={setActiveModal} data={data} name={import.meta.env.VITE_MONGOUSER} />

            <main className='w-full'>
                <section className='flex text-xl justify-between p-[20px]'>
                    <strong>Now playing</strong>
                    <Link to={'/current'} className='text-rojoFuerte'>See all</Link>
                </section>

                <div className={`${activeModal && 'z-[-1]'} my-[10px] flex max-w-full overflow-x-hidden relative`}>
                    <Swiper className='flex justify-center'
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                            bulletActiveClass: 'w-5 bg-rojoFuerte',
                            renderBullet: function (index, className) {
                                return '<span class="' + className + ' bg-red-500 rounded-full w-3 h-3 mx-1"></span>';
                            },
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Scrollbar]}
                        centeredSlides={true}
                    >
                        {
                            data.map(({ _id, titulo, poster, genero }) => {
                                return <SwiperSlide key={_id} className='min-w-[200px]'>
                                    <CardsCarrusel
                                        id={_id}
                                        title={titulo}
                                        poster={poster}
                                    />
                                    <section className=' flex flex-col gap-[15px] justify-between text-center capitalize items-center mt-[20px]'>
                                        <strong className='text-xl truncate w-full'> {titulo} </strong>
                                        <p className='text-letrasGrises'> {genero} </p>
                                    </section>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
                <section className='flex flex-col gap-[20px] p-[20px]'>
                    <div className='flex text-xl justify-between'>
                        <strong>Coming soon</strong>
                        <Link to={'/incoming'} className='text-rojoFuerte'>See all</Link>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-[15px]  mb-[100px]'>
                        {
                            proximamente.map(({ _id, titulo, poster, genero, fecha }) => (
                                <ComingCards key={_id} fecha={fecha} title={titulo} poster={poster} genero={genero} />
                            ))
                        }
                    </div>

                </section>
            </main>

            <FooterNavBar click={goToBrowse} />
        </>
    )

}