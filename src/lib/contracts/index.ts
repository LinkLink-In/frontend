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
export const LinkRead = z.object({
	short_id: z.string(),
	redirect_url: z.string(),
	expiration_date: z.string().optional(),
	redirects_limit: z.number().optional(),
	passphrase_hash: z.string().optional(),
	banner_id: z.string(),
	owner_id: z.string(),
	redirects_left: z.number()
});
