<script>
	import UrlForm from './url-form.svelte';

	export let data;
</script>

<div class="flex min-h-full w-full flex-col">
	<div class="flex w-full flex-grow flex-col items-center justify-center">
		<div class="flex flex-col items-center gap-6 sm:mt-6 sm:w-[90%] md:w-[50rem]">
			<h1 class="text-center text-3xl font-semibold dark:text-[#FFFFFF]">
				Convert your links into shrimps.<br />Easy and fast &#127844;
			</h1>
			<UrlForm data={data.form} />
		</div>
	</div>
</div>
