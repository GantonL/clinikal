<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import { useSidebar } from '$lib/components/ui/sidebar';
	import type { Link } from '$lib/interfaces/link';
	import { locale, t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import type { AvailableLocals } from '$lib/enums/available-locales';
	import { directionMap } from '$lib/api/configurations/common';
	import { direction } from '$lib/stores';
	import { platformLinks, supportLinks } from '$lib/common/routes';

	let side = $state<'right' | 'left'>('right');
	onMount(() => {
		locale.subscribe((seletedLocale) => {
			updateSide(seletedLocale as AvailableLocals);
		});
	});
	function updateSide(locale: AvailableLocals) {
		if (!locale) {
			return;
		}
		if (document) {
			const dir = directionMap[locale] ?? $direction;
			side = dir === 'lr' ? 'left' : 'right';
		}
	}
	const groups: { label: string; items: Link[]; collapsible?: boolean }[] = [
		{
			label: 'common.platform',
			items: platformLinks
		},
		{
			label: 'common.support',
			collapsible: true,
			items: supportLinks
		}
	];
	let currentPath = $derived(page.url.pathname);
	const sidebar = useSidebar();

	function onSidebarLink() {
		if (!sidebar.isMobile) {
			return;
		}
		sidebar.toggle();
	}
</script>

<Sidebar.Root collapsible="icon" {side}>
	<Sidebar.Content>
		{#each groups as group (group.label)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{$t(group.label)}
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.label)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={currentPath === item.path}>
									{#snippet child({ props })}
										<a href={item.path} {...props} onclick={onSidebarLink}>
											<item.icon />
											<span>{$t(item.label)}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton></Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
