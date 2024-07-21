import { z } from 'zod';

export const formSchema = z.object({
	redirect_url: z
		.string()
		.url('')
		.regex(
			new RegExp(
				'https?://(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)'
			),
			'This link is invalid, please use another one.'
		),
	short_id_enabled: z.boolean(),
	short_id: z.string(),
	expiration_date_enabled: z.boolean(),
	expiration_date: z.string(),
	redirects_limit_enabled: z.boolean(),
	redirects_limit: z.string(),
	passphrase_enabled: z.boolean(),
	passphrase: z.string(),
	banner_enabled: z.boolean(),
	banner_title: z.string(),
	banner_content: z.string()
});

export type FormSchema = typeof formSchema;
