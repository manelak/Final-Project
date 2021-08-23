const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    plumber:{type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    adress:{type:String,required:true},
    time:{type:String,required:true}
},
{
    timestamps:true,
},
);

module.exports = Reservation = mongoose.model('Reservation',ReservationSchema);