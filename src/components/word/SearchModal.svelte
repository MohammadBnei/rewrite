<script lang="ts">
	import Button from '$ui/button/Button.svelte';
	import Modal from '$ui/modal/Modal.svelte';
	import { fetchResemblingWord } from '$lib/service/word';
	import { tick } from 'svelte';
	import type { Option } from '$ui/search/SearchBox.svelte';
	import SearchBox from '$ui/search/SearchBox.svelte';
	import { goto, prefetch } from '$app/navigation';

	let fetching = false;
	let open = false;
	let options: Option[] = [];
	let keys = ['label'];
	let value = '';
	let inputEl: HTMLElement;

	let timer: NodeJS.Timeout;

	$: if (value !== '') {
		fetching = true;
		clearTimeout(timer);
		timer = setTimeout(() => {
			fetchResemblingWord(value)
				.then((res) => {
					options = res.map(({ key, title }) => ({
						label: title,
						link: key
					}));
				})
				.finally(() => (fetching = false));
		}, 200);
	}

	$: if (value === '') {
		options = [];
	}

	let trigger: number | null = null;

	const handleSelect = (v: Option) => {
		trigger = null;
		open = false;
		value = '';
		goto('/word/' + v.link);
	};

	$: if (open) {
		tick().then(() => inputEl?.focus());
	}
</script>

<Button classes="btn-accent btn-circle" on:click="{() => (open = true)}">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
	</svg>
</Button>

<Modal open="{open}" on:closed="{() => (open = false)}">
	<svelte:fragment slot="content">
		<SearchBox
			options="{options}"
			keys="{keys}"
			on:type="{({ detail }) => (value = detail)}"
			on:pick="{({ detail }) => handleSelect(detail)}"
			triggerSelect="{trigger}"
			inputEl="{inputEl}"
			on:hover="{({ detail }) => {
				prefetch('/word/' + detail);
			}}"
		>
			<div class="indicator w-full" slot="input">
				{#if fetching}
					<span class="indicator-item badge badge-secondary animate-pulse-fast"></span>
				{/if}
				<input
					class="w-full h-8 px-2 border-b-gray-200 border-2 rounded-sm"
					type="text"
					bind:value
					bind:this="{inputEl}"
				/>
			</div>
		</SearchBox>
	</svelte:fragment>

	<svelte:fragment slot="action">
		<Button on:click="{() => (open = false)}">Quitter</Button>
		<Button classes="btn-accent" on:click="{() => (trigger = 1)}">Valider</Button>
	</svelte:fragment>
</Modal>
