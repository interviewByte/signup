const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const port = 8080;

const users_collection1 = require('./userdatabase/userdata1')
require("./userdatabase/mongoose_connection1")

const app = express();
const bcrypt = require('bcrypt');
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));
app.use(express.json());

let mainfolder = path.join(__dirname,"../");
// use middleware for static file
app.use(express.static(mainfolder));

// const hashedpassword = async(password)=>{
//     const hashkey = await bcrypt.hash(password,12);
//     return hashkey;
// }

app.get('/',(req,res)=>{
    res.send('home page');
    // console.log(__dirname);
    // console.log(mainfolder);
});
app.get('/register',(req,res)=>{
    res.sendFile(mainfolder+"/register.html");
});
app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+"/login.html");
});
// here we create post method for handel submit the form

app.post("/register",(req,res)=>{
    // console.log(req.body);
    let req_userdata = new users_collection1(req.body);
    // console.log(req_userdata);
    // console.log(req_userdata.password);
    // console.log(req_userdata.confirm_password);
    if(req_userdata.password == req_userdata.confirm_password){
        req_userdata.save();
        res.send('<h1>Registered Successfully</h1>');
    }
    else{
        res.send("Password do not match");
    }
   
});
app.post("/login",async(req,res)=>{
    let usermail = req.body.email;
    let userpassword = req.body.password;
    // console.log(usermail);
    // console.log(userpassword);
    // let mykey_password = await hashedpassword(userpassword);
    // console.log(mykey_password);
    let req_userdata = await users_collection1.findOne({email:usermail});
    if(req_userdata!=null){
    //    res.send('Email.exist!');
    const bcrypt_password_match = await bcrypt.compare(userpassword,req_userdata.password);
    // console.log(bcrypt_password_match);
    if(bcrypt_password_match == true){
        res.send("<h1>Successfully Logged In</h1>");
    }else{
        res.send("<h1>Incorrect Password</h1>");
    }
   
    }else{
        res.send('<h1>Email does not exist</h1>');
    }

});

app.listen(port,()=>{
    console.log(`listing on port ${port}`);
});