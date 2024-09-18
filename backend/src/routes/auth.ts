import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isString(),
  ],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

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
      });
    } catch (error) {
      console.log(" error login", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
  }
);

router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token","ewww",{
    maxAge: 0,
    expires : new Date(0),
  });
  res.send()
});

export default router;
