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
//Cartelera
router.get('/proximamente',async (req, res) =>{
    try {
        const result = await peliculaInstance.proximamente(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

//Pelicula by id
router.get('/showPelicula', async (req, res) => {
    try {
        const idPelicula = req.query.id; 
        if (!idPelicula) {
          return res.status(400).json({ error: 'Se requiere el parámetro idPelicula en la URL' });
        }
        const result = await peliculaInstance.peliculabyId(idPelicula);
        if (!result) {
          return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(result);
      } 
      catch (error) {
        res.status(500).json({ error: error.message });
     }
});



module.exports = router;