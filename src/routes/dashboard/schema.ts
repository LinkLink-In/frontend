import { z } from 'zod';

export const editFormSchema = z.object({
	short_id: z.string(),
	passphrase_enabled: z.boolean(),
	passphrase: z.string(),
	banner_id_enabled: z.boolean(),
	banner_id: z.string()
});

export type EditFormSchema = typeof editFormSchema;
