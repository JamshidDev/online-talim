const asyncHandler = require("express-async-handler");
const User =require("../models/userModel");
const generateToken =require("../utils/generateToken");


const registrUser =asyncHandler(async (req,res)=> {
    console.log(req.body);
    const {name, tell, pass} =await req.body;

    const userExists = await User.findOne({tell});
    if(userExists){
        res.status(400)
        throw new Error("User already exist...")
    }

    const user = await User.create({name, tell, pass,});
    if(user){
        res.status(201).json({
            _id:user._id,
            tell:user.tell,
            pass:user.pass,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error("Error occured");
    }

})


const authUser =asyncHandler(async (req,res)=> {
    console.log(req.body);
    const {tell, pass} =await req.body;
    console.log(pass);
    console.log(tell);
    const user = await User.findOne({tell});
    if(user && (await user.matchPassword(pass))){
        res.json({
            _id:user._id,
            tell:user.tell,
            pass:user.pass,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(404);
        throw new Error("Invalid tell or pass");
    }
    
   

})
module.exports = {registrUser, authUser};