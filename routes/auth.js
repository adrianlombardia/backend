const router =require('express').Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt")

/// Register
router.post("/register", async (req,res) =>{ 
  try{   
    /// Generated Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    }) 
        //// Save user 
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
});

router.post("/login",async (req,res) => {
    try{
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Password Wrong")    
    res.status(200).json(user);
    }catch (err){
       res.status(500).json(err)
    }

})


router.get("/", (req,res) =>{
        User.find({})
        .then(user => {
            if(user.length) return res.status(200).send({user})
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(err => res.status(500).send({err}))
    }
    )

module.exports = router; 