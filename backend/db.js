const mongoose=require("mongoose");
const mongooseURI="mongodb://127.0.0.1:27017/todo_backend";

mongoose.set("strictQuery",true);// it prevents from entering data in database which is not defined in the schema

const connectToMongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("Connected to database");
    })
}

module.exports=connectToMongo;