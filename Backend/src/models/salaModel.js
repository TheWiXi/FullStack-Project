const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalaSchema = new Schema({
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
    required: true,
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
            unique: true,
            required: true,
          },
          estado: {
            type: String,
            enum: ["disponible", "reservado", "comprado"],
            required: true,
          },
        },
      ],
    },
  ],
});

const Sala = mongoose.model("Sala", SalaSchema);

module.exports = Sala;
