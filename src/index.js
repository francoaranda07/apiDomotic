const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const env = require('dotenv/config');
const router = require('./routes');
const app = express();

//config
app.set('port', process.env.PORT);

//Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors())
app.use(express.json());

//Rutas
// app.use(require('./routes/employes'));
app.use("/api", router);


app.get('*', function (req, res){
    res.status(404).send('Error 404 - Recurso no encontrado');
})
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'));
})