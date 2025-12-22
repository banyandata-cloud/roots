/** @type { import('@storybook/react-webpack5').StorybookConfig } */
module.exports = {
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

	addons: ['@storybook/addon-a11y'],

	docs: {
		autodocs: true,
	},

	webpackFinal: async (config) => {
		config.module.rules = config.module.rules.filter(
			(rule) => !rule.test?.toString().includes('mdx')
		);
		// ✅ MDX + TS support
		config.module.rules.push({
			test: /\.mdx$/,
			exclude: [/node_modules/, /\.storybook/],
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [
							require.resolve('@babel/preset-env'),
							[require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
						],
					},
				},
				{
					loader: require.resolve('@mdx-js/loader'),
				},
			],
		});

		config.module.rules.push({
			test: /\.(js|jsx|ts|tsx)$/,
			exclude: /node_modules/,
			use: {
				loader: require.resolve('babel-loader'),
				options: {
					presets: [
						require.resolve('@babel/preset-env'),
						[require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
					],
				},
			},
		});

		config.resolve.extensions.push('.ts', '.tsx');

		// SCSS support
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		});

		return config;
	},
};
