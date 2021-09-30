const mongoose = require("mongoose");
const bcrypt =require("bcryptjs");

const testSchema = mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    correct_answer:{
        type:String,
        requirerd:true,
        unique:true,
    },
    incorrect_answer:[String],
    author:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
    },
    created_date:{
        type:Date,
        default:Date.now,
    }
},
{
    timestamps:true,
});


const Test =mongoose.model("Test", testSchema);
module.exports =Test;

