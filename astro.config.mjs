import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://odyex.cc',
	output: 'static',
	trailingSlash: 'never',
	build: {
		format: 'file'
	},
	integrations: [mdx(), sitemap()]
});