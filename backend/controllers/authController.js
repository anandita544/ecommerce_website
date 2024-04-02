import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from "../helpers/helper.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "phone is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "address is required" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please login.",
      });
    }
    // Hash the password
    const hashedPassword = await hashpassword(password);
    // Create a new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save(); // Corrected .save() call
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error); // Corrected parameter name
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "inavlid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "eamil is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        maessage: "inavlid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
const testController = (req, res) => {
  res.json("protected route");
};

export { registerController, loginController, testController };
