const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String},
    password:{type:String},
    adress:{type:String,required:true},
    phone:{type:String,required:true},
    gender:{type:String,required:true},
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isPlumber:{
        type:Boolean,
        required:true,
        default:false
    },
},
    {
        timestamps: true ,
    }
);

module.exports = User = mongoose.model("User",UserSchema) ; 