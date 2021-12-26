const express = require('express')
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/luces', (req, res) =>{
    mysqlConnection.query('SELECT * FROM luces', (err, rows, fields) =>{
        var arrData = []
        if(!err){
            for(let i = 0; i < rows.length; i++){
                var objData = { 
                    id: rows[i]["id"],
                    estado: rows[i]["estado"]
                }
                arrData.push(objData);
            }
            res.json(arrData)
        } else {
            console.log(err);
        }
    })
});

router.get('/app', (req, res) =>{
    mysqlConnection.query('SELECT * FROM luces', (err, rows, fields) =>{
        
        if(!err){
            res.json(rows)
        } else {
            console.log(err);
        }
    })
});

router.get('/luces/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM luces WHERE id = ?', [id], (err, rows, fields) =>{
        
        if(!err){
            res.json(rows[0])
        } else {
            console.log(err);
        }
    })
})

router.post('/luces', (req, res) =>{
    const {luz, estado} = req.body
    mysqlConnection.query('INSERT INTO luces (luz, estado) VALUES (?, ?)', [luz, estado], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Luz guardada'})
        } else {
            console.log(err);
        }
    })
})

router.post('/luces/:id', (req, res) =>{
    console.log(req.body);
    const {estado} = req.body;
    const { id } = req.params;
    mysqlConnection.query('UPDATE luces SET estado = ? WHERE id = ?',[estado, id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Luz actualizada'})
        }else {
            console.log(err);
        }
    })
    console.log(id, estado);
    mysqlConnection.query('INSERT INTO estado (luz, estado) VALUES (?, ?)', [id, estado], (err, rows, fields) =>{
        if(!err){
            console.log('Guardado: ', id, estado);
        } else {
            console.log(err);
        }
    })
})


router.delete('/luces/:id', (req, res) =>{
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM luces WHERE id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Luz eliminada'})
        } else {
            console.log(err);
        }
    })
})

module.exports = router;