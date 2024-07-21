<script>
	import { loginStatus } from '$lib/stores/loginStatus';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	onMount(() => {
		if (data.success) {
			goto('/');
		}
	});
</script>

<h1 class="flex min-h-full w-full items-center justify-center text-4xl text-[#1A1B23] opacity-50">
	Logging out...
</h1>
