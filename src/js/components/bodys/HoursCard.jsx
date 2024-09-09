import { useRef, useState, useEffect } from "react"


export const HoursCard = ({id, hora, setSelected, sala}) => {

    const hourRef = useRef(null)
    hora = `${hora}0`
    const [salaInfo, setSalaInfo] = useState(null)
    const selectThisElement = (ref) => {
        let reference = ref.current
        setSelected({reference, id, hora, salaId: sala, tipo_sala: salaInfo.tipo_Sala, sala: salaInfo.nombre, fila_vip: salaInfo.filaVip})
    }


    useEffect(()=>{
        
        fetch(`http://localhost:3001/room/${sala}`)
            .then(res => res.json())
            .then(({data}) => setSalaInfo((data)))
        
    }, [])

    return (
        <button ref={hourRef} onClick={() => selectThisElement(hourRef)} className="flex w-[110px] h-[70px] flex-col p-[20px] bg-white text-black  justify-center items-center rounded-lg">
            <p className="text-xl"><strong> {hora} </strong></p>
            <p><small>{`$14000°${salaInfo?.tipo_Sala}`}</small></p>
        </button>
    )

}