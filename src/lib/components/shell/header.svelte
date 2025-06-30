<script>
	import { t } from '$lib/i18n';
	import ModeWatcher from '../mode-watcher/mode-watcher.svelte';
	import SidebarTrigger from '../sidebar/sidebar-trigger.svelte';
</script>

<header class="grid w-full grid-cols-2 border-b p-2">
	<div class="flex flex-row items-center gap-4">
		<SidebarTrigger />
		<h1 class="flex flex-row items-center gap-3 text-xl">
			<a href="/">{$t('common.brand.name')}</a>
		</h1>
	</div>
	<div class="flex flex-row items-center justify-end gap-2">
		<ModeWatcher></ModeWatcher>
	</div>
</header>
