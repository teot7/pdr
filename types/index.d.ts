import { Request } from "express";

// expand the Request interface
declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        username: string;
      };
    }
  }
}

export interface IUser {
  userId: string;
  username: string;
}

export default Request;
