<script lang="ts">
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { loginStatus } from "$lib/stores/loginStatus";
  import { page } from "$app/stores";
  import "../app.css";
</script>

<div class="flex flex-col w-screen min-h-screen">
    <header class="w-full h-16 flex justify-between items-center px-8 py-4">
        <span class="font-bold text-2xl">
            <a href="/">LinkLink In</a>
        </span>
        <div class="flex items-center gap-8">
            <div class="flex gap-2 items-center mr-4">
                <i class="fa-solid fa-sun fa-sm"></i>
                <Switch class=""/>
                <i class="fa-solid fa-moon fa-sm"></i>
            </div>
            {#if $loginStatus === false}
                {#if $page.url.pathname !== "/register"}
                    <Button href="/register" class="bg-orange hover:bg-orange hover:opacity-95">Register</Button>
                {/if}
                {#if $page.url.pathname !== "/login"}
                    <Button href="/login">Log in</Button>
                {/if}
            {:else}
                <button><i class="fa-solid fa-user"></i></button>
            {/if}
        </div>
    </header>

    <div class="flex bg-bg_white grow">
        <slot/>
    </div>
</div>

