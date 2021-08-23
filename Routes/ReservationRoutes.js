const express = require('express');
const router = express.Router();
const Reservation = require('../Model/Reservation');
const isAuth = require ('../Middlewares/Passport')

//Create Reservation
router.post('/reservation',isAuth(),async(req,res)=>{
    const {user,adress,time} = req.body
    try {
        const newReservation = new Reservation({user,adress,time});
        const result = await newReservation.save();
        res.send({result,msg:"Reservation Created .... "});
    } catch (error) {
        res.status(400).send({errors:error});
    }
});

//Get Reservation By User id

//Get Reservation By Plumber id

//Delete Reservation
router.delete('/:id',isAuth(),async(req,res)=>{
    try {
        const result = await Reservation.deleteOne({_id:req.params.id});
        result.deleteCount
        ? res.send({msg:"Reservation Deleted ......"})
        : res.send({msg:"Reservation Already Deleted ....."});
    } catch (error) {
        res.status(405).send({errors:error});
    }
}),

//Update Reservation 
router.put('/:_id',isAuth(),async(req,res)=>{
    try {
        const result = await Reservation.updateOne({_id:req.params.id}, { $set :{...req.body}} );
        result.nModified
        ? res.sed({msg:"Reservation Updated .... "}) 
        : res.send({msg:"Reservation Already Updated ..... "});
    } catch (error) {
        res.status(406).send({errors:erro});
    }
});






module.exports = router ; 