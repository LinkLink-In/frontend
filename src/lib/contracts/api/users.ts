import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader } from '$lib/contracts';

const c = initContract();
export const usersContract = c.router(
	{
		me: {
			method: 'GET',
			path: '/me',
			headers: authHeader,
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
