import type { Preview } from '@storybook/react-webpack5';
import '../src/styles/main.css';

const preview: Preview = {
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
