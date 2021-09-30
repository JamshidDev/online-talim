const mongoose = require("mongoose");
const bcrypt =require("bcryptjs");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    tell:{
        type:String,
        requirerd:true,
        unique:true,
    },
    pass:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

      },
},
{
    timestamps:true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.pass);
  };
  
  // will encrypt password everytime its saved
  userSchema.pre("save", async function (next) {
    if (!this.isModified("pass")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
  });

const User =mongoose.model("User", userSchema);
module.exports =User;

