<script>
	import Toast from './Toast.svelte';
	import { addToast, dismissToast, toasts } from '$stores/toast';
	import { ToastTypes } from '$lib/models/util/toast';
	import Button from '$ui/button/Button.svelte';

	let counter = 0;

	const getCounter = () => ++counter;
</script>

<div class="flex flex-1">
	<Button on:click="{() => addToast({ type: ToastTypes.Info, message: 'Toast number ' + getCounter() })}"
		>Add Toast (info)
	</Button>
	<Button on:click="{() => addToast({ type: ToastTypes.Warning, message: 'Toast number ' + getCounter() })}"
		>Add Toast (warning)
	</Button>
	<Button on:click="{() => addToast({ type: ToastTypes.Error, message: 'Toast number ' + getCounter() })}"
		>Add Toast (error)
	</Button>
	<Button on:click="{() => addToast({ type: ToastTypes.Success, message: 'Toast number ' + getCounter() })}"
		>Add Toast (success)
	</Button>
</div>

<Toast toasts="{$toasts}" dismissToast="{(id) => dismissToast(id)}" />
