const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

exports.emptyBodyForGetRequestsValidation = () => { // Validar que el body este vacio
    
    return body().custom((value, { req }) => {

            if (Object.keys(req.body).length > 0) throw new Error('Unauthorized body data')
            return true

        })

}

exports.objectIdValidator = () => { // Validar que el id ingresado en la url sea valido en formato ObjectId

    return param('id').custom((value, { req }) => {

            if (ObjectId.createFromHexString(req.params.id)) return true;
            else throw new Error("Invalid id format")

        })

}