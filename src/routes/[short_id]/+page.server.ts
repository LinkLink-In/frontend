import type { PageServerLoad } from "./$types";
import type { LinkRead } from "$lib/api/links";

export const load: PageServerLoad = async ({ params }) => {
    const requested_link = await fetch<LinkRead>(`${import.meta.env.VITE_API_HOST}/links/${params.short_id}`);
    return {
      link_id: requested_link.short_id,
      redirect_url: requested_link.redirect_url
    };
};
