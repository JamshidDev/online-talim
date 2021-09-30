const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
             useUnifiedTopology: true,
            //  useCreateIndex:true,  
        });
        console.log(`Mongodb connected ${conn}`);
    } catch (error) {
        console.error(`DB error => ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;