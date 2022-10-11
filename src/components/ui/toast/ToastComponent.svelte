<script lang="ts">
	import { ToastTypes } from '$lib/models/util/toast';

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type: ToastTypes = ToastTypes.Error;
	export let dismissible = true;

	$: console.log({ dismissible, type });

	let classType = '';

	$: switch (type) {
		case ToastTypes.Error:
			classType = 'alert-error';
			break;
		case ToastTypes.Warning:
			classType = 'alert-warning';
			break;
		case ToastTypes.Info:
			classType = '';
			break;
		case ToastTypes.Success:
			classType = 'alert-success';
			break;

		default:
			break;
	}
</script>

<div class="alert {classType} shadow-lg w-fit" in:fade="{{ duration: 10 }}" out:fade>
	<div class="justify-between">
		<span><slot /></span>

		{#if dismissible}
			<button class="close" on:click="{() => dispatch('dismiss')}">
				<div class="justify-end">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg
					>
				</div>
			</button>
		{/if}
	</div>
</div>
