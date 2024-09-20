import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });


      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).json({
        userId: user._id,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(" error register", error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

router.get("/me",verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId ).select("-password");
    if(!user){
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
