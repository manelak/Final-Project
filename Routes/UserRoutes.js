const express = require ('express');
const User = require('../Model/User');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const {registerRules,validator} = require ('../Middlewares/Validator');
const isAuth = require ('../Middlewares/Passport');
const router = express.Router();

// Register User
router.post('/register',registerRules(),validator, async(req,res)=>{
    const {firstname,lastname,email,password,phone,adress,gender,isAdmin,isPlumber} = req.body
    try {
        const searchUser = await User.findOne({email});
        if(searchUser){return res.status(400).send({msg:"User Already Exist..."})}
        const newUser = new User({firstname,lastname,email,password,phone,adress,gender,isAdmin,isPlumber});
        const hashedpassword = await bcrypt.hash(password,10);
        newUser.password = hashedpassword
        const result = await newUser.save();
        res.send({ result , msg:"User Added" });
    } catch (error) {
        res.status(500).send({errors:error});
    }
});

//Login User 
router.post('/loginuser', async(req,res)=>{
    const {email,password} = req.body
    try {
        const existUser = await User.findOne({email});
        if(!existUser){return res.status(404).send({msg:"Bad Credential . . . ."})};
        const isMatch = await bcrypt.compare(password,existUser.password);
        if(!isMatch){return res.status(404).send({msg:"Bad Credential .... "})};
        const payload = {
            id:existUser._id,
            name:existUser.name,
            email:existUser.email
        };
        jwt.sign(payload,process.env.privateKey, function(err,token){
            console.log(err);
            if(err) throw err ;
            res.send({token:`Bearer ${token}`,User:{
                id:existUser._id,
                name:existUser.name,
                email:existUser.email
            }});
        });
    } catch (error) {
        res.status(500).send({errors:error});
    }
});

//Login Plumber 
router.post('/loginPlumber', async(req,res)=>{
    const {email,password} = req.body
    try {
        const existPlumber = await User.findOne({email});
        if(!existPlumber){return res.status(404).send({msg:"Bad Credential . . . ."})};
        const isMatch = await bcrypt.compare(password,existPlumber.password);
        if(!isMatch){return res.status(404).send({msg:"Bad Credential .... "})};
        const payload = {
            id:existPlumber._id,
            name:existPlumber.name,
            email:existPlumber.email
        };
        jwt.sign(payload,process.env.privateKey, function(err,token){
            if(err) throw err ;
            res.send({token:`Bearer ${token}`,User:{
                id:existPlumber._id,
                name:existPlumber.name,
                email:existPlumber.email
            }});
        });
    } catch (error) {
        res.status(500).send({errors:error});
    }
});

// Get Current User

router.get("/current",isAuth(),async(req,res)=>{
    console.log(req.user);
    try {
        res.send({user:req.user})
    } catch (error) {
        res.status(500).send({errors:error})
    }
});

//Get All User
router.get('/alluser',async(req,res)=>{
    try {
        const user = await User.find();
        res.send({user,msg:"Get All User ...."});
    } catch (error) {
        res.status(402).send("Can Not Get All User ....");
    }
}),

//Get One User
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id});
        res.send({user,msg:"Get One User .... "});
    } catch (error) {
        res.status(403).send({errors:error});
    }
}),

//Delete User
router.delete('/:id',async(req,res)=>{
    try {
        const user = await User.deleteOne({_id:req.params.id});
        user.deleteCount
        ? res.send({msg:"User Deleted ......"})
        : res.send({msg:"User Already Deleted ....."});
    } catch (error) {
        res.status(405).send({errors:error});
    }
}),

//Update User
router.put('/:_id',async(req,res)=>{
    try {
        const user = await User.updateOne({_id:req.params.id}, { $set :{...req.body}} );
        user.nModified
        ? res.sed({msg:"User Updated .... "}) 
        : res.send({msg:"User Already Updated ..... "});
    } catch (error) {
        res.status(406).send({errors:erro});
    }
});



module.exports = router ; 