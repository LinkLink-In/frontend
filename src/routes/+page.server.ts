import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { type FormSchema, formSchema } from './schema';
import { createLink } from '$lib/helpers/createLink';
import { zod } from 'sveltekit-superforms/adapters';

export interface LinkData extends SuperValidated<Infer<FormSchema>> {
	url: string | null;
}

export const load: ServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
		url: null
	};
};

export const actions: Actions = {
	default: async (event) => await createLink(event, zod)
};
