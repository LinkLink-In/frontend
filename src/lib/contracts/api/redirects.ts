import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, ObjAny, RedirectCreate, RedirectRead } from '$lib/contracts';

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
			method: 'POST',
			path: '/create',
			headers: authHeader,
			body: RedirectCreate,
			responses: {
				200: RedirectRead,
				422: ObjAny
			}
		},
		listRedirects: {
			method: 'GET',
			path: '/list/:short_id',
			pathParams: z.object({
				short_id: z.string()
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
