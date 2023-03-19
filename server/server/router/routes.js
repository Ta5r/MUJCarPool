import "dotenv/config";
import express from "express";
const router = express.Router();
import Complaint from "../model/complaintSchema.js";
import Admin from "../model/adminSchema.js";
import User from "../model/userSchema.js";
import authenticate from "../middleware/Authenticate.js";
import authenticateadmin from "../middleware/AuthenticateAdmin.js";

router.get("/", (req, res) => {
  res.send("Welcome to RDSO-IOW COMPLAINT MANAGEMENT SYSTEM");
});

router.get("/master", async (req, res) => {
  try {
    const complaint = await Complaint.find();
    res.json(complaint);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get/admin", async (req, res) => {
  try {
    const allAdmins = await Admin.find();
    res.status(200).json(allAdmins);
  } catch (e) {
    console.log(e);
  }
});

router.post("/get/admin", async (req, res) => {
  try {
    const { AID } = req.body;
    console.log("AID : " + req.body.aid);
    console.log("AID : " + AID);
    const dat = await Admin.findOne({ AID });
    console.log(dat);
    res.status(200).json(dat);
  } catch (error) {
    console.log(error);
  }
});

router.post("/escalate", async (req, res) => {
  try {
    const {
      complaintID,
      asgnTO_ID,
      asgnTO_name,
      asgnTO_contact,
      asgnTO_desig,
    } = req.body;
    console.log("\\");
    console.log(req.body);
    console.log("\\");
    const dat = await Complaint.updateOne(
      { _id: req.body.complaintID },
      {
        $set: {
          master: false,
          asgnTO_ID,
          asgnTO_name,
          asgnTO_contact,
          asgnTO_desig,
        },
      }
    );
    res.json({ dat });
    console.log(dat);
    // res.status(200).json(dat);
  } catch (error) {
    console.error(error);
  }
});
router.post("/report", async (req, res) => {
  try {
    const dat = await Complaint.updateOne(
      { _id: req.body.complaintID },
      {
        $set: {
          master: true,
          feedback: req.body.feedback,
        },
      }
    );
    res.json({ dat });
    console.log(dat);
    // res.status(200).json(dat);
  } catch (error) {
    console.error(error);
  }
});
router.post("/remove", async (req, res) => {
  let removedData = "";
  const { cid } = req.body;
  console.log("removing : " + cid);
  try {
    removedData = await Complaint.findOneAndDelete({
      _id: cid,
    });
    res.status(200).json({ message: "Complaint request removed successfully" });
    console.log(removedData);
  } catch (error) {
    console.error(error);
    console.log(error);
  }
});
// GET method route
router.post("/admin/register", async (req, res) => {
  const {
    AID,
    name,
    email,
    phone,
    password,
    cpassword,
    sector,
    department,
    designation,
  } = req.body;
  try {
    const admin = new Admin({
      AID,
      name,
      email,
      phone,
      password,
      cpassword,
      sector,
      department,
      designation,
    });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/dashboard", authenticateadmin, async (req, res) => {
  console.log("Hello from get / admin / dashboard ");
  console.log(req.rootAdmin);
  res.send(req.rootAdmin);
});

router.post("/admin/login", async (req, res) => {
  // const { email, password } = req.body;
  console.log(req.body);
  const { AID, password } = req.body;
  console.log("AID :" + AID);
  // const email = AID;
  var tokenAdmin;
  try {
    // const admin = await Admin.findOne({ email });
    const admin = await Admin.findOne({ AID });
    console.log(admin);

    if (admin) {
      if (password == admin.password) {
        console.log("Successfullsignin");

        console.log(admin);
        await JSON.stringify(admin);
        var token = await admin.generateAdminAuthToken();
        console.log("Tokenn /routes/ -> " + token);
        console.log(admin);
        res.send({ admin, token });

        res.status(200).send("Success");
      } else {
        console.log("Wrong Password");
        res.status(400).send({ message: "Wrong Password" });
      }
    } else {
      res.status(402).send({ message: "INVALID EMAIL" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/admin/close", async (req, res) => {
  const id = req.body.id;
  console.log("Closing request  ID - " + id);
  const nowTime = new Date();
  console.log(nowTime);
  const result = await Complaint.updateOne(
    { _id: id },
    {
      $set: {
        status: "COMPLETED",
        completedTime: nowTime,
      },
    }
  );
  res.json(result);
}); //close admin req
router.post("/admin/requests/", async (req, res) => {
  const AID = req.body.AID;
  var complaintsPending = "";
  console.log("AID = " + AID);
  try {
    complaintsPending = await Complaint.find({ asgnTO_ID: AID });
    complaintsPending.map((reqs) => {
      console.log(reqs);
    });
  } catch (err) {
    console.log(err);
  }
  res.json(complaintsPending);
});
// POST method route
router.post("/user/register", async (req, res) => {
  const {
    EID,
    name,
    email,
    designation,
    phone,
    sector,
    block,
    qrtr,
    password,
    cpassword,
  } = req.body;

  try {
    const user = new User({
      EID,
      name,
      email,
      designation,
      phone,
      sector,
      block,
      qrtr,
      password,
      cpassword,
    });

    await user.save();

    res.send("USER registered successfully");
  } catch (error) {
    console.log(error);
  }
});
router.post("/user/login", async (req, res) => {
  console.log(req.body);
  const { EID, password } = req.body;
  console.log("EID : " + EID);
  // const { email, password } = req.body;
  var token;
  try {
    const user = await User.findOne({ EID });
    // const user = await User.findOne({ email });
    if (user) {
      if (password == user.password) {
        console.log("Successfullsignin");
        console.log(user);
        await JSON.stringify(user);
        token = await user.generateAuthToken();
        console.log("Tokenn /routes/ -> " + token);
        console.log(user);
        res.send({ user, token });
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

router.get("/user/dashboard", authenticate, function (req, res) {
  console.log("Hello from GET / user / dashboard");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

router.get("/user/dashboard/requestform", authenticate, function (req, res) {
  console.log("Hello from GET / user / serviceform");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

function findMinReq(tasks) {
  console.log("Find Min Funciton starts ");
  console.log(tasks);
  const min = Math.min(...tasks);
  console.log("minimum occupied admin is on " + min + " tasks");
  const index = tasks.indexOf(min);
  console.log(index);
  console.log("Find Min Funciton ends ");
  return index;
}

router.get("/user/show/:EID", async (req, res) => {
  const EID = req.params.EID;
  try {
    const complaints = await Complaint.find({ EID });
    console.log(complaints);
    res.send(JSON.stringify(complaints));
  } catch (error) {
    console.log("Error Occured");
    console.log(err);
  }
});
router.post("/admin/remove", async (req, res) => {
  console.log("TO RMEOVE : " + req.body._id);
  const result = await Complaint.updateOne(
    { _id: req.body._id },
    {
      $set: {
        adminRemoved: true,
      },
    }
  );
  res.json({ result });
});

router.post("/masterfilter", async (req, res) => {
  var sectArray = [];
  var deptArray = [];
  var statArray = [];
  const f_a = req.body.sect.a.checked;
  const f_b = req.body.sect.b.checked;
  const f_c = req.body.sect.c.checked;
  const f_civl = req.body.dept.civl.checked;
  const f_elct = req.body.dept.elct.checked;
  const f_tlcm = req.body.dept.tlcm.checked;
  const f_intr = req.body.dept.intr.checked;
  const f_comp = req.body.status.completed.checked;
  const f_pend = req.body.status.pending.checked;
  if (f_a === true) {
    sectArray.push("A");
  }
  if (f_b === true) {
    sectArray.push("B");
  }
  if (f_c === true) {
    sectArray.push("C");
  }
  if (f_civl === true) {
    deptArray.push("CIVIL");
  }
  if (f_elct === true) {
    deptArray.push("ELECTRICAL");
  }
  if (f_tlcm === true) {
    deptArray.push("TELECOM");
  }
  if (f_intr === true) {
    deptArray.push("INTERNET");
  }
  if (f_comp === true) {
    statArray.push("COMPLETED");
  }
  if (f_pend === true) {
    statArray.push("PENDING");
  }
  if (sectArray.length === 0) {
    sectArray = ["A", "B", "C"];
  }
  if (deptArray.length === 0) {
    deptArray = ["CIVIL", "ELECTRICAL", "TELECOM", "INTERNET"];
  }
  if (statArray.length === 0) {
    statArray = ["COMPLETED", "PENDING"];
  }
  console.log("Filters Recieved : ");
  console.log(sectArray);
  console.log(deptArray);
  console.log(statArray);
  console.log("END");
  const result = await Complaint.find({
    $and: [
      { sector: { $in: sectArray } },
      { category: { $in: deptArray } },
      { status: { $in: statArray } },
    ],
  });
  console.log(result);
  res.status(200).json(result);
});

router.post("/masterfilterAdmin", async (req, res) => {
  var sectArray = [];
  var deptArray = [];
  var posArray = [];
  const f_a = req.body.sect.a.checked;
  const f_b = req.body.sect.b.checked;
  const f_c = req.body.sect.c.checked;
  const f_civl = req.body.dept.civl.checked;
  const f_elct = req.body.dept.elct.checked;
  const f_tlcm = req.body.dept.tlcm.checked;
  const f_intr = req.body.dept.intr.checked;
  const f_je = req.body.pos.je.checked;
  const f_sse = req.body.pos.sse.checked;
  if (f_a === true) {
    sectArray.push("A");
  }
  if (f_b === true) {
    sectArray.push("B");
  }
  if (f_c === true) {
    sectArray.push("C");
  }
  if (f_civl === true) {
    deptArray.push("CIVIL");
  }
  if (f_elct === true) {
    deptArray.push("ELECTRICAL");
  }
  if (f_tlcm === true) {
    deptArray.push("TELECOM");
  }
  if (f_intr === true) {
    deptArray.push("INTERNET");
  }
  if (f_je === true) {
    posArray.push("JE");
  }
  if (f_sse === true) {
    posArray.push("SSE");
  }
  if (sectArray.length === 0) {
    sectArray = ["A", "B", "C"];
  }
  if (deptArray.length === 0) {
    deptArray = ["CIVIL", "ELECTRICAL", "TELECOM", "INTERNET"];
  }
  if (posArray.length === 0) {
    posArray = ["JE", "SSE"];
  }
  console.log(sectArray);
  console.log(deptArray);
  const result = await Admin.find({
    $and: [
      { sector: { $in: sectArray } },
      { department: { $in: deptArray } },
      { designation: { $in: posArray } },
    ],
  });
  console.log(result);
  res.status(200).json(result);
});

router.post("/user/dashboard/request", async (req, res) => {
  const {
    EID,
    name,
    designation,
    phone,
    sector,
    block,
    qrtr,
    category,
    subcategory,
    description,
    Post,
  } = req.body;

  console.log(EID);
  console.log(name);
  console.log(designation);
  console.log(phone);
  console.log(sector);
  console.log(block);
  console.log(qrtr);
  console.log(category);
  console.log(subcategory);
  console.log(description);
  console.log("Post " + Post);

  const timestamp = Date();
  const status = "PENDING";
  var asgnTO_ID = "";
  var asgnTO_name = "";
  var asgnTO_desig = "";
  var asgnTO_contact = "";
  const feedback = "";
  const completedTime = "";

  console.log("post to assign task : " + Post);

  try {
    const admin = await Admin.find({
      $and: [{ sector }, { department: category }, { designation: Post }],
    });
    console.log("quereid");
    console.log(admin);
    console.log("quereid");
    var tasks = [];
    for (var i = 0; i < admin.length; i++) {
      console.log("admin[i].id" + admin[i].id);
      try {
        const complaint_for_adminID = await Complaint.find({
          asgnTO_ID: admin[i].AID,
        });

        tasks[i] = complaint_for_adminID.length;
        console.log("tasks[i]" + tasks[i]);
      } catch (err) {
        console.log(err);
      }
    }
    const admin_id_with_min_req = findMinReq(tasks);
    console.log("to assign to id" + admin_id_with_min_req);
    console.log("to assign to AID" + admin[admin_id_with_min_req]);
    console.log("to assign to " + admin[admin_id_with_min_req].name);
    asgnTO_ID = admin[admin_id_with_min_req].AID;
    asgnTO_name = admin[admin_id_with_min_req].name;
    asgnTO_desig = admin[admin_id_with_min_req].designation;
    asgnTO_contact = admin[admin_id_with_min_req].phone;
  } catch (err) {
    console.log(err);
  }

  const adminRemoved = false;
  try {
    if (asgnTO_ID === "") {
      res.status(402).send("Error Occured, plz try again Later.");
    }
    const OTP = generateOTP();
    const complaint = new Complaint({
      EID,
      name,
      designation,
      phone,
      sector,
      block,
      qrtr,
      category,
      subcategory,
      description,
      timestamp,
      status,
      asgnTO_ID,
      asgnTO_name,
      asgnTO_desig,
      asgnTO_contact,
      feedback,
      completedTime,
      adminRemoved,
      master: false,
      OTP,
    });

    await complaint.save();

    res.status(201).json({
      message: "complaint registered successfully",
      asgnTO_name,
      asgnTO_desig,
      asgnTO_contact,
    });
  } catch (err) {
    console.log(err);
  }
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export default router;
