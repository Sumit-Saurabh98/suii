import { OAuth2Client } from "google-auth-library";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async(req: Request, res:Response, next:NextFunction): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      error: "Access denied! No Token provided",
    });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        throw new Error('Failed to retrieve payload from ticket');
      }

    //add user info to req.user
    req.user = {
        userId: payload["sub"],
        email: payload["email"],
        name: payload["name"],
      };

    //Add User ID to headers for downstream services
    req.headers["x-user-id"] = payload["sub"];

    //optional
    req.headers["x-user-email"] = payload["email"];
    req.headers["x-user-name"] = payload["name"];

    next();
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({
      error: "Invalid Token!",
    });
  }
}

export default authMiddleware;
