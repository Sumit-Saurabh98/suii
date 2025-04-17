import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import helmet from "helmet";
import authMiddleware from "./middleware/auth-middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// proxy options
const proxyOptions = {
    proxyReqPathResolver: (req: Request) => {
      return req.originalUrl.replace(/^\/v1/, "/api");
    },
    proxyErrorHandler: (
      err: any,
      res: Response<any, Record<string, any>>,
      next: NextFunction
    ) => {
      res.status(500).json({
        message: "Internal server error!",
        error: err.message,
      });
    },
  };
app.use(
  "/v1/designs",
  authMiddleware,
  proxy(process.env.DESIGN as string, {
    ...proxyOptions,
  })
);

app.use(
  "/v1/media/upload",
    authMiddleware,
  proxy(process.env.UPLOAD as string, {
    ...proxyOptions,
    parseReqBody: false,
  })
);

app.use(
  "/v1/media",
    authMiddleware,
  proxy(process.env.UPLOAD as string, {
    ...proxyOptions,
    parseReqBody: true,
  })
);

app.use(
  "/v1/subscription",
    authMiddleware,
  proxy(process.env.SUBSCRIPTION as string, {
    ...proxyOptions,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  console.log(`DESIGN Service is running on port ${process.env.DESIGN}`);
  console.log(`UPLOAD Service is running on port ${process.env.UPLOAD}`);
  console.log(
    `SUBSCRIPTION Service is running on port ${process.env.SUBSCRIPTION}`
  );
});
