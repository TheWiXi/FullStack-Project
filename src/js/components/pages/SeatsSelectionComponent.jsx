import { useNavigate, useParams } from "react-router-dom"
import { ButtomFooter } from "../footers/ButtomFooter"
import { SectionIndicator } from "../headers/SectionIndicator"
import { GridSeatsLayout } from "../bodys/GridSeatsLayout";
import { SeatStatus } from "../bodys/SeatStatus";
import { useEffect, useState } from "react";
import { DaysCard } from "../bodys/DaysCard";
import { HoursCard } from "../bodys/HoursCard";

const DAYS = {
    '0': 'Domingo',
    '1': 'Lunes',
    '2': 'Martes',
    '3': 'Miércoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sábado'
}

export const SeatsSelection = () => {

    const navigate = useNavigate()

    const { id } = useParams(); // Se obtienen los parametros enviados en la url
    const [funcion, setFuncion] = useState(null) // Almacena todas las funciones existentes de la pelicula pasada por url
    const [formatDay, setFormatDay] = useState([]) // Almacena las fechas y horas de las funciones existentes
    const [functionSchedule, setFunctionSchedule] = useState([]) // agrupa las fechas y horas para que no hayan repetidos
    const [daySelected, setDaySelected] = useState(null) // Almacena el dia seleccionado para ver la pelicula
    const [horas, setHoras] = useState(null) // Almacena las las distintas horas de funcion segun el dia seleccionado
    const [hourSelected, setHourSelected] = useState(null) // Almacena la hora seleccionada
    const [salaInfo, setSalaInfo] = useState(null) // Almacena toda la informacion de la funcion segun la hora y el dia que se haya seleccionado
    const [asientosSala, setAsientosSala] = useState(null) // Agrupa todas las filas de los asientos de la sala segun su codigo y guarda los estados de cada silla
    const [currentSalaDesc, setCurrentSalaDesc] = useState([]) // Almacena TODA la informacion de la sala para preparala al envio de la compra del ticket
    const [seatSelected, setSeatSelected] = useState([]) // Va guardando los asientos que el usuario va  seleccionando
    const [user, setUser] = useState([])
    const [ticketPrice, setTicketPrice] = useState(0)

    const checkForVipUser = ({ Usuario }) => {
        if (!Usuario.tarjeta) return false
        else if (Usuario.tarjeta['estado'] == 'inactiva') return false
        return true
    }

    useEffect(() => {
        let resultado = {}

        formatDay.forEach(val => {

            const clave = `${val.dia}-${val.dia_semana}`;
            if (!resultado[clave]) resultado[clave] = { ...val }
            else {
                const horasUnicas = new Set([...resultado[clave].hora, ...val.hora].map(JSON.stringify))
                resultado[clave].hora = Array.from(horasUnicas).map(JSON.parse)
            }

        })
        const arregloFinal = Object.values(resultado)
        setFunctionSchedule(arregloFinal)
    }, [formatDay])

    useEffect(() => {
        if (!funcion) return
        funcion.forEach(({ _id, fecha_init, id_sala }) => {
            let diaSemana = DAYS[`${new Date(fecha_init).getDay()}`];
            let dia = new Date(fecha_init).getDate()


            let objFuncion = {
                dia_semana: diaSemana,
                dia: dia,
                hora: [{
                    id: _id,
                    hora: new Date(fecha_init).getUTCHours() + ':' + new Date(fecha_init).getMinutes(),
                    id_sala
                }]
            }

            setFormatDay(prev => [...prev, objFuncion])
        })
    }, [funcion])

    useEffect(() => {
        fetch(`http://localhost:3001/movie/${id}/functions`)
            .then(res => res.json()).then(data => setFuncion(data.msg))
        fetch(`http://localhost:3001/user/${import.meta.env.VITE_PASSWORD}`)
            .then(res => res.json()).then(data => setUser(data.msg))
    }, [])


    const selectDay = (ref, id) => {
        let { elemento } = daySelected ?? 0
        if (elemento != undefined) {
            elemento.classList.remove('bg-rojoFuerte', 'text-white')
            elemento.classList.add('bg-white', 'text-black')
            setSalaInfo(null)
            setSeatSelected([])
            setCurrentSalaDesc([]) // Cargar data
        }
        if (ref == elemento && elemento != undefined) {
            //elemento.classList.remove('bg-rojoFuerte', 'text-white')
            ref.classList.add('bg-white', 'text-black')
            setHourSelected(null)
            setSalaInfo(null)
            setSeatSelected([])
            setCurrentSalaDesc([]) // Cargar data
            return setDaySelected(null)
        } else {
            ref.classList.remove('bg-white', 'text-black')
            ref.classList.add('bg-rojoFuerte', 'text-white')
            setDaySelected({ elemento: ref, id: id })
        }
    }

    useEffect(() => {
        let { id } = daySelected ?? false
        if (id == 1 || id == 0) {
            let { hora } = functionSchedule[id]
            setHoras(hora)
        } else {
            setHoras(null)
            setHourSelected(null)
        }
    }, [daySelected])

    const filtrarFuncionConIdSala = (salaId) => {
        let funcionConcreta = funcion.filter(({ id_sala }) => id_sala === salaId)
        return funcionConcreta
    }

    const selectHour = ({ reference, id, hora, salaId, tipo_sala, sala, fila_vip }) => {

        let { ref } = hourSelected ?? 0
        let nombreDia = functionSchedule[daySelected.id].dia_semana
        let numeroDia = functionSchedule[daySelected.id].dia

        if (ref != undefined) {
            ref.classList.remove('bg-rojoFuerte', 'text-white')
            ref.classList.add('bg-white', 'text-black')
            setSalaInfo(null)
            setSeatSelected([])
            setAsientosSala(null)
        }
        if (ref == reference && ref != undefined) {
            let [dayName, dayNum] = currentSalaDesc
            setHourSelected(null)
            setSeatSelected([])
            return setCurrentSalaDesc([dayName, dayNum])
        } else {
            reference.classList.remove('bg-white', 'text-black')
            reference.classList.add('bg-rojoFuerte', 'text-white')
            setHourSelected({ ref: reference, id, hora: hora })
            let [funcionActual] = filtrarFuncionConIdSala(salaId)
            setSalaInfo(funcionActual)
            return setCurrentSalaDesc([nombreDia, numeroDia, hora, funcionActual._id, sala, tipo_sala, fila_vip])
        }

    }

    useEffect(() => {
        const asientosPorFila = {};
        const asientos = salaInfo?.asientos
        if (!asientos) return
        for (const asiento of asientos) {
            const fila = asiento.codigo[0]
            if (!asientosPorFila[fila]) asientosPorFila[fila] = []
            asientosPorFila[fila].push({ asiento: asiento.codigo, estado: asiento.estado })
        }
        setAsientosSala(asientosPorFila)
    }, [salaInfo])

    useEffect(() => {
        let newArrayCodes = [];
        seatSelected.forEach(val => {
            newArrayCodes.push(val.codigo)
        })
        let copy = currentSalaDesc

        if (!newArrayCodes.length && copy.length == 8) {
            copy.pop()
            setCurrentSalaDesc([...copy])
        } else if (copy.length == 8) {
            copy.pop()
            setCurrentSalaDesc([...copy, newArrayCodes])
        } else setCurrentSalaDesc([...copy, newArrayCodes])
    }, [seatSelected])

    useEffect(() => {
        let tipoSala = currentSalaDesc[5]
        let filaVip = currentSalaDesc[6]
        let usuario = user

        if (currentSalaDesc.length < 8) return setTicketPrice(0)

        let precioBase = tipoSala == '3D' ? 14000 + 5000 : 14000
        let catidadTickets = currentSalaDesc[currentSalaDesc.length - 1]

        usuario = checkForVipUser(usuario)
        let descuentoVip = usuario ? 0.20 : 0;
        let precioTotal = 0

        catidadTickets.forEach(val => {

            let precioBoleta = precioBase

            if (val[0] == filaVip) {
                precioBoleta += precioBoleta * 0.97
                precioBoleta *= (1 - descuentoVip)
            } else precioBoleta *= (1 - descuentoVip);

            precioTotal += precioBoleta

        })

        setTicketPrice(precioTotal)
    }, [currentSalaDesc])

    const generarDataParaEnvio = async () => {
        let asientos = currentSalaDesc[currentSalaDesc.length - 1]
        let funcionId = currentSalaDesc[3]

        let obj = {
            diaName: currentSalaDesc[0],
            dayNum: currentSalaDesc[1],
            time: currentSalaDesc[2],
            funcion: currentSalaDesc[4],
            tipoSala: currentSalaDesc[5],
            filaVip: currentSalaDesc[6],
            asientos: currentSalaDesc[currentSalaDesc.length - 1],
            total: ticketPrice,
            user: user
        }
        let encode = encodeURIComponent(JSON.stringify(obj))

        fetch(`http://localhost:3001/movie/${funcionId}/seat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seatsCode: asientos })
        })
        .then(res => res.json())
        .then(data => navigate(`/movie/${id}/seat/${data.ticketGenerado}/${encode}`))


    }

    return (
        <>
            <SectionIndicator to={-1} section='Choose seat' />

            <main className="flex flex-col gap-[20px]">
                {
                    !funcion ? <h1>Cargando...</h1> : (
                        <>
                            {
                                salaInfo ? (
                                    <>
                                        <section className="flex flex-col items-center w-full">
                                            <svg width="306" height="41" viewBox="0 0 306 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_d_2_891)">
                                                    <path d="M7 29.2619C85 -7.23758 207 -4.23804 299 29.2612" stroke="#FE0000" strokeWidth="6"
                                                        strokeLinecap="round" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_2_891" x="-0.000717163" y="-6.10352e-05" width="306.002"
                                                        height="40.2627" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="2" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_891" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_891" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                            <p>Screen this way</p>
                                        </section>

                                        <section className="flex flex-col gap-2 p-[20px]">
                                            {
                                                asientosSala && Object.entries(asientosSala).map(([fila, asientos]) => (
                                                    
                                                    <GridSeatsLayout filaVip={currentSalaDesc[6]} asientosSeleccionados={seatSelected} seleccionAsientos={setSeatSelected} key={fila} asientos={asientos} fila={fila} />
                                                    
                                                ))
                                            }
                                        </section>

                                        <div className="flex w-full justify-center gap-[20px]">
                                            <SeatStatus key={'Aviable'} text='Aviable' color='linear' />
                                            <SeatStatus key={'Reserved'} text='Reserved' color='white' />
                                            <SeatStatus key={'Selected'} text='Selected' color='rojoFuerte' />
                                            <SeatStatus key={'Vip'} text='VIP' color='yellow-500' />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <section className="flex w-full justify-center">
                                            <h1><strong>Seleccione el horario</strong></h1>
                                        </section>
                                    </>
                                )
                            }

                            <section className="flex flex-col items-center gap-[20px] ml-[20px] ">
                                <div className="flex gap-[20px]">
                                    {
                                        functionSchedule.map(({ dia, dia_semana }, i) => (
                                            <DaysCard key={i} id={i} setSelected={selectDay} dia={dia} dayName={dia_semana.slice(0, 3)} />
                                        ))
                                    }
                                </div>
                                <div className="flex gap-[20px]">
                                    {
                                        horas && horas.map(({ hora, id, id_sala}) => (
                                            <HoursCard key={id} id={id} sala={id_sala} hora={hora} setSelected={selectHour} />
                                        ))
                                    }
                                </div>
                            </section>

                        </>
                    )
                }
            </main>

            {
                hourSelected && (
                    <>
                        {seatSelected.length ? <ButtomFooter enClick={generarDataParaEnvio} tipo='submit' amount={ticketPrice} clasesExtra="h-[160px]" price btnText='Buy ticket' /> : ''}
                    </>
                )
            }

        </>
    )

}