import type { Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import {superValidate, setError} from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { type BearerResponse, userLogin} from "$lib/api/auth";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        const authResponse: BearerResponse = await userLogin(form.data.email, form.data.password);
        if (authResponse.detail === "LOGIN_BAD_CREDENTIALS") {
            setError(form, 'email', '')
            return setError(form, 'password', 'Incorrect login or password');
        }

        event.cookies.set('access_token', authResponse.access_token, { path: '/', sameSite: 'strict' })
        redirect(302, '/');

        return {
            form,
        };
    },
};