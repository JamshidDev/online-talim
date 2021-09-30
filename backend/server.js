const express = require("express");
var cors = require('cors');
const users = require("./data/users");
const app = express();
const connectDB =require("./config/db");
const userRoutes =require("./routes/userRoutes");
const testRoutes =require("./routes/testRoutes");
const {notFound} =require("./middlewares/errorMiddleware");
const path =require("path");
 require("dotenv").config();
connectDB();
app.use(cors());

app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);

// -----deployment----
__dirname =path.resolve();

console.log();
if(process.env.NODE_ENV ==="production"){
 app.use(express.static(path.join(__dirname,"./E-talim/build")));
 app.get("*", (req,res)=>{
     res.sendFile(path.resolve(__dirname,"E-talim","build","index.html"))
 })
}
else{
    app.get("/",(req,res)=>{
        res.send("This is development");
    })
}

console.log();
// middleware function 
// app.use(notFound);
// app.use(errorHandler);






// find user id
app.get("/api/user/:id",(req,res)=>{
    console.log(req.params.id);
    const user = users.find((users)=>users._id===req.params.id);
    res.send(user);
})

app.post("/api/singup",(req,res)=>{
    console.log(req.body);
    res.send("ok");
})



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server running in ${PORT}`);
})