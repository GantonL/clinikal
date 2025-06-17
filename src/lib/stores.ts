import { writable } from 'svelte/store';

export const direction = writable<DirectionSetting>('rl');
