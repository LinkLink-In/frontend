<script lang="ts">
	import { Button, Control, Field, FieldErrors, Label } from '$lib/components/ui/form/';
	import DatePicker from '$lib/components/ui/datepicker/datepicker.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { editFormSchema } from './schema';
	import { parseDate } from '@internationalized/date';
	export let data;
	export let chosenLink;
	import * as Sheet from '$lib/components/ui/sheet';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto, invalidate, invalidateAll } from '$app/navigation';

	const form = superForm(
		{ ...data, banner_id: chosenLink.banner_id, banner_id_enabled: chosenLink.banner_id_enabled },
		{
			validators: zodClient(editFormSchema),
			dataType: 'json',
			onSubmit({ jsonData }) {
				jsonData({
					...$formData,
					short_id: chosenLink.short_id,
					banner_id: $formData.banner_id ? $formData.banner_id : chosenLink.banner_id
				});
			},
			onResult({ result, formElement, cancel }) {
				if (result.status === 200) {
					location.reload();
				}
			}
		}
	);
	const { form: formData, enhance } = form;

	onMount(() => {
		const red = document.getElementById('short_id_input');
		red.value = chosenLink.short_id;
		const el = document.getElementById('banner_id_input');
		const el_check = document.getElementById('banner-check');
		el.value = chosenLink.banner_id;
		if (chosenLink.banner_id) {
			el_check.click();
		}
	});
</script>

<form method="POST" action="?/editLink" use:enhance class="flex flex-col gap-6">
	<div class="flex flex-col gap-3">
		<Field {form} name="redirect_url" class="flex w-full flex-col gap-1.5 space-y-0">
			<Control let:attrs class="w-full">
				<Label class="text-[1rem] opacity-70" for="redirect_url">Redirect URL</Label>
				<Input
					{...attrs}
					id="redirect_url"
					placeholder="https://example.com/some-very-long-link..."
					type="url"
					class="dark:bg-[#1E1F27]"
					value={chosenLink.redirect_url}
					disabled
				/>
			</Control>
			<FieldErrors />
		</Field>
		<div class="flex flex-col gap-3">
			<Field {form} name="short_id_enabled" class="flex items-center gap-3 space-y-0">
				<Control let:attrs>
					<Checkbox {...attrs} id="shortid-check" checked={!!chosenLink.short_id} disabled />
					<Label class="text-[1rem]" for="shortid-check">Custom link</Label>
				</Control>
				<FieldErrors />
			</Field>
			<Field {form} name="short_id" class="flex flex-col gap-1.5 space-y-0">
				<Control let:attrs>
					<Input
						{...attrs}
						placeholder="anijakich"
						startIcon="link"
						id="short_id_input"
						value={chosenLink.short_id}
						class="dark:bg-[#1E1F27]"
						disabled
					></Input>
				</Control>
				<FieldErrors />
			</Field>
		</div>
		<div class="flex w-full gap-3">
			<div class="flex w-1/2 flex-col gap-3">
				<Field {form} name="expiration_date_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox {...attrs} id="time-check" checked={!!chosenLink.expiration_date} disabled />
						<Label class="text-[1rem]" for="time-check">Time limit</Label>
					</Control>
				</Field>
				<Field {form} name="expiration_date" class="w-full space-y-0">
					<Control className="w-full" let:attrs>
						<DatePicker
							{...attrs}
							className="w-full"
							disabled
							placeholder="—"
							value={chosenLink.expiration_date
								? parseDate(chosenLink.expiration_date.split('T')[0])
								: undefined}
						/>
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="flex w-1/2 flex-col gap-3">
				<Field {form} name="redirects_limit_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox
							{...attrs}
							id="visit-check"
							checked={chosenLink.redirects_limit !== null}
							disabled
						/>
						<Label class="text-[1rem]" for="visit-check">Visit limit</Label>
					</Control>
					<FieldErrors />
				</Field>
				<Field {form} name="redirects_limit" class="space-y-0">
					<Control let:attrs>
						<Input
							{...attrs}
							startIcon="eye"
							type="string"
							class="dark:bg-[#1E1F27] dark:text-[#FFFFFF]"
							disabled
							value={chosenLink.redirects_limit !== null ? chosenLink.redirects_limit : 'unlimited'}
						></Input>
					</Control>
					<FieldErrors />
				</Field>
			</div>
		</div>
		<div class="flex flex-col gap-3">
			<Field {form} name="passphrase_enabled" class="flex items-center gap-3 space-y-0">
				<Control let:attrs>
					<Checkbox {...attrs} id="passphrase-check" bind:checked={$formData.passphrase_enabled} />
					<Label class="text-[1rem]" for="passphrase-check">Passphrase</Label>
				</Control>
				<FieldErrors />
			</Field>
			<Field {form} name="passphrase" class="flex flex-col gap-1.5 space-y-0">
				<Control let:attrs>
					<Input
						{...attrs}
						placeholder="Enter new passphrase..."
						startIcon="lock"
						type="password"
						bind:value={$formData.passphrase}
						class="dark:bg-[#1E1F27] dark:text-[#FFFFFF]"
						disabled={!$formData.passphrase_enabled}
					></Input>
				</Control>
				<FieldErrors />
			</Field>
			<Field {form} name="banner_id_enabled" class="flex items-center gap-3 space-y-0">
				<Control let:attrs>
					<Checkbox {...attrs} id="banner-check" bind:checked={$formData.banner_id_enabled} />
					<Label class="text-[1rem]" for="banner-check">Banner</Label>
				</Control>
				<FieldErrors />
			</Field>
			<Field {form} name="banner_id" class="flex flex-col gap-1.5 space-y-0">
				<Control let:attrs>
					<Input
						{...attrs}
						placeholder="Enter banner ID"
						startIcon="rectangle-ad"
						id="banner_id_input"
						bind:value={$formData.banner_id}
						class="dark:bg-[#1E1F27] dark:text-[#FFFFFF]"
						disabled={!$formData.banner_id_enabled}
					></Input>
				</Control>
				<FieldErrors />
			</Field>
		</div>
	</div>
	<div class="flex w-full justify-end">
		<Button type="submit" variant="primary-custom" size="standard">Save and close</Button>
	</div>
</form>
