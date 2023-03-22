import mongoose from "mongoose";
const rideRequestSchema = new mongoose.Schema({
  RideID: {
    type: String,
    required: true,
  },
  RequestID: {
    type: String,
    required: true,
  },
  RequestName:{
    type: String,
    required: true
  }
});

const RideRequest = mongoose.model("RIDEREQUEST", rideRequestSchema);

export default RideRequest;
