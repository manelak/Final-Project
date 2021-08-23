const mongoose = require ('mongoose');

const PlumberSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    image:{type:String,required:true},
    experience:{type:String,required:true},
    rating:{type:String,required:true},
    comment:{type:String,},
},
{
    timestamps : true ,
});

module.exports = Plumber = mongoose.model("Plumber",PlumberSchema);