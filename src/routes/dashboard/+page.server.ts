import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { type FormSchema, formSchema } from '../schema';
import { type EditFormSchema, editFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { client } from '$lib/client';
import crypto from 'crypto';
import { createLink } from '$lib/helpers/createLink';
import { fetchRedirects } from '$lib/helpers/fetchRedirects';
export interface LinkData extends SuperValidated<Infer<FormSchema>> {
	url: string | null;
}

export const load: ServerLoad = async (event) => {
	const token = await event.cookies.get('access_token');
	if (!token) redirect(302, '/login');

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
		urlForm: await superValidate(zod(formSchema)),
		editForm: await superValidate(zod(editFormSchema)),
		url: null,
		chosenLink: { link: {}, action: 'none' }
	};
};

export const actions: Actions = {
	createLink: async (event) => await createLink(event, zod),
	deleteLink: async (event) => {
		const token = event.cookies.get('access_token');
		if (!token) redirect(302, '/login');

		const data = await event.request.formData();
		const short_id = data.get('link_id');

		const res = await deleteLink(short_id, token);
		if (res.status !== 200) {
			console.log('Link failed to be deleted', short_id);
		} else {
			console.log('deleted');
		}

		const links = await getLinks(token);
		if (links === 401) {
			redirect(302, '/login');
		}
		if (links === 404) {
			return {
				links: [],
				url: null
			};
		}
		let linksWithVisits = await getRedirectsOfLinks(links, token);

		return {
			links: linksWithVisits,
			url: null
		};
	}
};
