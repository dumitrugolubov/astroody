import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://odyex.cc',
	output: 'static',
	trailingSlash: 'never', // Change to never to match Netlify's default behavior
	build: {
		format: 'directory' // Change to directory instead of file
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
	head: [
		{
			rel: 'icon',
			href: '/favicon.png',
			type: 'image/png',
			sizes: '32x32'		
		}
	],
	server: {
		headers: {
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'DENY',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
		}
	}
});