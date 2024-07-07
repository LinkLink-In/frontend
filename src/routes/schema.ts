import { z } from "zod";

export const formSchema = z.object({
    short_id: z.string().min(1, 'Please specify custom link (e.g. «test» — will be https://lnln.dminc.ru/test)'),
    redirect_url: z.string().url('').startsWith("https://"),
    expiration_date: z.string().min(1, 'Please specify the expiration date'),
    redirects_limit: z.string().min(1, 'Please specify the redirects limit'),
    banner_id: z.string()
}).required();

export type FormSchema = typeof formSchema;
