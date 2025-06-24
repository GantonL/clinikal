import type { Link } from '$lib/interfaces/link';

export const platformLinks: Link[] = [
	{
		label: 'common.dashboard',
		path: '/'
	},
	{
		label: 'common.patients',
		path: '/patients'
	},
	{
		label: 'common.integrations',
		path: '/integrations'
	},
	{
		label: 'common.settings',
		path: '/settings'
	}
];

export const supportLinks: Link[] = [
	{
		label: 'common.pricing',
		path: '/plan'
	},
	{
		label: 'common.documentation',
		path: '/documentation'
	},
	{
		label: 'common.help_center',
		path: '/help'
	},
	{
		label: 'common.contact_support',
		path: '/contact_support'
	}
];
