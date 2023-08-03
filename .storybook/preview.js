import React from 'react';
import '../styles/main.scss';
import { DocsContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import banyanTheme from './banyanTheme';
import { useDarkMode } from 'storybook-dark-mode';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		toc: true,
		container: (props) => {
			const isDark = useDarkMode();

			const { id: storyId, storyById } = props.context;
			const {
				parameters: { docs = {} },
			} = storyById(storyId);
			docs.theme = isDark ? themes.dark : themes.light;
			return React.createElement(DocsContainer, props);
		},
	},
	darkMode: {
		current: 'light',
		darkClass: 'lights-out',
		lightClass: 'lights-on',
		classTarget: 'html',
		stylePreview: true,
		// Override the default dark theme
		dark: { ...banyanTheme, ...themes.dark, appBg: 'black' },
		// Override the default light theme
		light: { ...banyanTheme, ...themes.light, appBg: 'white' },
	},
	options: {
		storySort: {
			order: [
				'Introduction',
				'Auth',
				'Layout',
				'Pages',
				'Hooks',
				'Utils',
				'Api Services',
				'Components',
			],
		},
	},
};
