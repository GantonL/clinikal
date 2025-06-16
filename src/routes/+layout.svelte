<script lang="ts">
	import Shell from '$lib/components/shell/shell.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
<Shell>
	{@render children?.()}
</Shell>
