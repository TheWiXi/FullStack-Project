import { SectionIndicator } from "../headers/SectionIndicator.jsx"
import { CastCards } from '../bodys/CastCards.jsx'
import { CinemaCards } from '../bodys/CinemaCards.jsx'
import { ButtomFooter } from "../footers/ButtomFooter.jsx"
import { useState } from "react"
import { Link, useLoaderData } from "react-router-dom"

export async function movieLoader ({params}) {

    const data = await fetch(`http://localhost:3001/movie/${params.id}`)
    
    return data

}

export const MoviesDescComponent = () => {

    const {data} = useLoaderData();

    const [cinema, setCinema] = useState(null)
    const selectCinema = (ref) => {

        let lastCinema = cinema;
        if (lastCinema === ref) {
            ref.classList.remove('outline','outline-red-600', 'outline-4')
            return setCinema(null)
        };
        lastCinema?.classList && lastCinema.classList.remove('outline','outline-red-600', 'outline-4')
        ref.classList.add('outline','outline-red-600', 'outline-4')
        setCinema(ref)

    }

    const [trailer, setTrailer] = useState(false)

    return (

        <>

            <SectionIndicator to={-1} section="Cinema Selection" />

            <main className="p-[15px] pt-0 ">

                <section className="w-full h-[250px]">
                    {
                        trailer ?
                        <iframe className="w-full h-[100%]" src={`https://www.youtube.com/embed/${data.trailer}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
                        : <img className="w-[100%] h-[100%] object-cover object-[center_25%] rounded-2xl" src={`https://${data.poster}`} alt={`${data.titulo}`} />
                    }
                </section>

                <section className="tracking-wider text-[80%] flex flex-col gap-[10px] w-full p-[10px] " >
                    <div className="flex justify-between items-center">
                        <div className="w-[60%] ">
                            <p><strong> { data.titulo } </strong></p>
                            <p><small> { data.genero } </small></p>
                        </div>
                        <button onClick={()=>setTrailer(!trailer)} className=" flex items-center self-start justify-center gap-3 p-[8px] bg-red-600 rounded-xl " >
                            <svg width="15" height="15" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6L0.75 11.1962L0.750001 0.803847L9 6Z" fill="white" />
                            </svg>
                            <p><small>Watch Trailer</small></p>
                        </button>
                    </div>
                    <p> { data.sinopsis } </p>
                </section>

                <section className={ `p-[10px] ${ cinema && 'mb-[100px]' }` }>
                    <p><strong>Cast</strong></p>

                    <div className="flex max-w-full mt-[10px] pb-[20px] overflow-x-scroll">
                        {
                            data.cast.map(({name, img, rol}) => (
                                <CastCards key={name} img={img} name={name} rol={rol} />
                            ))
                        }
                    </div>

                    <p className="my-[10px]"><strong>Cinema</strong></p>

                    <div className="flex flex-col gap-[15px]">
                        <CinemaCards changeCinema={selectCinema} />
                    </div>

                </section>

            </main>

            {
                cinema && (
                    <Link to={'seats'}><ButtomFooter btnText='Book Now' /></Link>
                )
            }

        </>

    )

}