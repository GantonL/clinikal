<script lang="ts">
	import { t, changeLocale, locale } from '$lib/i18n';
	import { platformLinks, supportLinks } from '$lib/common/routes';
	import Link from '../link/link.svelte';
	import Combobox from '../combobox/combobox.svelte';
	import type { ComboboxConfiguration } from '$lib/interfaces/combobox';

	// Language selector configuration
	const languageConfig: ComboboxConfiguration = {
		options: [
			{
				value: 'he',
				label: $t('common.locales.he')
			},
			{
				value: 'en-US',
				label: $t('common.locales.en')
			}
		],
		placeholder: 'Select language',
		event: 'language_changed'
	};

	function handleLanguageChange(event: { type: string; data: string }) {
		if (event.type === 'language_changed') {
			changeLocale(event.data);
		}
	}
</script>

<footer class="bg-background border-border mt-auto border-t">
	<div class="container mx-auto px-6 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand Section -->
			<div class="col-span-1 md:col-span-2">
				<h3 class="text-foreground text-xl font-bold">{$t('common.brand.name')}</h3>
				<p class="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
					{$t('common.brand.description')}
				</p>
				<div class="mt-6">
					<p class="text-foreground text-sm font-medium">{$t('common.contact_information')}</p>
					<p class="text-muted-foreground mt-1 text-sm">{$t('common.brand.email')}</p>
				</div>
			</div>

			<!-- Navigation Section -->
			<div>
				<h4 class="text-foreground text-sm font-semibold tracking-wider uppercase">
					{$t('common.platform')}
				</h4>
				<ul class="mt-4 space-y-3 text-sm">
					{#each platformLinks as link (link.path)}
						<li>
							<Link {link} />
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Section -->
			<div>
				<h4 class="text-foreground text-sm font-semibold tracking-wider uppercase">
					{$t('common.support')}
				</h4>
				<ul class="mt-4 space-y-3 text-sm">
					{#each supportLinks as link (link.path)}
						<li>
							<Link {link} />
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="border-border mt-12 border-t pt-8">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<div
					class="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6"
				>
					<p>{$t('common.copyright', { year: new Date().getFullYear().toString() })}</p>
					<div class="flex space-x-6">
						<Link link={{ path: '/privacy', label: 'common.privacy_policy' }} />
						<Link link={{ path: '/term', label: 'common.terms_of_service' }} />
					</div>
				</div>
				<div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
					<div class="flex items-center">
						<Combobox
							configuration={languageConfig}
							selectedOption={$locale}
							event={handleLanguageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
