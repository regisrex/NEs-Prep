import z from 'zod'

export const CreateStudentSchema = z.object({
    phone: z.string().min(10, "Please enter a valid phone number"),
    fullNames: z.string().min(2),
    currentClass: z.enum(["Y1", "Y2", "Y3"]),
    email: z.string().email(),
    marks: z.number()
})

export const UpdateStudentSchema = z.object({
    phone: z.string().min(10, "Please enter a valid phone number").nullish(),
    fullNames: z.string().min(2).nullish(),
    currentClass: z.enum(["Y1", "Y2", "Y3"]).nullish(),
    email: z.string().email().nullish(),
    marks: z.number().nullish()
})

