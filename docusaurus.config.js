// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Cirql',
	tagline: 'SurrealDB ORM & Query Builder',
	url: 'https://cirql.starlane.studio/',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				blog: false,
				docs: {
					sidebarPath: require.resolve('./sidebars.js')
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css')
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				logo: {
					alt: 'Cirql ORM',
					src: 'img/logo-wide.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'cirql',
						position: 'left',
						label: 'Guide',
					},
					{
						type: 'doc',
						docId: 'api/index',
						position: 'left',
						label: 'API Reference',
					},
					{
						href: 'https://github.com/StarlaneStudios/cirql/blob/main/CHANGELOG.md',
						label: 'Changelog',
						position: 'right',
					},
					{
						href: 'https://github.com/StarlaneStudios/cirql',
						label: 'GitHub',
						position: 'right',
					},
					{
						href: 'https://discord.gg/exaQDX2',
						label: 'Discord',
						position: 'right'
					}
				],
			},
			footer: {
				style: 'light',
				copyright: `Copyright © ${new Date().getFullYear()} Starlane Studios`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
