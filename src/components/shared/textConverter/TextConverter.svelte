<script lang="ts">
	export let rawText = '';
	let textContent = rawText;

	// let modifiers = rawText.split('/')[0].split('');
	textContent = rawText.split('/')?.[1];

	let getClassModifiers = (match: string) =>
		match
			.split('/')[0]
			.split('')
			.reduce((acc: string, cur: string) => {
				switch (cur) {
					case 'b':
						acc += ' font-bold';
						break;
					case 'i':
						acc += ' italic';
						break;
					case 'c':
						acc += ' capitalize';
						break;

					default:
						break;
				}
				return acc;
			}, '');
</script>

{#each rawText.split(' ') as content}
	{#if content.match(/^([bic]+\/\w+)$/g)}
		<!-- content here -->
		<span class="{getClassModifiers(content)}">{content.split('/')?.[1]}</span>
	{:else}
		{content}
	{/if}
	{' '}
{/each}
