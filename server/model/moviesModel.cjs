const { ObjectId } = require('mongodb');
const Connection = require('../database.cjs');

module.exports = class Movies extends Connection {

    static instance;

    constructor() {

        if (Movies.instance === "object") return Movies.instance;
        super();
        Movies.instance = this;
        return this;

    }

    /* static get getInstance() {

        if (Movies.instance === "object") return Movies.instance;
        Movies.instance = new Movies();
        return this;

    } */

    /**
     * * API para listar las peliculas disponibles
     * TODO: Se listan las peliculas en cartelera para la fecha actual
     * 
     * @returns {object} {?data}
     */
    async showAllCurrentMovies() {

        this.setCollection = "pelicula"
        let query = await this.collection.find({estado: {$in: ["en cartelera", "estreno", "proximamente"]}}).toArray()
        return query

    }

    /**
     * * API para obtener los detalles de una pelicula especifica
     * TODO: se listan los detalles de una pelicula especifica
     * ? "66a80379a5aad36c22a20c80"
     * 
     * @param {String} codigo id de la pelicula a buscar
     * @returns {Object} {mensaje, ?data}
     */
    async showMovieDetailsById(id) {

        this.setCollection = "pelicula";
        let query = await this.collection.findOne({_id: ObjectId.createFromHexString(id)})
        return query

    }

}