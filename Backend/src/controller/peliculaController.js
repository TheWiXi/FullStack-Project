const Pelicula = require("../models/peliculaModel");

module.exports = class peliculaController {
    /**
     * * NOTA: Clase para metodos respecto a peliculas
     */
    constructor(){}
    /**
     * * NOTA:Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género y duración .
     * @returns Peliculas disponibles o en cartelera(titulo, genero, duracion )
     */
    async cartelera (){
        try {
            const result = await Pelicula.find(
                { estado: "cartelera" }
            );
            return result;
        } catch (error) {
            console.error("Error al obtener películas en cartelera:", error);
            throw error; 
        }
    }
    async proximamente (){
        try {
            const result = await Pelicula.find(
                { estado: "proximamente" }
            );
            return result;
        } catch (error) {
            console.error("Error al obtener películas en proximamente:", error);
            throw error; 
        }
    }
    async newPelicula(pelicula){
        const newPelicula = Pelicula(pelicula);
        const result = await newPelicula.save();
        return result;

    }
    /**
     * 
     * @param {String} idPelicula Id de la pelicula a consultar, ej:66a80379a5aad36c22a20c80 
     * @returns Informacion de la pelicula
     */
    async peliculabyId (idPelicula){
        try {
            const result = await Pelicula.findOne(
                { "_id": idPelicula }
            ); 

            return result; 
        } 
        catch (error) {
            console.error("Error fetching data or closing connection:", error);
        }
    }
}
