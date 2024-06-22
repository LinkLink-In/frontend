import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
};

export const actions = {
    default: async (event: any) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        return {
            form,
        };
    },
};