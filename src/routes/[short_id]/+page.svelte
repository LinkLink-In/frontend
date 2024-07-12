<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from './$types';
    import { type RedirectCreate, createRedirect } from "$lib/api/redirects";

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
            if (keywords.some(keyword => userAgent.includes(keyword))) {
                return name;
            }
        }

        return 'Unknown';
    }

    async function getIpAddress(): string {
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
        }
        catch (error) {
            console.log("Error fetching IP address:", error);
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
    })
</script>

<div class="w-full min-h-full flex flex-col">
    <div class="flex justify-center w-full flex-col flex-grow items-center">
        {#if data.detail === null}
        <div class="flex flex-col items-center w-[50rem] gap-2">
            <div class="flex flex-col gap-3 items-center">
                <div class="flex flex-col gap-1">
                    <h1 class="font-semibold text-center text-3xl">Redirecting...</h1>
                    <p class="text-2xl font-semibold opacity-75">You will see the requested content shortly.</p>
                </div>
                <div class="w-[31rem] flex justify-between bg-[#F2F2F2] rounded-lg p-7 gap-5">
                    <div class="flex gap-7 items-center">
                        <div class="text-5xl">&#127844;</div>
                        <div class="banner-text">
                            <span class="text-xl">Fried shrimps</span>
                            <ul class="list-disc list-inside">
                                <li>yummy</li>
                                <li>crunchy</li>
                                <li>ready in 15 minutes</li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between">
                        <span class="flex text-4xl font-semibold">
                            $4.99<span class="text-xl opacity-50 line-through">$9.99</span>
                        </span>
                        <button class="bg-orange text-white p-3 w-full rounded-xl">Order now</button>
                    </div>
                </div>
            </div>
            <p class="text-center opacity-50 font-medium">
                Paid advertisement. Want to remove this banner? <br />Upgrade to <a href="/pro" class="underline">LinkLink Pro</a>.
            </p>
        </div>
        {:else}
            <div class="flex flex-col items-center w-[50rem] gap-2">
                <div class="flex flex-col gap-16 items-center justify-center">
                    <i class="fa-solid fa-low-vision scale-[6] text-black/50"></i>
                    <div class="flex flex-col gap-1">
                        <h1 class="font-semibold text-center text-3xl">Invalid link</h1>
                        <p class="text-2xl font-semibold opacity-75">{data.detail}</p>
                    </div>
                </div>
                <p class="text-center opacity-50 font-medium">
                    If you believe that it is a mistake, contact the link owner.
                </p>
            </div>
        {/if}
    </div>
</div>
