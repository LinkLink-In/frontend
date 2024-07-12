<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { type RedirectCreate, createRedirect } from '$lib/api/redirects';

	export let data: PageData;

	function getBrowserInfo(userAgent): string {
		const browserMap = [
			{ name: 'Firefox', keywords: ['Firefox'] },
			{ name: 'Opera', keywords: ['Opera', 'OPR'] },
			{ name: 'Internet Explorer', keywords: ['Trident'] },
			{ name: 'Edge', keywords: ['Edge'] },
			{ name: 'Chrome', keywords: ['Chrome'] },
			{ name: 'Safari', keywords: ['Safari'] }
		];

		for (const { name, keywords } of browserMap) {
			if (keywords.some((keyword) => userAgent.includes(keyword))) {
				return name;
			}
		}

		return 'Unknown';
	}

	async function getIpAddress(): string {
		try {
			const response = await fetch('https://api.ipify.org?format=json');
			const data = await response.json();
			return data.ip;
		} catch (error) {
			console.log('Error fetching IP address:', error);
			return null;
		}
	}

	async function sendRedirectData() {
		const current_ip = await getIpAddress();
		const browser_name = getBrowserInfo(navigator.userAgent);

		const newRedirect: RedirectCreate = {
			link_id: data.link_id,
			ip: current_ip,
			user_agent: navigator.userAgent,
			referrer: document.referrer,
			browser: browser_name,
			platform: navigator.platform,
			language: navigator.language
		};

		await createRedirect(newRedirect);
	}

	onMount(() => {
		if (data.detail === null) {
			setTimeout(() => {
				window.location.href = data.redirect_url;
			}, 2000);
		}
	});
</script>

<div class="flex min-h-full w-full flex-col">
	<div class="flex w-full flex-grow flex-col items-center justify-center">
		{#if data.detail === null}
			<div class="flex w-[50rem] flex-col items-center gap-2">
				<div class="flex flex-col items-center gap-3">
					<div class="flex flex-col gap-1">
						<h1 class="text-center text-3xl font-semibold">Redirecting...</h1>
						<p class="text-2xl font-semibold opacity-75">
							You will see the requested content shortly.
						</p>
					</div>
					<div class="flex w-[31rem] justify-between gap-5 rounded-lg bg-[#F2F2F2] p-7">
						<div class="flex items-center gap-7">
							<div class="text-5xl">&#127844;</div>
							<div class="banner-text">
								<span class="text-xl">Fried shrimps</span>
								<ul class="list-inside list-disc">
									<li>yummy</li>
									<li>crunchy</li>
									<li>ready in 15 minutes</li>
								</ul>
							</div>
						</div>
						<div class="flex flex-col justify-between">
							<span class="flex text-4xl font-semibold">
								$4.99<span class="text-xl line-through opacity-50">$9.99</span>
							</span>
							<button class="text-white w-full rounded-xl bg-orange p-3">Order now</button>
						</div>
					</div>
				</div>
				<p class="text-center font-medium opacity-50">
					Paid advertisement. Want to remove this banner? <br />Upgrade to
					<a href="/pro" class="underline">LinkLink Pro</a>.
				</p>
			</div>
		{:else}
			<div class="flex w-[50rem] flex-col items-center gap-2">
				<div class="flex flex-col items-center justify-center gap-16">
					<i class="fa-solid fa-low-vision scale-[6] text-black/50"></i>
					<div class="flex flex-col gap-1">
						<h1 class="text-center text-3xl font-semibold">Invalid link</h1>
						<p class="text-2xl font-semibold opacity-75">{data.detail}</p>
					</div>
				</div>
				<p class="text-center font-medium opacity-50">
					If you believe that it is a mistake, contact the link owner.
				</p>
			</div>
		{/if}
	</div>
</div>
