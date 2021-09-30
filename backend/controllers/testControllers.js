const Test =require('../models/testModel');
const asyncHandler = require("express-async-handler");

const getTests = asyncHandler(
    async(req,res)=>{
        console.log("get over request");
        const test = await Test.find();
        res.json(test);
    }
);
//  add new test to database
const createTest =asyncHandler(
    async(req,res)=>{
        console.log(req.body.question);
        console.log(req.body.correct_answer);
        console.log(req.body.incorrect_answer);
        const {question, correct_answer, incorrect_answer}=req.body;
        if(!question && !correct_answer && incorrect_answer){
            res.status(400);
            throw new Error("Please Fill all the feilds");
            return
        }
        else{
            console.log(req);
            let test = new Test({author:req.users._id, question:question, correct_answer:correct_answer, incorrect_answer:incorrect_answer});
            const newTest =await test.save();
            res.status(201).json(newTest);
        }
    }
)

// get test bu id

const getTestById = asyncHandler(
    async(req,res)=>{
        let test = await Test.findById(req.params.id);
        if(test){
            res.status(200).json(test);
        }
        else{
            res.status(401).json({message:"Test not found"});
        }
    }
);

// update content of test

const updateTest = asyncHandler(
    async(req,res)=>{
        const {question, correct_answer, incorrect_answer}=req.body;
        let test = await Test.findById(req.params.id);
        if(req.users._id.toString() !== test.author.toString()){
              res.status(401);
              throw new Error("You can't perform this action");
        }

        if(test){
            test.question= question;
            test.correct_answer=correct_answer;
            test.incorrect_answer=incorrect_answer;
            let newTest =await test.save();
            res.status(200).json(test);
        }
        else{
              res.status(404);
              throw new Error("Note not found");
        }

    }
);

// delete test by id

const deleteTest = asyncHandler(
    async(req,res)=>{
         let test = await Test.findById(req.params.id);
        if(req.users._id.toString() !== test.author.toString()){
              res.status(401);
              throw new Error("You can't perform this action");
        }
          if(test){
             await test.remove();
             res.json({message:"test removed"})
        }
        else{
              res.status(404);
              throw new Error("Note not found");
        }
    }
)



module.exports ={getTests,createTest,getTestById, updateTest,deleteTest};