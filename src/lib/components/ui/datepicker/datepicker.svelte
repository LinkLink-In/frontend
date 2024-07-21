<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
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
	export let className;
	export let placeholder;
	export let value: DateValue | undefined = undefined;
	$: {
		if (value) {
			const toSetValue = value.toDate('Europe/Moscow');
			dateValue = toSetValue.toISOString();
		}
	}
</script>

<Root>
	<Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'justify-start text-left font-normal',
				!value && 'text-muted-foreground',
				className
			)}
			{disabled}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate('Europe/Moscow')) : placeholder}
		</Button>
	</Trigger>
	<Content class="w-auto p-0">
		<Calendar minValue={today('Europe/Moscow').add({ days: 1 })} bind:value initialFocus />
	</Content>
</Root>
