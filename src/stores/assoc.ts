import type { AssocWord } from '$lib/models/assoc';
import { writable } from 'svelte/store';

const createAssocStore = () => {
	const { subscribe, update, set } = writable<AssocWord[]>([]);

	const addWord = (word: AssocWord) => update((list) => [word, ...list]);
	const removeWord = (word: string) => update((list) => list.filter((v) => v.id !== word));
	const setList = (words: AssocWord[]) => set(words ?? []);

	return {
		subscribe,
		addWord,
		removeWord,
		setList
	};
};

const assocStore = createAssocStore();
export default assocStore;
