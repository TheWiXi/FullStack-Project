import { Link } from "react-router-dom"

export const CardsCarrusel = ({id, title, poster}) => {

    return (
        <>
            <div className="w-[100%]  h-[350px]">
                <Link to={`/movie/${id}`}>
                <img className="w-[100%] h-[100%] rounded-2xl object-cover" src={`https://${poster}`} alt={title} />
                </Link>
            </div>
        </>

    )

}