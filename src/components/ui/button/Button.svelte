<script lang="ts">
	export let classes = '';

	export let contentText = 'Content';
</script>

<button class="{`btn  ${classes}`}" on:click on:mouseenter>
	<slot>{contentText}</slot>
</button>
