<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Root, Trigger, Content } from '$lib/components/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
	export let dateValue;
	export let disabled;
	let value: DateValue | undefined = undefined;
	$: {
		if (value) {
			let date = new Date(value!.year, value!.month, value!.day);
			dateValue = date.toISOString();
		}
	}
</script>

<Root>
	<Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
			{disabled}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
		</Button>
	</Trigger>
	<Content class="w-auto p-0">
		<Calendar minValue={today(getLocalTimeZone()).add({ days: 1 })} bind:value initialFocus />
	</Content>
</Root>
