import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { authHeader, BannerRead, ObjAny } from '$lib/contracts';

const c = initContract();
export const bannersContract = c.router(
	{
		getBanner: {
			method: 'GET',
			path: '/:banner_id',
			pathParams: z.object({
				banner_id: z.string()
			}),
			headers: authHeader,
			responses: {
				200: BannerRead,
				422: ObjAny
			}
		},
		updateBanner: {
			method: 'POST',
			path: '/:banner_id',
			pathParams: z.object({
				banner_id: z.string()
			}),
			headers: authHeader,
			body: z.object({
				title: z.string(),
				description: z.string()
			}),
			responses: {
				200: BannerRead,
				422: ObjAny
			}
		},
		createBanner: {
			method: 'POST',
			path: '/create',
			headers: authHeader,
			body: z.object({
				title: z.string(),
				description: z.string()
			}),
			responses: {
				200: BannerRead,
				422: ObjAny
			}
		},
		listBanners: {
			method: 'GET',
			path: '/list/',
			headers: authHeader,
			responses: {
				200: z.array(BannerRead),
				422: ObjAny
			}
		}
	},
	{
		pathPrefix: '/banners'
	}
);
