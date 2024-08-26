require("dotenv").config({ path: './config/.env' });
const express = require('express');
const connect =require ('./config/connection');
const peliculaRoutes = require('./src/routes/pelicula');

const app = express();
const port = process.env.API_PORT || 3000;

//Database connection
new connect();

//middleware
app.use(express.json());
//common route
app.use('/cineapi',peliculaRoutes)
//start
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
});