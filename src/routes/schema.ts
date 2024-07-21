import { z } from 'zod';

export const formSchema = z.object({
	redirect_url: z.string().url('').startsWith('https://'),
	short_id_enabled: z.boolean(),
	short_id: z.string(),
	expiration_date_enabled: z.boolean(),
	expiration_date: z.string(),
	redirects_limit_enabled: z.boolean(),
	redirects_limit: z.string()
});

export type FormSchema = typeof formSchema;
