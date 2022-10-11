import { ToastTypes, type IToast } from '$lib/models/util/toast';
import { writable } from 'svelte/store';

export const toasts = writable<IToast[]>([]);

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};

interface ICreateToast extends Partial<IToast> {
	message: string;
}

export const addToast = (toast: ICreateToast) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = crypto.randomUUID();

	// Setup some sensible defaults for a toast.
	const defaults: IToast = {
		id,
		type: ToastTypes.Info,
		dismissible: true,
		timeout: 5000,
		message: ''
	};

	// Push the toast to the top of the list of toasts
	const t: IToast = { ...defaults, ...toast };
	toasts.update((all) => [t, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (t.timeout) setTimeout(() => dismissToast(id), t.timeout);
};
