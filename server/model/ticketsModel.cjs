const { ObjectId } = require('mongodb');
const Connection = require("../database.cjs");

module.exports = class Entries extends Connection {

    static instance

    constructor() {
        super()
    }

    static get getInstance() {

        if (Entries.instance === "object") return Entries.instance
        Entries.instance = new Entries();
        return this;
    }

    async findTicektById(arg) {

        try {

            this.setCollection = 'boleto'
            let query = await this.collection.findOne({_id: arg})
            return query

        } catch (err) {
            return err
        }

    }

    async deleteTicket(arg) {

        try {

            this.setCollection = 'boleto'
            let query = await this.collection.deleteOne({_id: arg})
            return query

        } catch (err) {
            return err
        }

    }

    async editTicketInfoToBuyTheTicket(id,arg) {

        try {

            this.setCollection = 'boleto'
            let query = await this.collection.updateOne({_id: id}, {$set: arg})
            return query
            
        } catch (err) {
            return err
        }

    }

    /**
     * * API para permitir la compra de boletas
     * TODO: Se realiza el registro del boleto en la base de datos
     * ? {id_funcion: "66a807cca5aad36c22a20ca3", "A1", fechaCompra: new Date()} arg
     * 
     * @param {Object} arg - Objeto que contiene los datos necesarios de la boleta
     * @returns {Object} {mensaje, ?data}
     */
    async buyEntriesToAFunction(arg) {
        try {

            this.setCollection = "boleto"
            return await this.collection.insertOne(arg)

        } catch (error) {

            return error
            
        }
    }

    /**
     * * API para cancelar reservas de asientos
     * TODO: permitir la cancelacion de asientos reservados
     * ? {uncion_id: "66a807cca5aad36c22a20ca3", seatCode: "A2"}
     * 
     * @param {Object} arg - Objeto contiene los datos requeridos para cancelar una reserva
     * @returns {Object} {mensaje, ?data}
     */
    async cancelBooking (arg) {

        try {
            
            this.setCollection = "funcion"
            let query = await this.collection.updateOne({_id: arg.funcion_id, "asientos.codigo": arg.seatCode}, {$set: {"asientos.$.estado": "disponible"}})
            return query

        } catch (error) {
            return error
        }

    }

    async findAllTicketsFromAnUser(arg) {

        try {

            this.setCollection = "boleto"
            let query = await this.collection.find({cedula_user: arg}).toArray()
            return query

        } catch (err) {
            return err
        }

    }

}