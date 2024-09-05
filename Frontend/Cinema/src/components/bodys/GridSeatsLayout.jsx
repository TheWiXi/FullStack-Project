import { SeatSquare } from "./SeatSquare.jsx"

export const GridSeatsLayout = ({ filaVip ,asientosSeleccionados, seleccionAsientos, fila, asientos }) => {
    return (
        <div className="flex w-full items-center gap-[1px]">
            <p className={`w-[5%] ${fila == filaVip && 'text-yellow-500'}`} >{fila}</p>
            <div className="flex gap-2 justify-center min-w-[95%] max-w-[95%]">
                {
                    asientos.map(({asiento, estado}) => (
                        <SeatSquare filaVip={filaVip} asientosSeleccionados={asientosSeleccionados} seleccionAsientos={seleccionAsientos} codigo={asiento} estado={estado} key={asiento} />
                    ))
                }
            </div>
        </div>
    )

}