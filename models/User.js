// Models vali file me initial letter capital dete hain yehai preference hai

const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

module.exports= mongoose.model("User",userSchema);