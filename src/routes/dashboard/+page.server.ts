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
import { deleteLink } from '$lib/helpers/deleteLink';
import { invalidate } from '$app/navigation';
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
	createLink: async (event) => {
		return await createLink(event, zod);
	},
	deleteLink: async (event) => {
		return await deleteLink(event, zod);
	},
	editLink: async (event) => {
		const form = await superValidate(event, zod(editFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				action: 'edit',
				url: null
			});
		}

		const token = event.cookies.get('access_token');
		if (!token) redirect(302, '/login');

		let error = false;
		if (form.data.passphrase_enabled) {
			if (!form.data.passphrase) {
				error = true;
				setError(form, 'passphrase', 'Please specify the passphrase');
			} else if (
				!/^[A-Za-z0-9-'"!$%^&*()_+|~=`{}\[\]:\/\\;<>?,.@#№]+$/.test(form.data.passphrase)
			) {
				error = true;
				setError(form, 'passphrase', 'Inappropriate passphrase. Please use another one.');
			}
		}
		if (form.data.banner_id_enabled) {
			if (!form.data.banner_id) {
				error = true;
				setError(form, 'banner_id', 'Please specify the banner id');
			}
		}

		if (error) {
			return fail(400, {
				form,
				action: 'edit',
				url: null
			});
		}

		const editResponse = await client.links
			.updateLink({
				params: { short_id: form.data.short_id },
				headers: { authorization: `Bearer ${token}` },
				body: {
					passphrase: form.data.passphrase_enabled ? form.data.passphrase : null,
					banner_id: form.data.banner_id_enabled ? form.data.banner_id : null
				}
			})
			.then((res) => {
				if (res.status === 200) {
					return res.body;
				}
				if (res.status === 404) {
					return res.body.detail;
				}
				if (res.status === 422) {
					return 'Banner ID is incorrect. Please use another one';
				}
				return null;
			});

		if (typeof editResponse === 'string') {
			return setError(form, 'banner_id', editResponse);
		} else {
			if (!editResponse) {
				setError(form, 'short_id', 'Failed to edit the link. Try again');
				return fail(400, {
					form,
					action: 'edit',
					url: null
				});
			}
			return {
				form,
				action: 'edit',
				url: null
			};
		}
	}
};
