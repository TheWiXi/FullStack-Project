import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"
import { CardsCarrusel } from "../bodys/CardsCarrusel"

export async function currentMoviesLoader () {
    let data = await fetch('http://localhost:3001/movies', {cache: "force-cache"}).then(res => res.json())
    data = data.data.filter(mov => mov.estado == 'en cartelera' || mov.estado == 'estreno')
    return data
}

export const AllCurrentMovies = () => {

    const data = useLoaderData();

    return (
        <>
            <SectionIndicator to={-1} section={'Cartelera'} />

            <main className="flex justify-center">
                <section className="flex flex-col gap-[20px]">
                {
                    data.map(({_id, titulo, poster, genero, estado}) => (
                        <div key={_id}  className="flex flex-col gap-[10px] justify-center text-center">
                            <CardsCarrusel 
                            id={_id} 
                            title={titulo} 
                            poster={poster}
                            />
                            <div>
                                <p><strong>{titulo}</strong></p>
                                <p>{genero}</p>
                                <p className="text-letrasGrises"><small>{estado}</small></p>
                            </div>
                        </div>
                    ))
                }
                </section>
            </main>

        </>
    )

}