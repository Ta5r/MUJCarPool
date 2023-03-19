import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";

const adminSchema = new mongoose.Schema({
  AID: {
    type: String,
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
  cpassword: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  department: {
    type: String,
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

adminSchema.methods.generateAdminAuthToken = async function () {
  try {
    let token = jwt.sign({ AID: this.AID }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("adminSchema/generateAdminAuthToken : " + token);
    return token;
  } catch (err) {
    {
      console.log(err);
    }
  }
};

const Admin = mongoose.model("ADMIN", adminSchema);

export default Admin;
