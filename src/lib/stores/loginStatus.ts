import {type Writable, writable} from 'svelte/store';

export const loginStatus: Writable<boolean> = writable(false);