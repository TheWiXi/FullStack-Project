const mongoose = require ('mongoose');

const peliculaSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true
    },
    genero: {
        type: String,
        required: [true, 'El género es requerido'],
        trim: true
    },
    duracion: {
        type: Number,
        required: [true, 'La duración es requerida']
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es requerida']
    },
    horarios: [{
        type: Date,
        required: [true, 'Al menos un horario es requerido']
    }]
});

module.exports = mongoose.model('Pelicula', peliculaSchema);