const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoletoSchema = new Schema({
  sala_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sala",
    required: true,
  },
  cedula_usuario: {
    type: Number,
    unique: true,
    required: true,
  },
  funcion_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  asientos: [
    {
      codigo_asiento: {
        type: String,
        unique: true,
        required: true,
      },
    },
  ],
});

const Boleto = mongoose.model("Boleto", BoletoSchema);

module.exports = Boleto;
