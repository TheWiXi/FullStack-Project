const { body, query, param } = require('express-validator');

exports.infoPurchaseTicketValidator = () => {

    return [
        body('total').isNumeric().withMessage('El total debe ser numerico'),
        body('fechaFuncion').isString().withMessage('Debe ingresarla en formato fecha'),
        body('hora').isString().withMessage('Hora de la funcion'),
        body('sala').isString().withMessage('Sala de la funcion')
    ]

}