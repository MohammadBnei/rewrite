import type { IModal } from '$lib/models/util/modal';
import { writable } from 'svelte/store';

interface IModalStore extends IModal {
	open: boolean;
}

const createModalStore = () => {
	const { subscribe, update, set } = writable<Partial<IModalStore>>({
		open: false
	});

	const openModal = (payload: IModal) => {
		update(() => ({
			open: true,
			...payload
		}));
	};

	const closeModal = () =>
		set({
			open: false
		});

	return {
		subscribe,
		openModal,
		closeModal
	};
};

const modalStore = createModalStore();

export default modalStore;
