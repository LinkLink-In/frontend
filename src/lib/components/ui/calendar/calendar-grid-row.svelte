<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const { GridRow } = CalendarPrimitive;

	type $$Props = CalendarPrimitive.GridRowProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<GridRow class={cn('flex', className)} {...$$restProps}>
	<slot />
</GridRow>
