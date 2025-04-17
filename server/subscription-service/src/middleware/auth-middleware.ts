import { NextFunction, Request, Response } from "express";

const authenticatedRequest = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["x-user-id"] as string;
  
    if (!userId) {
      return res.status(401).json({
        error: "Access denied! Please login to continue",
      });
    }
  
    req.user = { userId };
    next();
  };
  
  export default authenticatedRequest;
  