const jwt=require("jsonwebtoken");


const fetchUser=(req,res,next)=>{
    const JWT_SECRET=process.env.RJWT
    // get user from jwt token
    const token=req.header("auth-token");
    if(!token)
    {
        return res.status(401).send({error:"Access denied"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Use valid credentials"});
    }

}


module.exports=fetchUser;