import type { PageServerLoad } from './$types';
import { client } from '$lib/client';

export const load: PageServerLoad = async ({ params }) => {
	const redirect_link = await client.links
		.getLinkUnauthorized({
			params: { short_id: params.short_id }
		})
		.then((res) => {
			if (res.status === 200) {
				return res.body;
			} else {
				return null;
			}
		});
	if (redirect_link) {
		return {
			link_id: redirect_link.short_id,
			redirect_url: redirect_link.redirect_url,
			detail: null
		};
	} else {
		return {
			link_id: params.short_id,
			redirect_url: null,
			detail: 'Link is expired'
		};
	}
};
