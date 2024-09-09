const { validationResult } = require('express-validator');
const Movies = require('../model/moviesModel.cjs');
const moviesDTO = require('../dto/moviesDto.cjs')

exports.listAllMovies = async (req, res) => { // Logica para listar todas las peliculas

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const DTO = new moviesDTO();
    const moviesModel = new Movies();

    let query = await moviesModel.showAllCurrentMovies();
    let data = (query.length) ? DTO.templateFoundMoviesOnDB(query) : DTO.templateEmptyDataInDatabase();
    

    res.status(data.status).json(data);

}

exports.getMovieByID = async (req, res) => { // Logica para listar una pelicula segun su id

    let error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const DTO = new moviesDTO();
    const moviesModel = new Movies();

    let query = await moviesModel.showMovieDetailsById(req.params.id);
    let data = (query) ? DTO.templateFoundMoviesOnDB(query) : DTO.templateEmptyDataInDatabase();
    

    return res.status(data.status).json(data);

}