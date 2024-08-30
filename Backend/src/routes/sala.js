const express = require('express');
const salaController = require('../controller/salaController');

const salaInstance = new salaController();


const router = express.Router();

//Create sala
router.post('/newSala', async (req, res)=>{
    try {
        const result = await salaInstance.newSala(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});  

//Sala by id
router.get('/showSala', async (req, res) => {
    try {
        const idSala = req.query.id; 
        if (!idSala) {
          return res.status(400).json({ error: 'Se requiere el parámetro idSala en la URL' });
        }
        const result = await salaInstance.salabyId(idSala);
        if (!result) {
          return res.status(404).json({ error: 'Sala no encontrada' });
        }
        res.json(result);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;