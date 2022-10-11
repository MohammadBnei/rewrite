import { writable } from 'svelte/store';

export const fetchStore = writable<string[]>([]);

export const addFetching = () => {
	const id = Date.now().toString();
	fetchStore.update((a: string[]) => [...a, id]);
	return id;
};

export const removeFetching = (id: string) => {
	fetchStore.update((a: string[]) => a.filter((v) => v !== id));
};
