const mongoose = require('mongoose');
const uniqueValidtor=require("mongoose-unique-validator");
const Schema = mongoose.Schema;



const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    todos:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Todo"
    }]
});

userSchema.plugin(uniqueValidtor);

module.exports=mongoose.model("User",userSchema);