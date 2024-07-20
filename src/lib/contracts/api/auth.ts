import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, ObjAny } from '../index';

const c = initContract();

export const authContract = c.router(
	{
		login: {
			method: 'POST',
			path: '/login',
			query: z.object({
				username: z.string(),
				password: z.string()
			}),
			body: z.any().optional(),
			responses: {
				200: z.object({
					access_token: z.string(),
					token_type: z.string()
				}),
				400: z.object({
					detail: z.union([z.string(), ObjAny])
				}),
				422: ObjAny
			}
		},
		logout: {
			method: 'POST',
			path: '/logout',
			headers: authHeader,
			body: z.any().optional(),
			responses: {
				200: z.string(),
				401: z.string()
			}
		},
		register: {
			method: 'POST',
			path: '/logout',
			body: z.object({
				email: z.string(),
				password: z.string(),
				is_active: z.boolean().optional(),
				is_superuser: z.boolean().optional(),
				is_verified: z.boolean().optional(),
				name: z.string()
			}),
			responses: {
				200: z.object({
					id: z.string(),
					email: z.string(),
					is_active: z.boolean(),
					is_superuser: z.boolean(),
					is_verified: z.boolean(),
					name: z.string()
				}),
				400: z.union([z.string(), ObjAny]),
				422: ObjAny
			}
		}
	},
	{
		pathPrefix: '/auth'
	}
);
