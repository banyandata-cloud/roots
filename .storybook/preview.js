import '../src/styles/main.scss';
import { banyanTheme } from './banyanTheme';

export const parameters = {
	viewMode: 'docs',

	actions: {
		argTypesRegex: '^on[A-Z].*',
	},

	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},

	backgrounds: {
		default: 'light',
		values: [
			{ name: 'light', value: '#ffffff' },
			{ name: 'dark', value: '#0f172a' },
		],
	},

	docs: {
		theme: banyanTheme,
		toc: true,
	},

	options: {
		storySort: {
			order: ['Getting Started', 'Components'],
		},
	},
};
