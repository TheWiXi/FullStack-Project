const { ObjectId } = require('mongodb');

module.exports = class FuncionesDto {

    templateErrorDefautl(arg) {
        return {
            status: 400,
            msg: 'Fallo en la insercion de los asientos',
            data: arg
        }
    }

    templateSuccesfullBooking(arg, ticekt) {
        return {
            status: 200,
            msg: arg
        }
    }

    templateSeatNotAviable(arg){
        return {
            status: 409,
            msg: `El/Los asientos con los siguientes codigos no se encuentran disponibles`,
            data: arg
        }
    }

    templateSeatNotFound(arg) {
        return {
            status: 404,
            msg: `Los siguientes asientos no se han encontrado existencias en la sala`,
            data: arg
        }
    }

    templateExistingFunction({asientos} = {asientos}) {
        return {
            status: 200,
            msg: asientos
        }
    }

    templateNotExistingFunctionsWithMovie() {
        return {
            status: 404,
            msg: `No se encontraron funciones disponibles con ese id de pelicula`
        }
    }

    templateNonExistingFunction(arg){
        return {
            status: 404,
            msg: `La funcion de id: ${arg} no se encuetra disponible`
        }
    }

    templateNotExistingTicket(arg) {
        return {
            status: 404,
            msg: `El ticket de id: ${arg} no fue encontrado o no existe, ingrese uno valido`
        }
    }

    formatFunctionIdToHexString(arg) {
        return ObjectId.createFromHexString(arg)
    }

}