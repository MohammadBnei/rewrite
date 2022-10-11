<script lang="ts">
	export let href: string;
</script>

<a href="{href ? href : '#'}" sveltekit:prefetch class="btn btn-ghost normal-case text-xl">
	<slot>Provide Title</slot>
</a>
