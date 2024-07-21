<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tr
	class={cn(
		'w-fit border-b bg-[#ffffff] transition-colors [&_td:first-child]:last:rounded-es-xl [&_td:last-child]:last:rounded-ee-xl [&_th:first-child]:first:rounded-ss-xl [&_th:last-child]:first:rounded-se-xl',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</tr>
