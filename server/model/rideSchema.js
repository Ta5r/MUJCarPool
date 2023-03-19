import mongoose from "mongoose";
const rideSchema = new mongoose.Schema({
  // RID: {
  //   type: Number,
  //   required: true,
  // },
  PublisherID: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  no_of_pass: {
    type: String,
    required: true,
  },
  doj: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  }
});

const Ride = mongoose.model("RIDE", rideSchema);

export default Ride;
