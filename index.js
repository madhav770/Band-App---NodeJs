const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const path = require('path')


const app = express()

app.use(express.static('public'))

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

app.use('/api',require('./api'))

app.listen(1234,()=>{
    console.log('Server started at 1234...')
})

