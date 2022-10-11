<script lang="ts" context="module">
	export interface Option {
		label: string;
		link: string;
	}
</script>

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import fuzzysort from 'fuzzysort';

	export let options: Option[] = [];
	export let keys = ['label'];
	export let value = '';
	export let inputEl: HTMLElement | null = null;

	export let triggerSelect: number | null = null;

	$: handleInputChange(triggerSelect);

	const handleInputChange = (trigger: number | null) => {
		if (trigger) {
			handleSelect();
		}
	};

	const optionDispatch = createEventDispatcher<{ pick: Option }>();
	const typeDispatch = createEventDispatcher<{ type: string }>();
	const hoverDispatch = createEventDispatcher<{ hover: string }>();
	let listEl: HTMLElement;

	onMount(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	$: filteredOptions = getFilteredOptions(value, options);
	$: availiableOptions = renderOptions(value, filteredOptions, options);

	function onAction(option: Option) {
		optionDispatch('pick', option);
	}

	function getFilteredOptions(value: string, options: Option[]) {
		const res = fuzzysort.go(value, options, { keys });
		return res as Fuzzysort.KeysResults<Option>;
	}

	function renderOptions(value: string, filteredOptions: Fuzzysort.KeysResults<Option>, options: Option[]) {
		const visibleOptions = value ? filteredOptions.map((r) => r.obj) : options;
		return visibleOptions.map((obj, i) => {
			let html: Record<string, string | null> = {};
			for (let y = 0; y < keys.length; y++) {
				if (filteredOptions[i] && filteredOptions[i][y]) {
					html[keys[y]] = fuzzysort.highlight(filteredOptions[i][y], '<b>', '</b>');
				} else {
					html[keys[y]] = obj[keys[y]];
				}
			}
			let item = {
				obj,
				html
			};

			return item;
		});
	}

	const onKeyDown = (e: KeyboardEvent) => {
		// CTRL + K
		if (e.ctrlKey && e.key == 'k') {
			value = '';
			inputEl?.focus();
			e.preventDefault();
		}
		if (!open) return;
		switch (e.key.toString()) {
			// ESC
			case 'Escape':
				break;

			// ArrowUp
			case 'ArrowUp':
				if (document.activeElement === inputEl) {
					(listEl.lastChild as HTMLElement).focus();
				} else if (document.activeElement?.previousSibling) {
					(document.activeElement.previousSibling as HTMLElement).focus();
				} else {
					(listEl.lastChild as HTMLElement).focus();
				}
				e.preventDefault();
				break;
			// ArrowDown
			case 'ArrowDown':
				if (document.activeElement === inputEl) {
					(listEl.firstChild as HTMLElement).focus();
				} else if (document.activeElement?.nextSibling) {
					(document.activeElement.nextSibling as HTMLElement).focus();
				} else {
					(listEl.firstChild as HTMLElement).focus();
				}
				e.preventDefault();
				break;
			// Enter
			case 'Enter':
				handleSelect();
				break;
			default:
				if (
					(e.key.length === 1 && e.ctrlKey === false && e.altKey === false && e.metaKey === false) ||
					e.key === 'Backspace'
				) {
					inputEl?.focus();
				}
				break;
		}
	};

	const handleSelect = () => {
		const index = Array.prototype.slice.call(listEl.children).indexOf(document.activeElement);
		let option;
		option = availiableOptions[index === -1 ? 0 : index];
		if (option) {
			onAction(option.obj);
		} else if (value) {
			onAction({ label: value, link: value });
		}
	};

	$: if (value) {
		typeDispatch('type', value);
	}
</script>

<div>
	<slot name="input">
		<input
			class="w-full h-8 px-2 border-b-gray-200 border-2 rounded-sm"
			type="text"
			bind:value
			bind:this="{inputEl}"
		/>
	</slot>
	<ul class="list-none py-2" bind:this="{listEl}">
		{#each availiableOptions as option, i}
			<li
				class="focus:bg-gray-300 focus-visible:outline-none p-1 rounded-sm"
				tabindex="0"
				on:click="{() => onAction(option.obj)}"
				on:focus="{() => hoverDispatch('hover', option.obj.link)}"
				on:mouseenter="{() => hoverDispatch('hover', option.obj.link)}"
			>
				{#each keys as key}
					<slot name="item" option="{option}">
						{@html option.html[key]}
					</slot>
				{/each}
			</li>
		{:else}
			{#if value}
				<li>Aucun résultat</li>
			{:else}
				<li>Écrire pour commencer une recherche</li>
			{/if}
		{/each}
	</ul>
</div>
