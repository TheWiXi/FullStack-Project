const Connection = require('../database.cjs')

module.exports = class Sala extends Connection {

    static instance;

    constructor() {
        
        if (Sala.instance === 'object') return Sala.instance;
        super()
        Sala.instance = this;
        return this;

    }
    
    async findOneRoomById(arg) {

        this.setCollection = "sala"
        let sala = await this.collection.findOne({ _id : arg.id_sala})
        return sala

    }

}