import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register
export const register = async (req, res) => {
  console.log("Register Controller");
  const { name, email, password } = req.body;
  try {
    //Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //GENERATE JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    //Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

//Login
export const login = async (req, res) => {
  console.log("Login Controller");
  const { email, password } = req.body;

  try {
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User does not exist",
      });
    }

    //Check if password is correct
    const IsMatch = await bcrypt.compare(password, user.password);
    if (!IsMatch) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect Credentials",
      });
    }

    //GENERATE JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).json({
      success: true,
      user,
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};


