const path = require('path');

module.exports = {
	stories: [
		'../src/components/**/*.stories.mdx',
		'../src/components/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'storybook-addon-designs',
		'@storybook/addon-backgrounds',
		'storybook-dark-mode',
	],
	framework: '@storybook/react',
	features: {
		interactionsDebugger: true,
		buildStoriesJson: true,
	},
	core: {
		builder: '@storybook/builder-webpack5',
	},
	typescript: {
		reactDocgen: 'react-docgen',
	},
	babel: async (options) => ({
		...options,
		presets: [
			...options.presets,
			[
				'@babel/preset-react',
				{
					runtime: 'automatic',
				},
				'preset-react-jsx-transform', // Can name this anything, just an arbitrary alias to avoid duplicate presets'
			],
		],
	}),
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Tailwind / PostCSS support
		config.module.rules.push({
			test: /\.css$/,
			exclude: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
					},
				},
				'postcss-loader',
			],
			include: path.resolve(__dirname, '../'),
		});

		// Return the altered config
		return config;
	},
};
