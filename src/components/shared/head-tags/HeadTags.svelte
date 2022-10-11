<script lang="ts">
	import type { IMetaTagProperties } from '$seo';
	import { SEO } from '../seo';

	const description = 'Voc On Steroid. Votre dictionnaire personnel.';

	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};

	metaData = {
		title: metaData.title ? metaData.title : 'Voc On Steroid',
		description: metaData.description ? metaData.description : description,
		...metaData
	};
</script>

<SEO metaData="{metaData}" />
