import "dotenv/config";
import express from "express";
const router = express.Router();
import User from "../model/userSchema.js";
import Ride from "../model/rideSchema.js";
import authenticate from "../middleware/Authenticate.js";

router.get("/", (req, res) => {
  res.send("Welcome to MANIPAL UNIVERSITY JAIPUR's CAR POOL SYSTEM");
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

router.get("/rides/all", async (req, res) => {
  try {
    const allRides = await Ride.find();
    res.status(200).json(allRides);
  } catch (e) {
    console.log(e);
  }
});

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  const { UID, password } = req.body;
  console.log("EID : " + UID);
  // const { email, password } = req.body;
  var token;
  try {
    const user = await User.findOne({ UID });
    // const user = await User.findOne({ email });
    if (user) {
      if (password == user.password) {
        console.log("Successfullsignin");
        console.log(user);
        await JSON.stringify(user);
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
      price
    });
    await ride.save();
    console.log(ride);
    res.send("RIDE PUBLISHED successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
