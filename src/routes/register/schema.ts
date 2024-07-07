import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(64, 'Name must not contain more than 64 symbols'),
    email: z.string().email('This email is invalid'),
    password: z.string().regex(RegExp(/[-'"!$%^&*()_+|~=`{}\[\]:\/\\;<>?,.@#№]/), 'Password must contain at least 1 special symbol').min(8, 'Password must contain at least 8 symbols').max(64, 'Password must not contain more than 64 symbols'),
    password_repeat: z.string(),
}).superRefine(({ password_repeat, password }, ctx) => {
    if (password_repeat !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords did not match",
            path: ['password_repeat']
        });
    }
});

export type FormSchema = typeof formSchema;