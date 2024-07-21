<script>
	import RegisterForm from './register-form.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<div class="main">
	<div class="form-wrapper">
		<RegisterForm data={data.form} />
	</div>
</div>

<style>
	.main {
		width: 100%;
		min-height: 100%;
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
