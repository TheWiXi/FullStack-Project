require("dotenv").config({ path: '../../config/.env' });
const usuarioSchema = require("../models/usuarioModel");
const {MongoClient} = require("mongodb");


module.exports = class usuarioController {
  /**
   * * NOTA: Clase para metodos respecto a usuarios
   */
  constructor() {}

  /**
   * *NOTA: CREA UN USUARIO
   * @param {Array} user Array con informacion del usuario
   * @ejemplo :
   * {
        "cedula": 1007900962,
        "nombre": "William Meza",
        "correo": "william@example.com",
        "contraseña": "securepassword123",
        "rol": "usuario"
      }
   * @returns 
   */

  async apiUno(user) {
    try {
      const rolesValidos = ["usuario", "vip", "admin"];
      if (!rolesValidos.includes(user.rol)) {
        throw new Error("Error: Rol no válido");
      }

      const newUsuario = usuarioSchema(user);
      const result = await newUsuario.save()

      //rol
      const client = new MongoClient(process.env.MONGO_SUDO);
      await client.connect();
      const db = client.db('Cine'); 
      const check = await db.command({
          createUser: user.correo,
          pwd: user.contraseña,
          roles: [{ role: user.rol, db: "Cine" }]
      });
      await client.close();

      return result;
    } catch (error) {
      // Manejo de errores
      console.error("Error al insertar usuario:", error);
      throw error; // Puedes relanzar el error para que sea manejado en la ruta
    }
  }
  /**
   * *NOTA: Lista todos los usuarios
   * @returns Todos los usuarios
   */
  async apiDos() {
    try {
      const cursor = await this.collection.find(); // * Get the cursor
      const result = await cursor.toArray(); // * Convert the cursor to an array
      console.table(result); // * Print the results
      await this.connection.close(); // * Close the connection
      return result; // * Return the results
    } catch (error) {
      // ! Handle errors
      console.error("Error fetching data or closing connection:", error);
    }
  }
  /**
   * *NOTA: Listar usuarios de un mismo rol
   * @param {String} rol - rol (user,vip o admin)
   * @returns usuarios con ese rol
   */
  async apiTres(rol) {
    if (user.rol === "user" || user.rol === "vip" || user.rol === "admin") {
      try {
        const cursor = await this.collection.find({ rol: rol }); // * Get the cursor
        const result = await cursor.toArray(); // * Convert the cursor to an array
        console.table(result); // * Print the results
        await this.connection.close(); // * Close the connection
        return result; // * Return the results
      } catch (error) {
        // ! Handle errors
        console.error("Error fetching data or closing connection:", error);
      }
    } else {
      console.log("Error: Rol no válido");
    }
  }
  /**
   * *NOTA: editar rol del usuario
   * @param {int} idUser - id usuario
   * @param {String} newRol - nuevo rol del usuario
   * @returns msj usuario actualizado
   */
  async apiCuatro(idUser, newRol) {
    try {
      if (newRol === "user" || newRol === "vip" || newRol === "admin") {
        const cursor = await this.collection.findOneAndUpdate(
          { _id: new ObjectId(idUser) },
          { $set: { rol: newRol } },
          { returnDocument: "after" }
        );
        const nick = cursor.value.Nick;
        const resetrol = await this.db.command({
          updateUser: nick,
          roles: [], // Establece un array vacío para eliminar todos los roles
        });
        const addNewRol = await db.command({
          updateUser: nick,
          roles: [{ role: newRol, db: "Cine" }], // Asegúrate de especificar la base de datos
        });
        console.log("Usuario (rol) actualizado.");
        await this.connection.close(); // * Close the connection
        return addNewRol;
      } else {
        console.log("Error: Rol no válido");
      }
    } catch (error) {
      // ! Handle errors
      console.error("Error fetching data or closing connection:", error);
    }
  }
}
