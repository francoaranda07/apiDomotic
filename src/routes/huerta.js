const express = require('express')
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/huerta/estado', (req, res) =>{
    mysqlConnection.query('SELECT * FROM config', (err, rows, fields) =>{
        res.json(rows)
    })
})

router.post('/huerta/estado', (req, res) =>{
    const {suspendido} = req.body;
    mysqlConnection.query('UPDATE config SET suspendido = ? WHERE id = 1',[suspendido], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Estado actualizado'})
        }else {
            console.log(err);
        }
    })
})

router.get('/huerta/config', (req, res) =>{//canteros con sus minimos y maximos
    var strCant = {cant1 : 1, cant2: 2, cant3: 3, cant4: 4}//si se amplía la huerta agregar el numero de cantero en este objeto
    var cantero = []
    var par = []
    var impar = []
    var arrData = []
    mysqlConnection.query('SELECT * FROM huerta', (err, rows, fields) =>{
        if(!err){
            for(let i = 0; i < rows.length; i++){
                if(i % 2 === 1){//posicion 0,2,4,6
                    impar.push(rows[i]["humedad"])
                }else{//posicion 1,3,5,7
                    par.push(rows[i]["humedad"])
                }
            }
            for(let i in strCant){
                cantero.push(strCant[i])
            }
            for(let x = 0; x < cantero.length; x++){//armo el JSON, que será mostrado al hacer la peticion, partiendo de las posiciones que tiene el objeto strCant
                var objData = {
                    Cantero: cantero[x],
                    Min: par[x],
                    Max: impar[x]
                }
                arrData.push(objData)
            }
            console.log('Cantero:', cantero);
            console.log('Min:', par);
            console.log('Max:', impar);
            res.json(arrData)
        }else{
            console.log(err);
        }        
    })
})

router.get('/huerta/app', (req, res) =>{
    mysqlConnection.query('SELECT * FROM huerta', (err, rows, fields) =>{
        res.json(rows)
    })
})

router.get('/huerta', (req, res) =>{ //muestra todos los datos de la tabla Huerta
    mysqlConnection.query('SELECT * FROM huerta', (err, rows, fields) =>{
        var arrData = []
        if(!err){
            for(let i = 0; i < rows.length; i++){
                var objData = {
                    sensor: rows[i]["id"],
                    humedad: rows[i]["humedad"]
                }
                arrData.push(objData)
            }
            res.json(arrData)
        }else{
            console.log(err);
        }
        
    })
});

router.get('/huerta/:id', (req, res) =>{//muestra un solo registro dependiendo del id que se le dé
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM huerta WHERE id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0])
        } else {
            console.log(err);
        }
    })
})

router.post('/huerta', (req, res) =>{//actualiza la humedad de todos los canteros
    var strId = {cant1 : 1, cant2: 2, cant3: 3, cant4: 4, cant5: 5, cant6: 6, cant7: 7, cant8: 8}
    var ids = []
    var humCant = []
    for(let id in strId){
        ids.push(strId[id])
    }
    for(let humedad in req.body){
        humCant.push(req.body[humedad])
    }
    for(let i = 0; i<ids.length; i++){
        mysqlConnection.query('UPDATE huerta SET humedad = ? WHERE id = ?',[humCant[i], ids[i]], (err, rows, fields) =>{
            if(!err){
                console.log('Humedad: ', humCant[i], 'Cantero: ', ids[i],' - Actualizado')
            }else {
                console.log(err);
            }
        })
    }
    res.json({status: ids + ' - ' + humCant +' - Datos actualizados'})
})

router.post('/huerta/:id', (req, res) =>{//actualiza humedad y regando dependiendo del id del cantero
    console.log(req.body);
    const {regando} = req.body;
    const {humedad} = req.body;
    const {id} = req.params;
    mysqlConnection.query('UPDATE huerta SET humedad = ?, regando = ? WHERE id = ?',[humedad, regando, id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Dato actualizado'})
        }else {
            console.log(err);
        }
    })
})

module.exports = router;