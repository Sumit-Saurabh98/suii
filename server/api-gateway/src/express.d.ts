import { Request } from "express";
import { IUser } from "./utils/interfaces.ts";

declare global {
	namespace Express {
		interface Request {
			user: IUser
		}
	}
}