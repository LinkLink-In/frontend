<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { InputEvents } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;
	export let startIcon: string = "";
	export let endIcon: string = "";
	export let endIconHandler: () => void;
</script>

<div class="flex relative items-center w-full">
	<div class="ml-1 absolute left-1.5 top-1/2 transform -translate-y-1/2"><i class={`fa-solid fa-${startIcon} opacity-50`}></i></div>
	<input
	class={cn(
		"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		className,
		startIcon === "" ? "" : "pl-9",
		endIcon === "" ? "" : "pr-9"
	)}
	bind:value
	{readonly}
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
	<div on:click={endIconHandler} class="mr-2 absolute right-1.5 top-1/2 transform -translate-y-1/2"><i class={`fa-solid fa-${endIcon} opacity-50`}></i></div>
</div>

