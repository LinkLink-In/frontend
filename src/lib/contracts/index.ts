import { initContract } from '@ts-rest/core';
import { authContract } from './api/auth';
import { usersContract } from './api/users';
import { linksContract } from './api/links';
import { bannersContract } from './api/banners';
import { redirectsContract } from './api/redirects';
import { z } from 'zod';

const c = initContract();
export const contract = c.router({
	auth: authContract,
	users: usersContract,
	links: linksContract,
	banners: bannersContract,
	redirects: redirectsContract
});

export const ObjAny = z.object({}).passthrough();
export const authHeader = z.object({
	Authorization: z.string().startsWith('Bearer ')
});

export const LinkCreate = z.object({
	redirect_url: z.string(),
	expiration_date: z.union([z.string(), z.null()]),
	redirects_limit: z.union([z.number(), z.null()]),
	banner_id: z.union([z.string(), z.null()]),
	passphrase: z.union([z.string(), z.null()])
});
export const LinkRead = z.object({
	short_id: z.string(),
	redirect_url: z.union([z.string(), z.null()]),
	expiration_date: z.union([z.string(), z.null()]),
	redirects_limit: z.union([z.number(), z.null()]),
	banner_id: z.union([z.string(), z.null()]),
	redirects_left: z.union([z.number(), z.null()])
});

export const BannerRead = z.object({
	title: z.string(),
	description: z.string(),
	id: z.string(),
	owner_id: z.string()
});

export const RedirectRead = z.object({
	link_id: z.string(),
	ip: z.string(),
	user_agent: z.string(),
	referrer: z.string(),
	browser: z.string(),
	platform: z.string(),
	language: z.string(),
	id: z.string(),
	redirected_at: z.string()
});

export const RedirectCreate = z.object({
	link_id: z.string(),
	ip: z.string(),
	user_agent: z.string(),
	referrer: z.string(),
	browser: z.string(),
	platform: z.string(),
	language: z.string()
});
