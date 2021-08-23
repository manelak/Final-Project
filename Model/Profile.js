const mongoose = require ('mongoose');

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    adress:{type:String,required:true},
    image:{type:String,required:true},
    isPlumber:{
        type:Boolean,
        required:true,
        default:false,
    },
});

module.exports = Profile = mongoose.model("Profile",ProfileSchema);