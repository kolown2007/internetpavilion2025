import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        adapter: adapter({
            // default options are shown
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false
        }),
        
        // Instead of prerender.default, use the top-level prerender option
        prerender: {
            entries: ['*']
        }
    }
};

export default config;