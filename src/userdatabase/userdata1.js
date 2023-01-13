const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// here create scema for each form name
  const users_schema1 = new mongoose.Schema({
    // schema for name input box
    fullname:{
        type:String,
        required:true
    },
    // schema for email input box
    email:{
        type:String,
        required:true,
        unique:true 
    },
    // schema for phone input box
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    // schema for phone input box
    password:{
        type:String,
        required:true
    },
    confirm_password:{
      type:String,
      required:true
    }
  });
  // change password into bcrypt form
  users_schema1.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    this.confirm_password = await bcrypt.hash(this.confirm_password,12);
  });
//   yaha pe mere collection aur kaion sa scema use kar raha hu 
  const users_collection1 = new mongoose.model('user_collection1',users_schema1);
  module.exports = users_collection1;