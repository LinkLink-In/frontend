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
        <Field {form} name="redirect_url" class="w-full">
            <Control let:attrs class="w-full">
                <Input {...attrs} placeholder="https://example.com/some-very-long-link..." type="url" bind:value={$formData.redirect_url} endIconHandler={handleCopy} bind:endIcon={endIconVal} />
            </Control>
            <FieldErrors />
        </Field>
        <Button>Generate link</Button>
    </div>
    <div class="flex items-center justify-center bg-[#FFFFFF] p-4 rounded-xl gap-8">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center space-x-4">
                    <Field {form} name="expiration_date_enabled">
                        <Control let:attrs>
                            <Checkbox {...attrs} class="scale-125" id="time-check" />
                            <Label class="text-[1rem]" for="time-check">Time limit</Label>
                        </Control>
                        <FieldErrors />
                    </Field>
                </div>
                <Field {form} name="expiration_date">
                    <Control let:attrs>
                        <DatePicker {...attrs} bind:dateValue={$formData.expiration_date}/>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center space-x-4">
                    <Field {form} name="redirects_limit_enabled">
                        <Control let:attrs>
                            <Checkbox {...attrs} class="scale-125" id="visit-check" />
                            <Label class="text-[1rem]" for="visit-check">Visit limit</Label>
                        </Control>
                        <FieldErrors />
                    </Field>
                </div>
                <Field {form} name="redirects_limit">
                    <Control let:attrs>
                        <Input {...attrs} placeholder="100" startIcon="eye" type="number" bind:value={$formData.redirects_limit}></Input>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center space-x-4">
                    <Field {form} name="short_id_enabled">
                        <Control let:attrs>
                            <Checkbox {...attrs} class="scale-125" id="custom-check" checked disabled/>
                            <Label class="text-[1rem]" for="custom-check">Custom link</Label>
                        </Control>
                        <FieldErrors />
                    </Field>
                </div>
                <Field {form} name="short_id">
                    <Control let:attrs>
                        <Input {...attrs} placeholder="anijakich" startIcon="link" bind:value={$formData.short_id}></Input>
                    </Control>
                    <FieldErrors />
                </Field>
            </div>
            <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-4">
                    <Field {form} name="stats_enabled">
                        <Control let:attrs>
                            <Checkbox {...attrs} class="scale-125" id="stat-check" checked disabled/>
                            <Label class="text-[1rem]" for="stat-check">Collect statistics</Label>
                        </Control>
                        <FieldErrors />
                    </Field>
                </div>
                <div class="text-sm">Login into your account to collect statistics  and info about visitors.</div>
            </div>
        </div>
    </div>
</form>