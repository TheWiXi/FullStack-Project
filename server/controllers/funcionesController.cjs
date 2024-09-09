const { validationResult } = require('express-validator');
const Cartelera = require('../model/funcionesModel.cjs')
const FuncionesDto = require('../dto/funcionesDto.cjs')
const Entries = require('../model/ticketsModel.cjs')

exports.showFunctionsOfAnEspecificMovie = async (req, res) => {

    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto()
    const funcionesModel = new Cartelera()

    let idPelicula = DTO.formatFunctionIdToHexString(req.params.id)
    let functions = await funcionesModel.findFunctionByMovieId(idPelicula)
    let modelResponse = functions.length ? DTO.templateSuccesfullBooking(functions) : DTO.templateNotExistingFunctionsWithMovie()

    res.status(modelResponse.status).json(modelResponse)

}

exports.showSeatsDisponibilityFromAFunction = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();

    let idTicket = DTO.formatFunctionIdToHexString(req.params.id)
    let asientos = await funcionesModel.findFunctionById(idTicket)
    let modelResponse = asientos ? DTO.templateExistingFunction(asientos) : DTO.templateNonExistingFunction(idTicket)

    res.status(modelResponse.status).json(modelResponse)
}

exports.reserveOneSeat = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();
    const ticketsModel = new Entries();
    
    let idFuncion = DTO.formatFunctionIdToHexString(req.params.id)
    let codigosAsientos = req.body.seatsCode
    let funcion = await funcionesModel.findFunctionById(idFuncion)
    let functionModelResponse = funcion ? funcion.asientos : DTO.templateNonExistingFunction(idFuncion)
    if (functionModelResponse.status == 404) return res.status(functionModelResponse.status).json(functionModelResponse);

    let disponible2 = []
    let noExistentes = []
    let noDisponibles = []
    hola:
    for(let seat of codigosAsientos) {
        for (let funcSeat of functionModelResponse) {
            if (seat == funcSeat.codigo && funcSeat.estado == 'disponible') {
                disponible2.push(funcSeat)
                break;
            } else if (seat == funcSeat.codigo && funcSeat.estado != 'disponible') {
                noDisponibles.push(funcSeat)
                break;
            } else if (funcSeat == functionModelResponse[functionModelResponse.length-1]) {
                noExistentes.push(seat)
                break hola;
            }
        }
    }

    let dtomsg;
    if (noExistentes.length) {
        dtomsg = DTO.templateSeatNotFound(noExistentes)
        return res.status(dtomsg.status).json(dtomsg)
    }
    if (noDisponibles.length) {
        dtomsg = DTO.templateSeatNotAviable(noDisponibles)
        return res.status(dtomsg.status).json(dtomsg)
    }

    let modelResponse
    let dtoResponse
    for (let seat of codigosAsientos) {
        
        modelResponse = await funcionesModel.reserveSeats({funcion_id: idFuncion, seatCode: seat})
        dtoResponse = modelResponse.modifiedCount == 1 ? DTO.templateSuccesfullBooking(modelResponse) : DTO.templateErrorDefautl(modelResponse)
        if (dtoResponse.status == 400) break;
        
    }

    let tickestReserve
    if (dtoResponse.status == 200) {
        tickestReserve = await ticketsModel.buyEntriesToAFunction({
            cedula_user: Number(process.env.VITE_PASSWORD),
            id_funcion: idFuncion,
            id_sala: funcion.id_sala,
            asientos: codigosAsientos,
            fechaReserva: new Date(),
            estado: 'reservada'
        })
        dtoResponse.ticketGenerado = tickestReserve.insertedId
    }
    
    return res.status(dtoResponse.status).json(dtoResponse)

}

exports.cancelBookedSeat = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new FuncionesDto();
    const funcionesModel = new Cartelera();
    const ticketsModel = new Entries();

    let idTicket = DTO.formatFunctionIdToHexString(req.params.id) // Convertimos el id del ticket en object id
    
    let ticketInfo = await ticketsModel.findTicektById(idTicket) // Llamamos a la base de datos para que nos traiga la info del ticket
    let ticketSeats = ticketInfo ? ticketInfo.asientos : DTO.templateNotExistingTicket(idTicket)
    if(ticketSeats.status == 404) return res.status(ticketSeats.status).json(ticketSeats)
        
    let funcion = await funcionesModel.findFunctionById(ticketInfo.id_funcion) // Llamamos a la base de datos para que nos traiga la funcion que tiene registrada el ticket
    let functionModelResponse = funcion ? funcion.asientos : DTO.templateNonExistingFunction(idTicket) // Verificamos si la funcion fue encontrada, del caso contrario responder con error por no existencia
    if (functionModelResponse.status == 404) return res.status(functionModelResponse.status).json(functionModelResponse);

    let modelResponse;
    let dtoResponse;
    for (let seat of ticketSeats) {

        modelResponse = await funcionesModel.cancelBooking({funcion_id: ticketInfo.id_funcion, seatCode: seat})
        dtoResponse = modelResponse.modifiedCount == 1 ? DTO.templateSuccesfullBooking(modelResponse) : DTO.templateErrorDefautl(modelResponse)
        if (dtoResponse.status == 400) break;
        
    }
    
    if (dtoResponse.status == 200) await ticketsModel.deleteTicket(idTicket)

    return res.status(dtoResponse.status).json(dtoResponse)

}