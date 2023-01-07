const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/", (req,res) =>{
    Post.find({})
    .then(post => {
        if(post.length) return res.status(200).send({post})
        return res.status(204).send({message: 'NO CONTENT'});
    }).catch(err => res.status(500).send({err}))
}
)
//create a post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})
// update
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Updated!");
        }else{
            res.status(403).json("no puedes modificar este post");
        }
    } catch (error) {
        res.status(500).json(err);
    }
})


//delete

router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Borrado!");
        }else{
            res.status(403).json("no puedes borrar este post");
        }
    } catch (error) {
        res.status(500).json(err);
    }
})


//like or Dislike
router.put("/:id/like", async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId }});
            res.status(200).json("Te gusta este POST")
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId }});
            res.status(200).json("Ya no te gusta este POST")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//get

router.get("/:id", async(req,res) =>{
try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
} catch (err) {
    res.status(500).json(err)
}

})


//get timeline post
router.get("/timeline/all", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        res.json(userPosts.concat(...friendPost));
    }catch(err){
    res.status(500).json(err)
    }
}) 

module.exports = router;