import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"
import { ComingCards } from "../bodys/ComingCards"



export async function comingSoonMoviesLoader () {
    let data = await fetch('http://localhost:3001/movies', {cache: "force-cache"}).then(res => res.json())
    let prox = data.data.filter(mov => mov.estado == 'proximamente')
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
                        data.map(({_id, titulo, poster, genero, fecha}) => (
                            <ComingCards key={_id} fecha={fecha} title={titulo} poster={poster} genero={genero}/>
                        ))
                    }
                </section>
            </main>

        </>

    )

}