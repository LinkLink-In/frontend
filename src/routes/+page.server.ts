import type {Actions, ServerLoad} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {superValidate, setError, type SuperValidated, type Infer} from "sveltekit-superforms";
import {type FormSchema, formSchema} from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import {createLink, type LinkRead} from "$lib/api/links";
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
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            setError(form, 'redirect_url', 'unknown err')
            return fail(400, {
                form,
                url: null
            });
        }

        const token = event.cookies.get('access_token');
        if (!token) redirect(401, "/login");
        const linkResponse: LinkRead = await createLink({
            short_id: form.data.short_id,
            redirect_url: form.data.redirect_url,
            expiration_date: form.data.expiration_date,
            redirects_limit: form.data.redirects_limit,
            redirects_left: form.data.redirects_left,
            passphrase_hash: form.data.passphrase_hash,
            banner_id: form.data.banner_id
        }, token);
        console.log(linkResponse);
        if (!linkResponse.owner_id) {
            setError(form, 'redirect_url', '')
            return fail(400, {
                form,
                url: null
            })
        }

        return {
            form,
            url: linkResponse.short_id
        };
    }
};