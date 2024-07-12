import { z } from 'zod';

export const formSchema = z.object({
	short_id: z
		.string()
		.min(1, 'Please specify custom link (e.g. «test» — will be https://lnln.dminc.ru/test)'),
	redirect_url: z.string().url('').startsWith('https://'),
	expiration_date_enabled: z.boolean(),
	expiration_date: z.string(),
	redirects_limit_enabled: z.boolean(),
	redirects_limit: z.string(),
	banner_id: z.string()
});

export type FormSchema = typeof formSchema;
