import z from "zod"

export const CreateAdminSchema = z.object({
    fullNames: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})


export const LoginSchema = z.object({
    identifier: z.string().email().or(z.string()),
    password: z.string().min(8)
})