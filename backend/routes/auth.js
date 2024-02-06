import express from "express";
import { login, register } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { verifyToken } from "../middleware/middleware.js";
const router = express.Router();


//ROUTE FOR REGISTER
router.post(
  "/register",
  [
    body("name", "Please enter a valid name").notEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    // Extract validation errors from the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, proceed to register
    try {
      await register(req, res);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);
//ROUTE FOR LOGIN
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await login(req, res);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//Get User  ---> ."/api/auth/getUser"
router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

export default router;
