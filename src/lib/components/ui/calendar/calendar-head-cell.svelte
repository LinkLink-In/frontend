<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const { HeadCell } = CalendarPrimitive;

	type $$Props = CalendarPrimitive.HeadCellProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<HeadCell
	class={cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', className)}
	{...$$restProps}
>
	<slot />
</HeadCell>
