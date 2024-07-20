<script lang="ts">
	import { onMount } from 'svelte';
	import { type RedirectCreate, createRedirect } from '$lib/api/redirects';
	import { sendRedirectData } from '$lib/helpers/browserData';
	export let data: RedirectPageData;
	interface RedirectPageData {
		link_id: string;
		redirect_url: string;
		detail: string | null;
	}

	// sendRedirectData();

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
