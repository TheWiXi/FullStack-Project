const mongoose = require("mongoose");

const peliculaSchema = mongoose.Schema({
  sala_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sala",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  genero: {
    type: [String],
    required: true,
  },
  duracion: {
    type: Number, // Duración en minutos
    required: true,
  },
  estado: {
    type: String,
    enum: ["cartelera", "proximamente", "no disponible"],
    required: true,
  },
  cast: [
    {
      nombre: {
        type: String,
        required: true,
      },
      personaje: {
        type: String,
        required: true,
      },
    },
  ],
  gallery: {
    type: [String],
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pelicula", peliculaSchema);
