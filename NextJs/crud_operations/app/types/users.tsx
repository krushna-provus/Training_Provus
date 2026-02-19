import {z} from "zod";



export const CreateUserSchema = z.object({
    fName : z.string().min(2,"First Name must be minimum of 2 characters."),
    lName : z.string().min(2,"Last Name must be minimum of 2 characters."),
    email : z.email(),
    password : z.string()
})

export const LoginUserSchema = CreateUserSchema.pick({
    email : true,
    password : true
})

export const UserSchema = CreateUserSchema.extend({
    id : z.number(),
    createdAt : z.date()
})

export type LoginUser = z.infer<typeof LoginUserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserSchema>;
