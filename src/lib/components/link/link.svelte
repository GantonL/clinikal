<script lang="ts">
	import { defaultLocale } from '$lib/api/configurations/common';
	import { locale, t } from '$lib/i18n';
	import type { Link } from '$lib/interfaces/link';

	interface Props {
		link: Link;
		class?: string;
	}

	let {
		link,
		class: className = 'text-muted-foreground hover:text-foreground transition-colors'
	}: Props = $props();
</script>

<a href={`${$locale === defaultLocale ? '' : `/${$locale}`}${link.path}`} class={className}>
	{$t(link.label)}
</a>
