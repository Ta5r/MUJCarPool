import mongoose from "mongoose";
const DB =
  "mongodb+srv://new-user_31:NEWuser31@cluster0.9kpl1.mongodb.net/RDSOdb?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
