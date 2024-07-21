<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	type $$Props = HTMLThAttributes;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<th
	class={cn(
		'h-10 p-2 px-4 text-left align-middle text-base font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
