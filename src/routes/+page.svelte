<script>
	import UrlForm from './url-form.svelte';

	export let data;
</script>

<div class="flex min-h-full w-full flex-col">
	<div class="flex w-full flex-grow flex-col items-center justify-center">
		<div class="flex w-[50rem] flex-col items-center gap-6">
			<h1 class="text-center text-3xl font-semibold">
				Convert your links into shrimps.<br />Easy and fast &#127844;
			</h1>
			<UrlForm data={data.form} />
		</div>
	</div>
</div>
