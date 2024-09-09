const { MongoClient } = require('mongodb');

module.exports = class Connection {

    static instance

    constructor(){

        /* if(typeof Connection.instance === 'object') {
            return Connection.instance;
        } */

        this.host = process.env.HOST;
        this.user = process.env.VITE_MONGOUSER;
        this.pass = process.env.MONGO_PASSWORD;
        this.cluster = process.env.CLUSTER;
        this.port = process.env.PORT;
    
        this.#connect();
        this.db = this.conexion.db(process.env.DB_NAME)

        /* Connection.instance = this;

        return this; */

    }

    async #connect () {
        console.log(`${this.host}${this.user}:${this.pass}@${this.cluster}:${this.port}/${process.env.DB_NAME}`)
        this.conexion = new MongoClient(`${this.host}${this.user}:${this.pass}@${this.cluster}:${this.port}/${process.env.DB_NAME}`);
        await this.conexion.connect();
    }

    set setCollection(name) {

        this.collection = this.db.collection(name);
        return this.collection;

    }

}