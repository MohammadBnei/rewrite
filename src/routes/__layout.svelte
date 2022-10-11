<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		return {
			props: {
				key: url.pathname
			}
		};
	};
</script>

<script>
	import { fetchStore } from '$stores/fetching';
	import { dismissToast, toasts } from '$stores/toast';
	import Header from '$ui/header/Header.svelte';
	import PageTransition from '$ui/pageTransition/PageTransition.svelte';
	import Toast from '$ui/toast/Toast.svelte';
	import SearchModal from '$word/SearchModal.svelte';

	import '../app.css';

	export let key = '/';
</script>

<div class="flex justify-center flex-col md:flex-row items-center bg-slate-300">
	<Header>
		<SearchModal slot="search" />
		<PageTransition refresh="{key.split('/')[2]}" slot="content">
			<slot />
		</PageTransition>
		<Toast toasts="{$toasts}" dismissToast="{(id) => dismissToast(id)}" />
	</Header>
	{#if $fetchStore.length}
		<div class="fixed bottom-0 w-screen">
			<progress class="progress w-full progress-primary"></progress>
		</div>
	{/if}
</div>
