<script>
	import ModeWatcher from '../mode-watcher/mode-watcher.svelte';
</script>

<header class="grid w-full grid-cols-2 border-b p-2">
	<div class="flex flex-row items-center gap-4">
		<h1 class="flex flex-row items-center gap-3 text-xl">
			<a href="/">Clinikal</a>
		</h1>
	</div>
	<div class="flex flex-row items-center justify-end gap-2">
		<ModeWatcher></ModeWatcher>
	</div>
</header>
