<script lang="ts">
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { loginStatus } from '$lib/stores/loginStatus';
	import { page } from '$app/stores';
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { onMount } from 'svelte';
	import { darkMode } from '$lib/stores/dark_mode.ts';

	function getCookieValue(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	onMount(() => {
		let myCookieValue = getCookieValue('access_token');
		if (myCookieValue) {
			$loginStatus = true;
		}
	});

	let dark_theme_check = true;
	$: $darkMode = dark_theme_check;
</script>

<div class="flex min-h-screen w-screen flex-col" class:dark={dark_theme_check}>
	<header
		class="flex h-16 w-full items-center justify-between px-8 py-4 dark:bg-[#1E1F27] dark:text-[#FFFFFF]"
	>
		<span class="text-2xl font-bold">
			<a href="/">LinkLink In</a>
		</span>
		<div class="flex items-center gap-8">
			<div class="mr-4 flex items-center gap-2">
				<i class="fa-solid fa-sun fa-sm"></i>
				<Switch class="" bind:checked={dark_theme_check} />
				<i class="fa-solid fa-moon fa-sm"></i>
			</div>
			{#if $loginStatus === false}
				{#if $page.url.pathname !== '/register'}
					<Button href="/register" class="bg-orange hover:bg-orange hover:opacity-95"
						>Register</Button
					>
				{/if}
				{#if $page.url.pathname !== '/login'}
					<Button href="/login">Log in</Button>
				{/if}
			{:else}
				<button><i class="fa-solid fa-user"></i></button>
			{/if}
		</div>
	</header>

	<div class="flex grow bg-bg_white dark:bg-[#12131B]">
		<slot />
	</div>
</div>
