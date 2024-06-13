import { compare, hash } from "bcrypt"
import { NextFunction, Request, Response } from "express"
import { IResponse } from "../../@types/IResponse"
import { createToken } from "../../utils/jwt"
import prisma from "../../utils/prisma"
import { CreateAdminSchema, LoginSchema } from "./schemas"


export async function createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const rawBody = CreateAdminSchema.parse(req.body)
        if (rawBody.password != rawBody.confirmPassword) throw new Error("Passwords mismatch")
        const hashedPassword = await hash(rawBody.password, 10);

        const newAdmin = await prisma.admin.create({
            data: {
                email: rawBody.email,
                password: hashedPassword,
                names: rawBody.fullNames,
                phone: rawBody.phone
            },
            select: {
                id: true,
                email: true
            }
        })
        const token = createToken({
            id: newAdmin.id,
            email: newAdmin.email
        })
        return res.status(200).send(new IResponse("Admin created successfully", true, { token }))

    } catch (error) {
        next(error)
    }
}


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const rawBody = LoginSchema.parse(req.body)
        const admin = await prisma.admin.findFirst({
            where: {
                OR: [
                    { email: rawBody.identifier },
                    { phone: rawBody.identifier }
                ]
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        if (!admin) throw new Error("Invalid credentials")
        const passwordMatches = await compare(rawBody.password, admin.password)
        if (!passwordMatches) throw new Error("Invalid credentials")

        const token = createToken({
            id: admin.id,
            email: admin.email
        })
        return res.status(200).send(new IResponse("User logged in successfully", true, { token }))
    } catch (error) {
        next(error)
    }
}