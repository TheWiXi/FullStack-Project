import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"
import { ComingCards } from "../bodys/ComingCards"



export async function comingSoonMoviesLoader () {

    let prox = await fetch(`http://${import.meta.env.VITE_API}/cineapi/proximamente`, { cache: "force-cache" }).then(res => res.json())
    return prox
}

export const ComingSoon = () => {
    const data = useLoaderData()
    return (
        <>
            <SectionIndicator to={-1} section={'Proximamente'} />
            <main className="flex justify-center p-[10px]">
                <section className="flex flex-col gap-[20px]">
                    {
                        data.map((movie, index) => (
                            <ComingCards key={movie._id}  title={movie.nombre} poster={movie.gallery[0]} genero={movie.genero[0]}/>
                        ))
                    }
                </section>
            </main>
        </>
    )

}