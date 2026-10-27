import type { Preview } from '@storybook/react-webpack5';
import '../src/styles/main.css';
import '../src/components/v2/styles/main.v2.scss';

// main.css (v1) sizes rem against a 12.5px root; v2 uses the browser default (see
// src/components/v2/styles/main.v2.scss). Both render in one document, so switch the root
// per story. v2 components must not depend on anything from main.css.
const isV2Story = (title: string) => /(^|\/)v2(\/|$)/.test(title);

const preview: Preview = {
	decorators: [
		(Story, context) => {
			document.documentElement.style.fontSize = isV2Story(context.title) ? '100%' : '';
			return Story();
		},
	],
	parameters: {
		layout: 'padded',
		a11y: {
			config: {
				rules: [
					{
						id: 'color-contrast',
						enabled: false,
					},
				],
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;

// ```typescript
// import type { Preview } from '@storybook/react-webpack5';
// import '../src/styles/main.css';

// const preview: Preview = {
// 	parameters: {
// 		layout: 'padded',
// 		controls: {
// 			matchers: {
// 				color: /(background|color)$/i,
// 				date: /Date$/i,
// 			},
// 		},
// 	},
// };

// export default preview;
// ```
