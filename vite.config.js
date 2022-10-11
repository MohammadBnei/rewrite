import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$stores: resolve('src/stores'),
			$seo: resolve('src/lib/models/seo/index'),
			$ui: resolve('src/components/ui'),
			$shared: resolve('src/components/shared'),
			$word: resolve('src/components/word')
		}
	}
};

export default config;
