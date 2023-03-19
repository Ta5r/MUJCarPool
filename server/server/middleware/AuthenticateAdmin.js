import jwt from "jsonwebtoken";
import Admin from "../model/adminSchema.js";

const AuthenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log("ADMIN TOKEN __  :  " + token);
    const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";
    const verifyToken = jwt.verify(token, SECRET_KEY);

    console.log("is");
    console.log(verifyToken.AID);
    console.log(verifyToken);
    console.log("was");
    const rootAdmin = await Admin.findOne({
      AID: verifyToken.AID,
      "tokens.token": token,
    });
    if (!rootAdmin) {
      throw new Error("Admin not found");
    }
    req.token = token;
    req.rootAdmin = rootAdmin;
    next();
  } catch (err) {
    res.status(401).send("UnAuthorized : No Token provided");
    console.log(err);
  }
};
export default AuthenticateAdmin;
