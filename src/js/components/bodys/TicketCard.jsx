import { useEffect, useState } from "react"
import { TicketDesc } from "./TicketDesc"

export const TicketCard = ({ fechaFuncion, hora, sala, total, asientos, _id, pelicula }) => {

    const [movie, setMovie] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:3001/movie/${pelicula}`).then(res => res.json()).then(({ data }) => {
            setMovie({ img: data.poster, title: data.titulo })
        })

    }, [])



    return (
        <div className="h-[700px] flex flex-col justify-around w-full bg-white rounded-3xl text-black p-[20px] ">
            {
                movie && (
                    <>
                        <section className=" flex flex-col gap-[10px] " >
                            <img className="w-full h-[130px] object-cover object-[center_25%] rounded-3xl" src={`https://${movie.img}`} alt={movie.title} />
                            <div className="flex flex-col gap-[10px">
                                <p className="text-xl"><strong>{movie.title}</strong></p>
                                <p className="text-[#0007]"><small>Show this ticket at the entrance</small></p>
                            </div>
                        </section>
                        <hr />
                        <section>
                            <div className="flex w-full justify-between items-center mb-[50px]">
                                <div>
                                    <p className="text-[#0007] text-sm"><strong>Cinema</strong></p>
                                    <p className="text-xl"><strong>Cine Campus</strong></p>
                                </div>
                                <div className=" w-[50px] h-[50px] ">
                                    <img className=" rounded-lg w-full h-full object-cover " src="https://khc-sistema-v2.s3.amazonaws.com/configuracion/375135439663569d62efa38.685840480.192423001714776534.png" alt="CineCampus" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between w-full gap-[20px]">

                                <TicketDesc title='Date' content={fechaFuncion} title2='Time' content2={hora} />
                                <TicketDesc truncate={false} title='Cinema Hall #' content={sala} title2='Seat/s' content2={asientos.join(', ')} />
                                <TicketDesc title='Cost' content={`$ ${total}`} title2='Order ID' content2={_id} />
                            </div>
                        </section>
                        <section className="border-t-[2px] border-[#0007] border-spacing-4 border-dashed h-[100px] flex items-center ">
                            <img src={`https://barcode.tec-it.com/barcode.ashx?data=${_id}&code=Code128&translate-esc=on`} />
                        </section>
                    </>
                )
            }
        </div>
    )

}