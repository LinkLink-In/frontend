<script lang="ts">
	import { Field, Control, Label, FieldErrors, Button } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<h1>Register</h1>
	<div>
		<Field {form} name="name">
			<Control let:attrs>
				<Label>Username</Label>
				<Input {...attrs} placeholder="Ivan" bind:value={$formData.name} />
			</Control>
			<FieldErrors />
		</Field>
		<Field {form} name="email">
			<Control let:attrs>
				<Label>Email</Label>
				<Input {...attrs} placeholder="username@example.com" bind:value={$formData.email} />
			</Control>
			<FieldErrors />
		</Field>
		<Field {form} name="password">
			<Control let:attrs>
				<Label>Password</Label>
				<Input
					{...attrs}
					placeholder="••••••••••••"
					type="password"
					bind:value={$formData.password}
				/>
			</Control>
			<FieldErrors />
		</Field>
		<Field {form} name="password_repeat">
			<Control let:attrs>
				<Label>Repeat your password</Label>
				<Input
					{...attrs}
					placeholder="••••••••••••"
					type="password"
					bind:value={$formData.password_repeat}
				/>
			</Control>
			<FieldErrors />
		</Field>
	</div>
	<Button class="w-full">Submit</Button>
	<p>Already have an account? <a href="/login">Log in</a></p>
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
