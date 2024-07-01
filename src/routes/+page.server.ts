import type {Actions, ServerLoad} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {superValidate, setError, type SuperValidated, type Infer} from "sveltekit-superforms";
import {type FormSchema, formSchema} from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import {createLink, type LinkRead} from "$lib/api/links";
import crypto from "crypto";
import {type BannerRead, createBanner} from "$lib/api/banners";
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
            return fail(400, {
                form,
                url: null
            });
        }

        const token = event.cookies.get('access_token');
        if (!token) redirect(302, "/login");

        const banner = event.cookies.get('banner_id');
        if (!banner) {
            const bannerCreate: BannerRead = await createBanner({
                "title": `${crypto.randomUUID().toString()}`,
                "description": `${crypto.randomUUID().toString()}`
            }, token);
            event.cookies.set("banner_id", bannerCreate.id, { path: '/', sameSite: 'strict' });
        }

        const linkResponse: LinkRead = await createLink({
            "short_id": form.data.short_id,
            "redirect_url": form.data.redirect_url,
            "expiration_date": form.data.expiration_date,
            "redirects_limit": parseInt(form.data.redirects_limit),
            "redirects_left": 100,
            "passphrase_hash": "sdfkpfsdfkoskof",
            "banner_id": event.cookies.get("banner_id")!
        }, token);

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