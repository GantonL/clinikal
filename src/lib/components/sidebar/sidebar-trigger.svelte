<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from '../ui/sidebar/context.svelte';
	import { PanelRight } from '@lucide/svelte';
	import { direction } from '$lib/stores';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<Button
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	data-sidebar="trigger"
	variant="ghost"
	size="icon"
	class={cn('h-7 w-7 cursor-pointer', className)}
	{...restProps}
>
	{#if $direction === 'rl'}
		<PanelRight />
	{:else}
		<PanelLeft />
	{/if}
	<span class="sr-only">Toggle Sidebar</span>
</Button>
