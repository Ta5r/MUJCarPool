import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";

const userSchema = new mongoose.Schema({
  EID: {
    type: Number,
    required: true,
  },
  name: {
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
  sector: {
    type: String,
    required: true,
  },
  block: {
    type: Number,
    required: true,
  },
  qrtr: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ EID: this.EID }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("userSchema/generateAuthToken : " + token);
    return token;
  } catch (err) {
    {
      console.log(err);
    }
  }
};

const User = mongoose.model("USER", userSchema);

export default User;
