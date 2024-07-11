import { z } from 'zod'

const userRegistrationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .min(8, 'Password should have atleast 8 alphabets'),
})

const userUpdateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(8)
})

const userSigninSchema = z.object({
    email: z.string().email(),
    password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .min(8, 'Password should have atleast 8 alphabets'),
})

const userDeleteSchema = z.object({
    code: z.string(),
    email: z.string().email()
})

export {
    userRegistrationSchema,
    userSigninSchema,
    userUpdateSchema,
    userDeleteSchema
}
