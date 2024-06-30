import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email('This email is invalid'),
    password: z.string()
});

export type FormSchema = typeof formSchema;