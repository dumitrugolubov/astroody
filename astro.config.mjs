import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://odyex.cc',
	output: 'static',
	build: {
		format: 'directory'
	},
	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			customPages: [
				'https://odyex.cc',
				'https://odyex.cc/about',
				'https://odyex.cc/blog'
			]
		})
	],
	redirects: {
		'/404/': '/404',
		'/blog/': '/blog',
		'/about/': '/about'
	}
});