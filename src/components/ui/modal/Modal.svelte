<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let open = false;

	$: modalBuffer = open;

	const internalCloseEvent = createEventDispatcher();
	const checkClosed: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (e) => {
		const internalChecked = (<HTMLInputElement>e.target).checked;
		// Some misbehavior on the input, it overrides the open props sometimes
		if (open === false) {
			modalBuffer = false;
		}
		if (!internalChecked) internalCloseEvent('closed');
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (!open) return;
		switch (e.key) {
			// ESC
			case 'Escape':
				internalCloseEvent('closed');
				break;
		}
	};
	let id: string;
	onMount(() => {
		id = crypto.randomUUID();
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="{id}" class="modal-toggle" bind:checked="{modalBuffer}" on:change="{checkClosed}" />
<label for="{id}" class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<slot name="content" />
		<div class="modal-action">
			<slot name="action" />
		</div>
	</label>
</label>
