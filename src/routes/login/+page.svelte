<script>
    import LoginForm from './login-form.svelte'
    export let data;
</script>

<div class="main">
    <div class="form-wrapper">
        <LoginForm data={data.form}/>
    </div>
</div>

<style>
    .main {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .form-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-grow: 1;
    }
</style>
