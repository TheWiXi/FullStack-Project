const express = require('express');
require("dotenv").config({ path: './config/.env' });
const connect =require ('./config/connection');


new connect();

const app = express();
const port = process.env.API_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
});