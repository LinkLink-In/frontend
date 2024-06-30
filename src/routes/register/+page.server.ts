import {fail, redirect} from "@sveltejs/kit";
import {setError, superValidate} from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import {type UserRead, userRegister} from "$lib/api/auth";

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
        const registerResponse: UserRead = await userRegister(form.data.name, form.data.email, form.data.password);
        if (!registerResponse.ok) {
            switch (registerResponse.detail) {
                case "REGISTER_USER_ALREADY_EXISTS":
                    return setError(form, 'email', 'This email already registered')
                default:
                    setError(form, 'name', '')
                    setError(form, 'email', '')
                    setError(form, 'password', '')
                    return setError(form, 'password_repeat', 'Unknown error')
            }

        }

        redirect(302, '/login');
        return {
            form,
        };
    },
};