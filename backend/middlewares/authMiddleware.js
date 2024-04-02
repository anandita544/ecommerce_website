import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
async function requireSignIn(req, res, next) {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
  }
}

//admin access
async function isAdmin(req, res, next) {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      console.log(user._id);
      console.log(user.role);
      return res.status(401).send({
        success: false,
        message: "unAuthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      err,
      message: "error in middleware",
    });
  }
}
export { requireSignIn, isAdmin };
