import type {Actions, ServerLoad} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {superValidate, setError, type SuperValidated, type Infer} from "sveltekit-superforms";
import {type FormSchema, formSchema} from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import {createLink, type LinkCreate, type LinkRead} from "$lib/api/links";
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
            event.cookies.set("banner_id", bannerCreate.id, { path: '/', sameSite: 'strict', httpOnly: false });
        }
        const linkRequest : LinkCreate = {
            "short_id": form.data.short_id,
            "redirect_url": form.data.redirect_url,
            "banner_id": event.cookies.get("banner_id")!,
        }

        if (form.data.expiration_date_enabled) {
            if (!form.data.expiration_date) {
                setError(form, 'expiration_date', 'Please specify the expiration date')
                return fail(400, {
                    form,
                    url: null
                })
            }
            linkRequest.expiration_date = form.data.expiration_date;
        }
        if (form.data.redirects_limit_enabled) {
            if (!form.data.redirects_limit) {
                setError(form, 'redirects_limit', 'Please specify the redirects limit')
                return fail(400, {
                    form,
                    url: null
                })
            }
            linkRequest.redirects_limit = parseInt(form.data.redirects_limit);
        }

        const linkResponse: LinkRead | null = await createLink(linkRequest, token);

        if (!linkResponse) {
            setError(form, 'short_id', 'This link already in use. Please specify other custom link')
            return fail(400, {
                form,
                url: null
            })
        }
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
