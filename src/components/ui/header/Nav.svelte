<script lang="ts">
	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	const headerLinks = [
		{
			href: '/account/profile',
			title: 'Profile 🚧',
			connected: true
		},
		{
			href: '/assoc',
			title: 'Liste personnelle',
			connected: true
		},
		{
			href: '/about',
			title: 'À propos'
		}
	];

	export let handleLogin = () => undefined;
	export let handleLogout = () => undefined;

	const dispatch = createEventDispatcher();

	const handleClick = (login: boolean) => () => {
		dispatch('clicked');
		login ? handleLogin() : handleLogout();
	};
</script>

{#each headerLinks as { href, title, connected }}
	{#if $session.user || !connected}
		<li><a href="{href}" on:click="{() => dispatch('clicked')}" sveltekit:prefetch>{title}</a></li>
	{/if}
{/each}
{#if $session.user}
	<li><button class="btn btn-accent " on:click="{handleClick(false)}">Déconnexion</button></li>
{:else}
	<li><button class="btn btn-primary" on:click="{handleClick(true)}">Connexion</button></li>
{/if}
