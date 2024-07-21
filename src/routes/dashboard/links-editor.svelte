<script lang="ts">
	import { Button, Control, Field, FieldErrors, Label } from '$lib/components/ui/form/';
	import DatePicker from '$lib/components/ui/datepicker/datepicker.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { editFormSchema } from './schema';
	export let data;
	export let chosenLink;
	// let endIconVal;
	// let current_url;
	const form = superForm(data, {
		validators: zodClient(editFormSchema),
		dataType: 'json'
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/editLink" use:enhance class="flex flex-col gap-6">
	<div class="flex flex-col gap-3">
		<Field {form} name="short_id" class="space-y-0">
			<Control let:attrs>
				<Label class="text-[1rem]" for="short_id">Short link</Label>
				<Input
					{...attrs}
					placeholder="anijakich"
					startIcon="link"
					bind:value={$formData.short_id}
					disabled
				></Input>
			</Control>
			<FieldErrors />
		</Field>
		<Field {form} name="redirect_url" class="w-full space-y-0">
			<Control let:attrs class="w-full">
				<Label class="text-[1rem]" for="redirect_url">Redirect URL</Label>
				<Input
					{...attrs}
					placeholder="https://example.com/some-very-long-link..."
					type="url"
					bind:value={$formData.redirect_url}
				/>
			</Control>
			<FieldErrors />
		</Field>
		<div class="flex w-full gap-3">
			<div class="flex w-full flex-col gap-3">
				<Field
					{form}
					name="expiration_date_enabled"
					class="flex w-full items-center gap-3 space-y-0"
				>
					<Control let:attrs>
						<Checkbox {...attrs} id="time-check" bind:checked={$formData.expiration_date_enabled} />
						<Label class="text-[1rem]" for="time-check">Time limit</Label>
					</Control>
				</Field>
				<Field {form} name="expiration_date" class="w-full space-y-0">
					<Control let:attrs>
						<DatePicker
							{...attrs}
							className="w-full"
							disabled={!$formData.expiration_date_enabled}
							bind:dateValue={$formData.expiration_date}
						/>
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="flex w-full flex-col gap-3">
				<Field
					{form}
					name="redirects_limit_enabled"
					class="flex w-full items-center gap-3 space-y-0"
				>
					<Control let:attrs>
						<Checkbox
							{...attrs}
							id="visit-check"
							bind:checked={$formData.redirects_limit_enabled}
						/>
						<Label class="text-[1rem]" for="visit-check">Visit limit</Label>
					</Control>
					<FieldErrors />
				</Field>
				<Field {form} name="redirects_limit" class="w-full space-y-0">
					<Control let:attrs>
						<Input
							{...attrs}
							startIcon="eye"
							type="number"
							disabled={!$formData.redirects_limit_enabled}
							bind:value={$formData.redirects_limit}
						></Input>
					</Control>
					<FieldErrors />
				</Field>
			</div>
		</div>
		<div class="flex w-full flex-col gap-3">
			<Field {form} name="passphrase_enabled" class="flex w-full items-center gap-3 space-y-0">
				<Control let:attrs>
					<Checkbox {...attrs} id="passphrase" bind:checked={$formData.passphrase_enabled} />
					<Label class="text-[1rem]" for="passphrase">Password protection</Label>
				</Control>
				<FieldErrors />
			</Field>
			<Field {form} name="passphrase" class="w-full space-y-0">
				<Control let:attrs>
					<Input
						{...attrs}
						placeholder="•••••••••••••"
						startIcon="lock"
						type="password"
						disabled={!$formData.passphrase_enabled}
						bind:value={$formData.passphrase_hash}
					></Input>
				</Control>
				<FieldErrors />
			</Field>
		</div>
	</div>
	<div class="flex w-full justify-end">
		<Button variant="primary-custom" size="standard">Save and close</Button>
	</div>
</form>
