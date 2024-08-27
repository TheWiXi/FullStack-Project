const mongoose = require("mongoose");

const salaSchema = mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["2D", "3D"],
    required: true,
  },
  pelicula_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pelicula",
  },
  Funcion: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
      hora: {
        type: Date,
        required: true,
      },
      valor: {
        type: Number,
        required: true,
      },
      valorVIP: {
        type: Number,
        required: true,
      },
      asientos: [
        {
          codigo: {
            type: String,
            required: true,
          },
          estado: {
            type: String,
            enum: ["disponible", "reservada", "comprada"],
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Sala", salaSchema);
