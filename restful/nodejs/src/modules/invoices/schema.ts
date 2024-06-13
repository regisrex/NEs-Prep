import { Month } from '@prisma/client'
import z from 'zod'

export const CreateInvoiceSchema = z.object({
    month  : z.nativeEnum(Month),
    year   : z.number().min(2023).max(2100),
    isPaid :z.boolean().nullish().default(false),
    dueDate : z.any().default(new Date().toLocaleDateString()),
    clientId : z.string().uuid(),
    sendEmail : z.boolean().default(true)
})

export const UpdatePaymentSchema =  z.object({
    month  : z.nativeEnum(Month ).nullish(),
    year   : z.number().min(2023).max(2100).nullish(),
    dueDate : z.any().nullish(),
    clientId : z.string().uuid().nullish(),
    sendEmail : z.boolean().default(true).nullish()
})