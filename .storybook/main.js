module.exports = {
	stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-create-react-app',
		'@storybook/addon-a11y',
		'storybook-addon-designs',
		'@storybook/addon-backgrounds',
		'storybook-dark-mode',
	],
	framework: '@storybook/react',
	features: {
		interactionsDebugger: true,
	},
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
