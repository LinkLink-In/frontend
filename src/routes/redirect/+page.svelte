<script>
    import Button from '../../lib/components/ui/button/button.svelte'
    import Switch from '../../lib/components/ui/switch/switch.svelte'
</script>
<div class="w-full min-h-full flex flex-col">
    <div class="flex justify-center w-full flex-col flex-grow items-center">
        <div class="flex flex-col items-center w-[50rem] gap-2">
            <div class="flex flex-col gap-3 items-center">
                <div class="flex flex-col gap-1">
                    <h1 class="font-semibold text-center text-3xl">Redirecting...</h1>
                    <p class="text-2xl font-semibold opacity-75">You will see the requested content shortly.</p>
                </div>
                <div class="w-[29.75rem] flex justify-between bg-[#F2F2F2] rounded-lg p-7">
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
                        <button class="bg-[#F37C5A] text-white p-3 w-full rounded-xl">Order now</button>
                    </div>
                </div>
            </div>
            <p class="text-center opacity-50 font-medium">
                Paid advertisement. Want to remove this banner? <br>Upgrade to <a href="/pro" class="underline">LinkLink Pro</a>.
            </p>
        </div>
    </div>
</div>
