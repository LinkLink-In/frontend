<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	const {
		Root,
		Header,
		PrevButton,
		Heading,
		NextButton,
		Months,
		Grid,
		GridHead,
		GridRow,
		Cell,
		Day,
		GridBody,
		HeadCell
	} = CalendarPrimitive;
	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Root
	bind:value
	bind:placeholder
	{weekdayFormat}
	class={cn('p-3', className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
>
	<Header>
		<PrevButton />
		<Heading />
		<NextButton />
	</Header>
	<Months>
		{#each months as month}
			<Grid>
				<GridHead>
					<GridRow class="flex">
						{#each weekdays as weekday}
							<HeadCell>
								{weekday.slice(0, 2)}
							</HeadCell>
						{/each}
					</GridRow>
				</GridHead>
				<GridBody>
					{#each month.weeks as weekDates}
						<GridRow class="mt-2 w-full">
							{#each weekDates as date}
								<Cell {date}>
									<Day {date} month={month.value} />
								</Cell>
							{/each}
						</GridRow>
					{/each}
				</GridBody>
			</Grid>
		{/each}
	</Months>
</Root>
