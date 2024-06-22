<script>
    import RegisterForm from './register-form.svelte'
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    export let data;
</script>

<div class="main">
    <header>
        <span class="header"><a href="/">LinkLink In</a></span>
        <div class="controls">
            <Switch/>
            <Button href="/login">Log in</Button>
        </div>
    </header>
    <div class="form-wrapper">
        <RegisterForm data={data.form}/>
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
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
    }
    .controls {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .header {
        font-weight: 700;
        font-size: 1.5rem;
    }
</style>