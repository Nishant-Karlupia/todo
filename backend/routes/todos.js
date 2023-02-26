const express=require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchuser");
const Todo=require("../models/Todos");
const {body,validationResult}=require("express-validator");


// router 1 : getallTodos @ /todo/api/todo/: login required
router.get("/fetchallTodos",fetchUser,async (req,res)=>{
    try {
        const userId=req.user.id;
        // console.log(userId);
        const allTodos=await Todo.find({user:userId}); 
         res.json({todo:allTodos});

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

// route 2 :  add a todo @ /todo/api/todo/: login required
router.post("/addTodo",fetchUser,[
    body("title","Enter a meaningful title").isLength({min:3}),
    body("description","Enter atleast 5 characters long description").isLength({min:5})
],async(req,res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        const {title,description}=req.body;
        const data=await Todo.create({
            user:req.user.id,
            title:title,
            description:description
        })
        res.json(data);

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

// route 3: delete a todo @ /todo/api/todo/: login required
router.delete("/deleteTodo/:id",fetchUser,async(req,res)=>{
    try {
        let todelete=await Todo.findById(req.params.id);
        // console.log(todelete);
        if(!todelete)
        {
            return res.status(404).send("Todo not found");
        }

        if(req.user.id!=todelete.user.toString())
        {
            return res.status(401).send("Not allowed");
        }

        todelete=await Todo.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has deleted"});

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");        
    }
})

module.exports=router;


