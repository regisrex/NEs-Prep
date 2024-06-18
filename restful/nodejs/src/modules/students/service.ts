import type { NextFunction, Request, Response } from "express";
import { IResponse } from "../../@types/IResponse";
import prisma from "../../utils/prisma";
import { CreateStudentSchema, UpdateStudentSchema } from "./schema";

export async function createStudent(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
         required: true,
         content: {
             "application/json": {
                 schema: {
                     $ref: "#/components/schemas/CreateClientDto"
                 }  
             }
         }
     } 
 */
    try {
        const rawBody = CreateStudentSchema.parse(req.body)
        const client = await prisma.student.create({
            data: {
                ...rawBody
            }
        })
        return res.status(200).send(new IResponse("Client created successfully", true, { client }))
    } catch (error) {
        next(error)
    }
}


export async function updateClient(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
         required: true,
         content: {
             "application/json": {
                 schema: {
                     $ref: "#/components/schemas/UpdateClientDto"
                 }  
             }
         }
     } 
 */
    try {
        const { fullNames, currentClass, email, marks, phone } = UpdateStudentSchema.parse(req.body)
        const id = req.params['id'];

        const student = await prisma.student.findUnique({ where: { id } })
        if (!student) throw new Error("Student not found")

        const updatedStudent = await prisma.student.update({
            where: { id: student.id },
            data: {
                email: email || student.email,
                fullNames: fullNames || student.fullNames,
                marks: marks || student.marks,
                phone: phone || student.phone,
                currentClass: currentClass || student.currentClass
            }

        })
        return res.status(200).send(new IResponse("Student updated successfully", true, { client: updatedStudent }))
    } catch (error) {
        next(error)
    }
}




export async function getStudents(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];

        const clients = await prisma.student.findMany()

        return res.status(200).send(new IResponse("Students retrieved", true, { clients }))
    } catch (error) {
        next(error)
    }
}

export async function getStudentbyid(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];

        const clients = await prisma.student.findUnique({ where: { id } })

        return res.status(200).send(new IResponse("Student retreived", true, { clients }))
    } catch (error) {
        next(error)
    }
}


export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];
        const student = await prisma.student.findUnique({ where: { id } })
        if (!student) throw new Error("Student not found")
        const deletedStudent = await prisma.student.delete({ where: { id: student?.id } })
        return res.status(200).send(new IResponse("Student deleted successfully", true, { deletedClient: deletedStudent }))
    } catch (error) {
        next(error)
    }
}

