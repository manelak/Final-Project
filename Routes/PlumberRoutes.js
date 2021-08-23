const express = require ('express');
const router = express.Router();
const Plumber = require ('../Model/Plumber');

//Create Plumber
router.post('/createplumber',async(req,res)=>{
    const {name,address,image,experience,rating,comment} = req.body
    try {
        const newPlumber = new Plumber({name,address,image,experience,rating,comment});
        const plombier = await newPlumber.save();
        res.send({ plombier , msg : " New Plumber Added ..... " });
        console.log(newPlumber);
    } catch (error) {
        res.status(401).send({errors:error});
    }
}),

//Get All Plumber
router.get('/allplumber',async(req,res)=>{
    try {
        const plombier = await Plumber.find();
        res.send({response:plombier,message:"Get All Plumber ...."});
    } catch (error) {
        res.status(402).send("Can Not Get All Plumber ....");
    }
}),

//Get One Plumber
router.get('/:id',async(req,res)=>{
    try {
        const plombier = await plumber.findOne({_id:req.params.id});
        res.send({response:plombier,message:"Get One Plumber .... "});
    } catch (error) {
        res.status(403).send({errors:error});
    }
}),

//Delete Plumber
router.delete('/:id',async(req,res)=>{
    try {
        const plombier = await Plumber.findByIdAndRemove({_id:req.params.id});
        res.send({response:plombier,message:"Plumber is Deleted ..... "});
    } catch (error) {
        res.status(405).send({errors:error});
    }
}),

//Update Plumber
router.put('/:_id',async(req,res)=>{
    try {
        const plombier = await Plumber.updateOne({_id:req.params.id}, { $set :{...req.body}} );
        plombier.nModified
        ? res.sed({message:"Plumber Updated .... "}) 
        : res.send({message:"Plumber Already Updated ..... "});
    } catch (error) {
        res.status(406).send({errors:erro});
    }
});



module.exports = router ;