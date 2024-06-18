import type { NextFunction, Request, Response } from "express";
import { IJwtPayload } from "../@types/IJwtPayload";
import { IResponse } from "../@types/IResponse";
import { verifyToken } from "../utils/authMiddleware";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Auth token not provided")
        const decodedToken = await verifyToken<IJwtPayload>(token as string)
        req.user  = decodedToken.payload as IJwtPayload
        next()
    } catch (error: any) {
        return res.status(401).send(new IResponse(error.message, false))
    }

}