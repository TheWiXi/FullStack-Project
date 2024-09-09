

export const ComingCards = ({title, fecha, poster, genero}) => {
    let anio = new Date(fecha).getFullYear()
    return (
        <div className="flex w-full rounded-2xl gap-[20px] h-[110px] bg-linear p-[10px] overflow-y-scroll " >
            <img className="min-w-[25%] h-[100%] rounded-2xl object-cover" src={`https://${poster}`} alt={title} />
            <div className="mt-[10px] ">
                <h3> { `${title} (${anio})` } </h3>
                <small> { genero } </small>
            </div>
        </div>
    )

}