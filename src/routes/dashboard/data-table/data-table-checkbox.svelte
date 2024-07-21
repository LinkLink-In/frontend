<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import Check from 'svelte-radix/Check.svelte';
	import Minus from 'svelte-radix/Minus.svelte';
	import { cn } from '$lib/utils.js';
	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;
	let className: $$Props['class'] = undefined;
	export let checked: $$Props['checked'] = false;
	export { className as class };
</script>

<CheckboxPrimitive.Root
	class={cn(
		'peer box-content h-6 w-6 shrink-0 rounded-md border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50',
		className
	)}
	bind:checked
	on:click
	{...$$restProps}
>
	<CheckboxPrimitive.Indicator
		class={cn('text-current flex h-6 w-6 items-center justify-center')}
		let:isChecked
		let:isIndeterminate
	>
		{#if isIndeterminate}
			<Minus class="h-5 w-5" />
		{:else}
			<Check class={cn('h-5 w-5', !isChecked && 'hidden')} />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
