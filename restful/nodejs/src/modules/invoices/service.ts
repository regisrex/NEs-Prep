import { Month } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IResponse } from "../../@types/IResponse";
import { createPaymentApprovalHtml, createPaymentReqHtml, transporter } from "../../utils/email/email";
import { env } from "../../utils/env";
import prisma from "../../utils/prisma";
import { CreateInvoiceSchema, UpdatePaymentSchema } from "./schema";

export async function createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const rawBody = CreateInvoiceSchema.parse(req.body)
        const client = await prisma.client.findUnique({ where: { id: rawBody.clientId } })
        const invoice = await prisma.invoice.create({
            data: {
                month: rawBody.month as Month,
                year: rawBody.year || new Date().getFullYear(),
                client: {
                    connect: {
                        id: rawBody.clientId
                    }
                },
                isPaid: rawBody.isPaid || false,
                dueDate: rawBody.dueDate,
            },
            include: {
                client: true
            }
        })
        if (rawBody.sendEmail) {
            if (!rawBody.isPaid) {
                // send email
                transporter.sendMail({
                    from: `TCB | KABANDA Dieudonne  <${env.SMTP_USERNAME}>`,
                    priority: 'high',
                    subject: 'Rent Payment Request',
                    to: invoice.client.email,
                    html: await createPaymentReqHtml("BK Cheque", invoice.client.representative, invoice.client.caution.toLocaleString() + " Frw", invoice.dueDate, "KABANDA Dieudonne", invoice.client.account)
                }).then(() => {
                    console.log("Sent the email")
                })
            } else {
                transporter.sendMail({
                    from: `TCB | KABANDA Dieudonne <${env.SMTP_USERNAME}>`,
                    priority: 'high',
                    subject: 'Rent Payment Approval',
                    to: invoice.client.email,
                    html: await createPaymentApprovalHtml("BK Cheque", invoice.client.representative, invoice.client.caution.toLocaleString() + " Frw", invoice.dueDate, "KABANDA Dieudonne", invoice.client.account)
                }).then(() => {
                    console.log("Sent the email")
                })
            }
        }
        return res.status(200).send(new IResponse("invoice added successfully", true, { invoice }))
    } catch (error) {
        next(error)
    }
}


export async function updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id']
        const rawBody = UpdatePaymentSchema.parse(req.body)
        const invoice = await prisma.invoice.findUnique({
            where: {
                id
            }
        })
        if (!invoice) throw new Error("Invoice not found")
        const updatedInvoice = await prisma.invoice.update({
            where: {
                id: invoice.id
            },
            data: {
                client: {
                    connect: {
                        id: rawBody.clientId || invoice.clientId,
                    }
                },
                month: rawBody.month || invoice.month,
                year: rawBody.year || invoice.year,
                dueDate: rawBody.dueDate
            }
        })
        return res.status(200).send(new IResponse("invoice updated successfully", true, { invoice: updatedInvoice }))

    } catch (error) {
        next(error)
    }
}


export async function setInvoiceAsPaid(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id']
        const invoice = await prisma.invoice.update({
            where: {
                id
            },
            data: {
                isPaid: true
            },
            include: {
                client: true
            }
        })

        transporter.sendMail({
            from: `TCB | KABANDA Dieudonne <${env.SMTP_USERNAME}>`,
            priority: 'high',
            subject: 'Rent Payment Approval',
            to: invoice.client.email,
            html: await createPaymentApprovalHtml("BK Cheque", invoice.client.representative, invoice.client.caution.toLocaleString() + " Frw", invoice.dueDate, "KABANDA Dieudonne", invoice.client.account)
        }).then(() => {
            console.log("Sent the email")
        })

        return res.status(200).send(new IResponse("invoice updated successfully", true, { invoice: invoice }))

    } catch (error) {
        next(error)
    }
}
export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id']
        const invoice = await prisma.invoice.delete({
            where: {
                id
            },
            include: {
                client: true
            }
        })
        if (!invoice) throw new Error("Invoice not found")
        return res.status(200).send(new IResponse("invoice deleted successfully", true, { invoice: invoice }))

    } catch (error) {
        next(error)
    }
}

export async function getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params['id']
        const invoice = await prisma.invoice.findUnique({
            where: {
                id
            },
            include: {
                client: true
            }
        })
        if (!invoice) throw new Error("Invoice not found")
        return res.status(200).send(new IResponse("invoice retieved successfully", true, { invoice: invoice }))

    } catch (error) {
        next(error)
    }
}


export async function getInvoicesByClient(req: Request, res: Response, next: NextFunction) {
    try {
        const clientId = req.params['clientId']
        const invoice = await prisma.invoice.findMany({
            where: {
                clientId
            },
            include: {
                client: true
            }
        })
        if (!invoice) throw new Error("Invoice not found")
        return res.status(200).send(new IResponse("invoice retieved successfully", true, { invoice: invoice }))

    } catch (error) {
        next(error)
    }
}


export async function getAllInvoices(req: Request, res: Response, next: NextFunction) {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                client: true
            }
        })
        return res.status(200).send(new IResponse("invoices retieved successfully", true, { invoice: invoices }))

    } catch (error) {
        next(error)
    }
}


