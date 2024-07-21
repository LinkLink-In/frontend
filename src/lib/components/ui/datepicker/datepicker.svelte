<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Root, Trigger, Content } from '$lib/components/ui/popover/index.js';
	import { darkMode } from '$lib/stores/dark_mode.ts';

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
			style={$darkMode ? ' --background: 233 13% 14%;' : ''}
			{disabled}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
		</Button>
	</Trigger>
	<Content class="w-auto border-[#1E1F27] p-0">
		<Calendar
			bind:value
			initialFocus
			class={$darkMode ? 'bg-[#1E1F27] text-[#FFFFFF]' : ''}
			style={$darkMode
				? '--accent: 234, 13%, 5%; --accent-foreground: 0 0% 100%; --input: 233 13% 14%;'
				: ''}
		/>
	</Content>
</Root>
