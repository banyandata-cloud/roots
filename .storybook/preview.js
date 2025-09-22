import { DocsContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '../dist/roots.css'; // raw Tailwind for dev in SB
import '../src/styles/main.scss';
import banyanTheme from './banyanTheme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	previewTabs: {
		canvas: { hidden: true },
	},
	viewMode: 'docs',
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
			order: ['Getting Started', 'Components'],
		},
	},
};

// Wor around in this version of storybook to select the docs as default tab
function clickDocsButtonOnFirstLoad() {
	window.removeEventListener('load', clickDocsButtonOnFirstLoad);

	try {
		const docsButtonSelector = window.parent.document.evaluate(
			"//button[contains(., 'Docs')]",
			window.parent.document,
			null,
			XPathResult.ANY_TYPE,
			null
		);

		const button = docsButtonSelector.iterateNext();

		button.click();
	} catch (error) {
		// Do nothing if it wasn't able to click on Docs button.
	}
}

window.addEventListener('load', clickDocsButtonOnFirstLoad);
