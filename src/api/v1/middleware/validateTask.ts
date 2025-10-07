import { Request, Response, NextFunction} from "express";

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
	console.log(`[Request] ${req.method} ${req.url}`);
  	console.log(`Headers:`, req.headers);
	console.log(`Body:`, req.body);
	next();
};