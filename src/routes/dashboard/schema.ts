import { z } from 'zod';

export const editFormSchema = z.object({
	short_id: z.string(),
	passphrase_enabled: z.boolean(),
	passphrase: z.union([z.string(), z.null()]),
	banner_id_enabled: z.boolean(),
	banner_id: z.union([z.string(), z.null()])
});

export type EditFormSchema = typeof editFormSchema;
