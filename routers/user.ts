import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("Username and password are required");
    }

    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    if (!regex.test(password)) {
      return res
        .status(400)
        .send(
          "Password must be 8 characters long and contains one uppercase letter, one lowercase letter, one digit, one special character"
        );
    }

    // check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res
        .status(409)
        .send("Username already Exists. Please use another one");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("Username and password are required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, username },
        process.env.JWT_SECRET as string,
        { expiresIn: "30m" }
      );

      return res.status(200).json({ user, token });
    }

    res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
