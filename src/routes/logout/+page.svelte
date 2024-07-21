<script>
	import { loginStatus } from '$lib/stores/loginStatus';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	onMount(() => {
		if (data.success) {
			loginStatus.set(false);
			goto('/');
		}
	});
</script>

<h1
	class="flex min-h-full w-full items-center justify-center text-4xl text-[#1A1B23] opacity-50 dark:text-[#FFFFFF]"
>
	Logging out...
</h1>
