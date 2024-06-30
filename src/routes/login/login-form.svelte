<script lang="ts">
    import { Field, Control, Label, FieldErrors, Button } from "$lib/components/ui/form";
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
    <Field {form} name="email">
        <Control let:attrs>
            <Label>Email</Label>
            <Input {...attrs} placeholder="username@example.com" bind:value={$formData.email} class="border-2"/>

        </Control>
        <FieldErrors />
    </Field>
    <Field {form} name="password">
        <Control let:attrs>
            <div class="flex justify-between">
                <Label>
                    Password
                </Label>
                <a href="/reset_password" class="text-sm underline">Forgot password?</a>
            </div>
            <Input {...attrs} placeholder="••••••••••••" type="password" bind:value={$formData.password} class="border-2"/>
        </Control>
        <FieldErrors />
    </Field>
    </div>
    <Button class="w-full">Submit</Button>
    <p>
        Don't have an account?
        <a href="/register" class="underline">Register</a>
    </p>
</form>
