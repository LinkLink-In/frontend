<script>
    import Input from "$lib/components/ui/input/input.svelte"
    import Button from '$lib/components/ui/button/button.svelte'
    import Switch from '$lib/components/ui/switch/switch.svelte'
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte'
    import DatePicker from  '$lib/components/ui/datepicker/datepicker.svelte'
    import Label from '$lib/components/ui/label/label.svelte'
</script>
<div class="w-full min-h-full flex flex-col">
    <div class="flex justify-center w-full flex-col flex-grow items-center">
        <div class="flex flex-col items-center w-[50rem] gap-3">
            <h1 class="font-semibold text-center text-3xl">Convert your links into shrimps.<br>Easy and fast &#127844;</h1>
            <form class="flex flex-col w-full gap-3">
                <div class="flex gap-4">
                    <Input placeholder="https://example.com/some-very-long-link..." endIcon="copy"/>
                    <Button>Generate link</Button>
                </div>
                <div class="flex items-center justify-center bg-[#FFFFFF] p-4 rounded-xl gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center space-x-4">
                                <Checkbox class="scale-125" id="time-check"/>
                                <Label class="text-[1rem]" for="time-check">Time limit</Label>
                            </div>
                            <DatePicker></DatePicker>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center space-x-4">
                                <Checkbox class="scale-125" id="visit-check"/>
                                <Label class="text-[1rem]" for="visit-check">Visit limit</Label>
                            </div>
                            <Input placeholder="100" startIcon="eye" type="number"></Input>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center space-x-4">
                                <Checkbox class="scale-125" id="custom-check"/>
                                <Label class="text-[1rem]" for="custom-check">Custom link</Label>
                            </div>
                            <Input placeholder="anijakich" startIcon="link" type="url"></Input>
                        </div>
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center space-x-4">
                                <Checkbox class="scale-125" id="stat-check"/>
                                <Label class="text-[1rem]" for="stat-check">Collect statistics</Label>
                            </div>
                            <div class="text-sm">Login into your account to collect statistics  and info about visitors.</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
