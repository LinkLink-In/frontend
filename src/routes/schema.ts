import { z } from "zod";

export const formSchema = z.object({
    short_id: z.string().min(1),
    redirect_url: z.string().url('').startsWith("https://"),
    expiration_date: z.string().min(1),
    redirects_limit: z.string(),
    banner_id: z.string()
}).required();

export type FormSchema = typeof formSchema;
