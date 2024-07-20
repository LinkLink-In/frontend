<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const { GridHead } = CalendarPrimitive;

	type $$Props = CalendarPrimitive.GridHeadProps;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<GridHead class={cn(className)} {...$$restProps}>
	<slot />
</GridHead>
