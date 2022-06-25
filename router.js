var express = require('express')
const session = require('express-session')
const req = require('express/lib/request')
var router = express.Router()
// const bodyParser = require('body-parser')



const credential = {
    email : "shahi@gmail.com",
    password : "123sha"
}

// const urlencodedParser = bodyParser.urlencoded({expanded:false})




router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email
        res.redirect('/route/homepage')
    }else{
         res.render('base',{logout:"Invalid Email or Password"})
        }
})
    

router.get('/homepage',(req,res)=>{
    if(req.session.user){
        res.render('homepage',{user : req.session.user})
    }else{
        res.redirect('/')
        
    }
})

router.get('/logout',(req,res)=>{
    
    req.session.destroy()
    res.redirect('/')
 })
 



module.exports = router