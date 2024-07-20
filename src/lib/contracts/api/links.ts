import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, LinkRead, ObjAny } from '$lib/contracts';

const c = initContract();
export const linksContract = c.router(
	{
		getLink: {
			method: 'GET',
			path: '/:short_id',
			pathParams: z.object({
				short_id: z.string()
			}),
			headers: authHeader,
			responses: {
				200: LinkRead,
				422: ObjAny
			}
		},
		getLinkUnauthorized: {
			method: 'GET',
			path: '/:short_id',
			pathParams: z.object({
				short_id: z.string()
			}),
			responses: {
				200: z.object({
					redirect_url: z.string(),
					redirects_left: z.number()
				}),
				422: ObjAny
			}
		},
		updateLink: {
			method: 'PUT',
			path: '/:short_id',
			pathParams: z.object({
				short_id: z.string()
			}),
			headers: authHeader,
			body: z.object({
				short_id: z.string(),
				redirect_url: z.string(),
				expiration_date: z.string().optional(),
				redirects_limit: z.number().optional(),
				passphrase_hash: z.string().optional(),
				banner_id: z.string(),
				redirects_left: z.number().optional()
			}),
			responses: {
				200: LinkRead,
				422: ObjAny
			}
		},
		createLink: {
			method: 'POST',
			path: '/create',
			body: z.object({
				short_id: z.string(),
				redirect_url: z.string(),
				expiration_date: z.string().optional(),
				redirects_limit: z.number().optional(),
				passphrase_hash: z.string().optional(),
				banner_id: z.string()
			}),
			headers: authHeader,
			responses: {
				200: LinkRead,
				422: ObjAny
			}
		},
		listLinks: {
			method: 'GET',
			path: '/list/all',
			headers: authHeader,
			responses: {
				200: z.array(LinkRead),
				422: ObjAny
			}
		}
	},
	{
		pathPrefix: '/links'
	}
);
