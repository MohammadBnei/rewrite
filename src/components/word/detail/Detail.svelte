<script lang="ts">
	import { fade } from 'svelte/transition';
	import { session } from '$app/stores';

	import { afterNavigate } from '$app/navigation';
	import type { WordModel } from '$lib/models/word';
	import assocStore from '$stores/assoc';
	import ClickableText from '$word/ClickableText.svelte';

	let openList: Array<string> = [];

	const toggleCollapse = (idx: string) => {
		openList = openList.includes(idx) ? openList.filter((i) => i !== idx) : [...openList, idx];
	};

	export let word: WordModel;

	afterNavigate(() => (openList = []));
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body text-left">
		<div class="flex lg:justify-between lg:flex-row flex-wrap flex-col place-items-center">
			<h2 class="card-title text-2xl lg:text-5xl capitalize mb-2">{word.word}</h2>
			{#if $session.user}
				<div class="flex">
					{#if $assocStore.some(({ id }) => id === word.word)}
						<div class="flex place-items-center">
							<!-- <CategoryBadge word="{word}" />
							<AssignCategory word="{word}" /> -->
							Badges
						</div>
					{/if}
					<!-- <AddRemoveButton
						savedWord="{$assocStore.some(({ id }) => id === word.word)}"
						handleAddWord="{() => addWord(word.word)}"
						handleRemoveWord="{() => removeWord(word.word)}"
					/> -->
					Remove Button
				</div>
			{/if}
		</div>
		<div class="mb-2">
			{#each word.etymologies as e}
				<p class="grow-0">{e}</p>
			{/each}
		</div>
		{#each word.types as r, ti}
			{#if ti > 0}
				<div class="divider"></div>
			{/if}
			<div class="text-xl lg:text-2xl font-medium">
				{r.type}
			</div>
			<div class="ml-4">
				{#each r.definitions as { definition, examples }, di}
					{#if di > 0}
						<div class="divider"></div>
					{/if}
					<p class="mb-1"><ClickableText text="{definition}" /></p>
					{#if examples.length}
						<div
							tabindex="0"
							class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box cursor-pointer {openList.includes(
								`${ti}:${di}`
							)
								? ''
								: 'w-min'} mb-2 ml-1"
							class:collapse-open="{openList.includes(`${ti}:${di}`)}"
							class:collapse-close="{!openList.includes(`${ti}:${di}`)}"
							on:click="{() => toggleCollapse(`${ti}:${di}`)}"
						>
							<div class="collapse-title" transition:fade
								><svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 "
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
									></path>
								</svg></div
							>
							<div tabindex="0" class="collapse-content">
								<div class="m-2">
									{#each examples as example, ei}
										{#if ei > 0}
											<div class="divider"></div>
										{/if}
										<p class="text-base font-extralight antialiased"
											><ClickableText text="{example}" /></p
										>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
