import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, ObjAny, RedirectCreate, RedirectRead } from '../index';

const c = initContract();
export const redirectsContract = c.router(
	{
		getRedirect: {
			method: 'GET',
			path: '/:redirect_id',
			pathParams: z.object({
				redirect_id: z.string()
			}),
			headers: authHeader,
			responses: {
				200: RedirectRead,
				422: ObjAny
			}
		},
		createRedirect: {
			method: 'PUT',
			path: '/',
			headers: authHeader,
			body: RedirectCreate,
			responses: {
				200: RedirectRead,
				422: ObjAny
			}
		},
		listRedirects: {
			method: 'GET',
			path: '/',
			query: z.object({
				link_id: z.string(),
				offset: z.number().optional(),
				limit: z.number().optional()
			}),
			headers: authHeader,
			responses: {
				200: z.array(RedirectRead),
				422: ObjAny
			}
		}
	},
	{
		pathPrefix: '/redirects'
	}
);
