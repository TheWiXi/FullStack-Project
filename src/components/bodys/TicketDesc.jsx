

export const TicketDesc = ({ truncate=true,title, content, title2, content2 }) => {

    return (
        <section className="flex justify-between w-full">
            <div className="w-[75%] flex flex-col gap-[10px]">
                <p className="text-[#0007]"><small><strong>{title}</strong></small></p>
                <p><strong>{content}</strong></p>
            </div>
            <div  className="w-[25%] flex flex-col gap-[10px]">
                <p className="text-[#0007]"><small><strong>{title2}</strong></small></p>
                <p className={`${truncate ? 'truncate' : ''}`}><strong>{content2}</strong></p>
            </div>
        </section>
    )

}