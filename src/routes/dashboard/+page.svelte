<script lang="ts">
	import UrlForm from '../url-form.svelte';
	import Table from './links-table.svelte';
	export let data;
	export let action;
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
					<h1 class="text-3xl font-semibold">Your links</h1>
					<UrlForm data={data.urlForm} isPropsHorizontal={true} action="?/createLink" />
				</div>
				<Table bind:data={data.links} bind:chosenLink={data.chosenLink} />
			</div>
		</div>
	</div>
	{#if data.chosenLink.action === 'edit'}
		<Sheet.Content class="flex flex-col gap-6">
			<Sheet.Header>
				<Sheet.Title class="text-3xl font-semibold">Edit link</Sheet.Title>
				<Sheet.Description>
					Make changes to your link <br />
					and click «Save» when you are done.
				</Sheet.Description>
			</Sheet.Header>
			<LinkEditor data={data.editForm} chosenLink={data.chosenLink.link} />
		</Sheet.Content>
	{:else}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-xl font-semibold">Are you absolutely sure?</Dialog.Title>
				<Dialog.Description>
					This will permanently delete your «{data.chosenLink.link.short_id}» link from our servers.
					<br />
					This action cannot be undone.
				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Dialog.Close>
					<Button variant="secondary-custom" size="standard" type="submit">Cancel</Button>
				</Dialog.Close>
				<Dialog.Close>
					<form method="POST" action="?/deleteLink">
						<Button
							variant="error"
							size="standard"
							type="submit"
							name="link_id"
							value={data.chosenLink.link.short_id}>Delete</Button
						>
					</form>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	{/if}
</Sheet.Root>
