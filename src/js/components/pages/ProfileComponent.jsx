import { useLoaderData } from "react-router-dom"
import { SectionIndicator } from "../headers/SectionIndicator"

export const userLoader = async () => {

    let { msg } = await fetch(`http://localhost:3001/user/${import.meta.env.VITE_PASSWORD}`).then(res => res.json())

    return msg

}

export const ProfileView = () => {

    const { Usuario } = useLoaderData()

    return (
        <>
            <SectionIndicator to={-1} section={'Profile'} />

            <main className="flex flex-col justify-center gap-[20px] text-center ">
                <div className="w-full flex justify-center">
                    <img className="w-[50px] h-[50px]" src="https://unavatar.io/microlink/microlink.io" alt="unavatar" />
                </div>
                <hr />
                <div className="flex flex-col gap-[20px] p-[20px]">
                    <p><big><strong>Nombre: {Usuario.Nombre}</strong></big></p>
                    <hr />
                    <p>Nick: {Usuario.Nick}</p>
                    <hr />
                    <p>Email: {Usuario.email}</p>
                    <hr />
                    <p>Rol: {Usuario.rol}</p>
                    <hr />
                    <p>Telefono: {Usuario.telefono}</p>
                    <hr />
                    <div>
                        <p><strong>Tarjeta: {Usuario.tarjeta ? Usuario.tarjeta.estado : 'No tiene'} </strong></p>
                    </div>
                </div>
            </main>

        </>
    )

}