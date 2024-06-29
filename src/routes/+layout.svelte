<script>
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import "../app.css";
</script>

<header class="flex justify-between items-center px-8 py-4">
    <span class="font-bold text-2xl">
        <a href="/">LinkLink In</a>
    </span>
    <div class="flex items-center gap-8">
        <div class="flex gap-2 items-center mr-4">
            <i class="fa-solid fa-sun fa-sm"></i>
            <Switch class=""/>
            <i class="fa-solid fa-moon fa-sm"></i>
        </div>
        <Button href="/login">Log in</Button>
    </div>
</header>

<div class="bg-bg_white">
    <slot/>
</div>
