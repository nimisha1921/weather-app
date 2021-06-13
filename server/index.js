
const express = require('express');
const path = require("path");
const weatherRoute  = require('./weather-route');


const app = express();
app.use(express.json());

const rootDirectory = path.resolve(__dirname, "../build/");
app.use(express.static(rootDirectory));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/v1', weatherRoute)

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})