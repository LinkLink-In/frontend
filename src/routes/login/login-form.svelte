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

<form method="POST" use:enhance>
    <h1>Welcome back!</h1>
    <div>
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} placeholder="username@example.com" bind:value={$formData.email} />

        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input {...attrs} placeholder="••••••••••••" type="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    </div>
    <Form.Button class="w-full">Submit</Form.Button>
    <p>Don't have an account? <a href="/register">Register</a></p>
</form>

<style>
    h1 {
        font-weight: 600;
        font-size: 2rem;
    }
    a {
        text-decoration: underline;
    }
    form {
        width: 22rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
</style>