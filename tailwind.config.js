module.exports = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.css$/,
			use: ['style-loader', 'css-loader', 'postcss-loader'],
			include: /src/,
		});
		return config;
	},
};
