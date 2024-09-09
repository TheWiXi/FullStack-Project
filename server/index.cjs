// Database
const Connection = require('./database.cjs');

// Controllers
const {
    listAllMovies,
    getMovieByID
} = require('./controllers/moviesController.cjs');
const {
    createUser,
    getUserDetails,
    updateUserRoles,
    getAllUsersDetails
} = require('./controllers/usersController.cjs')
const {
    buyTickets,
    getUserTickets,
    getEspecificTicket
} = require('./controllers/ticketsController.cjs');
const {
    showSeatsDisponibilityFromAFunction,
    reserveOneSeat,
    cancelBookedSeat,
    showFunctionsOfAnEspecificMovie
} = require('./controllers/funcionesController.cjs')
const {
    findRoomById
} = require('./controllers/salaController.cjs')

// Models
const Entries = require('./model/ticketsModel.cjs');
const Users = require('./model/usersModel.cjs');
const Movies = require('./model/moviesModel.cjs')

// DTO's
const moviesDTO = require('./dto/moviesDto.cjs')
const userDto = require('./dto/userDto.cjs')

// Validators
const {
    emptyBodyForGetRequestsValidation,
    objectIdValidator
} = require('./validators/generalValidators.cjs')
const {
    createValidUserData,
    searchValidUserIdParam,
    validatePatchUserInfo,
    existingRoleValidation
} = require('./validators/usersValidator.cjs')
const {
    infoPurchaseTicketValidator
} = require('./validators/ticketValidator.cjs')
const {
    bodyCorrectSeatCodeFormat
} = require('./validators/seatValidator.cjs')

// Exports
module.exports = {
    Connection, // Database conection
    // controllers
    listAllMovies,
    getMovieByID,
    createUser,
    getUserDetails,
    updateUserRoles,
    getAllUsersDetails,
    buyTickets,
    showSeatsDisponibilityFromAFunction,
    reserveOneSeat,
    cancelBookedSeat,
    showFunctionsOfAnEspecificMovie,
    findRoomById,
    getUserTickets,
    getEspecificTicket,
    // models
    Entries,
    Users,
    Movies,
    // DTO's
    userDto,
    moviesDTO,
    // validators
    emptyBodyForGetRequestsValidation,
    objectIdValidator,
    createValidUserData,
    searchValidUserIdParam,
    validatePatchUserInfo,
    existingRoleValidation,
    infoPurchaseTicketValidator,
    bodyCorrectSeatCodeFormat
}