import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { client } from '$lib/client';

export const load = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	default: async (event: any) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const registerResponse = await client.auth
			.register({
				body: {
					name: form.data.name,
					email: form.data.email,
					password: form.data.password
				}
			})
			.then((res) => {
				if (res.status === 201) {
					return res.body;
				} else if (res.status === 400) {
					return res.body.detail;
				} else {
					console.log(res, res.body);
					return 'Unknown error';
				}
			});

		if (typeof registerResponse === 'string') {
			switch (registerResponse) {
				case 'REGISTER_USER_ALREADY_EXISTS':
					return setError(form, 'email', 'This email already registered');
				default:
					setError(form, 'name', '');
					setError(form, 'email', '');
					setError(form, 'password', '');
					return setError(form, 'password_repeat', 'Unknown error');
			}
		}

		redirect(302, '/login');
		return {
			form
		};
	}
};
