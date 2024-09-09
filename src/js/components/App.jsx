import { HomeComponent, moviesLoader } from './pages/HomeComponent.jsx'
import { MoviesDescComponent, movieLoader } from './pages/MoviesDescComponent.jsx'
import { SeatsSelection } from './pages/SeatsSelectionComponent.jsx'
import { SeatReservationScreen, loadSeatReserved } from './pages/SeatReservationComponent.jsx'
import { TicketComponent, loader } from './pages/TicketComponent.jsx'
import { UserTickets, loader as ticketLoader } from './pages/UserTicketsComponent.jsx'
import { AllCurrentMovies, currentMoviesLoader } from './pages/SeeAllCurrentMoviesComponent.jsx'
import { ComingSoon, comingSoonMoviesLoader } from './pages/ComingSoonComponent.jsx'
import { ProfileView, userLoader } from './pages/ProfileComponent.jsx'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent/>,
        loader: moviesLoader
    },
    {
        path: '/movie/:id',
        element: <MoviesDescComponent/>,
        loader: movieLoader
    },
    {
        path: '/movie/:id/seats',
        element: <SeatsSelection />
    },
    {
        path: '/movie/:id/seat/:seatId/:info',
        element: <SeatReservationScreen />,
        loader: loadSeatReserved
    },
    {
        path: '/ticket/:id',
        element: <TicketComponent />,
        loader: loader
    },
    {
        path: '/tickets',
        element: <UserTickets/>,
        loader: ticketLoader
    },
    {
        path: '/current',
        element: <AllCurrentMovies/>,
        loader: currentMoviesLoader
    },
    {
        path: '/incoming',
        element: <ComingSoon />,
        loader: comingSoonMoviesLoader
    },
    {
        path: '/profile',
        element: <ProfileView />,
        loader: userLoader
    }
])

export const App = () => {

    return (
        <RouterProvider router={router} />
    )

}