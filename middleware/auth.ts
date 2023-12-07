import { Response, NextFunction } from "express";
import Request, { IUser } from "../types";
import User from "../models/user";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("No token provided");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { userId, username } = decoded as IUser;
    req.user = { userId, username };

    const user = await User.findById(userId);

    // check if the user exists using the user ID get from the access token
    if (!user) {
      throw new Error();
    }

    next();
  } catch (error) {
    return res.status(401).send("Not authorized to access this route");
  }
};

export default verifyToken;
