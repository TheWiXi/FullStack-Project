import { useRef, useState } from "react"
import Swal from "sweetalert2"


export const SeatSquare = ({ filaVip,asientosSeleccionados, seleccionAsientos, codigo, estado }) => {
    const ESTADOS = {
        "reservada": `bg-white ${codigo[0] == filaVip ? 'text-yellow-500' : 'text-black'}`,
        "disponible": `bg-linear ${codigo[0] == filaVip ? 'text-yellow-500' : 'text-white'}`,
        "selected": `bg-rojoFuerte ${codigo[0] == filaVip ? 'text-yellow-500' : 'text-white'}`,
        "comprada": `bg-white ${codigo[0] == filaVip ? 'text-yellow-500' : 'text-black'}`
    }

    const seatRef = useRef(null)
    const agregarAsiento = (data) => {
        seleccionAsientos([...asientosSeleccionados, data])
    }

    const eliminarAsiento = (data) => {
        let newSeatsArr = asientosSeleccionados.filter(val => val.ref != data.ref)
        seleccionAsientos(newSeatsArr)
        data.ref.setAttribute('estado', 'disponible')
        setEstadoActual('disponible')

    }

    const [estadoActual, setEstadoActual] = useState(estado)
    const marcarAsiento = ({ target }) => {
        let estado = target.getAttribute('estado')
        let texto = target.textContent
        if (estado == "reservada" || estado == "comprada") return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Silla no disponible!",
        });

        if ( estado == 'selected' ) return eliminarAsiento({ref: target, codigo: texto})

        target.setAttribute('estado', 'selected')
        agregarAsiento({ref: target, codigo: texto})
        setEstadoActual('selected')
    }

    return (
        <button estado={estado} ref={seatRef} onClick={(e) => marcarAsiento(e)} className={`w-[35px] h-[35px] text-center rounded-md ${ESTADOS[estadoActual]}`}>{codigo}</button>
    )

}