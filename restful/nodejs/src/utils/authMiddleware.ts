import { sign, verify } from "jsonwebtoken";
import { type IJwtPayload } from "../@types/IJwtPayload";
import { env } from "./env";

export function createToken(payload: IJwtPayload): string {
    const token = sign(payload, env.JWT_SECRET, {
        expiresIn: "1d"
    })

    return token
}


export async function verifyToken<T>(token: string): Promise<{ isValid: boolean, payload: T | null }> {
    try {

        const decodedToken = verify(token, env.JWT_SECRET)
        if (decodedToken) return {
            isValid: true,
            payload: decodedToken as T
        }
        else throw new Error("Invalid token")
    } catch (error) {
        return {
            isValid: false,
            payload: null
        }
    }
}


