<script lang="ts">
	import { onMount } from 'svelte';
	import { client } from '$lib/client';
	import { goto } from '$app/navigation';

	export let data: RedirectPageData;

	interface RedirectPageData {
		link_id: string;
		redirect_url: string;
		detail: string | null;
		banner: string | null;
	}
	let redirect_url = data.redirect_url;
	let detail = null;

	onMount(async () => {
		if (data.detail === null) {
			if (!redirect_url) {
				let exitFlag = false;
				while (true) {
					let passphrase = prompt('Please enter the passphrase to access the requested URL');
					const resp = await client.links
						.checkPassphrase({
							params: { short_id: data.link_id },
							body: { passphrase: passphrase }
						})
						.then((res) => {
							if (res.status === 200) return res.body;
							if (res.status === 400) return res.body.detail;
							return null;
						})
						.catch((e) => {
							throw e;
						});
					if (!resp) {
						exitFlag = true;
						break;
					}
					if (typeof resp.redirect_url === 'string') {
						redirect_url = resp.redirect_url;
						break;
					}
					alert('Incorrect password.');
				}
				if (exitFlag) {
					detail = 'Incorrect passphrase';
					window.location.href = `${import.meta.env.VITE_LINK_HOST}/pass-fail`;
					return;
				}
				window.location.href = redirect_url;
			}
			setTimeout(() => {
				window.location.href = redirect_url;
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
							{#if data.redirect_url !== null}
								You will see the requested content shortly.
							{:else}
								Awaiting your password entry...
							{/if}
						</p>
					</div>
					{#if data.banner === null}
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
					{:else}
						<div class="flex w-[31rem] justify-between gap-5 rounded-lg bg-[#F2F2F2] p-7">
							<div class="flex items-center gap-7">
								<div class="text-5xl">&#127844;</div>
								<div class="banner-text">
									<span class="text-2xl font-bold">{data.banner.title}</span>
									<p>{data.banner.description}</p>
								</div>
							</div>
						</div>
					{/if}
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
