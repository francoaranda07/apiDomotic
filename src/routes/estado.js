const express = require('express')
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/estado', (req, res) =>{ //muestra en qué fecha y hora hubo modificaciones en las luces
    mysqlConnection.query('SELECT * FROM estado', (err, rows, fields) =>{
        res.json(rows)
    })
});

router.get('/estado/delete', (req, res) =>{//elimina todos los registros de los estados
    mysqlConnection.query('DELETE FROM estado', (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Registros borrados correctamente'})
        }else{
            console.log(err);
        }
    })
})

module.exports = router;