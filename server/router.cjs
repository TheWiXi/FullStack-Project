const router = require('express').Router();
const {
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    validatePatchUserInfo,
    existingRoleValidation,
    createValidUserData,
    searchValidUserIdParam,
    infoPurchaseTicketValidator,
    bodyCorrectSeatCodeFormat,
    updateUserRoles,
    getAllUsersDetails,
    buyTickets,
    showSeatsDisponibilityFromAFunction,
    reserveOneSeat,
    cancelBookedSeat,
    showFunctionsOfAnEspecificMovie,
    findRoomById,
    getUserTickets,
    getEspecificTicket
} = require('./index.cjs')



router.get("/movies", emptyBodyForGetRequestsValidation() ,listAllMovies) // Listar todas las peliculas
router.get("/movie/:id", objectIdValidator(), getMovieByID) // Listar una pelicula segun su id
router.get("/movie/:id/functions", objectIdValidator(), showFunctionsOfAnEspecificMovie)

router.post("/user", createValidUserData(), createUser) // Crear Usuarios
router.get("/user/:id", searchValidUserIdParam(), getUserDetails) // Obtener detalles de un usuario especifico
router.patch("/user/:id", validatePatchUserInfo(), updateUserRoles) // Actualizar los roles de un usuario
router.get("/users/:rol", existingRoleValidation(), getAllUsersDetails) // Obtener todos los usuarios que tienen un rol especifico
router.get("/users", emptyBodyForGetRequestsValidation(), getAllUsersDetails) // Obtener todos los usuarios existentes

router.post("/ticket/:id", [infoPurchaseTicketValidator(), objectIdValidator()], buyTickets)
router.get("/room/:id", objectIdValidator(), findRoomById)

router.get("/movie/:id/seats", [ emptyBodyForGetRequestsValidation(), objectIdValidator() ], showSeatsDisponibilityFromAFunction)
router.post("/movie/:id/seat", [objectIdValidator(), bodyCorrectSeatCodeFormat()], reserveOneSeat)
router.delete("/ticket/:id", [objectIdValidator(), emptyBodyForGetRequestsValidation()], cancelBookedSeat)
router.get('/user/:id/tickets', searchValidUserIdParam(), getUserTickets)
router.get('/ticket/:id', [objectIdValidator(), emptyBodyForGetRequestsValidation()], getEspecificTicket)

module.exports = router