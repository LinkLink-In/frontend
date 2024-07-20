<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	const { NextButton } = CalendarPrimitive;

	type $$Props = CalendarPrimitive.NextButtonProps;
	type $$Events = CalendarPrimitive.NextButtonEvents;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<NextButton
	on:click
	class={cn(
		buttonVariants({ variant: 'outline' }),
		'bg-transparent h-7 w-7 p-0 opacity-50 hover:opacity-100',
		className
	)}
	{...$$restProps}
	let:builder
>
	<slot {builder}>
		<ChevronRight class="h-4 w-4" />
	</slot>
</NextButton>
