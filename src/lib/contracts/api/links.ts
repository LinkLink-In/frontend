import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, LinkCreate, LinkRead, ObjAny } from '../types';

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
					short_id: z.string(),
					redirect_url: z.string(),
					banner_id: z.string()
				}),
				422: ObjAny
			}
		},
		updateLink: {
			method: 'PATCH',
			path: '/:short_id',
			pathParams: z.object({
				short_id: z.string()
			}),
			headers: authHeader,
			body: z.object({
				passphrase: z.union([z.string(), z.null()]),
				banner_id: z.union([z.string(), z.null()])
			}),
			responses: {
				200: LinkRead,
				422: ObjAny
			}
		},
		deleteLink: {
			method: 'DELETE',
			path: '/:short_id',
			pathParams: z.object({
				short_id: z.string()
			}),
			body: z.any().optional(),
			headers: authHeader,
			responses: {
				200: z.string(),
				422: ObjAny
			}
		},
		checkPassphrase: {
			method: 'POST',
			path: '/:short_id/check',
			pathParams: z.object({
				short_id: z.string()
			}),
			body: z.object({
				passphrase: z.string()
			}),
			headers: authHeader,
			responses: {
				200: z
					.object({
						short_id: z.string(),
						redirect_url: z.string(),
						banner_id: z.string()
					})
					.passthrough(),
				422: ObjAny
			}
		},
		createLink: {
			method: 'PUT',
			path: '/',
			body: LinkCreate,
			headers: authHeader,
			responses: {
				200: LinkRead,
				400: z.object({
					detail: z.string()
				}),
				422: ObjAny
			}
		},
		listLinks: {
			method: 'GET',
			path: '/',
			headers: authHeader,
			query: z.object({
				offset: z.number().optional(),
				limit: z.number().optional()
			}),
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
