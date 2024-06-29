<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="w-80 flex flex-col gap-2">
    <h1 class="font-semibold text-4xl">Welcome back!</h1>
    <div class="flex flex-col gap-1">
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} placeholder="username@example.com" bind:value={$formData.email} class="border-2"/>

        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label class="flex justify-between">
                Password
                <a href="/reset_password" class="underline">Forgot password?</a>
            </Form.Label>
            <Input {...attrs} placeholder="••••••••••••" type="password" bind:value={$formData.password} class="border-2"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    </div>
    <Form.Button class="w-full">Submit</Form.Button>
    <p>
        Don't have an account?
        <a href="/register" class="underline">Register</a>
    </p>
</form>
