import { useRef } from "react"

export const DaysCard = ({id, dia, dayName, setSelected}) => {

    const dayRef = useRef(null)

    return (
        <button ref={dayRef} onClick={() => setSelected(dayRef.current, id)} className="flex w-[70px] h-[90px] flex-col p-[20px] bg-white text-black text-xl justify-center items-center rounded-lg">
            <p><small>{dayName}</small></p>
            <p><strong>{dia}</strong></p>
        </button>
    )

}