const express = require("express");
const router = express.Router();
const Posts = require ('../Model/Posts')

// Create Post
router.post('/', async (req,res)=>{
    const {user,text,name,lastname} = req.body
try {
    const newPost = new Posts({user,text,name,lastname})
    const response = await newPost.save();
    res.send({response,msg:"Post Created"})
} catch (error) {
    console.log(error);
    res.status(400).send('Post Can Not bE Created...')
}
});

//Get All Post
router.get('/',async(req,res)=>{
    try {
        const posts = await Posts.find();
        res.send({posts,msg:"Get All Post ...."});
    } catch (error) {
        res.status(500).send({errors:error});
    }
});

// Get One Post
router.get('/:id', async (req,res)=>{
    try {
        const posts = await Posts.findOne({_id:req.params.id});
        res.send({posts,msg:"Get One Post ....."});
    } catch (error) {
        res.status(500).send({errors:error});
    }
});

//Update Post
router.put('/:id',async (req,res)=>{
    try {
        const updatePost = await Posts.findOneAndUpdate({_id:req.params.id});
        const response = await updatePost.save();
        res.send({response,msg:"Post Update ....."})
    } catch (error) {
        console.log(error);
        res.status(400).send('Can Not Update Post ......');
    }
});

// Delete Post 
router.delete('/:id',async (req,res)=>{
    try {
        const deletePost = await Posts.deleteOne({_id:req.params.id})
        deletePost.deleteCount
        ? res.send({msg:"Post Deleted ......"})
        : res.send({msg:"Post Already Deleted ....."});

    } catch (error) {
        console.log(error);
        res.status(400).send("Can Not Delete Post ......");
    }
});
module.exports = router ;