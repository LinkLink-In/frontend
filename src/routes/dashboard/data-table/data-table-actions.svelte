<script lang="ts">
	import Pencil from 'lucide-svelte/icons/pencil';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Dialog from '$lib/components/ui/dialog';
	export let link;
	export let editFunc;
	export let deleteFunc;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<Sheet.Trigger class="flex w-full" on:click={() => editFunc()}>
				<DropdownMenu.Item class="flex w-full gap-2">
					<i class="fa fa-edit h-4 w-4"></i>
					Edit
				</DropdownMenu.Item>
			</Sheet.Trigger>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<Dialog.Trigger class="flex w-full" on:click={() => deleteFunc()}>
			<DropdownMenu.Item
				class="flex w-full gap-2 bg-[#FFDAD6] text-[#BA1A1A] hover:opacity-75 data-[highlighted]:bg-[#FFDAD6] data-[highlighted]:text-[#BA1A1A]"
			>
				<i class="fa fa-trash h-4 w-4"></i>
				Delete
			</DropdownMenu.Item>
		</Dialog.Trigger>
	</DropdownMenu.Content>
</DropdownMenu.Root>
