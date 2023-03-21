import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const Authenticate = async (req, res, next) => {
  try {
    console.log("M/W LOCAL STORAGE : " + req.headers.token);
    const token = req.headers.token;
    console.log("TOKEN __  :  " + token);
    const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";
    const verifyToken = jwt.verify(token, SECRET_KEY);

    console.log("is");
    console.log(verifyToken._id);
    console.log("was");
    const rootUser = await User.findOne({
      UID: verifyToken.UID,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(401).send("UnAuthorized : No Token provided");
    console.log(err);
  }
};
export default Authenticate;
