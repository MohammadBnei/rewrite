<script lang="ts">
	import type { IMetaTagProperties } from '$seo';
	import HeadTags from '$shared/head-tags/HeadTags.svelte';

	const metaData: Partial<IMetaTagProperties> = {
		title: 'Accueil',
		url: 'https://voconsteroid.com',
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: [
			'Voc On Steroid',
			'Voc On Steroid Accueil',
			'definition',
			'vocabulaire',
			'apprentissage',
			'apprendre'
		],
		searchUrl: 'https://voconsteroid.com',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml'
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200" style="background-image: url(/books-background.jpg)">
	<div class="hero-overlay bg-opacity-80"></div>
	<div class="hero-content text-center backdrop-filter backdrop-blur-sm rounded-2xl">
		<div class="max-w-7xl">
			<h1 class="text-5xl font-bold mb-5">Bienvenue sur le dictionnaire personnel Voc On Steroid !</h1>
			<p class="py-6 mb-5 text-xl"
				>Vous pouvez chercher des définitions, mais si vous vous connectez vous découvrirez d'autres
				possibilités...</p
			>
		</div>
	</div>
</div>
