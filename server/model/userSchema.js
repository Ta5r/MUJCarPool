import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";

const userSchema = new mongoose.Schema({
//UID : Student Registration Number OR Employee Registration Number
  UID: {
    type: String,
    required: true,
  },
  //user_type to register type of user being a student, teacher, misc.
  user_type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },

  rating:{
    type: Number,
    required: false,
  },

  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ UID: this.UID }, SECRET_KEY);
    // this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    console.log("userSchema/generateAuthToken : " + token);
    return token;
  } catch (err) {
    {
      console.log(err);
    }
  }
};

const User = mongoose.model("USERR", userSchema);

export default User;
