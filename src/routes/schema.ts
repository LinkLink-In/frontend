import { z } from "zod";

export const formSchema = z.object({
    short_id: z.string(),
    redirect_url: z.string().url('').startsWith("https://"),
    expiration_date: z.string(),
    redirects_limit: z.number(),
    redirects_left: z.number(),
    passphrase_hash: z.string(),
    banner_id: z.string()
});

export type FormSchema = typeof formSchema;