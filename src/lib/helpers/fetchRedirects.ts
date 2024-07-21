import { client } from '$lib/client';

export async function fetchRedirects(links: any, token: string) {
	await Promise.all(
		links.map(async (link) => {
			const redirects = await client.redirects
				.listRedirects({
					query: { link_id: link.short_id },
					headers: { authorization: `Bearer ${token}` }
				})
				.then((res) => {
					if (res.status === 200) return res.body;
					return [];
				});
			link.visitors = redirects.length;
		})
	);
	return links;
}
