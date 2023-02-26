const express=require("express");
const router=express.Router();
const User=require("../models/Users");
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
// const JWT_SECRET=process.env.REACT_APP_SECRET_JWT;


// route 1 : create user @ /todo/api/creatUser
router.post("/createUser",[
    body("name","Enter name with min length 3").isLength({min:3}),
    body("email","Enter a valid email address").isEmail(),
    body("password","Password must be atleast 8 characters long").isLength({min:8})
],async(req,res)=>{
    const JWT_SECRET=process.env.RJWT;

    let success=false;

    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({success,errors:errors.array()});
    }
    try{
        // check if user with this email already exists
        let user=await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({success,error:"User with same email already exists"});
        }
        // create new user with hashed password
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(req.body.password,salt);

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
        });

        let data={
            user:{
                id:user.id
            }
        }
        success=true;
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json({success,authToken});

        // res.send("User created successfully");
    }
    catch
    {
        return res.status(500).send("Internal Server Error");
    }
    
})

// route 2 : login user @ /todo/api/login
router.post("/login",[
    body("email","Enter a valid email-address").isEmail(),
    body("password","Password can't be blank").exists()
],async (req,res)=>{
    const JWT_SECRET= process.env.RJWT;
    console.log("key")
    console.log(JWT_SECRET);
    // check for errors
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({success,"error":errors.array()});
    }
    const {email,password}=req.body;

    try {
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(400).json({success,error:"Login with right credentials"});
        }
        const matchPass=await bcrypt.compare(password,user.password);
        if(!matchPass)
        {
            return res.status(400).json({success,error:"Login with right credentials"});
        }

        let data={
            user:{
                id:user.id
            }
        }

        success=true;
        // console.log(JWT_SECRET);
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json({success,authToken});
        
    } catch (error) {
        // console.log(JWT_SECRET);
        return res.status(500).send("Internal Server Error");
    }

})

// route 3 : get user's details @/todo/api/getUser : login required
router.get("/getUser",fetchUser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;
