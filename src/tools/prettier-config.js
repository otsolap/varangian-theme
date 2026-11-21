import * as prettierPluginAstro from 'prettier-plugin-astro';

/** @type {import('prettier').Config} */
export const prettierConfig = {
	plugins: [prettierPluginAstro],
	useTabs: true,
	semi: true,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 80,
	trailingComma: 'all',
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
