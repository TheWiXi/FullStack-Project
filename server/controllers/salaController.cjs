const { validationResult } = require('express-validator');
const Sala = require('../model/salaModel.cjs');
const salasDto = require('../dto/salasDto.cjs')

exports.findRoomById = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({errors: error.array()});

    const salaModel = new Sala();
    const DTO = new salasDto();

    let idSala = DTO.formatObjectId(req.params.id)
    let query = await salaModel.findOneRoomById({id_sala:idSala})
    let modelResponse = DTO.templateSuccesfullSearch(query)

    res.status(modelResponse.status).json(modelResponse)

}