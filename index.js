require('dotenv').config()
const express = require('express')
const app = express()
const pool = require('./config/Config')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.route('/api/Contract').post((req,response)=>{
    console.log(req.body)
    let{ Name, Last_name, ID, TRIP_WAY_ID} = req.body

    pool.query('Insert into Contract (Name, Last_name, ID, TRIP_WAY_ID) Value (?,?,?,?)',
    [Name, Last_name, ID, TRIP_WAY_ID], (err, result) =>{
        console.log(err)
        response.send(result)
    });
});

app.route('/api/Contract/:ID').delete((request, response)=>{
    pool.query('Delete from Contract where ID = ?', [request.params.ID],
    (err,result)=>{
        console.log(err)
        response.send(result)
    })
})

app.route('/api/Contract/:ID').put((request,response)=>{
    let{Last_name} = request.body

    pool.query('Update Contract SET Last_name = ? where ID = ?',
    [Last_name,request.params.ID],(err,result)=>{
        console.log(err)
        response.send(result)
    })
})

app.route('/').get((request, response) =>{
    response.send('Hello World!')
})

app.route('/api/t/:group').get((request, response) =>{
    let group = request.params["group"]
    response.send(`Hello ${group}!`)
})

app.route('/api/HOTELS').get((req, res)=>{
    pool.query('Select * from HOTELS',(err,result,fields)=>{
        if (err) throw err
        res.send(result)
    })
})

app.route('/api/HOTELS/:BAR').get((req, res)=>{
    let BAR = req.params["BAR"]
    pool.query("Select * from HOTELS where Bar = ?", [BAR],
    (err,result,fields) => {
        if(err) throw err
        res.send(result)
    })
    
})

app.listen(8081, () => {
    console.log('Server stated')
})