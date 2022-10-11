<script lang="ts">
	import Button from '$ui/button/Button.svelte';
	import Modal from './Modal.svelte';

	let open = false;

	const closeModal = () => (open = false);
</script>

<Button
	on:click="{() => {
		open = !open;
	}}">Open Modal</Button
>

<Modal open="{open}" on:closed="{() => (open = false)}">
	<h3 class="font-bold text-lg" slot="content">This is for storybook only</h3>

	<svelte:fragment slot="action">
		<Button on:click="{closeModal}">Close</Button>
		<Button classes="btn-success" on:click="{() => console.log('clicked')}">Yay</Button>
	</svelte:fragment>
</Modal>
