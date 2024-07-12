import type { Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { type FormSchema, formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { type BearerResponse, userLogin } from '$lib/api/auth';

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
		const authResponse: BearerResponse = await userLogin(form.data.email, form.data.password);
		if (!authResponse.access_token) {
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
