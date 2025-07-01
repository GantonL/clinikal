import type { Link } from '$lib/interfaces/link';
import {
	Blocks,
	BookOpen,
	ChartSpline,
	Cog,
	FileQuestion,
	Gem,
	Headset,
	Users
} from '@lucide/svelte';

export const platformLinks: Link[] = [
	{
		label: 'common.dashboard',
		path: '/',
		icon: ChartSpline
	},
	{
		label: 'common.patients',
		path: '/patients',
		icon: Users
	},
	{
		label: 'common.integrations',
		path: '/integrations',
		icon: Blocks
	},
	{
		label: 'common.settings',
		path: '/settings',
		icon: Cog
	}
];

export const supportLinks: Link[] = [
	{
		label: 'common.pricing',
		path: '/plan',
		icon: Gem
	},
	{
		label: 'common.documentation',
		path: '/documentation',
		icon: BookOpen
	},
	{
		label: 'common.help_center',
		path: '/help',
		icon: FileQuestion
	},
	{
		label: 'common.contact_support',
		path: '/contact_support',
		icon: Headset
	}
];
