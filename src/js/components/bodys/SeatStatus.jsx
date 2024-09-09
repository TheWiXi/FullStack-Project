export const SeatStatus = ({text, color}) => {

    return (
        <div className="flex items-center gap-[10px]">
            <div className={`bg-${color} h-[10px] w-[10px] rounded-full`}></div>
            <p><small>{text}</small></p>
        </div>
    )

}