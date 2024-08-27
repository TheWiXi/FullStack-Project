const express = require('express');
const peliculaController = require('../controller/peliculaController');

const peliculaInstance = new peliculaController();

const router = express.Router();

//Create pelicula
router.post('/newPelicula', async (req, res)=>{
    try {
        const result = await peliculaInstance.newPelicula(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

//Cartelera
router.get('/showCartelera',async (req, res) =>{
    try {
        const result = await peliculaInstance.cartelera(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});



module.exports = router;