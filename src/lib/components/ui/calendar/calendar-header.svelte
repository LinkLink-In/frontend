<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const { Header } = CalendarPrimitive;

	type $$Props = CalendarPrimitive.HeaderProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Header
	class={cn('relative flex w-full items-center justify-between pt-1', className)}
	{...$$restProps}
>
	<slot />
</Header>
