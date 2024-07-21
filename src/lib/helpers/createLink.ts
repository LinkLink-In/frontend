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

	//const banner = event.cookies.get('banner_id');

	let error = false;
	if (form.data.passphrase_enabled) {
		if (!form.data.passphrase) {
			error = true;
			setError(form, 'passphrase', 'Please specify the passphrase');
		} else if (!/^[A-Za-z0-9-'"!$%^&*()_+|~=`{}\[\]:\/\\;<>?,.@#№]+$/.test(form.data.passphrase)) {
			error = true;
			setError(form, 'passphrase', 'Inappropriate passphrase. Please use another one.');
		}
	}
	if (form.data.short_id_enabled) {
		if (!form.data.short_id) {
			error = true;
			setError(form, 'short_id', 'Please specify the short_id');
		}
		if (!RegExp('^[A-Za-z0-9]+$').test(form.data.short_id)) {
			error = true;
			setError(form, 'short_id', 'Inappropriate short link. Please use another one.');
		}
	}
	if (form.data.expiration_date_enabled) {
		if (!form.data.expiration_date) {
			error = true;
			setError(form, 'expiration_date', 'Please specify the expiration date');
		}
	}
	if (form.data.redirects_limit_enabled) {
		if (!form.data.redirects_limit) {
			error = true;
			setError(form, 'redirects_limit', 'Please specify the redirects limit');
		} else if (parseInt(form.data.redirects_limit) <= 0) {
			error = true;
			setError(form, 'redirects_limit', 'Redirects limit must be a positive number');
		}
	}
	if (form.data.banner_enabled) {
		if (!form.data.banner_title) {
			error = true;
			setError(form, 'banner_title', 'Please specify the banner title');
		} else if (!RegExp('^[A-Za-z0-9 ]+$').test(form.data.banner_title)) {
			error = true;
			setError(form, 'banner_title', 'Inappropriate banner title. Please specify another one');
		}
		if (!form.data.banner_description) {
			error = true;
			setError(form, 'banner_description', 'Please specify the banner description');
		} else if (!RegExp('^[A-Za-z0-9 ]+$').test(form.data.banner_description)) {
			error = true;
			setError(
				form,
				'banner_description',
				'Inappropriate banner description. Please specify another one'
			);
		}
	}
	if (error) {
		return fail(400, {
			form,
			url: null
		});
	}

	let banner_id = null;
	if (form.data.banner_enabled) {
		const bannerCreate = await client.banners
			.createBanner({
				body: {
					title: form.data.banner_title,
					description: form.data.banner_description
				},
				headers: { authorization: `Bearer ${token}` }
			})
			.then((res) => {
				if (res.status === 200) return res.body;
				else return null;
			});
		if (!bannerCreate) {
			return setError(form, 'banner_title', 'Failed to create the banner. Please try again.');
		}
		banner_id = bannerCreate.id;
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
				banner_id: form.data.banner_enabled ? banner_id : null,
				passphrase: form.data.passphrase_enabled ? form.data.passphrase : null
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
