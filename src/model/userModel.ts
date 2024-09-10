import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
    select:false
  },
  image:{
    type:String
  },
  googleId: {
    type: String,
  },
  // isVerified:{
  //   type:Boolean,
  //   default:false
  // }
});

export const User = mongoose.models?.User || mongoose.model("User",userSchema)