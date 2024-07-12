import type { PageServerLoad } from "./$types";
import type { LinkRead } from "$lib/api/links";

export interface RedirectCreate {
    link_id: string;
    ip: string;
    user_agent: string;
    referrer: string;
    browser: string;
    platform: string;
    language: string;
}

export const load: PageServerLoad = async ({ params, getClientAddress, request }) => {
    let requested_link : Response = await fetch(`${import.meta.env.VITE_API_HOST}/links/${params.short_id}`);
    requested_link = await requested_link.json();
    if (!requested_link.short_id) {
        return {
            link_id: params.short_id,
            redirect_url: null,
            detail: requested_link.detail
        }
    }
    return {
      link_id: requested_link.short_id,
      redirect_url: requested_link.redirect_url,
        detail: null
    };
};
