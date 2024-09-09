const {ObjectId} = require('mongodb')

module.exports = class ticketsDto {

    templateForAnUnexistingFunction(arg) {
        return {
            status: 404,
            message: `Function with id ${arg} not found`
        }
    }

    templateDefaultError(arg) {
        return {
            status: 500,
            message: 'Ha ocurrido un problema durante la compra del ticket',
            data: arg
        }
    }

    templateForNotSeatDisponibility(arg) {
        return {
            status: 404,
            message: `Asiento ${arg} no se encuentra disponible para compra`
        }
    }

    templateSuccesfullTicketBought(arg) {
        return {
            status: 201,
            message: 'Ticket comprado exitosamente',
            data: arg
        }
    }

    templateForAFaildeSchemaValidation(arg) {
        return {
            status: 400,
            message: 'Error de validación en los datos del ticket',
            errors: arg
        }
    }

    templateNotExistingTicket(arg) {
        return {
            status: 404,
            msg: `El ticket de id: ${arg} no fue encontrado o no existe, ingrese uno valido`
        }
    }

    formatTicketUserData(arg) {
        return {
            id_funcion: ObjectId.createFromHexString(arg.id_funcion),
            asiento: arg.asiento,
            fechaCompra: new Date(arg.fechaCompra)
        }
    }

    templateForEmptyTicketsFromUser () {
        return {
            status: 404,
            msg: 'No existen tickets comprados por parte del usuario',
        }
    }

    templateForExistingTickets (data) {
        return {
            status: 200,
            data
        }
    }

    formatFromStringToObjectId(arg) {
        return ObjectId.createFromHexString(arg)
    }

}