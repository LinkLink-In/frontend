<script lang="ts">
	import { Button, Control, Field, FieldErrors, Label } from '$lib/components/ui/form/';
	import DatePicker from '$lib/components/ui/datepicker/datepicker.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
	import { Separator } from '$lib/components/ui/separator/index.js';
	export let data;

	let endIconVal;
	let current_url;

	export let isPropsHorizontal = false;
	export let action = undefined;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onSubmit({ jsonData }) {
			jsonData({
				...$formData,
				redirects_limit: $formData!.redirects_limit
			});
		},
		onResult({ result, formElement, cancel }) {
			if (result.status === 200) {
				$formData!.redirect_url = `${import.meta.env.VITE_LINK_HOST}/${result!.data!.url}`;
				current_url = `${import.meta.env.VITE_LINK_HOST}/${result!.data!.url}`;
				cancel();
			}
		}
	});

	async function handleCopy() {
		const type = 'text/plain';
		const blob = new Blob([current_url], { type });
		const data = [new ClipboardItem({ [type]: blob })];
		await navigator.clipboard.write(data);
		endIconVal = 'check';
		setTimeout(() => {
			endIconVal = 'copy';
		}, 1000);
	}

	const { form: formData, enhance } = form;
	$: {
		if ($formData.redirect_url === current_url) {
			endIconVal = 'copy';
		} else {
			endIconVal = '';
		}
	}
</script>

<form
	method="POST"
	action={action ? action : ''}
	use:enhance
	class="flex w-full flex-col gap-3 dark:text-[#FFFFFF]"
>
	<div class="flex gap-4">
		<Field {form} name="redirect_url" class="w-full space-y-0">
			<Control let:attrs class="w-full">
				<Input
					{...attrs}
					placeholder="https://example.com/some-very-long-link..."
					type="url"
					class="dark:bg-[#1E1F27]"
					bind:value={$formData.redirect_url}
					endIconHandler={handleCopy}
					bind:endIcon={endIconVal}
				/>
			</Control>
			<FieldErrors />
		</Field>
		<Button type="">Generate link</Button>
	</div>
	<div
		class={`flex items-center ${isPropsHorizontal ? '' : 'gap-3'} rounded-xl bg-[#FFFFFF] p-3 dark:bg-[#1E1F27]`}
	>
		<div class={`flex h-full w-1/3 gap-3 p-3 ${isPropsHorizontal ? 'flex-row' : 'flex-col'}`}>
			<div class="flex flex-col gap-3">
				<Field {form} name="expiration_date_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox {...attrs} id="time-check" bind:checked={$formData.expiration_date_enabled} />
						<Label class="text-[1rem]" for="time-check">Time limit</Label>
					</Control>
				</Field>
				<Field {form} name="expiration_date" class="space-y-0">
					<Control let:attrs>
						<DatePicker
							{...attrs}
							disabled={!$formData.expiration_date_enabled}
							bind:dateValue={$formData.expiration_date}
							className={isPropsHorizontal ? 'w-[10rem]' : 'w-full'}
							placeholder="Pick a date"
						/>
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="flex flex-col gap-3">
				<Field {form} name="redirects_limit_enabled" class="flex items-center gap-3 space-y-0">
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
				<Field {form} name="redirects_limit" class="space-y-0">
					<Control let:attrs>
						<Input
							{...attrs}
							placeholder="100"
							startIcon="eye"
							type="number"
							min="1"
							class="dark:bg-[#1E1F27]"
							disabled={!$formData.redirects_limit_enabled}
							bind:value={$formData.redirects_limit}
							className={isPropsHorizontal ? 'w-[10rem]' : ''}
						></Input>
					</Control>
					<FieldErrors />
				</Field>
			</div>
		</div>
		<div class={`flex h-full w-1/3 gap-3 p-3 ${isPropsHorizontal ? 'flex-row' : 'flex-col'}`}>
			<div class="flex flex-col gap-3">
				<Field {form} name="short_id_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox {...attrs} id="shortid-check" bind:checked={$formData.short_id_enabled} />
						<Label class="text-[1rem]" for="shortid-check">Custom link</Label>
					</Control>
					<FieldErrors />
				</Field>
				<Field {form} name="short_id" class="space-y-0">
					<Control let:attrs>
						<Input
							{...attrs}
							placeholder="anijakich"
							startIcon="link"
							disabled={!$formData.short_id_enabled}
							class="dark:bg-[#1E1F27]"
							bind:value={$formData.short_id}
						></Input>
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="flex flex-col gap-3">
				<Field {form} name="passphrase_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox
							{...attrs}
							id="passphrase-check"
							bind:checked={$formData.passphrase_enabled}
						/>
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
							class="dark:bg-[#1E1F27]"
							bind:value={$formData.passphrase}
							disabled={!$formData.passphrase_enabled}
						></Input>
					</Control>
					<FieldErrors />
				</Field>
			</div>
		</div>
		<Separator orientation="vertical" />
		<div class={`flex h-full w-1/3 gap-3 p-3 ${isPropsHorizontal ? 'flex-row' : 'flex-col'}`}>
			<div class="flex flex-col gap-3">
				<Field {form} name="short_id_enabled" class="flex items-center gap-3 space-y-0">
					<Control let:attrs>
						<Checkbox {...attrs} id="shortid-check" bind:checked={$formData.banner_enabled} />
						<Label class="text-[1rem]" for="shortid-check">Banner</Label>
					</Control>
					<FieldErrors />
				</Field>
				<div class="flex flex-col gap-3">
					<Field {form} name="short_id" class="space-y-0">
						<Control let:attrs>
							<Input
								{...attrs}
								placeholder="Title for the banner"
								startIcon="rectangle-ad"
								id="banner-title"
								disabled={!$formData.banner_enabled}
								class="dark:bg-[#1E1F27]"
								bind:value={$formData.banner_title}
							></Input>
						</Control>
						<FieldErrors />
					</Field>
					<Field {form} name="passphrase" class="flex flex-col gap-3 space-y-0">
						<Control let:attrs>
							<Input
								{...attrs}
								placeholder="Description for the banner"
								startIcon="window-maximize"
								id="banner-description"
								class="dark:bg-[#1E1F27]"
								bind:value={$formData.banner_content}
								disabled={!$formData.banner_enabled}
							></Input>
						</Control>
						<FieldErrors />
					</Field>
				</div>
			</div>
		</div>
	</div>
</form>
