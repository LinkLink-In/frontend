<script lang="ts">
    import {Button, Control, Field, FieldErrors, Label} from "$lib/components/ui/form/";
    import DatePicker from "$lib/components/ui/datepicker/datepicker.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import {superForm} from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {formSchema} from "./schema";

    export let data;

    let endIconVal;
    let current_url;

    const form = superForm(data, {
        validators: zodClient(formSchema),
        dataType: 'json',
        onSubmit({ jsonData }) {
            jsonData({
                ...$formData,
                redirects_limit: $formData!.redirects_limit,
            });
        },
        onResult({ result, formElement, cancel }) {
            if (result.status === 200) {
                $formData!.redirect_url = `${import.meta.env.VITE_LINK_HOST}/${result!.data!.url}`;
                current_url = `${import.meta.env.VITE_LINK_HOST}/${result!.data!.url}`
                cancel()
            }
        }
    });

    async function handleCopy() {
        const type = "text/plain";
        const blob = new Blob([current_url], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);
        endIconVal = "check"
        setTimeout(() => {
            endIconVal = "copy";
        }, 1000)
    }

    const { form: formData, enhance } = form;
    $: {
        if ($formData.redirect_url === current_url) {
            endIconVal = "copy";
        } else {
            endIconVal = ""
        }
    }
</script>

<form method="POST" use:enhance class="flex flex-col w-full gap-3">
    <div class="flex gap-4">
        <Field {form} name="redirect_url" class="w-full space-y-0">
            <Control let:attrs class="w-full">
                <Input {...attrs} placeholder="https://example.com/some-very-long-link..." type="url" bind:value={$formData.redirect_url} endIconHandler={handleCopy} bind:endIcon={endIconVal} />
            </Control>
            <FieldErrors />
        </Field>
        <Button type="">Generate link</Button>
    </div>
    <div class="flex items-center bg-[#FFFFFF] p-3 rounded-xl gap-3">
        <div class="flex flex-col gap-3 p-3 h-full">
            <div class="flex flex-col gap-3">
                <Field {form} name="expiration_date_enabled" class="flex items-center gap-3 space-y-0">
                    <Control let:attrs>
                        <Checkbox {...attrs} id="time-check" checked disabled />
                        <Label class="text-[1rem]" for="time-check">Time limit</Label>
                    </Control>
                </Field>
                <Field {form} name="expiration_date" class="space-y-0">
                    <Control let:attrs>
                        <DatePicker {...attrs} bind:dateValue={$formData.expiration_date}/>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
            <div class="flex flex-col gap-3">
                <Field {form} name="redirects_limit_enabled" class="flex items-center gap-3 space-y-0">
                    <Control let:attrs>
                        <Checkbox {...attrs} id="visit-check" checked disabled />
                        <Label class="text-[1rem]" for="visit-check">Visit limit</Label>
                    </Control>
                    <FieldErrors />
                </Field>
                <Field {form} name="redirects_limit" class="space-y-0">
                    <Control let:attrs>
                        <Input {...attrs} placeholder="100" startIcon="eye" type="number" bind:value={$formData.redirects_limit}></Input>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
        </div>
        <div class="flex flex-col gap-3 p-3 h-full">
            <div class="flex flex-col gap-3">
                    <Field {form} name="short_id_enabled" class="flex items-center gap-3 space-y-0">
                        <Control let:attrs>
                            <Checkbox {...attrs} id="custom-check" checked disabled/>
                            <Label class="text-[1rem]" for="custom-check">Custom link</Label>
                        </Control>
                        <FieldErrors />
                    </Field>
                <Field {form} name="short_id" class="space-y-0">
                    <Control let:attrs>
                        <Input {...attrs} placeholder="anijakich" startIcon="link" bind:value={$formData.short_id}></Input>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
            <div class="flex flex-col gap-3">
                <Field {form} name="stats_enabled" class="flex items-center gap-3 space-y-0">
                    <Control let:attrs>
                        <Checkbox {...attrs} id="stat-check" checked disabled/>
                        <Label class="text-[1rem]" for="stat-check">Collect statistics</Label>
                    </Control>
                    <FieldErrors />
                </Field>
                <div class="text-sm">Login into your account to collect statistics  and info about visitors.</div>
            </div>
        </div>
    </div>
</form>
