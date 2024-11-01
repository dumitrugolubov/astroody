import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://odysseyexchange.com',
	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			customPages: [
				'https://odysseyexchange.com/trading',
				'https://odysseyexchange.com/launchpad',
				'https://odysseyexchange.com/affiliate'
			]
		})
	],
});