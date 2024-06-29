<script>
    import LoginForm from './login-form.svelte'
    export let data;
</script>

<div class="flex w-full min-h-full flex-col">
    <div class="flex flex-col items-center justify-center w-full flex-grow">
        <LoginForm data={data.form}/>
    </div>
</div>
