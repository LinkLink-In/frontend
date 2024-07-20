import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const usersContract = c.router(
	{
		me: {
			method: 'GET',
			path: '/me',
			responses: {
				200: z.object({
					id: z.string(),
					email: z.string(),
					is_active: z.boolean(),
					is_superuser: z.boolean(),
					is_verified: z.boolean(),
					name: z.string()
				}),
				401: z.string()
			}
		}
	},
	{
		pathPrefix: '/users'
	}
);
