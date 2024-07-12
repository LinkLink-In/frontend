<script>
	import LoginForm from './login-form.svelte';
	export let data;
</script>

<div class="flex min-h-full w-full flex-col">
	<div class="flex w-full flex-grow flex-col items-center justify-center">
		<LoginForm data={data.form} />
	</div>
</div>
