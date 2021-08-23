const mongoose = require ("mongoose");

const PostSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,required: true,ref:"User"},
    text:{type:String,required:true},
    name:{type:String},
    lastname:{type:String},
},
    {
        date: {
            type: Date,
            default: Date.now
        }
    }
);


module.exports = Posts = mongoose.model("Post",PostSchema);