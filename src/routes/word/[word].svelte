<script lang="ts">
	import type { WordModel } from '$lib/models/word';
	import type { IMetaTagProperties } from '$lib/models/seo';
	import { HeadTags } from '$shared/head-tags';
	import Detail from '$word/detail/Detail.svelte';
	import { session } from '$app/stores';

	export let word: WordModel;

	let metaData: Partial<IMetaTagProperties> = {
		title: `${word?.word.replace(/^\w/, (c) => c.toUpperCase())}`,
		description: ` Definitions : ${word?.types.reduce((acc, cur) => {
			acc += cur.type + ' : ';
			acc += cur.definitions.reduce((acc, cur) => {
				acc += cur.definition;
				acc += '\n';

				return acc;
			}, '');

			acc += '\n';
			return acc;
		}, '')}
				Etymologie : ${word.etymologies}
		`,
		url: `https://voconsteroid.com/word/${word.word}`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['definition ' + word?.word, word?.word, 'Voc On Steroid', word.lang === 'fr' ? 'French' : ''],
		searchUrl: `https://voconsteroid.com/word/${word.word}`,
		image: 'https://voconsteroid.com/voconsteroidLogo96.png',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml'
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200 place-items-start" id="word-data">
	<div
		class="hero-content max-w-full w-full flex-col-reverse lg:flex-row items-center lg:items-start justify-between"
	>
		{#if $session.user}
			<!-- <div class="card bg-base-100 shadow-xl assoc m-2 max-h-screen lg:w-80 flex-none">
				<div class="card-body ">
					<p class="text-xl text-opacity-70 font-bold grow-0">Votre liste</p>

					<Input options="{{ placeholder: 'Filter' }}" bind:value="{search}" />
					<div class="overflow-y-scroll mb-2 flex flex-col">
						<AssocList words="{filteredList}" />
					</div>
				</div>
			</div> -->
		{/if}
		<div class="lg:m-2 grow">
			<Detail word="{word}" />
		</div>
	</div>
</div>
