<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const { GridBody } = CalendarPrimitive;
	type $$Props = CalendarPrimitive.GridBodyProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<GridBody class={cn(className)} {...$$restProps}>
	<slot />
</GridBody>
