<script>
    import Input from "../lib/components/ui/input/input.svelte"
    import Button from '../lib/components/ui/button/button.svelte'
    import Switch from '../lib/components/ui/switch/switch.svelte'
</script>
<div class="w-full min-h-full flex flex-col">
    <div class="flex justify-center w-full flex-col flex-grow items-center">
        <div class="flex flex-col items-center w-[50rem] gap-3">
            <h1 class="font-semibold text-center text-3xl">Convert your links into shrimps.<br>Easy and fast</h1>
            <form class="flex flex-col w-full gap-3">
                <div class="flex gap-4">
                    <Input placeholder="https://example.com/some-very-long-link..."/>
                    <Button>Submit link</Button>
                </div>
                <div class="flex flex-col items-center justify-center bg-[#cccccc] p-3 rounded-xl">
                    <span class="text-xl">Will be available</span>
                    <span class="text-xl font-semibold">Soon(™)</span>
                </div>
            </form>
        </div>
    </div>
</div>
