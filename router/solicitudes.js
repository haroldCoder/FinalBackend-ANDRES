const express = require('express')
const router = express.Router()

const mysql = require('mysql')

const DB = require('../db/db')

express().use(express.json())

const conectDB = mysql.createConnection({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    password: DB.DB_PASSWORD,
    database: DB.DB_NAME,
    port: DB.DB_PORT
})

conectDB.connect((err) => {
    if(err) throw err;
    console.log('Conexión exitosa a la base de datos');
});

router.get('/', (req, res)=>{
    const sql = 'SELECT * FROM contactame'
    conectDB.query(sql, (error, result)=>{
        if(error) throw error;
        res.json(result)
    })
})

router.post('/createRequest', (req, res)=>{
    const sql = 'INSERT INTO contactame SET ?'
    const variableObject = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.email

    }
    conectDB.query(sql, variableObject, (error, result)=>{
        if (error) throw error
        res.send('successfully added')
    })
})

router.put('/editRequest/:idcontactame', (req, res)=>{
    const id = req.params.idcontactame
    const {name, lastName, phone, email, message} = req.body
    const sql = `UPDATE contactame SET name = '${name}', lastname = '${lastName}', 
    phone='${phone}', email='${email}', message='${message}' WHERE idcontactame=${id}`
    conectDB.query(sql, error =>{
        if (error) throw error
        res.send(`solicitud con el id${id} fue actualizado`)
    })
} )

router.delete('/delete/:idcontactame', (req, res)=>{
    const id = req.params.idcontactame
    const sql = `DELETE FROM contactame WHERE idcontactame =${id}`
    conectDB.query(sql, error =>{
        if (error) throw error
        res.send(`solicitud con el id ${id} fue eliminado con exito`)
    })
})
module.exports = router
