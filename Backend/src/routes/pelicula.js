const express = require('express');
const peliculaSchema = require('../models/peliculaModel');

const router = express.Router();

//Create pelicula
router.post('/peliculas', (req, res)=>{
    const newPelicula = peliculaSchema(req.body);
    newPelicula
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
});


module.exports = router;