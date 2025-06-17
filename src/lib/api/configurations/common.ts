import { AvailableLocals } from '$lib/enums/available-locales';

export const localeCookieName = 'locale';
export const defaultLocale = 'he';
export const directionMap: Partial<Record<AvailableLocals, DirectionSetting>> = {
	[AvailableLocals.Hebrew]: 'rl'
};
export const getDirection = (locale: AvailableLocals): DirectionSetting => {
	return directionMap[locale] ?? directionMap[AvailableLocals.Hebrew]!;
};
