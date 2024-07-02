<script>
    import UrlForm from './url-form.svelte'

    export let data;

</script>
<div class="w-full min-h-full flex flex-col">
    <div class="flex justify-center w-full flex-col flex-grow items-center">
        <div class="flex flex-col items-center w-[50rem] gap-6">
            <h1 class="font-semibold text-center text-3xl">Convert your links into shrimps.<br>Easy and fast &#127844;</h1>
            <UrlForm data={data.form}/>
        </div>
    </div>
</div>
