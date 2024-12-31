// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Starlane Studios',
	tagline: 'Documentation Platform',
	url: 'https://docs.starlane.studio/',
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
					sidebarPath: require.resolve('./sidebars.js'),
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css')
				},
			}),
		],
	],

	plugins: [
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'cirql',
				path: 'cirql',
				routeBasePath: 'cirql',
			}
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'transaction-tracker',
				path: 'transaction-tracker',
				routeBasePath: 'transaction-tracker',
			}
		]
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				logo: {
					alt: 'Starlane Docs',
					className: 'navbar-logo',
				},
				items: [
					{
						href: "/",
						label: "Home",
						position: "left"
					},
					{
						label: "Projects",
						position: "left",
						items: [
							{
								href: "/cirql/",
								label: "Cirql",
							},
							// {
							// 	href: "/transaction-tracker/",
							// 	label: "Transaction Tracker",
							// }
						]
					},
					{
						href: 'https://github.com/StarlaneStudios/docs',
						label: 'Contribute',
						position: 'right',
					},
					{
						href: 'https://github.com/StarlaneStudios',
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
				copyright: `Copyright © 2018-${new Date().getFullYear()} Starlane Studios`,
			},
			prism: {
				theme: themes.github,
				darkTheme: themes.dracula,
			},
		}),
};

module.exports = config;
