import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';
import { importAssets } from 'svelte-preprocess-import-assets'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [sveltePreprocess(), importAssets()],

	kit: {
		// Builds dev normally, or uses BASE_PATH env variable set up by the github pages deploy action.
		adapter: adapter(),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
		},

	}
};

export default config;
