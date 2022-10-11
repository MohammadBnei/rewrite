import type { Category } from '$lib/models/assoc';
import { writable } from 'svelte/store';

const createCategoryStore = () => {
	const { subscribe, update, set } = writable<Category[]>([]);

	const addCategory = (category: Category) => update((list) => [category, ...list]);
	const removeCategory = (category: string) => update((list) => list.filter((v) => v.name !== category));
	const setList = (categories: Category[]) => set(categories ?? []);

	return {
		subscribe,
		addCategory,
		removeCategory,
		setList
	};
};

const categoryStore = createCategoryStore();

export default categoryStore;
