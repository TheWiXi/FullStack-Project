module.exports = class userDto {

    constructor({nombre, nick, rol, contrasenia, email, telefono}) {

        this._id = Number(contrasenia);
        this.nombre = nombre;
        this.Nick = nick;
        this.rol = rol;
        this.contrasenia = Number(contrasenia);
        this.email = email;
        this.telefono = String(telefono);

    }

    templateDefaultError(err) {
        return {
            status: 400,
            msg: err
        }
    }

    templateUserIdAlreadyExists(code) {
        return {
            status: 409,
            msg: `Ya hay un usuario existente con el codigo ${code}`
        }
    }

    templateUnauthorized(query) {
        return {
            status: 401,
            msg: query
        }
    }

    templateSuccesfullUserCreation(arg) {
        return {
            status: 201,
            msg: arg
        }
    }

    templateUserNotFound(arg) {
        return {
            status: 404,
            msg: `No se encontró el usuario con id: ${arg}`
        }
    }

    templateUsersNotFound(arg) {
        return {
            status: 404,
            msg: `No se encontraron usuarios con el rol: ${arg}`
        }
    }

    templateUserFound(arg) {
        return {
            status: 200,
            msg: arg
        }
    }

    userCardFormatter(cedula, card, user){
        return {
            Nick: user,
            cedula: Number(cedula),
            tarjeta: JSON.parse(card)
        }
    }

    formatDataToBackend() {

        return {
            _id : this._id,
            Nombre : this.nombre,
            Nick : this.Nick,
            rol : this.rol,
            contrasenia : this.contrasenia,
            email : this.email,
            telefono : this.telefono
        }

    }
    
}