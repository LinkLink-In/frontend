import { initContract } from '@ts-rest/core';
import { authContract } from './api/auth';
import { usersContract } from './api/users';
import { linksContract } from './api/links';
import { bannersContract } from './api/banners';
import { redirectsContract } from './api/redirects';

const c = initContract();
export const contract = c.router({
	auth: authContract,
	users: usersContract,
	links: linksContract,
	banners: bannersContract,
	redirects: redirectsContract
});
