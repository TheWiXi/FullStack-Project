const Boleto = require("../models/boletoModel");


module.exports = class boletoController {
    /**
     * * NOTA: Clase para metodos respecto a boletos
     */
    constructor(){}
    /**
     * * NOTA:Permitir la compra de boletos
     * @param {Array} newticket - contiene los siguientes:
     * @param {string} idFuncion id de la funcion elegida ej "66a807cca5aad36c22a20ca3"
     * @param {string} asiento asiento elegido ej "A1"
     * @param {date} fechaCompra fecha de compra ej "2024-07-31T11:50:46.715Z"
     * @param {string} idboleto id de la boleto eje "66a8058ca5aad36c22a20c9e"
     * @param {int} subtotal subtotal de la compra
     * @param {int} total total de la compra
     * @param {int} cc cedula usuario
     * @returns 
     */
    async newBoleto (boleto){
        try {
            const newBoleto = Boleto(boleto);
            const result = await newBoleto.save();
            return result;
        } 
        catch (error) {
            console.error('Error inserting ticket:', error);
        }
    }
}