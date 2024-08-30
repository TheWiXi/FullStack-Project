const express = require('express');
const usuarioController = require('../controller/usuarioController');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const userInstance = new usuarioController();

//Create usuario
router.post('/newUsuario', async (req, res)=>{
    try {
        const result = await userInstance.apiUno(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
//listar usuarios
router.get('/showUsers', async (req,res) => {
    try {
        const result = await userInstance.listarUsuarios();
        console.log(result);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
//usuario por id
router.get('/userId', async (req,res) => {
    try {
        const id = req.query.id; 
        if (!id) {
            return res.status(400).json({ error: 'Se requiere el parámetro id en la URL' });
        }
        const result = await userInstance.usuarioId(id);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
//cambiorol
router.post('/cambioRol', [
    body('idUser').notEmpty().withMessage('El ID de usuario es requerido'),
    body('newRol').notEmpty().withMessage('El nuevo rol es requerido'),
], async (req,res) => {
    try {
        const result = await userInstance.cambioRol(req.body.idUser, req.body.newRol);
        console.log(result);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


module.exports = router;