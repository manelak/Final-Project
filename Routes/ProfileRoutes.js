const express = require ('express');
const router = express.Router();
const Profile = require ('../Model/Profile');

//Create Profile
router.post('/createprofile',async(req,res)=>{
    try {
        const newProfile = new Profile(req.body);
        const response = await newProfile.save();
        res.send({response,msg:"Profile Created ....... "});
    } catch (error) {
        res.status(400).send({errors:error}) ;
    }
});

//Get All Profile
router.get('/allprofile',async(req,res)=>{
    try {
        const profile = await Profile.find();
        res.send({profile,msg:"Get All Profile ...."});
    } catch (error) {
        res.status(402).send("Can Not Get All Profile ....");
    }
}),

//Get One Profile
router.get('/:id',async(req,res)=>{
    try {
        const profile = await Profile.findOne({_id:req.params.id});
        res.send({profile,msg:"Get One Profile .... "});
    } catch (error) {
        res.staus(403).send({errors:error});
    }
}),

//Delete Plumber
router.delete('/:id',async(req,res)=>{
    try {
        const profile = await Profile.findByIdAndRemove({_id:req.params.id});
        res.send({profile,msg:"Profile is Deleted ..... "});
    } catch (error) {
        res.status(405).send({errors:error});
    }
}),

//Update Profile
router.put('/:_id',async(req,res)=>{
    try {
        const profile = await Profile.updateOne({_id:req.params.id}, { $set :{...req.body}} );
        profile.nModified
        ? res.sed({message:"Profile Updated .... "}) 
        : res.send({message:"Profile Already Updated ..... "});
    } catch (error) {
        res.status(406).send({errors:erro});
    }
});

module.exports = router ;