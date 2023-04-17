const express = require('express')
const mysql = require('mysql')

const DB = require('../db/db')
const router = express.Router()
/* console.log(DB)  */
express().use(express.json())

const conectDB = mysql.createConnection({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    password: DB.DB_PASSWORD,
    database: DB.DB_NAME
})

router.post('/', (req,res) => {
    const {user, password} = req.body
    const values = [user, password]
    const sql = 'SELECT * FROM login WHERE user = ? and password = ?'
    conectDB.query(sql, values,(err,result) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send('user does exist')
            } else {
                res.status(400).send('user does not exist')
            }
        }
    })
})

router.post('/newUser', (req, resp)=>{
    const sql = 'INSERT INTO login SET ? '
    const solicitudObject = {
        user: req.body.user,
        password: req.body.password
    }
    conectDB.query(sql, solicitudObject,  (error, result)=>{
        if (error) throw error
        resp.send('successfully added')  
    })
})

module.exports = router


