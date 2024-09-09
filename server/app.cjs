const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./router.cjs')

app.use(cors())
app.use(express.json()); // Definimos que la API recibirá JSON

// Habilitamos el uso de los archivos frontend


app.use(router);

app.use((req, res) => { // Dado el caso que en nuestra aplicacion nunca se llegue a entrar a uno de los endpoints que hemos definido entonces recurrirá a este
    res.status(404).json({ message: "No tiene autorizacion" })
})

let config = { // definimos las configuraciones del link http
    host: process.env.VITE_HOST,
    port: process.env.EXPRESS_PORT_BACKEND
}

app.listen(config, '0.0.0.0' ,() => { // Declaramos una escucha de conexiones a la direccion que especificamos
    console.log(`http://${config.host}:${config.port}`)
})

