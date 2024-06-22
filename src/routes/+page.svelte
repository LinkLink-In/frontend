<script>
    import Input from "../lib/components/ui/input/input.svelte"
    import Button from '../lib/components/ui/button/button.svelte'
    import Switch from '../lib/components/ui/switch/switch.svelte'
</script>
<div class="main">
    <header>
        <span class="header"><a href="/">LinkLink In</a></span>
        <div class="controls">
            <Switch/>
            <Button href="/login">Log in</Button>
        </div>
    </header>
<div class="wrapper">
<div class="content">
    <h1>Convert your links into shrimps.<br>Easy and fast</h1>
    <form>
        <div class="form-main">
            <Input placeholder="https://example.com/some-very-long-link..."/>
            <Button>Submit link</Button>
        </div>
        <div class="form-parameters">
            <span>Will be available</span>
            <span class="soon">Soon(™)</span>
        </div>
    </form>
</div>
</div>
</div>
<style>
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
    .wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100vh;
        align-items: center;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50rem;
        gap: 1.5rem;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.75rem;
    }
    h1 {
        font-weight: 600;
        text-align: center;
        font-size: 2rem;
    }
    .form-main {
        display: flex;
        gap: 1rem;
    }
    .form-parameters {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #cccccc;
        padding: 0.75rem;
        border-radius: 0.75rem;
    }
    span {
        font-size: 1.25rem;
    }
    .soon {
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>