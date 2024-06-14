import type { NextFunction, Request, Response } from "express";
import { IResponse } from "../../@types/IResponse";
import prisma from "../../utils/prisma";
import { CreateClientSchema, UpdateClientSchema } from "./schema";

export async function createClient(req: Request, res: Response, next: NextFunction) {
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
        const rawBody = CreateClientSchema.parse(req.body)
        const client = await prisma.client.create({
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
        const rawBody = UpdateClientSchema.parse(req.body)
        const id = req.params['id'];

        const client = await prisma.client.findUnique({ where: { id } })
        if (!client) throw new Error("Client not found")

        const updatedClient = await prisma.client.update({
            where: { id: client.id },
            data: {
                email: rawBody.email || client.email,
                companyName: rawBody.companyName || client.companyName,
                account: rawBody.account || client.account,
                tin: rawBody.tin || client.tin,
                representative: rawBody.representative || client.representative,
                amount: rawBody.amount || client.amount,
                caution: rawBody.caution || client.caution,
                endDate: rawBody.endDate || client.endDate,
                m2: rawBody.m2 || client.m2,
                phone: rawBody.phone || client.phone,
                startDate: rawBody.startDate || client.startDate

            }

        })
        return res.status(200).send(new IResponse("Client updated successfully", true, { client: updatedClient }))
    } catch (error) {
        next(error)
    }
}




export async function getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];

        const clients = await prisma.client.findMany({ include: { invoices: true } })

        return res.status(200).send(new IResponse("Clients retrieved", true, { clients }))
    } catch (error) {
        next(error)
    }
}

export async function getClientById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];

        const clients = await prisma.client.findUnique({ where: { id }, include: { invoices: true } })

        return res.status(200).send(new IResponse("Client retreived", true, { clients }))
    } catch (error) {
        next(error)
    }
}


export async function deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id'];
        const client = await prisma.client.findUnique({ where: { id } })
        if (!client) throw new Error("Client not found")
        const deletedClient = await prisma.client.delete({ where: { id: client?.id }, include: { invoices: true } })
        return res.status(200).send(new IResponse("Client deleted successfully", true, { deletedClient }))
    } catch (error) {
        next(error)
    }
}

