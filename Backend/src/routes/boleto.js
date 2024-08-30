const express = require('express');
const boletoController = require('../controller/boletoController');

const router = express.Router();
const boletoInstance = new boletoController();

//Create boleto
router.post('/newBoleto', async (req, res)=>{
    try {
        const result = await boletoInstance.newBoleto(req.body);
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

module.exports = router;
