<script lang="ts">
	import UrlForm from '../url-form.svelte';
	import Table from './links-table.svelte';
	export let data;
	export let action;
	let isLoading = false;

	import * as Sheet from '$lib/components/ui/sheet';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Control, Field, FieldErrors, Label } from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import DatePicker from '$lib/components/ui/datepicker/datepicker.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import LinkEditor from './links-editor.svelte';
</script>

<Sheet.Root>
	<div class="flex min-h-full w-full flex-col">
		<div class="flex w-full flex-grow flex-col items-center justify-center">
			<div class="flex w-[70rem] flex-col gap-3">
				<div class="flex flex-col gap-6">
					<h1 class="text-3xl font-semibold dark:text-[#FFFFFF]">Your links</h1>
					<UrlForm data={data.urlForm} isPropsHorizonal={true} action="?/createLink" />
				</div>
				<Table bind:data={data.links} bind:chosenLink={data.chosenLink} />
			</div>
		</div>
	</div>
	{#if data.chosenLink.action === 'edit'}
		<Sheet.Content class="flex flex-col gap-6" style="--popover: 0 50% 0%;">
			<Sheet.Header>
				<Sheet.Title class="text-3xl font-semibold">Edit link</Sheet.Title>
				<Sheet.Description>
					Make changes to your link <br />
					and click «Save» when you are done.
				</Sheet.Description>
			</Sheet.Header>
			<LinkEditor data={data.editForm} chosenLink={data.chosenLink.link} />
		</Sheet.Content>
	{/if}
	{#if data.chosenLink.action === 'delete'}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-xl font-semibold">Are you absolutely sure?</Dialog.Title>
				<Dialog.Description>
					This will PERMANENTLY delete your «{data.chosenLink.link.short_id}» link from our servers.
					<br />
					This action cannot be undone.
				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Dialog.Close>
					<Button variant="secondary-custom" size="standard" type="submit">Cancel</Button>
				</Dialog.Close>
				<form method="POST" action="?/deleteLink">
					<input class="invisible hidden" name="action" value={action} />
					<Button
						variant="error"
						size="standard"
						type="submit"
						name="link_id"
						bind:disabled={isLoading}
						value={data.chosenLink.link.short_id}
					>
						Delete
					</Button>
				</form>
			</Dialog.Footer>
		</Dialog.Content>
	{/if}
</Sheet.Root>
