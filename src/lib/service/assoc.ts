import type { AssocWord, Category } from '$lib/models/assoc';
import assocStore from '$stores/assoc';
import * as api from '$lib/service/api';
import categoryStore from '$stores/category';
import { addToast } from '$stores/toast';

export const addAssocHelper = (words: AssocWord[], word: string) => {
	const newA = words?.find(({ id }) => id === word);

	newA && assocStore.addWord(newA);
};

interface AssocRes {
	words: AssocWord[];
	categories: Category[];
}
export async function fetchUserWords(): Promise<AssocWord[] | void> {
	const res = await api.get({ path: 'assoc/' });
	const data = (await api.handleRes(res)) as AssocRes;

	if (res.ok) {
		assocStore.setList(data.words);
		categoryStore.setList(data.categories);

		return data.words;
	}
}

export async function addWord(word: string): Promise<void> {
	const res = await api.put({ path: 'assoc', data: { word } });
	const data = (await api.handleRes(res)) as AssocRes;
	if (res.ok) {
		addAssocHelper(data.words, word);
		addToast({ message: `Successfully added ${word}` });
	}
}

export async function removeWord(word: string): Promise<void> {
	const res = await api.del({ path: `assoc`, data: { word } });
	api.handleRes(res);
	if (res.ok) {
		assocStore.removeWord(word);
		addToast({ message: `Successfully removed ${word}` });
	}
}
