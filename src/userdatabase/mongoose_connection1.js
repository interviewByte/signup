const mongoose = require('mongoose');

const users_collection1 = require('./userdata1');


// connectivity from mongodb server and myuserdata is the database name
mongoose.connect('mongodb://127.0.0.1:/myuserdata')
.then(()=>{console.log('mongoose connection successful')})
.catch((err)=>{console.log(err)})