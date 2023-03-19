// [0]-complaintID  [1]-EmployeeID   [2]-Name,
// [3]-Designation,   [4]-Sector, [5]-Block,
// [6]-Quarter [7]-Date/Time,   [8]-Category,
// [9]-SubCategory,    [10]-Description,
// [11]-STATUS, [12]-ASSIGNEDTO_ID,
// [13]-ASSIGNEDTO-NAME,    [14]-Designation,
// [15]-Contact,   [16]-FeedBack  [17]- Completed TimeStamp
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  EID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
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
  phone: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  asgnTO_ID: {
    type: String,
    required: false,
  },
  asgnTO_name: {
    type: String,
    required: false,
  },
  asgnTO_contact: {
    type: Number,
    required: false,
  },
  asgnTO_desig: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  completedTime: {
    type: String,
    required: false,
  },
  adminRemoved: {
    type: Boolean,
    required: false,
  },
  master: {
    type: Boolean,
    required: false,
  },
  OTP:{
    type: Number,
    required: true,
  }
});

const Complaint = mongoose.model("COMPLAINT", complaintSchema);

export default Complaint;
