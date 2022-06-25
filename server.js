const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { v4: uuidv4 } = require("uuid");


const router = require('./router')

const app = express()

const port = process.env.PORT || 2000

app.use(express.json())
// const urlencodedParser = bodyparser.urlencoded({extended:false})
app.use(express.urlencoded({ extended: true }))

app.set('view engine','ejs')

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(cookieParser())
app.use(session({
    secret : uuidv4(),
    cookie : {maxAge:60*1000,secure:false},
    resave : false,
    saveUninitialized : true
}))

app.use('/route',router)
 // home route
app.get('/',(req,res)=>{
        res.render('base',{title: "Login System"})
})
app.listen(port,()=>{console.log(`Listening to the server on http://localhost:${port}`)})    