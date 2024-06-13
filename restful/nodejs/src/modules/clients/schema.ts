import z from 'zod'

export const CreateClientSchema = z.object({
    phone: z.string().min(10, "Please enter a valid phone number"),
    companyName: z.string(),
    representative: z.string(),
    tin: z.string(),
    account: z.string(),
    room: z.string(),
    email: z.string().email(),
    caution: z.number(),
    m2: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    amount: z.number(),
})

export const UpdateClientSchema = z.object({
    phone: z.string().min(10, "Please enter a valid phone").nullish(),
    companyName: z.string().nullish(),
    representative: z.string().nullish(),
    tin: z.string().nullish(),
    account: z.string().nullish(),
    room: z.string().nullish(),
    email: z.string().email().nullish(),
    caution: z.number().nullish(),
    m2: z.number().nullish(),
    startDate: z.date().nullish(),
    endDate: z.date().nullish(),
    amount: z.number().nullish(),
})

