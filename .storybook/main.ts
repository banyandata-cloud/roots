import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
	],
	framework: '@storybook/react-webpack5',
	webpackFinal: async (config) => {
		config.module!.rules = (config.module?.rules ?? []).filter((rule) => {
			if (rule && typeof rule === 'object' && 'test' in rule) {
				const testStr = (rule as RuleSetRule).test?.toString() ?? '';
				return !testStr.includes('css');
			}
			return true;
		});

		const sassOptions = {
			sassOptions: {
				includePaths: [path.resolve(__dirname, '../src/styles')],
			},
		};

		config.module!.rules.push(
			{
				test: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								namedExport: false,
								exportLocalsConvention: 'as-is',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: sassOptions,
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: sassOptions,
					},
				],
			},
			{
				test: /\.module\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								namedExport: false,
								exportLocalsConvention: 'as-is',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: sassOptions,
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: sassOptions,
					},
				],
			}
		);

		return config;
	},
};

export default config;
