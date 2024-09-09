import { forwardRef, useState } from "react"
import { Link } from "react-router-dom"

export const NavBar = forwardRef(({ estado, setEstado, data, img },ref) => {

    const [filteredMovies, setFilteredMovies] = useState(data)
    const search = (e) => {
        let termino = e.target.value
        let newMovies = data.filter(func => func.nombre.toUpperCase().includes(termino.toUpperCase()) ||
            func.genero[0].toUpperCase().includes(termino.toUpperCase()))
        return setFilteredMovies(newMovies)
    }
    return (
        <header className="h-auto flex gap-[15px] flex-col w-full p-[20px]">
            <section className="flex items-center justify-between">
                <img className="w-[50px] rounded-full" src={img ?? "https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"} alt="Profile Image" />
                <div>
                    <p>Hi, {import.meta.env.VITE_USER}! </p>
                    <strong>Lets watch movie together</strong>
                </div>
                <button
                    className="flex items-center justify-center border border-white w-[40px] h-[40px] border-opacity-25 p-[5px] rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                        />
                    </svg>
                </button>
            </section>
            <section className="relative w-full">
                <input
                    className="w-full py-[15px] px-[35px] rounded-lg border border-white bg-white bg-opacity-10 "
                    placeholder="Search movie, cinema, genre"
                    type="search"
                    onFocus={() => setEstado(true)}
                    onMouseLeave={() => setEstado(false)}
                    onChange={search}
                    ref={ref}
                />
                <svg
                    style={{}}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="-translate-y-1/2 size-6 absolute w-[20px] h-[20px] left-[12px] top-[50%] text-semiWhite">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                {
                    estado && (
                        <div className=" flex flex-col z-1 absolute w-full bg-[#222] p-[10px] gap-[15px] rounded-xl">
                            {
                                filteredMovies.map((movie, index) => (
                                    <Link key={movie._id} to={`/movie/${movie._id}`}>
                                        <div className="flex gap-[10px] items-center" >
                                            <img className="w-[100px] h-[100px] object-cover rounded-xl" src={`${movie.gallery[0]}`} alt={movie.nombre} />
                                            <div>
                                                <p><strong>{movie.nombre}</strong></p>
                                                <p className="text-white bg-letrasGrises w-max p-[3px] rounded-full"><small>{movie.genero[0]}</small></p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
            </section>
        </header>
    )

})