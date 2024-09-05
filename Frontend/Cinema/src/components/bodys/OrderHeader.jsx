export const OrderHeader = ({img, title, genre, diaName, dayNum, time, funcion, tipoSala, filaVip  }) => {

    return (

        <div className="flex gap-[15px] items-center bg-principalBlack w-[90%] h-[75%] ">
            <div className="w-[150px] h-full">
                <img className="object-cover rounded-2xl w-[100%] h-[100%] " src={`https://${img}`} alt={title} />
            </div>
            <section className="flex flex-col gap-[20px]">
                <div>
                    <p className="text-md text-md text-rojoFuerte font-medium"><strong>{title}</strong></p>
                    <p className="text-letrasGrises text-md font-extralight tracking-widest"><small>{genre}</small></p>
                </div>
                <div>
                    <p><strong className="text-sm font-semibold">CINE CAMPUS</strong></p>
                    <p className="text-letrasGrises"><small> {`${diaName.slice(0,3)}, ${dayNum} Sep 2024. ${time}`} </small></p>
                </div>
            </section>
        </div>

    )

}