import mongoose from "mongoose";
const confirmPassengersSchema = new mongoose.Schema({
  PublisherID: {
    type: String,
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

const Passenger = mongoose.model("PASSENGER", confirmPassengersSchema);

export default Passenger;
