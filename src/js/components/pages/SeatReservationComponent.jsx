import {useLoaderData, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'

import { SectionIndicator } from "../headers/SectionIndicator"
import { ButtomFooter } from "../footers/ButtomFooter"
import { OrderHeader } from "../bodys/OrderHeader"
import { OrderDesc } from "../bodys/OrderDesc"
import { useEffect, useState } from "react"

export const loadSeatReserved = async ({ params }) => {

    let uri = JSON.parse(decodeURIComponent(params.info))
    const { data } = await fetch(`http://localhost:3001/movie/${params.id}`, { cache: "force-cache" }).then(res => res.json())

    return { uri, data }

}

export const SeatReservationScreen = () => {

    const checkForVipUser = ({ Usuario }) => {
        if (!Usuario.tarjeta) return false
        else if (Usuario.tarjeta['estado'] == 'inactiva') return false
        return true
    }

    // Datos de la url y loader
    const { data } = useLoaderData();
    const { uri } = useLoaderData();
    const parametros = useParams();
    // Temporizador
    const [tiempoRestante, setTiempoRestante] = useState(5 * 60)
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    // Estados de tarjeta credito
    const [estaMarcado, setEstaMarcado] = useState(false);
    // Navegador
    const navigate = useNavigate()

    const handleChange = () => {
        setEstaMarcado(!estaMarcado);
    };

    let vipSeats = uri.asientos.filter(seat => seat.includes(uri.filaVip))
    let regularSeat = uri.asientos.filter(seat => !seat.includes(uri.filaVip))
    let userVip = checkForVipUser(uri.user)

    const onFinalizar = async () => {
        await fetch(`http://localhost:3001/ticket/${parametros.seatId}`, {method: 'DELETE'})
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se ha cancelado la reserva ya sea porque el tiempo expiro o saliste de la pantalla de pago"
        });
        return navigate('/')
    }

    const comprar = async () => {
        await fetch(`http://localhost:3001/ticket/${parametros.seatId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total: uri.total, fechaFuncion: `${uri.diaName.slice(0,3)}, Sep ${uri.dayNum}th 2024`, hora: uri.time, sala: uri.funcion, pelicula: parametros.id })
        })
        return navigate(`/ticket/${parametros.seatId}`)

    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            setTiempoRestante(prevTiempo => {
                if (prevTiempo > 0) {
                    return prevTiempo - 1;
                } else {
                    clearInterval(intervalo);
                    onFinalizar();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalo);
    }, [onFinalizar]);

    return (

        <>
            <SectionIndicator to={-1} clickEvent={onFinalizar} section={'Order Summary'} />

            <main className="bg-[#0006]">

                <section className="w-full h-[250px] bg-principalBlack flex justify-center items-center">

                    <OrderHeader img={data.poster} title={data.titulo} genre={data.genero} {...uri} />

                </section>

                <section className=" flex flex-col p-[20px] text-letrasGrises gap-[15px]">

                    <small className="text-letrasGrises text-md"> ORDER NUMBER : <strong className="text-white font-medium">{parametros.id}</strong> </small>

                    <div className="flex flex-col gap-[5px]">

                        <OrderDesc infoIzq={`${uri.asientos.length > 1 ? uri.asientos.length + ' TICKETS' : uri.asientos.length + ' TICKET'}`} infoDere={uri.asientos.join(', ')} />
                        <hr className="border-t border-letrasGrises" />
                        {vipSeats.length ? (
                            <>
                                <OrderDesc infoIzq={`${vipSeats.length > 1 ? vipSeats.length + ' VIP SEATS' : vipSeats.length + ' VIP SEAT'}`} infoDere={'$27.580' + ' x ' + vipSeats.length} />
                                <hr className="border-t border-letrasGrises" />
                            </>
                        ) : ''}
                        {regularSeat.length ? (
                            <>
                                <OrderDesc infoIzq={`${regularSeat.length > 1 ? regularSeat.length + ' REGULAR SEATS' : regularSeat.length + ' REGULAR SEAT'}`} infoDere={'$14.000' + ' x ' + regularSeat.length} />
                                <hr className="border-t border-letrasGrises" />
                            </>
                        ) : ''}

                        {uri.tipoSala == '3D' ? (
                            <>
                                <OrderDesc infoIzq={'3D ROOM'} infoDere={'+ $5.000 c/u'} />
                                <hr className="border-t border-letrasGrises" />
                            </>
                        ) : ''}

                        {userVip && (
                            <>
                                <OrderDesc infoIzq={'VIP USER'} infoDere={'- 20%'} />
                                <hr className="border-t border-letrasGrises" />
                            </>
                        )}
                        <OrderDesc infoIzq={'TOTAL'} infoDere={'$' + uri.total} />
                        <hr className="border-t border-letrasGrises" />

                    </div>

                    <div className="flex flex-col gap-[10px] mb-[120px]">

                        <p className="text-white text-lg font-semibold">Payment method</p>

                        <div className="flex w-full justify-between items-center bg-[#fff1] p-[15px] border border-semiWhite rounded-xl">
                            <section className="flex gap-[10px]">
                                <svg width="67" height="45" viewBox="0 0 67 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.650146" y="0.803101" width="65.034" height="42.7368" rx="7.5" fill="white" />
                                    <rect x="0.650146" y="0.803101" width="65.034" height="42.7368" rx="7.5" stroke="#CCCCCC" />
                                    <path d="M55.1785 22.019C55.1785 29.4899 49.0947 35.5343 41.5749 35.5343C38.4008 35.5343 35.4911 34.4455 33.1861 32.6435C36.3602 30.1657 38.363 26.3364 38.363 22.019C38.363 17.7017 36.3225 13.8723 33.1861 11.3945C35.4911 9.59252 38.4008 8.50378 41.5749 8.50378C49.0947 8.50378 55.1785 14.5856 55.1785 22.019Z" fill="#F79E1B" />
                                    <path d="M33.1861 11.3945C33.1861 11.3945 33.1861 11.3945 33.1861 11.3945C36.3225 13.8723 38.363 17.7017 38.363 22.019C38.363 26.3364 36.3602 30.1657 33.1861 32.6435L33.1481 32.6435C30.0118 30.2032 27.9713 26.3364 27.9713 22.0191C27.9713 17.7017 30.0119 13.8724 33.1482 11.3946C33.1482 11.3946 33.1483 11.3947 33.1482 11.3946L33.1861 11.3945Z" fill="#FF5F00" />
                                    <path d="M27.9713 22.0191C27.9713 17.7017 30.0119 13.8724 33.1482 11.3946C30.8432 9.59259 27.9336 8.50384 24.7594 8.50384C17.2396 8.50384 11.1558 14.5482 11.1558 22.0191C11.1558 29.49 17.2396 35.5343 24.7594 35.5343C27.9336 35.5343 30.8431 34.4455 33.1481 32.6435C30.0118 30.2032 27.9713 26.3364 27.9713 22.0191Z" fill="#EB001B" />
                                </svg>
                                <div>
                                    <p>MasterCard</p>
                                    <p>**** **** 0998 7865</p>
                                </div>
                            </section>
                            <input checked={estaMarcado} onChange={handleChange} className="rounded-full" type="checkbox" />
                        </div>

                        <div className="flex w-full justify-between bg-[#381818] p-[15px] rounded-xl">
                            <p className="text-white">Complete your payment in</p>
                            <p className="text-white" >{minutos}:{segundos < 10 ? '0' : ''}{segundos}</p>
                        </div>

                    </div>

                </section>

            </main>

            {estaMarcado && (
                <ButtomFooter enClick={comprar} btnText='Buy ticket' clasesExtra='h-[120px]' />
            )}
        </>

    )

}