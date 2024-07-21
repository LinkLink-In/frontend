import type { Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { type FormSchema, formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { client } from '$lib/client';

export interface LoginData extends SuperValidated<Infer<FormSchema>> {
	authorized: boolean;
}

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
		authorized: false
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				authorized: false
			});
		}
		const authResponse = await client.auth
			.login({
				body: new URLSearchParams({
					grant_type: '',
					username: form.data.email,
					password: form.data.password,
					scope: '',
					client_secret: ''
				}).toString(),
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
			.then((res) => {
				if (res.status === 200) {
					return res.body;
				} else {
					return null;
				}
			});

		if (!authResponse) {
			setError(form, 'email', '');
			return setError(form, 'password', 'Incorrect login or password');
		}

		event.cookies.set('access_token', authResponse.access_token, {
			path: '/',
			sameSite: 'strict',
			httpOnly: false
		});

		return {
			form
		};
	}
};
