var express = require('express')
var app = express()
var cors = require('cors')
var dal = require('./dal.js')

// app.use(express.static('front-end'))
app.use(cors({
    origin: 'http://localhost:3000'
}));

const path = require("path");
app.use(express.static(path.join(__dirname,"front-end","build")))

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user)
            res.send(user)
        })
})

//login user
app.get('/account/login/:email/:password', function (req, res) {
    res.send({
        email:  req.params.email,
        password:   req.params.password
    })
})

//all accounts
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs)
            res.send(docs)
    
    })
})

var port = 4000
app.listen(port)
console.log('Running on port: ' + port)