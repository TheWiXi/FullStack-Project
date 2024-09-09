import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"
import { TicketCard } from "../bodys/TicketCard"

export const loader = async () => {

    const data = await fetch(`http://localhost:3001/user/${Number(import.meta.env.VITE_PASSWORD)}/tickets`).then(res => res.json())

    return data

}

export const UserTickets = () => {

    const data = useLoaderData()

    return (
        <>
            <SectionIndicator to={'/'} section='Ticket' />

            <main className={ `${data.status == 404 ? 'h-full flex justify-center items-center' : ''} py-[20px] px-[40px] flex flex-col gap-[15px] ` }>
                {
                    data.status != 404 ? (
                        <>
                            {
                                data.data.map(ticket => <TicketCard key={ticket._id} {...ticket}/>)
                            }
                        </>
                    ) : <p>No existen tickets comprados</p>
                }
            </main>

        </>
    )

}