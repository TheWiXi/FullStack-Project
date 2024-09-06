const Sala = require("../models/salaModel");

module.exports = class salaController {
    /**
     * * NOTA: Clase para metodos respecto a Salas
     */
    constructor(){}

    async newSala(sala){
        const newSala = Sala(sala);
        const result = await newSala.save();
        return result;

    }
    /**
     * 
     * @param {String} idSala Id de la Sala a consultar, ej:66a80379a5aad36c22a20c80 
     * @returns Informacion de la Sala
     */
    async salabyId (idSala){
        try {
            const result = await Sala.findOne(
                { "_id": idSala }
            ); 

            return result; 
        } 
        catch (error) {
            console.error("Error fetching data :", error);
        }
    }

    async salabyPelicula(idPelicula){
        try {
            const result = await Sala.findOne(
                { "pelicula_id": idPelicula}
            ); 

            return result; 
        } 
        catch (error) {
            console.error("Error fetching data :", error);
        }
    }
}
