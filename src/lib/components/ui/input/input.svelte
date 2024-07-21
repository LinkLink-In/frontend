<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined;
	export let startIcon: string = '';
	export let endIcon: string = '';
	export let endIconHandler: () => void;
</script>

<div class="relative flex w-full items-center">
	<div class="absolute left-1.5 top-1/2 ml-1 -translate-y-1/2 transform disabled:opacity-25">
		<i class={`fa-solid fa-${startIcon} ${disabled ? 'opacity-25' : 'opacity-50'}`}></i>
	</div>
	<input
		class={cn(
			'bg-transparent file:bg-transparent flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className,
			startIcon === '' ? '' : 'pl-9',
			endIcon === '' ? '' : 'pr-9'
		)}
		bind:value
		{readonly}
		{disabled}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
		on:wheel|passive
		{...$$restProps}
	/>
	<div on:click={endIconHandler} class="absolute right-1.5 top-1/2 mr-2 -translate-y-1/2 transform">
		<i class={`fa-solid fa-${endIcon} opacity-50`}></i>
	</div>
</div>
