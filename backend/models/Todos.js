const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
});

const Todo=mongoose.model("todo",TodoSchema);
module.exports=Todo;
