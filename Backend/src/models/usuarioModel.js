const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  cedula: {
    type: Number,
    unique: true,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un correo electrónico válido"],
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["usuario", "vip"],
    default: "usuario",
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
