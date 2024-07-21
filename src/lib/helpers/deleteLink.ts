import { redirect, type RequestEvent } from '@sveltejs/kit';
import { client } from '$lib/client';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '../../routes/schema';
import { editFormSchema } from '../../routes/dashboard/schema';
import { fetchRedirects } from '$lib/helpers/fetchRedirects';

export async function deleteLink(event: RequestEvent, zod: any) {
	const token = event.cookies.get('access_token');
	if (!token) redirect(302, '/login');

	const data = await event.request.formData();
	const short_id = data.get('link_id') as string;

	if (!short_id) {
		throw new Error('No short link provided');
	}

	const res = await client.links
		.deleteLink({
			params: { short_id: short_id },
			body: undefined,
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (res.status === 200) return res.body;
			else return undefined;
		});

	if (res === undefined) {
		throw new Error(`Failed to delete the link ${short_id}`);
	}

	const links = await client.links
		.listLinks({ headers: { authorization: `Bearer ${token}` } })
		.then((res) => {
			if (res.status === 200) return res.body;
			if (res.status === 401) redirect(302, '/login');
			return null;
		});
	if (!links) {
		return {
			links: [],
			urlForm: await superValidate(zod(formSchema)),
			editForm: await superValidate(zod(editFormSchema)),
			url: null
		};
	}
	const linksWithRedirects = await fetchRedirects(links, token);
	return {
		links: linksWithRedirects,
		url: null
	};
}
