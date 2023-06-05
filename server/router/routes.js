import "dotenv/config";
import express from "express";
const router = express.Router();
import User from "../model/userSchema.js";
import Ride from "../model/rideSchema.js";
import RideRequest from "../model/rideRequestSchema.js";
import authenticate from "../middleware/Authenticate.js";

router.get("/", (req, res) => {
  res.send("Welcome to MANIPAL UNIVERSITY JAIPUR's CAR POOL SYSTEM");
});
router.post("/user/register", async (req, res) => {
  const { UID, user_type, fname, lname, email, designation, phone, password } =
    req.body;
  console.log(req.body);
  try {
    const user = new User({
      UID,
      user_type,
      fname,
      lname,
      email,
      designation,
      phone,
      password,
    });
    await user.save();
    console.log(user);
    res.status(201).send("USER registered successfully");
  } catch (error) {
    console.log(error);
  }
});
router.post("/user/login", async (req, res) => {
  console.log(req.body);
  const { UID, password } = req.body;
  console.log("UID : " + UID);
  var token;
  try {
    const user = await User.findOne({ UID });
    if (user) {
      if (password == user.password) {
        console.log("Successfullsignin");
        console.log(user);
        JSON.stringify(user);
        token = await user.generateAuthToken();
        console.log("Tokenn /routes/ -> " + token);
        console.log(user);
        res.status(200).send({ user, token });
      } else {
        console.log("Wrong Password");
        res.status(401).send("Wrong Password");
      }
    } else {
      res.status(401).send("INVALID EMAIL");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/add/ride", async (req, res) => {
  console.log(req.body);
  const { PublisherID, from, to, no_of_pass, doj, price } = req.body;
  try {
    const ride = new Ride({
      PublisherID,
      from,
      to,
      no_of_pass,
      doj,
      price,
    });
    await ride.save();
    console.log(ride);
    res.send("RIDE PUBLISHED successfully");
  } catch (error) {
    console.log(error);
  }
});
router.get("/rides/all", async (req, res) => {
  try {
    const allRides = await Ride.find();
    res.status(200).json(allRides);
  } catch (e) {
    console.log(e);
  }
});

router.get("/ridesto/:TO", async (req, res) => {
  const to = req.params.TO.toUpperCase();
  console.log("GETTING RIDES TO " + to);
  try {
    const availableRides = await Ride.find({ to });
    console.log(availableRides);
    res.send(JSON.stringify(availableRides));
  } catch (error) {
    console.log("Error Occured");
    console.log(err);
  }
});
//fix this ->
router.get("/rides/:FROM/:TO", async (req, res) => {
  const to = req.params.TO.toUpperCase();
  const from = req.params.FROM.toUpperCase();
  console.log("FROM - " + from);
  console.log("TO - " + to);
  console.log("PRICE - " + maxp);
  try {
    const availableRides = await Ride.find({
      $and: [{ from: from }, { to: to }],
    });
    console.log(availableRides);

    res.send(JSON.stringify(availableRides));
  } catch (error) {
    console.log("Error Occured");
    console.log(err);
  }
});

router.get("/rides/:FROM/:TO/:MAXP", async (req, res) => {
  const to = req.params.TO.toUpperCase();
  const from = req.params.FROM.toUpperCase();
  const maxp = req.params.MAXP; //maximum payable price
  console.log("FROM - " + from);
  console.log("TO - " + to);
  console.log("PRICE - " + maxp);
  try {
    const availableRides = await Ride.find({
      $and: [{ from: from }, { to: to }, { price: { $gte: 0, $lte: maxp } }],
    });

    console.log(availableRides);
    res.send(JSON.stringify(availableRides));
  } catch (error) {
    console.log("Error Occured");
    console.log(err);
  }
});
// router.get("/user/show/:UID", async (req, res) => {
//   const UID = req.params.UID;
//   console.log(UID);
//   console.log("->");
//   try {
//     console.log("<-");
//     const my_rides = await Ride.find({ PublisherID: UID });
//     console.log("my_rides");
//     console.log(my_rides);
//     res.status(200).send(my_rides);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/user/dashboard", authenticate, function (req, res) {
  console.log("Hello from GET / user / dashboard");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

router.get("/user/data/:UID", async (req, res) => {
  const UID = req.params.UID;
  try {
    const data = await User.findOne({ UID });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/ride/request/:RideID/:RequestID", async (req, res) => {});
router.delete("/ride/request/remove/:RideID/:RequestID", async (req, res) => {
  const RideID = req.params.RideID;
  const RequestID = req.params.RequestID;

  console.log(RideID);
  console.log(RequestID);

  try {
    const data = await RideRequest.findOne({
      $and: [{ RideID }, { RequestID }],
    });
    await data.delete();
    console.log(data);
    console.log("Document Deleted");
    res.status(200).json({ message: "Document deleted" });
  } catch (err) {
    console.log("Error occured in deleting request");
    console.log(err);
    res.status(400).json({ message: "Couldn't delete" });
  }
});
router.get("/ride/request/show/:RideID/", async (req, res) => {
  const RideID = req.params.RideID;

  console.log(RideID);
  try {
    const data = await RideRequest.find({ RideID });
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log();
  }
});

router.post(
  "/ride/request/add/:RideID/:RequestID/:RequestName",
  async (req, res) => {
    const RideID = req.params.RideID;
    const RequestID = req.params.RequestID;
    const RequestName = req.params.RequestName;

    console.log(RideID);
    console.log(RequestID);
    console.log(RequestName);
    try {
      const test_duplicate = await RideRequest.findOne({
        $and: [{ RideID }, { RequestID }],
      });
      if (test_duplicate) {
        console.log("_____________________________________");
        console.log(test_duplicate);
        console.log("_____________________________________");
        res.status(400).json({ message: "ALREADY REQUESTED" });
      } else {
        const new_request = new RideRequest({
          RideID,
          RequestID,
          RequestName,
        });
        await new_request.save();
        res.status(200).json({ message: "RIDE REQUESTED" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;
