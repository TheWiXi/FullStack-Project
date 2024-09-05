

export const ComingCards = ({title, poster, genero}) => {
    return (
        <div className="flex w-full rounded-2xl gap-[20px] h-[110px] bg-linear p-[10px] overflow-y-scroll " >
            <img className="min-w-[25%] h-[100%] rounded-2xl object-cover" src={`${poster}`} alt={title} />
            <div className="mt-[10px] ">
                <h3> { `${title} ` } </h3>
                <small> { genero } </small>
            </div>
        </div>
    )

}