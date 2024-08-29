require("dotenv").config({ path: './config/.env' });
const express = require('express');
const connect =require ('./config/connection');
const peliculaRoutes = require('./src/routes/pelicula');
const salaRoutes = require('./src/routes/sala');
const usuarioRoutes = require('./src/routes/usuario');
const boletoRoutes = require('./src/routes/boleto');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT || 3000;
app.use(cors());

//Database connection
new connect();

//middleware
app.use(express.json());

//common route
app.use('/cineapi',peliculaRoutes);
app.use('/cineapi', salaRoutes);
app.use('/cineapi', usuarioRoutes);
app.use('/cineapi', boletoRoutes);

//start
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});