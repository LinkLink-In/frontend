<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1
	class="flex min-h-full w-full items-center justify-center text-4xl text-[#1A1B23] opacity-50 dark:text-[#FFFFFF]"
>
	{$page.error.message}
</h1>
