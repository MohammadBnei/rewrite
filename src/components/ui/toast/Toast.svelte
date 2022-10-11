<script lang="ts">
	import type { IToast } from '$lib/models/util/toast';
	import ToastComponent from './ToastComponent.svelte';

	export let toasts: IToast[] = [];
	export let dismissToast: (id: string) => void = () => null;

	$: console.log({ toasts });
</script>

{#if toasts}
	<div class="toast toast-top toast-end lg:toast-bottom items-end">
		{#each toasts as toast (toast.id)}
			<ToastComponent
				type="{toast.type}"
				dismissible="{toast.dismissible}"
				on:dismiss="{() => dismissToast(toast.id)}"
			>
				{@html toast.message}
			</ToastComponent>
		{/each}
	</div>
{/if}
