export interface IToast {
	id: string;
	message: string;
	type: ToastTypes;
	dismissible: boolean;
	timeout: number;
}

export enum ToastTypes {
	Error,
	Warning,
	Info,
	Success
}
