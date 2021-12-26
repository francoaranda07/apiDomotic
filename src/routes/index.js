const express = require('express')
const routers = express.Router();
const huerta = require('./huerta')
const luces = require('./luces')
const estado = require('./estado')

routers.use("/", huerta)
routers.use("/", luces)
routers.use("/", estado)

module.exports = routers;