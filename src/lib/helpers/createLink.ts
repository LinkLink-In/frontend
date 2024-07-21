import type { RequestEvent } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from '../../routes/schema';
import { fail, redirect } from '@sveltejs/kit';
import { client } from '$lib/client';
import crypto from 'crypto';

export async function createLink(event: RequestEvent, zod: any) {
	const form = await superValidate(event, zod(formSchema));
	if (!form.valid) {
		return fail(400, {
			form,
			url: null
		});
	}

	const token = event.cookies.get('access_token');
	if (!token) redirect(302, '/login');

	const banner = event.cookies.get('banner_id');
	if (!banner) {
		const bannerCreate = await client.banners
			.createBanner({
				body: {
					title: `${crypto.randomUUID().toString()}`,
					description: `${crypto.randomUUID().toString()}`
				},
				headers: { authorization: `Bearer ${token}` }
			})
			.then((res) => {
				if (res.status === 200) return res.body;
				else return null;
			});
		if (!bannerCreate) {
			return fail(400, {
				form,
				url: null
			});
		}
		event.cookies.set('banner_id', bannerCreate.id, {
			path: '/',
			sameSite: 'strict',
			httpOnly: false
		});
	}
	let error = false;
	if (form.data.short_id_enabled) {
		if (!form.data.short_id) {
			setError(form, 'short_id', 'Please specify the short_id');
		}
		if (!RegExp('^[A-Za-z0-9]+$').test(form.data.short_id)) {
			setError(form, 'short_id', 'Inappropriate short link. Please use another one.');
		}
	}
	if (form.data.expiration_date_enabled) {
		if (!form.data.expiration_date) {
			setError(form, 'expiration_date', 'Please specify the expiration date');
		}
	}
	if (form.data.redirects_limit_enabled) {
		if (!form.data.redirects_limit) {
			setError(form, 'redirects_limit', 'Please specify the redirects limit');
		} else if (parseInt(form.data.redirects_limit) <= 0) {
			setError(form, 'redirects_limit', 'Redirects limit must be a positive number');
		}
	}
	if (error) {
		return fail(400, {
			form,
			url: null
		});
	}

	const linkResponse = await client.links
		.createLink({
			body: {
				redirect_url: form.data.redirect_url,
				short_id: form.data.short_id_enabled ? form.data.short_id : null,
				expiration_date: form.data.expiration_date_enabled ? form.data.expiration_date : null,
				redirects_limit: form.data.redirects_limit_enabled
					? parseInt(form.data.redirects_limit)
					: null,
				banner_id: null,
				passphrase: null //form.data.passphrase ? form.data.passphrase : null
			},
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (res.status === 200) return res.body;
			if (res.status === 400) return res.body.detail;
			if (res.status === 401) redirect(302, '/login');
			else {
				console.log(res);
				return null;
			}
		});

	if (typeof linkResponse === 'string') {
		setError(form, 'short_id', linkResponse);
		return fail(400, {
			form,
			url: null
		});
	} else {
		if (!linkResponse) {
			setError(
				form,
				'redirect_url',
				'Unknown error occurred while trying to create a link. Please, try again'
			);
			return fail(400, {
				form,
				url: null
			});
		}

		if (!linkResponse.short_id) {
			setError(form, 'redirect_url', 'Failed to create the link. Try again');
			return fail(400, {
				form,
				url: null
			});
		}

		return {
			form,
			url: linkResponse.short_id
		};
	}
}
