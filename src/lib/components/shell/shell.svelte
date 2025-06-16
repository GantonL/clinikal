<script>
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen flex-grow flex-col overflow-x-hidden overflow-y-auto">
	<Header />
	<main class="flex-grow">
		<div class="flex h-full w-full max-w-[1200px] flex-col items-center gap-8 p-4">
			{@render children()}
		</div>
	</main>
	<Footer />
</div>
