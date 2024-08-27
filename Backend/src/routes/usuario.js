const express = require('express');
const usuarioController = require('../controller/usuarioController');

const router = express.Router();
const userInstance = new usuarioController();

//Create usuario
router.post('/newUsuario', async (req, res)=>{
    try {
        const result = await userInstance.apiUno(req.body);
        console.log(result);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


module.exports = router;